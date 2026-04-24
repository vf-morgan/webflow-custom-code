import {
  EPIC_STORY_IO_THRESHOLD,
  EPIC_STORY_SERVICE_RAIL_ENABLED,
  EPIC_STORY_SERVICE_RAIL_GAP_PX,
} from "./epic-constants.js";

/**
 * #story reveal: IntersectionObserver + gsap.to (no ScrollTrigger).
 * Works when ScrollSmoother / a non-window scroller is used — ScrollTrigger was tied to the wrong
 * scroll surface, so nothing ever played.
 */
export function bootstrapEpicStoryServices() {
  "use strict";

  if (typeof window.gsap === "undefined") {
    console.warn("[epic-story-services] gsap not found on window.");
    return;
  }

  var gsap = window.gsap;

  var SVG_NS = "http://www.w3.org/2000/svg";
  var RAIL_STROKE = "#fde021";
  var RAIL_WIDTH = 1;
  var RAIL_CORNER_R = 15;

  function rectRelativeToSection(section, el) {
    var sr = section.getBoundingClientRect();
    var er = el.getBoundingClientRect();
    return {
      left: er.left - sr.left,
      top: er.top - sr.top,
      right: er.right - sr.left,
      bottom: er.bottom - sr.top,
      width: er.width,
      height: er.height,
    };
  }

  function clampRailRadius(baseR, xL, xR, yBar, yBot) {
    var span = xR - xL;
    var maxR = Math.min(
      baseR,
      Math.max(2, (span - 4) * 0.5),
      Math.max(2, yBar - 1),
      Math.max(2, yBot - yBar - 2)
    );
    return Math.max(2, Math.floor(maxR * 10) / 10);
  }

  /**
   * Webflow-style bus: top stem → horizontal from first to last **card center** → rounded 90° at
   * those centers into outer verticals; inner T-downs at interior card centers. Coordinates are in
   * the gap SVG box (y=0 top of gap, y=slotH flush with card tops).
   */
  function buildServiceWirePath(slotW, slotH, xL, xR, stemX, centers, baseR) {
    var parts = [];
    if (slotW < 2 || slotH < 8 || !centers.length) {
      return { d: "" };
    }

    var yBot = Math.max(2, slotH - 1);
    var yBar = Math.min(Math.floor(slotH * 0.42), yBot - baseR - 6);
    if (yBar < baseR + 4) {
      yBar = baseR + 4;
    }

    var R = clampRailRadius(baseR, xL, xR, yBar, yBot);
    var xInL = xL + R;
    var xInR = xR - R;
    var sx = stemX;
    if (xInL <= xInR) {
      if (sx < xInL) sx = xInL;
      if (sx > xInR) sx = xInR;
    } else {
      sx = (xL + xR) * 0.5;
      xInL = sx;
      xInR = sx;
    }

    var n = centers.length;
    parts.push("M " + sx + " 0 L " + sx + " " + yBar);

    if (n >= 2) {
      parts.push(
        "M " +
          xL +
          " " +
          yBot +
          " L " +
          xL +
          " " +
          (yBar + R) +
          " A " +
          R +
          " " +
          R +
          " 0 0 1 " +
          (xL + R) +
          " " +
          yBar +
          " L " +
          (xR - R) +
          " " +
          yBar +
          " A " +
          R +
          " " +
          R +
          " 0 0 1 " +
          xR +
          " " +
          (yBar + R) +
          " L " +
          xR +
          " " +
          yBot
      );
      for (var i = 1; i <= n - 2; i++) {
        var cx = centers[i];
        if (cx > xL + R + 0.5 && cx < xR - R - 0.5) {
          parts.push("M " + cx + " " + yBar + " L " + cx + " " + yBot);
        }
      }
    } else {
      parts.push(
        "M " + centers[0] + " " + yBar + " L " + centers[0] + " " + yBot
      );
    }

    return { d: parts.join(" ") };
  }

  function createServiceRail(section, cards) {
    if (!cards || !cards.length) return null;

    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("data-epic-service-rail", "1");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText =
      "position:absolute;left:0;width:100%;pointer-events:none;overflow:visible;z-index:2;";

    var pathEl = document.createElementNS(SVG_NS, "path");
    pathEl.setAttribute("fill", "none");
    pathEl.setAttribute("stroke", RAIL_STROKE);
    pathEl.setAttribute("stroke-width", String(RAIL_WIDTH));
    pathEl.setAttribute("stroke-linecap", "round");
    pathEl.setAttribute("stroke-linejoin", "miter");
    svg.appendChild(pathEl);
    section.appendChild(svg);

    var gapMaxPx =
      typeof EPIC_STORY_SERVICE_RAIL_GAP_PX === "number"
        ? EPIC_STORY_SERVICE_RAIL_GAP_PX
        : 64;

    var ro = null;
    function updateRailGeometry() {
      var w = section.offsetWidth;
      if (w < 1) return;

      var stmt = section.querySelector(".service-statement");
      var rects = [];
      var minCardTop = Infinity;
      for (var i = 0; i < cards.length; i++) {
        var r = rectRelativeToSection(section, cards[i]);
        rects.push(r);
        if (r.top < minCardTop) minCardTop = r.top;
      }

      var slotTop = 0;
      if (stmt) {
        var rst = rectRelativeToSection(section, stmt);
        slotTop = rst.bottom;
      } else {
        slotTop = Math.max(0, minCardTop - gapMaxPx);
      }

      var rawGap = minCardTop - slotTop;
      if (rawGap < 4) {
        slotTop = Math.max(0, minCardTop - gapMaxPx);
        rawGap = Math.max(4, minCardTop - slotTop);
      }

      var slotH = Math.min(gapMaxPx, Math.max(8, rawGap));
      if (slotTop + slotH > minCardTop) {
        slotTop = minCardTop - slotH;
      }
      if (slotTop < 0) {
        slotTop = 0;
        slotH = Math.min(gapMaxPx, Math.max(8, minCardTop));
      }

      svg.style.top = slotTop + "px";
      svg.style.height = slotH + "px";

      svg.setAttribute("viewBox", "0 0 " + w + " " + slotH);
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(slotH));

      var centers = rects.map(function (r) {
        return r.left + r.width * 0.5;
      });
      var xL = centers[0];
      var xR = centers[centers.length - 1];
      if (xL > xR) {
        var tmp = xL;
        xL = xR;
        xR = tmp;
      }
      var stemX = (xL + xR) * 0.5;

      var built = buildServiceWirePath(
        w,
        slotH,
        xL,
        xR,
        stemX,
        centers,
        RAIL_CORNER_R
      );
      pathEl.setAttribute("d", built.d);
    }

    updateRailGeometry();

    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(function () {
        updateRailGeometry();
      });
      ro.observe(section);
    }

    return {
      pathEl: pathEl,
      updateRailGeometry: updateRailGeometry,
      destroy: function () {
        if (ro) {
          try {
            ro.disconnect();
          } catch (e2) {}
          ro = null;
        }
        if (svg.parentNode) svg.parentNode.removeChild(svg);
      },
    };
  }

  function collectTargets(section) {
    var nodes = [];
    var st = section.querySelector(".service-statement");
    if (st) {
      var accent = st.querySelector(".accent-tag");
      var h2 = st.querySelector("h2");
      var btn = st.querySelector(".button-outline");
      if (accent) nodes.push(accent);
      if (h2) nodes.push(h2);
      if (btn) nodes.push(btn);
    }
    var cards = section.querySelectorAll(".service-card");
    for (var i = 0; i < cards.length; i++) nodes.push(cards[i]);
    if (nodes.length) return nodes;

    var fallback = section.querySelector(".div-block-4");
    if (fallback) return [fallback];

    var any = section.querySelectorAll(
      "h2, .accent-tag, .button-outline, [data-epic-service-index]"
    );
    for (var j = 0; j < any.length; j++) nodes.push(any[j]);
    return nodes;
  }

  function run() {
    var section =
      document.querySelector("#story") ||
      document.querySelector('[data-epic="story-pin"]');
    if (!section) {
      console.warn("[epic-story-services] No #story or [data-epic=story-pin] found.");
      return;
    }

    if (section.dataset.epicStoryFadeInit === "1") return;
    section.dataset.epicStoryFadeInit = "1";

    var nodes = collectTargets(section);
    if (!nodes.length) {
      console.warn("[epic-story-services] No nodes to animate inside section.");
      section.removeAttribute("data-epic-story-fade-init");
      return;
    }

    if (typeof console !== "undefined" && typeof console.info === "function") {
      console.info(
        "[epic-story-services] ready — " +
          nodes.length +
          " target(s); reveal uses IntersectionObserver (not ScrollTrigger)."
      );
    }

    var railEnabled =
      typeof EPIC_STORY_SERVICE_RAIL_ENABLED === "undefined" ||
      EPIC_STORY_SERVICE_RAIL_ENABLED;
    var cardNodes = section.querySelectorAll(".service-card");
    var rail = null;
    if (railEnabled && cardNodes.length) {
      var pos = window.getComputedStyle(section).position;
      if (pos === "static") {
        section.style.position = "relative";
      }
      rail = createServiceRail(section, cardNodes);
    }

    var REDUCED =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (REDUCED) {
      gsap.set(nodes, { autoAlpha: 1, y: 0, clearProps: "opacity,visibility" });
      if (rail && rail.pathEl) {
        rail.updateRailGeometry();
        gsap.set(rail.pathEl, {
          strokeDasharray: "none",
          strokeDashoffset: 0,
          clearProps: "strokeDasharray,strokeDashoffset",
        });
      }
      return;
    }

    gsap.set(nodes, { autoAlpha: 0, y: 28 });
    if (rail && rail.pathEl) {
      rail.updateRailGeometry();
      var initLen = rail.pathEl.getTotalLength();
      gsap.set(rail.pathEl, {
        strokeDasharray: initLen,
        strokeDashoffset: initLen,
        opacity: 1,
      });
    }

    var played = false;
    var io = null;
    function playReveal() {
      if (played) return;
      played = true;
      if (io) {
        try {
          io.disconnect();
        } catch (e) {}
        io = null;
      }
      if (rail && rail.pathEl) {
        rail.updateRailGeometry();
        var len = rail.pathEl.getTotalLength();
        if (len > 0.5) {
          gsap.set(rail.pathEl, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 1,
          });
        }
      }

      var revealEnd = 0.7 + (nodes.length - 1) * 0.11;
      var firstCardI = -1;
      for (var fi = 0; fi < nodes.length; fi++) {
        var n = nodes[fi];
        if (n && n.classList && n.classList.contains("service-card")) {
          firstCardI = fi;
          break;
        }
      }
      var cardN = cardNodes.length;
      var lineStart = firstCardI >= 0 ? firstCardI * 0.11 : 0;
      var lineDur =
        cardN > 0 ? Math.max(0.5, 0.7 + (cardN - 1) * 0.11) : Math.max(0.55, revealEnd * 0.92);
      var tl = gsap.timeline({ defaults: { overwrite: "auto" } });
      if (rail && rail.pathEl && rail.pathEl.getTotalLength() > 0.5) {
        tl.to(
          rail.pathEl,
          { strokeDashoffset: 0, duration: lineDur, ease: "none" },
          lineStart
        );
      }
      tl.to(
        nodes,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.11,
          ease: "power2.out",
        },
        0
      );
    }

    if (typeof IntersectionObserver !== "undefined") {
      var thr =
        typeof EPIC_STORY_IO_THRESHOLD === "number"
          ? EPIC_STORY_IO_THRESHOLD
          : 0.05;
      if (thr > 0.5) thr = 0.05;
      io = new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
              playReveal();
              return;
            }
          }
        },
        { root: null, rootMargin: "0px", threshold: thr }
      );
      io.observe(section);
    } else {
      playReveal();
    }

    requestAnimationFrame(function () {
      var r = section.getBoundingClientRect();
      var h = window.innerHeight || 1;
      var visible = r.top < h * 0.95 && r.bottom > h * 0.05;
      if (visible) {
        playReveal();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    requestAnimationFrame(run);
  }
}
