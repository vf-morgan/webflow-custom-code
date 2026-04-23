import {
  EPIC_STORY_PIN_START,
  EPIC_STORY_SCRUB_SMOOTH,
  EPIC_STORY_SCRUB_SCROLL_VH,
} from "./epic-constants.js";
import { isEpicStoryDebug, isEpicStoryDebugVerbose, epicStoryLog, br } from "./epic-debug.js";

export function bootstrapEpicStoryAnim() {
  "use strict";

  if (typeof window.gsap === "undefined" || !window.ScrollTrigger) {
    try {
      console.warn(
        "[epic] GSAP or ScrollTrigger is missing; #story (EPIC) is skipped. " +
          "Load order in Webflow / body: ScrollTrigger (plugin after GSAP) → SplitText → this `dist/main.js` bundle."
      );
    } catch (e) {}
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  /**
   * Webflow / other bundles call `ScrollTrigger.refresh()` globally; that recalculates every ST and
   * can yank `scrollY` backward right after the epic #story pin releases. Wrap once: after any global
   * refresh, if we were already past `epic-story-scrub`’s numeric `end` and `scrollY` dropped a lot,
   * restore the pre-refresh position (H15 when it fires).
   */
  if (!window.__epicScrollTriggerRefreshIsolation) {
    window.__epicScrollTriggerRefreshIsolation = true;
    (function epicPatchGlobalScrollRefresh(ST) {
      var orig = ST.refresh.bind(ST);
      var _epicGlobalRefreshDepth = 0;
      ST.refresh = function () {
        _epicGlobalRefreshDepth += 1;
        try {
          if (_epicGlobalRefreshDepth > 1) {
            return orig.apply(ST, arguments);
          }
          var storySt = null;
          var endPx = null;
          var y0 = 0;
          try {
            y0 = typeof window !== "undefined" ? window.scrollY : 0;
            storySt = ST.getById("epic-story-scrub");
            if (storySt && typeof storySt.end === "number" && isFinite(storySt.end)) {
              endPx = storySt.end;
            }
          } catch (ePre) {}
          var wasPastStoryEnd =
            endPx != null && isFinite(y0) && y0 >= endPx - 2;
          orig.apply(ST, arguments);
          if (!wasPastStoryEnd) {
            return;
          }
          try {
            var y1 = typeof window !== "undefined" ? window.scrollY : 0;
            if (y1 < y0 - 60) {
              try {
                window.scrollTo(0, y0);
              } catch (eTo) {}
              if (isEpicStoryDebug()) {
                // #region agent log
                try {
                  fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
                    body: JSON.stringify({
                      sessionId: "9fb82f",
                      runId: "st-refresh-guard",
                      hypothesisId: "H15",
                      location: "story-anim.js:ScrollTrigger.refresh.wrap",
                      message: "restored scrollY after global refresh pulled user back toward #story",
                      data: {
                        y0: Math.round(y0 * 10) / 10,
                        y1: Math.round(y1 * 10) / 10,
                        endPx: Math.round(endPx * 10) / 10,
                      },
                      timestamp: Date.now(),
                    }),
                  }).catch(function () {});
                } catch (eH15) {}
                // #endregion
              }
            }
          } catch (ePost) {}
        } finally {
          _epicGlobalRefreshDepth -= 1;
        }
      };
    })(ScrollTrigger);
  }

  if (isEpicStoryDebug()) {
    try {
      epicStoryLog("debug enabled", {
        url: window.location && window.location.href,
        verbose: isEpicStoryDebugVerbose(),
        help:
          "epicDebug=1 enables scrub (bucketed) + lifecycle; add epicDebugVerbose=1 for onRefresh. localStorage: epicDebugStory, epicDebugStoryVerbose",
      });
    } catch (e0) {}
  }

  /* If you change this block, also review the REDUCED_MOTION path in `body-intro.js`. */
  var REDUCED_MOTION =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var STORY_SEL = "#story";

  function q(sel, root) {
    return (root || document).querySelector(sel);
  }

  function getSortedServiceCards(story) {
    var nodelist = story.querySelectorAll("[data-epic-service-index]");
    var list = [].map.call(nodelist, function (el) {
      return {
        el: el,
        idx: parseInt(String(el.getAttribute("data-epic-service-index") || "0"), 10) || 0,
      };
    });
    list.sort(function (a, b) {
      return a.idx - b.idx;
    });
    return list.map(function (x) {
      return x.el;
    });
  }

  /**
   * Webflow often puts `data-epic="service-fade-block"` or `.service-container` on a *header* strip, while
   * `[data-epic-service-index]` cards sit in a sibling (e.g. 0/6 in debug-9fb82f H10) — we then fade the
   * wrong node and the handoff never reads. Prefer the query only if it actually wraps all cards; else
   * the innermost common ancestor of the card nodes (bounded by #story).
   */
  function resolveServiceFadeBlockForEpic(storyRoot, fromQuery, cardEls) {
    if (!cardEls || !cardEls.length) {
      return fromQuery || null;
    }
    var c0 = cardEls[0];
    if (!c0) {
      return fromQuery || null;
    }
    if (fromQuery) {
      var jq;
      var fromOk = true;
      for (jq = 0; jq < cardEls.length; jq += 1) {
        try {
          if (!fromQuery.contains(cardEls[jq])) {
            fromOk = false;
            break;
          }
        } catch (eC) {
          fromOk = false;
          break;
        }
      }
      if (fromOk) {
        return fromQuery;
      }
    }
    var a;
    for (a = c0.parentElement; a; a = a.parentElement) {
      if (a === document.documentElement) {
        break;
      }
      if (storyRoot) {
        try {
          if (!storyRoot.contains(a) && a !== storyRoot) {
            break;
          }
        } catch (eB) {
          break;
        }
      }
      var j;
      var all = true;
      for (j = 0; j < cardEls.length; j += 1) {
        try {
          if (!a.contains(cardEls[j])) {
            all = false;
            break;
          }
        } catch (eA) {
          all = false;
          break;
        }
      }
      if (all) {
        return a;
      }
    }
    return fromQuery || null;
  }

  /** One element for recompute, GSAP, and class hooks — prefer window.__epicMorphDot (set in body-intro.js) once SplitText has created the dot. */
  function getEpicHandoffMorphDot() {
    try {
      var w = window.__epicMorphDot;
      if (w && typeof w.isConnected === "boolean" && w.isConnected) {
        return w;
      }
    } catch (e) {}
    try {
      return document.querySelector(".value-prop-morph-dot");
    } catch (e2) {
      return null;
    }
  }

  function ensureStoryStyles() {
    var id = "epic-story-anim-styles";
    if (document.getElementById(id)) {
      return;
    }
    var s = document.createElement("style");
    s.id = id;
    s.textContent = [
      "/* Story pin: prevent transparent top band (same as body intro pin) when trigger translates. */",
      "div.pin-spacer[class*=\"epic-story-scrub\"],",
      "div[class*=\"pin-spacer-epic-story-scrub\"] {",
      "  background: #0f33ff !important;",
      "}",
      "section#story,",
      "#story.story {",
      "  background-color: #0f33ff !important;",
      "}",
      "[data-epic=\"story-pin\"] {",
      "  position: relative !important;",
      "  z-index: 0;",
      "  overflow: visible !important;",
      "}",
      "[data-epic=\"connector-root\"] {",
      "  position: absolute !important;",
      "  left: 0; top: 0; right: 0; bottom: 0;",
      "  width: 100%;",
      "  height: 100%;",
      "  pointer-events: none;",
      "  z-index: 1;",
      "  overflow: visible !important;",
      "}",
      "[data-epic=\"connector-root\"] svg {",
      "  position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: visible !important;",
      "}",
      "[data-epic=\"story-pin\"] .service-statement {",
      "  position: relative; z-index: 5;",
      "}",
      "[data-epic=\"story-pin\"] .service-cards_container,",
      "[data-epic=\"story-pin\"] .service-cards {",
      "  position: relative; z-index: 3;",
      "  overflow: visible !important;",
      "}",
      "#story [data-epic=\"story-pin\"] .service-card_top-line,",
      "section#story[data-epic=\"story-pin\"] .service-card_top-line {",
      "  display: none !important;",
      "}",
      ".value-prop-morph-dot.epic-below-service-statement {",
      "  z-index: 2 !important;",
      "}",
      ".epic-service-node-proxy {",
      "  box-sizing: border-box;",
      "  position: absolute !important;",
      "  z-index: 20 !important;",
      "}",
      "#story [data-epic-service-index], [data-epic=\"story-pin\"] [data-epic-service-index] {",
      "  isolation: isolate;",
      "}",
    ].join("\n");
    document.head.appendChild(s);
  }

  function buildConnectorPathD(trunkX, yStart, yBus, minX, maxX, cardCenters, cardTops) {
    var n = cardCenters.length;
    if (n < 1) {
      return "";
    }
    var parts = [];
    parts.push("M", trunkX, yStart, "L", trunkX, yBus, "L", minX, yBus, "L", maxX, yBus);
    for (var j = 0; j < n; j++) {
      parts.push("M", cardCenters[j], yBus, "L", cardCenters[j], cardTops[j]);
    }
    return parts.join(" ");
  }

  function init() {
    var story = q(STORY_SEL);
    if (!story) {
      if (isEpicStoryDebug()) {
        epicStoryLog("init", { story: "missing", sel: STORY_SEL });
      }
      return;
    }
    if (story.getAttribute("data-epic-story-anim") === "1") {
      return;
    }
    story.setAttribute("data-epic-story-anim", "1");

    /** [data-epic="story-pin"] may be on the section#story; querySelector does not match the root element. */
    var storyPin = null;
    if (story && typeof story.matches === "function" && story.matches("[data-epic=\"story-pin\"]")) {
      storyPin = story;
    } else {
      storyPin = q("[data-epic=\"story-pin\"]", story);
    }
    var connectorRoot = q("[data-epic=\"connector-root\"]", story);
    var aboutBlock = q("[data-epic=\"about-block\"]", story);
    var serviceStatement = q(".service-statement", storyPin) || q(".service-statement", story);
    /** Add `data-epic="service-fade-block"` in Webflow, or we fall back to `.service-container` for 0→1 on scroll. */
    var serviceFadeBlock =
      q("[data-epic=\"service-fade-block\"]", storyPin) ||
      q("[data-epic=\"service-fade-block\"]", story) ||
      q(".service-container", storyPin) ||
      q(".service-container", story) ||
      null;
    if (!storyPin || !connectorRoot) {
      if (isEpicStoryDebug()) {
        epicStoryLog("init abort", { storyPin: !!storyPin, connectorRoot: !!connectorRoot });
      }
      return;
    }
    var cards = getSortedServiceCards(story);
    if (cards.length < 1) {
      if (isEpicStoryDebug()) {
        epicStoryLog("init abort", { reason: "no [data-epic-service-index] cards" });
      }
      return;
    }
    serviceFadeBlock = resolveServiceFadeBlockForEpic(story, serviceFadeBlock, cards);
    if (isEpicStoryDebug()) {
      try {
        epicStoryLog("service fade target", {
          nCards: cards.length,
          wrapInFade: (function () {
            if (!serviceFadeBlock) {
              return null;
            }
            var wx;
            for (wx = 0; wx < cards.length; wx += 1) {
              if (!serviceFadeBlock.contains(cards[wx])) {
                return false;
              }
            }
            return true;
          })(),
        });
      } catch (eR2) {}
    }

    ensureStoryStyles();

    if (REDUCED_MOTION) {
      if (isEpicStoryDebug()) {
        epicStoryLog("init reduced motion — story static", { nCards: cards ? cards.length : 0 });
      }
      var mRm = getEpicHandoffMorphDot();
      if (mRm) {
        gsap.set(mRm, { autoAlpha: 0, pointerEvents: "none" });
      }
      if (serviceFadeBlock) {
        gsap.set(serviceFadeBlock, { autoAlpha: 1 });
      } else if (serviceStatement) {
        gsap.set(serviceStatement, { autoAlpha: 1 });
      }
      if (serviceStatement) {
        try {
          gsap.set(serviceStatement, { autoAlpha: 1, visibility: "visible" });
        } catch (eRms) {}
      }
      gsap.set(cards, { autoAlpha: 1 });
      if (aboutBlock) {
        gsap.set(aboutBlock, { autoAlpha: 1 });
      }
      return;
    }

    if (isEpicStoryDebug()) {
      try {
        epicStoryLog("init", {
          nCards: cards.length,
          storyPin: storyPin && storyPin.tagName,
          morphNow: br(getEpicHandoffMorphDot()),
        });
      } catch (eI0) {}
    }

    var nCards = cards.length;
    var proxies = [];
    var pidx;
    for (pidx = 0; pidx < nCards; pidx++) {
      var pd = document.createElement("div");
      pd.className = "epic-service-node-proxy";
      pd.setAttribute("aria-hidden", "true");
      storyPin.appendChild(pd);
      proxies.push(pd);
      gsap.set(pd, {
        position: "absolute",
        left: 0,
        top: 0,
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        zIndex: 4,
        autoAlpha: 0,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.04)",
        pointerEvents: "none",
        force3D: true,
      });
    }

    try {
      gsap.set(cards, { autoAlpha: 0, position: "relative" });
    } catch (eCs0) {
      try {
        gsap.set(cards, { autoAlpha: 0 });
      } catch (eCs1) {}
    }
    if (serviceFadeBlock) {
      try {
        gsap.set(serviceFadeBlock, { autoAlpha: 0 });
      } catch (eF0) {}
    } else if (serviceStatement) {
      gsap.set(serviceStatement, { autoAlpha: 0 });
    }
    if (serviceStatement && serviceFadeBlock) {
      try {
        if (!serviceFadeBlock.contains(serviceStatement)) {
          /** Webflow: cards live in a resolved LCA, statement is often a *sibling* (H10 stmtInFade: false) — otherwise copy stays on during 0..tNodeSplit and “pops” again with the row = double show. */
          gsap.set(serviceStatement, { autoAlpha: 0, visibility: "hidden" });
        }
      } catch (eSib) {}
    }
    if (aboutBlock) {
      gsap.set(aboutBlock, { autoAlpha: 0 });
    }

    var pathEl = null;
    var svgEl = null;
    var lastPathLen = 0;
    var cachedLayout = null;
    var _epicDegenPathRetries = 0;
    var _epicLayoutPass = 0;

    /**
     * BCR for viewport ↔ pin-local (proxies: absolute in storyPin). Never use a “full viewport at (0,0)”
     * for pr: the pin is often inset; that mis-anchors the fixed intro dot vs. left/top. If the pin
     * box is degenerate, fall back to #story, then keep pin (or story) position and expand a minimal span.
     */
    function resolveStoryPinBox() {
      var pin0;
      try {
        pin0 = storyPin.getBoundingClientRect();
      } catch (e) {
        pin0 = { left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0, x: 0, y: 0 };
      }
      if (pin0 && pin0.width >= 2 && pin0.height >= 2) {
        return { rect: pin0, source: "storyPin" };
      }
      var s0 = null;
      try {
        s0 = story.getBoundingClientRect();
      } catch (e) {
        s0 = null;
      }
      if (s0 && s0.width >= 2 && s0.height >= 2) {
        return { rect: s0, source: "story" };
      }
      var pl = pin0 && isFinite(pin0.left) ? pin0.left : s0 && isFinite(s0.left) ? s0.left : 0;
      var pt = pin0 && isFinite(pin0.top) ? pin0.top : s0 && isFinite(s0.top) ? s0.top : 0;
      var w = 0;
      if (pin0 && isFinite(pin0.width) && pin0.width > 0) {
        w = pin0.width;
      } else if (s0 && isFinite(s0.width) && s0.width > 0) {
        w = s0.width;
      } else {
        w = 80;
      }
      var h = 0;
      if (pin0 && isFinite(pin0.height) && pin0.height > 0) {
        h = pin0.height;
      } else if (s0 && isFinite(s0.height) && s0.height > 0) {
        h = s0.height;
      } else {
        h = 80;
      }
      w = Math.max(80, w);
      h = Math.max(80, h);
      var vwi = (typeof window !== "undefined" && window.innerWidth) || 1200;
      var vhi = (typeof window !== "undefined" && window.innerHeight) || 800;
      w = Math.min(w, Math.max(1, vwi - pl + 0.1));
      h = Math.min(h, Math.max(1, vhi - pt + 0.1));
      var r = { left: pl, top: pt, width: w, height: h, right: pl + w, bottom: pt + h, x: pl, y: pt };
      return { rect: r, source: "pinOrStoryExpanded" };
    }

    function measureAndCache() {
      _epicLayoutPass += 1;
      var rpb0 = resolveStoryPinBox();
      var pr = rpb0.rect;
      var out = { pin: pr, rects: [], borderRadii: [] };
      var j;
      for (j = 0; j < nCards; j++) {
        var r = cards[j].getBoundingClientRect();
        var cs = window.getComputedStyle(cards[j]);
        out.rects.push({
          relL: r.left - pr.left,
          relT: r.top - pr.top,
          width: r.width,
          height: r.height,
        });
        out.borderRadii.push(cs.borderRadius || "12px");
        if (r.width < 1 || r.height < 1) {
          if (isEpicStoryDebug()) {
            try {
              epicStoryLog("measure card tiny box — will retry", {
                j: j,
                w: r.width,
                h: r.height,
                pass: _epicLayoutPass,
                pinBoxSource: rpb0 && rpb0.source,
              });
            } catch (eM0) {}
          }
        }
      }
      {
        var mM = getEpicHandoffMorphDot();
        if (mM) {
          try {
            var mr = mM.getBoundingClientRect();
            if (mr && mr.width > 1 && mr.height > 1) {
              out.morphRel = { l: mr.left - pr.left, t: mr.top - pr.top, w: mr.width, h: mr.height };
            }
          } catch (eMr) {}
        }
      }
      if (serviceStatement) {
        var sb = serviceStatement.getBoundingClientRect();
        out.stmtBottom = sb.bottom;
      } else {
        out.stmtBottom = pr.top + pr.height * 0.2;
      }
      cachedLayout = out;
      return out;
    }

    function buildPathFromLayout(layout) {
      if (!layout) {
        return 0;
      }
      var pr = layout.pin;
      var w = pr.width;
      var h = pr.height;
      if (w < 2) {
        return 0;
      }
      if (!pathEl) {
        svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svgEl.setAttribute("viewBox", "0 0 " + Math.max(1, Math.round(w)) + " " + Math.max(1, Math.round(h)));
        svgEl.setAttribute("preserveAspectRatio", "xMidYMin meet");
        pathEl.setAttribute("fill", "none");
        pathEl.setAttribute("stroke", "#fde021");
        pathEl.setAttribute("stroke-width", "4");
        pathEl.setAttribute("stroke-linecap", "round");
        pathEl.setAttribute("stroke-linejoin", "round");
        svgEl.appendChild(pathEl);
        connectorRoot.appendChild(svgEl);
      } else {
        svgEl.setAttribute("viewBox", "0 0 " + Math.max(1, Math.round(w)) + " " + Math.max(1, Math.round(h)));
      }
      var cxs = [];
      var ytops = [];
      var j;
      for (j = 0; j < nCards; j++) {
        var rr = layout.rects[j];
        cxs.push(rr.relL + rr.width / 2);
        ytops.push(rr.relT);
      }
      var minX = cxs[0];
      var maxX = cxs[0];
      for (j = 1; j < nCards; j++) {
        minX = Math.min(minX, cxs[j]);
        maxX = Math.max(maxX, cxs[j]);
      }
      var yBus = ytops[0] - 32;
      for (j = 1; j < nCards; j++) {
        yBus = Math.min(yBus, ytops[j] - 32);
      }
      if (yBus < 0) {
        yBus = 0;
      }
      var yStart = Math.max(0.1 * h, (layout.stmtBottom - pr.top) * 0.35);
      yStart = Math.min(yStart, h * 0.5);
      var tx = w / 2;
      var xSpread = maxX - minX;
      /**
       * Single-column layout has minX===maxX: horizontal “bus” length 0, looks like a straight line.
       * On wide viewports, six cards in a row should not collapse to one X — that’s a first-paint
       * flex/measurement race; remeasure 1–2 frames. Narrow/mobile single-column: still draw line.
       */
      if (nCards > 1 && xSpread < 0.5 && w > 520 && _epicDegenPathRetries < 3) {
        _epicDegenPathRetries += 1;
        if (isEpicStoryDebug()) {
          // #region agent log
          try {
            fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
              method: "POST",
              headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
              body: JSON.stringify({
                sessionId: "9fb82f",
                runId: "degen-path",
                hypothesisId: "H4",
                location: "story-anim.js:buildPathFromLayout",
                message: "wide row collapsed X — remeasure (deferred path)",
                data: {
                  xSpread: xSpread,
                  cxs0: cxs[0],
                  cxsLast: cxs[nCards - 1],
                  pass: _epicLayoutPass,
                  w: w,
                  retry: _epicDegenPathRetries,
                },
                timestamp: Date.now(),
              }),
            }).catch(function () {});
          } catch (eD0) {}
          // #endregion
        }
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            refreshLayout();
            epicStoryRefreshEpicPinsOnly("buildPath:degenRow");
          });
        });
        lastPathLen = 0;
        return 0;
      }
      if (nCards > 1 && xSpread > 0.5) {
        _epicDegenPathRetries = 0;
      }
      var d = buildConnectorPathD(tx, yStart, yBus, minX, maxX, cxs, ytops);
      pathEl.setAttribute("d", d);
      var len = 0;
      try {
        len = pathEl.getTotalLength();
      } catch (e1) {
        len = 0;
      }
      if (isEpicStoryDebug() && isEpicStoryDebugVerbose()) {
        try {
          var dAttr = pathEl.getAttribute("d");
          epicStoryLog("SVG path d", { len: len, d: dAttr ? dAttr.slice(0, 160) : "" });
        } catch (ePd) {}
      }
      lastPathLen = len;
      if (len > 0) {
        gsap.set(pathEl, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
      }
      return len;
    }

    var _epicProxyMorphL = 0;
    var _epicProxyMorphT0 = 0;
    var _epicProxyMorphT1 = 0;
    var cardFromX = [];
    var cardFromY = [];
    var _storyMorphRisePx = 0;

    /**
     * Proxy handoff **start** (L/T1): same **screen** point as body-intro (`50vw` / `50vh` viewport center).
     * Pin-local: `vhi/2 - pr.top - 7` (and `plRef` from card0 + `relL` when available). Logs showed
     * `rawT` large **negative** while `prTopMinusPtRef:0` — pin top can sit **below** viewport center; old
     * `Math.max(rawT,4)` forced `T1:4` (H9). Allow negative `top`/`left` within wide bounds; pin CSS
     * `overflow:visible`.
     */
    function recomputeNodeOriginsFromViewport(morphRisePx) {
      var mrp = Math.min(120, Math.round(0.12 * window.innerHeight));
      if (mrp < 24) {
        mrp = 24;
      }
      if (typeof morphRisePx === "number" && isFinite(morphRisePx)) {
        if (morphRisePx > 0) {
          mrp = morphRisePx;
        } else if (morphRisePx === 0) {
          mrp = 0;
        }
      }
      _epicProxyMorphL = 0;
      _epicProxyMorphT0 = 0;
      _epicProxyMorphT1 = 0;
      cardFromX = [];
      cardFromY = [];
      var j;
      var rpbP = resolveStoryPinBox();
      var pr = rpbP.rect;
      var prSource = rpbP.source;
      var rowACxP = 0;
      var rowACyP = 0;
      var nOkRow = 0;
      if (isEpicStoryDebug()) {
        // #region agent log
        try {
          fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
            body: JSON.stringify({
              sessionId: "9fb82f",
              runId: "morph-anch",
              hypothesisId: "H7",
              location: "story-anim.js:recomputeNodeOrigins:pinRect",
              message: "pin/section rect for proxy L-T",
              data: {
                prSource: prSource,
                w: Math.round(pr.width * 10) / 10,
                h: Math.round(pr.height * 10) / 10,
                l: Math.round(pr.left * 10) / 10,
                t: Math.round(pr.top * 10) / 10,
              },
              timestamp: Date.now(),
            }),
          }).catch(function () {});
        } catch (eH7) {}
        // #endregion
      }
      /** Never gsap.set morph visibility here: `refreshLayout` runs on ST refresh, resize, rAF, and
       *  nodeSplit — forcing autoAlpha:1 each time **overwrites the story timeline** (fade at nodeSplit)
       *  and fights proxy handoff; log bursts (H7) were this path re-running every pass. */
      var morphDot = getEpicHandoffMorphDot();
      if (cachedLayout && cachedLayout.rects && nCards) {
        rowACxP = 0;
        rowACyP = 0;
        nOkRow = 0;
        for (j = 0; j < nCards && j < cachedLayout.rects.length; j++) {
          var rr0 = cachedLayout.rects[j];
          if (rr0 && (rr0.width > 0.5 || rr0.height > 0.5)) {
            rowACxP += rr0.relL + rr0.width / 2;
            rowACyP += rr0.relT + rr0.height / 2;
            nOkRow += 1;
          }
        }
        if (nOkRow) {
          rowACxP /= nOkRow;
          rowACyP /= nOkRow;
        }
      }
      var pw = pr.width > 8 ? pr.width : 800;
      var ph = pr.height > 8 ? pr.height : 600;
      var vwi = typeof window !== "undefined" ? window.innerWidth : 1200;
      var vhi = typeof window !== "undefined" ? window.innerHeight : 800;
      var plRef = pr.left;
      var ptRef = pr.top;
      if (cachedLayout && cachedLayout.rects[0] && cards[0]) {
        try {
          var c0bInf = cards[0].getBoundingClientRect();
          var r0Inf = cachedLayout.rects[0];
          if (c0bInf && r0Inf && c0bInf.width > 0.5) {
            plRef = c0bInf.left - r0Inf.relL;
            ptRef = c0bInf.top - r0Inf.relT;
          }
        } catch (eInf) {}
      }
      var originSource = "intro50vw_inferPin";
      var rawL = vwi / 2 - plRef - 7;
      var rawT = vhi / 2 - ptRef - 7;
      if (!(cachedLayout && cachedLayout.rects[0] && cards[0])) {
        originSource = "intro50vw_prBox";
        rawL = vwi / 2 - pr.left - 7;
        rawT = vhi / 2 - pr.top - 7;
      }
      /**
       * Viewport center → pin-local can be **negative** (pin’s BCR `top` is often *below* `vhi/2` while
       * the blue block + cards are visible). Clamping to `[4, ph-18]` forced `T1: 4` (H9: rawT≈-1900,
       * `prTopMinusPtRef:0`) — proxies stacked at the pin top, not at the intro circle.
       * Keep wide soft bounds only to avoid non-finite blowups.
       */
      var pad = 24;
      var loL = -Math.max(vwi, pw) - pad;
      var hiL = Math.max(pw, vwi) + pad;
      var loT = -Math.max(vhi, ph) - pad;
      var hiT = Math.max(ph, vhi) + pad;
      _epicProxyMorphL = Math.min(Math.max(rawL, loL), hiL);
      _epicProxyMorphT1 = Math.min(Math.max(rawT, loT), hiT);
      var handCxV = vwi / 2;
      var handCyV = vhi / 2;
      for (j = 0; j < nCards; j++) {
        var cB2;
        try {
          cB2 = cards[j] ? cards[j].getBoundingClientRect() : null;
        } catch (eC2) {
          cB2 = null;
        }
        if (!cB2 || cB2.width < 0.5) {
          cardFromX.push(0);
          cardFromY.push(0);
          continue;
        }
        var ccxV2 = cB2.left + cB2.width / 2;
        var ccyV2 = cB2.top + cB2.height / 2;
        cardFromX.push(handCxV - ccxV2);
        cardFromY.push(handCyV - ccyV2);
      }
      if (isEpicStoryDebug()) {
        // #region agent log
        try {
          fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
            body: JSON.stringify({
              sessionId: "9fb82f",
              runId: "row-anch",
              hypothesisId: "H9",
              location: "story-anim.js:recompute:anchor",
              message: "proxy L/T1 source",
              data: {
                anchor: "morph",
                originSource: originSource,
                rawL: Math.round(rawL * 10) / 10,
                rawT: Math.round(rawT * 10) / 10,
                prTopMinusPtRef: Math.round((pr.top - ptRef) * 10) / 10,
                rowCy: nOkRow ? Math.round(rowACyP * 10) / 10 : null,
                T1: _epicProxyMorphT1,
                L: _epicProxyMorphL,
                tClampedTo4: _epicProxyMorphT1 === 4 && Math.abs(rawT - 4) > 1,
              },
              timestamp: Date.now(),
            }),
          }).catch(function () {});
        } catch (eH9) {}
        // #endregion
      }
      if (isEpicStoryDebug() && isEpicStoryDebugVerbose()) {
        try {
          var mD = morphDot;
          var brM = mD ? br(mD) : null;
          epicStoryLog("recomputeNodeOrigins", {
            morphRiseUsed: mrp,
            proxyT1: { L: _epicProxyMorphL, T: _epicProxyMorphT1 },
            morph: brM,
            card0From: nCards
              ? { x: cardFromX[0], y: cardFromY[0] }
              : null,
            pin: br(storyPin),
          });
        } catch (eRq) {}
      }
    }

    function refreshLayout() {
      measureAndCache();
      if (cachedLayout) {
        buildPathFromLayout(cachedLayout);
      }
      recomputeNodeOriginsFromViewport(_storyMorphRisePx);
    }

    var storyTlInstance = null;
    var storyLayoutTries = 0;
    var morphWaitTries = 0;
    var onStoryStRefreshBound = false;

    /** Fixed viewport center, same as intro merge; avoids first-scrub “jump” vs pin-relative re-measure. */
    function snapHandoffMorphToIntroViewportCenter() {
      var m = getEpicHandoffMorphDot();
      if (!m) {
        return;
      }
      try {
        m.classList.add("value-prop-morph-dot--viewport");
        if (m.parentNode && m.parentNode !== document.body) {
          try {
            document.body.appendChild(m);
          } catch (eA) {}
        }
        try {
          window.__epicMorphDot = m;
        } catch (eW) {}
        gsap.set(m, {
          position: "fixed",
          left: "50vw",
          top: "50vh",
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          zIndex: 30,
          transformOrigin: "50% 50%",
        });
      } catch (eSnap) {}
    }

    function storyScrubEndPx() {
      return Math.max(Math.round(window.innerHeight * EPIC_STORY_SCRUB_SCROLL_VH), 1);
    }

    /**
     * Only refresh epic pins (`epic-body-intro-pin`, `epic-story-scrub`) — avoids a global
     * `ScrollTrigger.refresh()` that re-runs Webflow-inserted STs and fights pin-spacer math.
     * Global refresh from elsewhere is wrapped at bootstrap (H15 if we restore scroll).
     */
    function epicStoryRefreshEpicPinsOnly(reason) {
      var y0 = typeof window !== "undefined" ? window.scrollY : 0;
      var sh0 =
        typeof document !== "undefined" && document.documentElement
          ? document.documentElement.scrollHeight
          : 0;
      var epicIds = ["epic-body-intro-pin", "epic-story-scrub"];
      var ei;
      for (ei = 0; ei < epicIds.length; ei++) {
        var stE = ScrollTrigger.getById(epicIds[ei]);
        if (stE && typeof stE.refresh === "function") {
          try {
            stE.refresh();
          } catch (eRfSt) {}
        }
      }
      if (!isEpicStoryDebug()) {
        return;
      }
      requestAnimationFrame(function () {
        try {
          var y1 = typeof window !== "undefined" ? window.scrollY : 0;
          var sh1 =
            typeof document !== "undefined" && document.documentElement
              ? document.documentElement.scrollHeight
              : 0;
          // #region agent log
          fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
            body: JSON.stringify({
              sessionId: "9fb82f",
              runId: "scroll-jump",
              hypothesisId: "H12",
              location: "story-anim.js:epicStoryRefreshEpicPinsOnly",
              message: String(reason || "epicPinsRefresh"),
              data: {
                reason: String(reason || ""),
                y0: Math.round(y0 * 10) / 10,
                y1: Math.round(y1 * 10) / 10,
                dy: Math.round((y1 - y0) * 10) / 10,
                sh0: Math.round(sh0 * 10) / 10,
                sh1: Math.round(sh1 * 10) / 10,
                dsh: Math.round((sh1 - sh0) * 10) / 10,
              },
              timestamp: Date.now(),
            }),
          }).catch(function () {});
          // #endregion
        } catch (eLg) {}
      });
    }

    function onStoryStRefreshRetry() {
      if (storyTlInstance) {
        return;
      }
      if (!onStoryStRefreshBound) {
        return;
      }
      storyLayoutTries = 0;
      refreshLayout();
      if (cachedLayout) {
        onStoryStRefreshBound = false;
        morphWaitTries = 0;
        try {
          ScrollTrigger.removeEventListener("refresh", onStoryStRefreshRetry);
        } catch (eR3) {}
        startStoryTimeline();
        return;
      }
      onStoryStRefreshBound = false;
      try {
        ScrollTrigger.removeEventListener("refresh", onStoryStRefreshRetry);
      } catch (eR4) {}
      if (window.console) {
        console.warn(
          "[epic-story] Could not measure the story pin; check #story, [data-epic=\"story-pin\"], and service cards. Story scrub not started."
        );
      }
    }

    function startStoryTimeline() {
      if (storyTlInstance) {
        return;
      }
      refreshLayout();
      if (!cachedLayout) {
        storyLayoutTries += 1;
        if (storyLayoutTries < 32) {
          if (storyLayoutTries === 1) {
            epicStoryRefreshEpicPinsOnly("startStoryTimeline:retryLayout");
          }
          requestAnimationFrame(startStoryTimeline);
        } else {
          onStoryStRefreshBound = true;
          try {
            ScrollTrigger.addEventListener("refresh", onStoryStRefreshRetry);
            epicStoryRefreshEpicPinsOnly("startStoryTimeline:refreshListener");
          } catch (eR1) {}
        }
        return;
      }
      if (!getEpicHandoffMorphDot()) {
        morphWaitTries += 1;
        if (morphWaitTries === 1 && isEpicStoryDebug()) {
          epicStoryLog("morph not ready, waiting (rAF)", { try: 1, max: 64 });
        }
        if (morphWaitTries < 64) {
          if (morphWaitTries % 16 === 0 && isEpicStoryDebug() && isEpicStoryDebugVerbose()) {
            epicStoryLog("morph wait rAF", { try: morphWaitTries, __epicMorphDot: !!window.__epicMorphDot });
          }
          requestAnimationFrame(startStoryTimeline);
          return;
        }
        morphWaitTries = 0;
        if (isEpicStoryDebug()) {
          epicStoryLog("morph still null after 64 rAF — building with fallback recompute", {});
        }
      } else {
        morphWaitTries = 0;
      }
      if (onStoryStRefreshBound) {
        try {
          ScrollTrigger.removeEventListener("refresh", onStoryStRefreshRetry);
        } catch (eR2) {}
        onStoryStRefreshBound = false;
      }
      buildStoryTimeline();
    }

    function buildStoryTimeline() {
      if (storyTlInstance) {
        return;
      }
      // #region agent log
      try {
        var h10d = { runId: "h10-dom" };
        if (serviceFadeBlock) {
          try {
            h10d.fadeGsapOpacity = String(gsap.getProperty(serviceFadeBlock, "opacity"));
          } catch (eH10a) {}
          try {
            h10d.fadeComputed = getComputedStyle(serviceFadeBlock).opacity;
          } catch (eH10b) {}
        }
        if (serviceStatement && serviceFadeBlock) {
          h10d.stmtInFade = serviceFadeBlock.contains(serviceStatement);
        }
        if (serviceFadeBlock && cards && cards.length) {
          var cik = 0;
          for (var h10i = 0; h10i < cards.length; h10i += 1) {
            if (serviceFadeBlock.contains(cards[h10i])) {
              cik += 1;
            }
          }
          h10d.cardsInFade = cik + "/" + cards.length;
        }
        fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
          body: JSON.stringify({
            sessionId: "9fb82f",
            runId: h10d.runId,
            hypothesisId: "H10",
            location: "story-anim.js:buildStoryTimeline:domH10",
            message: "service fade DOM containment",
            data: h10d,
            timestamp: Date.now(),
          }),
        }).catch(function () {});
      } catch (eH10) {}
      // #endregion
      /**
       * Pin scroll distance (px) for `end: +=…`: snapshot at timeline build + update on `resize` only.
       * Recomputing from `innerHeight` on every global refresh (fonts, subpixel vh) can move `end` and
       * nudge scroll when leaving the pin (“jerked back” toward #story).
       */
      var epicStoryPinScrollPx = storyScrubEndPx();
      function pinLen() {
        return epicStoryPinScrollPx;
      }

      /** Story scroll: no upward nudge on the intro handoff dot — it stayed misaligned vs proxies (second “circle”). */
      var morphRisePx = 0;
      _storyMorphRisePx = 0;
      snapHandoffMorphToIntroViewportCenter();
      recomputeNodeOriginsFromViewport(0);

      /** Distribute 0..1 across longer virtual seconds: node/path win more of the scroll; pair with EPIC_STORY_SCRUB_SCROLL_VH. */
      var tMorphRise = 0.55;
      var tNodeSplit = tMorphRise;
      var moveDur = 1.05;
      /** 0 = all proxies move in parallel (horizontal fan from shared start); any &gt;0 reads as stagger / “swirl”. */
      var nodeStg = 0;
      var tMoveEnd = tNodeSplit + moveDur + nodeStg * Math.max(0, nCards - 1);
      /** Start the connector *after* the handoff, not the same frame as nodeSplit (was tNodeSplit+0.04 → “already drawn”). */
      var tPathIn = tNodeSplit + 0.5 * moveDur;
      var pathDur = 0.9;
      /**
       * Crossfade *after* the proxy fromTo completes. Old tCard = tProxyOut-0.08 (≈0.04s *before* tMoveEnd)
       * raised real cards on top of proxies (z3 vs z2) while the white “nodes” were still morphing, so
       * users only saw the real card shells + opacity — no visible proxy→card motion.
       */
      var tProxyOut = tMoveEnd + 0.1;
      /** Real cards: opacity-only, overlapping proxy fade (no x/y; proxies already “landed” on BCRs). */
      var _cardStg = 0.055;
      var cardOpacityDur = 0.4;
      var tCardCross = tMoveEnd + 0.1;
      if (tCardCross < tNodeSplit + 0.02) {
        tCardCross = tNodeSplit + 0.02;
      }
      var tCardIn = tCardCross;
      /** No stagger on real card opacity: stagger + autoAlpha = “ladder” on semi-transparent card shells. */
      var cardCrossfadeStg = 0;
      var _cardsDoneT = tCardCross + cardOpacityDur + cardCrossfadeStg * Math.max(0, nCards - 1);
      var tAboutIn = _cardsDoneT + 0.15;
      var serviceFadeDur = Math.min(1.8, 0.35 + tMoveEnd * 0.38);
      // #region agent log
      try {
        fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
          body: JSON.stringify({
            sessionId: "9fb82f",
            runId: "pre-fix-2",
            hypothesisId: "H3",
            location: "story-anim.js:buildStoryTimeline:beats",
            message: "story beat timings (0-1 = full pin scrub)",
              data: {
              tMorphRise: tMorphRise,
              tMoveEnd: tMoveEnd,
              tPathIn: tPathIn,
              tProxyOut: tProxyOut,
              tCardIn: tCardIn,
              tCardCross: tCardCross,
              _cardsDoneT: _cardsDoneT,
              serviceFadeDur: serviceFadeDur,
              cardOpacityDur: cardOpacityDur,
              cardCrossfadeStg: cardCrossfadeStg,
              serviceScrollFade: !!serviceFadeBlock,
              serviceBlockOnStoryTl: !!serviceFadeBlock,
              serviceBlockAtTNodeSplit: !!serviceFadeBlock,
              tNodeSplit: tNodeSplit,
              /** Which scrub mode (see `EPIC_STORY_SCRUB_SMOOTH`); post-H2 we use `true` for 1:1 scroll. */
              epicScrub: EPIC_STORY_SCRUB_SMOOTH,
              pinEndPx: pinLen(),
            },
            timestamp: Date.now(),
          }),
        }).catch(function () {});
      } catch (eBe) {}
      // #endregion

      var handoffMorphEl = getEpicHandoffMorphDot();
      var _revealScrubbedPast = false;
      var _epicScrubLogBucket = -1;
      if (isEpicStoryDebug()) {
        try {
          epicStoryLog("buildStoryTimeline", {
            handoffMorph: !!handoffMorphEl,
            handoffBcr: br(handoffMorphEl),
            morphRisePx: morphRisePx,
            pinEndPx: pinLen(),
            pathLen: lastPathLen,
            nCards: nCards,
            cardsDoneS: _cardsDoneT,
          });
        } catch (eB) {}
      }
      function applyHandoffRevealCleanup(cleanupReason) {
        if (isEpicStoryDebug()) {
          try {
            epicStoryLog("handoffCleanup", { reason: String(cleanupReason || "") });
          } catch (eL) {}
        }
        var _fi;
        var _nl;
        try {
          _nl = document.querySelectorAll(".value-prop-morph-dot");
          for (_fi = 0; _fi < _nl.length; _fi++) {
            _nl[_fi].classList.remove("epic-below-service-statement");
          }
        } catch (eF) {}
        try {
          gsap.set(cards, { clearProps: "transform" });
        } catch (eF2) {}
      }
      function setMorphDotVisibleForStory(props) {
        var mH = getEpicHandoffMorphDot();
        if (!mH) {
          return;
        }
        try {
          gsap.set(mH, props);
        } catch (e) {}
      }
      /** Layout-first: document order + body-intro pin-spacer; #story should follow intro directly. */
      var tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "epic-story-scrub",
          trigger: storyPin,
          start: EPIC_STORY_PIN_START,
          end: function () {
            return "+=" + pinLen();
          },
          pin: true,
          pinSpacing: true,
          pinReparent: false,
          scrub: EPIC_STORY_SCRUB_SMOOTH,
          anticipatePin: 0,
          /** Run after body-intro pin (default 0) so pin-spacer math stays ordered. */
          refreshPriority: -1,
          invalidateOnRefresh: true,
          onRefresh: function () {
            if (isEpicStoryDebug() && isEpicStoryDebugVerbose()) {
              epicStoryLog("scrollTrigger onRefresh", { storyPin: br(storyPin) });
            }
            refreshLayout();
            if (storyTlInstance) {
              try {
                storyTlInstance.invalidate();
              } catch (eInv) {}
            }
          },
          onEnter: function (self) {
            try {
              window.__epicStoryHandoffActive = true;
            } catch (eS0) {}
            try {
              gsap.set([document.documentElement, document.body], { backgroundColor: "#0f33ff" });
            } catch (eBl) {}
            if (self && self.progress < 0.2) {
              snapHandoffMorphToIntroViewportCenter();
            }
            refreshLayout();
            try {
              tl.invalidate();
            } catch (eInv0) {}
            requestAnimationFrame(function () {
              refreshLayout();
              try {
                tl.invalidate();
              } catch (eInv1) {}
            });
            if (self && self.progress < 0.2) {
              setMorphDotVisibleForStory({
                autoAlpha: 1,
                zIndex: 30,
                visibility: "visible",
                pointerEvents: "none",
              });
            }
            try {
              var mA = getEpicHandoffMorphDot();
              if (mA) {
                mA.classList.add("epic-below-service-statement");
              }
            } catch (e0) {}
            if (isEpicStoryDebug()) {
              try {
                epicStoryLog("onEnter", {
                  stProgress: self && self.progress,
                  y: window.scrollY,
                  morph: br(getEpicHandoffMorphDot()),
                });
              } catch (eEn) {}
            }
          },
          onEnterBack: function (self) {
            try {
              window.__epicStoryHandoffActive = true;
            } catch (eS1) {}
            if (self && self.progress < 0.2) {
              snapHandoffMorphToIntroViewportCenter();
            }
            refreshLayout();
            try {
              tl.invalidate();
            } catch (eInv0b) {}
            requestAnimationFrame(function () {
              refreshLayout();
              try {
                tl.invalidate();
              } catch (eInv1b) {}
            });
            if (self && self.progress < 0.2) {
              setMorphDotVisibleForStory({
                autoAlpha: 1,
                zIndex: 30,
                visibility: "visible",
                pointerEvents: "none",
              });
            }
            try {
              var mAb = getEpicHandoffMorphDot();
              if (mAb) {
                mAb.classList.add("epic-below-service-statement");
              }
            } catch (e0b) {}
            if (isEpicStoryDebug()) {
              try {
                epicStoryLog("onEnterBack", {
                  stProgress: self && self.progress,
                  y: window.scrollY,
                  morph: br(getEpicHandoffMorphDot()),
                });
              } catch (eE2) {}
            }
          },
          onLeaveBack: function () {
            var _yLb = typeof window !== "undefined" ? window.scrollY : 0;
            try {
              window.__epicStoryHandoffActive = false;
            } catch (eS2) {}
            try {
              gsap.set([document.documentElement, document.body], { backgroundColor: "#fbfbfb" });
            } catch (eBg) {}
            if (isEpicStoryDebug()) {
              try {
                epicStoryLog("onLeaveBack", { y: window.scrollY });
              } catch (eLb) {}
              // #region agent log
              try {
                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
                  body: JSON.stringify({
                    sessionId: "9fb82f",
                    runId: "pin-leave",
                    hypothesisId: "H13",
                    location: "story-anim.js:ST.onLeaveBack",
                    message: "leave back (toward intro)",
                    data: { y: Math.round(_yLb * 10) / 10 },
                    timestamp: Date.now(),
                  }),
                }).catch(function () {});
              } catch (eH13a) {}
              // #endregion
            }
            applyHandoffRevealCleanup("onLeaveBack");
          },
          onLeave: function (self) {
            var pro = 1;
            try {
              pro =
                self && typeof self.progress === "number" && isFinite(self.progress)
                  ? self.progress
                  : 1;
            } catch (ePr) {
              pro = 1;
            }
            var _yLv = typeof window !== "undefined" ? window.scrollY : 0;
            var _stE = self && typeof self.end === "number" ? self.end : null;
            var _stS = self && typeof self.start === "number" ? self.start : null;
            if (pro < 0.85) {
              if (isEpicStoryDebug()) {
                // #region agent log
                try {
                  fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
                    body: JSON.stringify({
                      sessionId: "9fb82f",
                      runId: "pin-leave",
                      hypothesisId: "H14",
                      location: "story-anim.js:ST.onLeave",
                      message: "onLeave early exit pro<0.85",
                      data: {
                        pro: Math.round(pro * 1e3) / 1e3,
                        y: Math.round(_yLv * 10) / 10,
                        stStart: _stS,
                        stEnd: _stE,
                      },
                      timestamp: Date.now(),
                    }),
                  }).catch(function () {});
                } catch (eH14) {}
                // #endregion
              }
              return;
            }
            try {
              window.__epicStoryHandoffActive = false;
            } catch (eH0) {}
            setMorphDotVisibleForStory({
              autoAlpha: 0,
              pointerEvents: "none",
              visibility: "hidden",
            });
            try {
              gsap.set([document.documentElement, document.body], { backgroundColor: "#fbfbfb" });
            } catch (eBgl) {}
            if (isEpicStoryDebug()) {
              try {
                epicStoryLog("onLeave", { stProgress: pro, y: window.scrollY });
              } catch (eLv) {}
              // #region agent log
              try {
                fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
                  body: JSON.stringify({
                    sessionId: "9fb82f",
                    runId: "pin-leave",
                    hypothesisId: "H13",
                    location: "story-anim.js:ST.onLeave",
                    message: "leave forward (past story pin)",
                    data: {
                      pro: Math.round(pro * 1e3) / 1e3,
                      y: Math.round(_yLv * 10) / 10,
                      stStart: _stS,
                      stEnd: _stE,
                    },
                    timestamp: Date.now(),
                  }),
                }).catch(function () {});
              } catch (eH13b) {}
              requestAnimationFrame(function () {
                try {
                  var y1 = typeof window !== "undefined" ? window.scrollY : 0;
                  if (Math.abs(y1 - _yLv) > 3) {
                    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
                      body: JSON.stringify({
                        sessionId: "9fb82f",
                        runId: "pin-leave",
                        hypothesisId: "H13",
                        location: "story-anim.js:ST.onLeave+1rAF",
                        message: "scroll delta after onLeave",
                        data: {
                          y0: Math.round(_yLv * 10) / 10,
                          y1: Math.round(y1 * 10) / 10,
                          dy: Math.round((y1 - _yLv) * 10) / 10,
                        },
                        timestamp: Date.now(),
                      }),
                    }).catch(function () {});
                  }
                } catch (eH13c) {}
              });
              // #endregion
            }
            applyHandoffRevealCleanup("onLeave");
          },
          onUpdate: function (stSelf) {
            if (isEpicStoryDebug() && stSelf) {
              try {
                var bu = Math.floor((stSelf.progress || 0) * 20);
                if (bu !== _epicScrubLogBucket) {
                  _epicScrubLogBucket = bu;
                  var pRound = Math.round((stSelf.progress || 0) * 1000) / 1000;
                  var tlt = Math.round(tl.time() * 1000) / 1000;
                  var tlp = Math.round(tl.progress() * 1000) / 1000;
                  var scrubPayload = {
                    stProgress: pRound,
                    direction: stSelf.direction,
                    v:
                      isEpicStoryDebugVerbose() && typeof stSelf.getVelocity === "function"
                        ? stSelf.getVelocity()
                        : void 0,
                    tlTime: tlt,
                    tlTotalDur: Math.round(tl.totalDuration() * 1000) / 1000,
                    tlProgress: tlp,
                    y: typeof window !== "undefined" && window.scrollY,
                    /** scroll progress vs timeline progress (low = in sync; high = scrub catch-up) */
                    drift: Math.round(Math.abs(pRound - tlp) * 1e3) / 1e3,
                  };
                  epicStoryLog("scrub", scrubPayload);
                  // #region agent log
                  try {
                    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "X-Debug-Session-Id": "9fb82f",
                      },
                      body: JSON.stringify({
                        sessionId: "9fb82f",
                        runId: "post-fix-1",
                        hypothesisId: "H2",
                        location: "story-anim.js:ScrollTrigger.onUpdate",
                        message: "scrub bucket",
                        data: scrubPayload,
                        timestamp: Date.now(),
                      }),
                    }).catch(function () {});
                  } catch (eFetch) {}
                  // #endregion
                }
              } catch (eU0) {}
            }
            var tlin = tl;
            if (!tlin || tlin.labels == null) {
              return;
            }
            var cd = tlin.labels["cardsDone"];
            if (typeof cd !== "number") {
              return;
            }
            if (tlin.time() < cd - 0.0001) {
              _revealScrubbedPast = false;
              return;
            }
            if (_revealScrubbedPast) {
              return;
            }
            _revealScrubbedPast = true;
            applyHandoffRevealCleanup("pastCardsDone");
          },
        },
      });

    if (serviceStatement && !serviceFadeBlock) {
      tl.fromTo(
        serviceStatement,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: serviceFadeDur,
          ease: "power1.out",
        },
        0
      );
    } else if (serviceFadeBlock) {
      /**
       * On the *same* pin `tl` as the morph, but *not* at t=0: a 0.2–0.5s 0→1 on the full wrapper
       * (while proxies were still 0,0,autoAlpha:0 through the initial `tMorphRise` beat) made the *card row / shell* the
       * only visible “growth” in the first half of the story scrub — the proxy fromTo (starts at
       * nodeSplit) was never the star. Reveal the wrapper *with* the handoff at nodeSplit.
       * If `.service-statement` is a sibling of this wrapper, reveal it in the *same* instant (init
       * path above) to avoid a second “SERVICES / paragraph” flash.
       */
      tl.set(
        serviceFadeBlock,
        { autoAlpha: 1, visibility: "visible" },
        tNodeSplit
      );
      if (serviceStatement) {
        try {
          if (!serviceFadeBlock.contains(serviceStatement)) {
            tl.set(
              serviceStatement,
              { autoAlpha: 1, visibility: "visible" },
              tNodeSplit
            );
          }
        } catch (eRev) {}
      }
    }

    /** Handoff dot: visible at y=0 (viewport center via CSS); no `y` tween so it matches proxy start. Scrub beat unchanged. */
    if (handoffMorphEl) {
      tl.set(
        handoffMorphEl,
        {
          autoAlpha: 1,
          y: 0,
          zIndex: 30,
          pointerEvents: "none",
          visibility: "visible",
        },
        0
      );
    }
    var morphIntroHold = {};
    tl.to(morphIntroHold, { duration: tMorphRise }, 0);
    tl.addLabel("nodeSplit", tNodeSplit);
    /**
     * Re-measure and recompute *at* this time so L/T1 and `cachedLayout` match a pinned/resolved pin box.
     * The old `tl.set` with numbers baked in at first build and the `(0,0) → cards` when cache was null
     * were the “nodes from the top / off-screen” bug.
     */
    tl.add(
      function onNodeSplitProxyAnchor() {
        refreshLayout();
        if (isEpicStoryDebug()) {
          // #region agent log
          var a = -2;
          if (handoffMorphEl) {
            try {
              a = parseFloat(gsap.getProperty(handoffMorphEl, "autoAlpha")) || 0;
            } catch (eA) {
              a = -1;
            }
          }
          var clN = !cachedLayout;
          var r0L = -99;
          var r0T = -99;
          if (cachedLayout && cachedLayout.rects && cachedLayout.rects[0]) {
            r0L = Math.round(cachedLayout.rects[0].relL * 10) / 10;
            r0T = Math.round(cachedLayout.rects[0].relT * 10) / 10;
          }
          try {
            fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", {
              method: "POST",
              headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "9fb82f" },
              body: JSON.stringify({
                sessionId: "9fb82f",
                runId: "nodeSplit-handoff",
                hypothesisId: "H8",
                location: "story-anim.js:buildStoryTimeline:nodeSplit",
                message: "after refresh: cache, first card rel, L/T1, morphA",
                data: {
                  cachedLayoutNull: clN,
                  rel0: { l: r0L, t: r0T },
                  L: _epicProxyMorphL,
                  T1: _epicProxyMorphT1,
                  hasMorph: !!handoffMorphEl,
                  morphAutoAlpha: a,
                },
                timestamp: Date.now(),
              }),
            }).catch(function () {});
          } catch (eH8) {}
          // #endregion
        }
        try {
          gsap.set(proxies, {
            autoAlpha: 1,
            left: _epicProxyMorphL,
            top: _epicProxyMorphT1,
            width: 14,
            height: 14,
            borderRadius: "50%",
            zIndex: 200,
          });
        } catch (ePS) {}
      },
      "nodeSplit"
    );
    /** morph (z 30): quick fade so the ghost body circle is gone as the fan starts */
    if (handoffMorphEl) {
      var morphHandoffHideDur = 0.05;
      tl.to(
        handoffMorphEl,
        { autoAlpha: 0, duration: morphHandoffHideDur, ease: "power1.out" },
        "nodeSplit"
      );
      tl.set(
        handoffMorphEl,
        {
          y: 0,
          clearProps: "y",
          pointerEvents: "none",
          visibility: "hidden",
        },
        "nodeSplit+=" + morphHandoffHideDur
      );
    }
    function proxyW(i) {
      if (!cachedLayout || !cachedLayout.rects[i]) {
        return 14;
      }
      return cachedLayout.rects[i].width;
    }
    function proxyH(i) {
      if (!cachedLayout || !cachedLayout.rects[i]) {
        return 14;
      }
      return cachedLayout.rects[i].height;
    }
    function proxyRelL(i) {
      if (!cachedLayout || !cachedLayout.rects[i]) {
        return 0;
      }
      return cachedLayout.rects[i].relL;
    }
    function proxyRelT(i) {
      if (!cachedLayout || !cachedLayout.rects[i]) {
        return 0;
      }
      return cachedLayout.rects[i].relT;
    }
    function proxyR(i) {
      if (!cachedLayout) {
        return "12px";
      }
      return cachedLayout.borderRadii[i] || "12px";
    }
    /**
     * fromTo: a bare `to()` at the same "nodeSplit" as the pre-tween set can pick up
     * the initial 0,0,autoAlpha:0 (build-time) and yield no visible move on scrub.
     * Nudge the tween after the callback; explicit "from" matches the row-circle handoff.
     */
    var nodeSplitTAfter = 0.001;
    tl.fromTo(
      proxies,
      {
        zIndex: 200,
        autoAlpha: 1,
        xPercent: 0,
        yPercent: 0,
        left: function (i) {
          return _epicProxyMorphL;
        },
        top: function (i) {
          return _epicProxyMorphT1;
        },
        width: 14,
        height: 14,
        borderRadius: "50%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        immediateRender: false,
      },
      {
        left: function (i) {
          return proxyRelL(i);
        },
        top: function (i) {
          return proxyRelT(i);
        },
        width: function (i) {
          return proxyW(i);
        },
        height: function (i) {
          return proxyH(i);
        },
        xPercent: 0,
        yPercent: 0,
        borderRadius: function (i) {
          return proxyR(i);
        },
        zIndex: 200,
        boxShadow: "0 4px 22px rgba(0,0,0,0.12)",
        ease: "power1.inOut",
        duration: moveDur,
        stagger: nodeStg,
        immediateRender: false,
      },
      "nodeSplit+=" + nodeSplitTAfter
    );

    if (pathEl && lastPathLen > 0) {
      tl.to(
        pathEl,
        {
          strokeDashoffset: 0,
          duration: pathDur,
          ease: "power1.inOut",
        },
        tPathIn
      );
    }

    tl.to(
      proxies,
      { autoAlpha: 0, duration: 0.14, ease: "power1.out", stagger: 0 },
      tProxyOut
    );
    /**
     * Real cards: opacity crossfade. Keep proxies above card shells (z 200 &gt; 3) so the white
     * “node” shell dissolves to reveal the real card beneath; the old 2/3 here sat cards on top while
     * proxi (still morphing) were under — looked like the DOM cards + opacity, not the proxy handoff.
     */
    tl.set(
      cards,
      { x: 0, y: 0, transformOrigin: "50% 50%", zIndex: 3 },
      Math.max(0, tCardCross - 0.0001)
    );
    tl.set(
      proxies,
      { zIndex: 200 },
      tCardCross
    );
    tl.to(
      cards,
      {
        autoAlpha: 1,
        duration: cardOpacityDur,
        ease: "power1.out",
        stagger: cardCrossfadeStg,
        onStart: function () {
          if (isEpicStoryDebug()) {
            try {
              epicStoryLog("card crossfade onStart", { n: nCards, t: tCardCross });
            } catch (eOs) {}
          }
          try {
            gsap.set(cards, { position: "relative" });
          } catch (eZ) {}
        },
        onComplete: function () {
          applyHandoffRevealCleanup("cardCrossfadeComplete");
        },
      },
      tCardCross
    );
    tl.addLabel("cardsDone", _cardsDoneT);
    if (aboutBlock) {
      tl.fromTo(
        aboutBlock,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        tAboutIn
      );
    }
    (function setMorphGsapZAndHide() {
      var mE = getEpicHandoffMorphDot();
      var tMorphZClear = aboutBlock ? tAboutIn + 0.62 : tCardIn + 0.2;
      var tMorphHide = aboutBlock ? tAboutIn + 0.58 : tCardIn + 0.16;
      if (mE) {
        try {
          tl.set(mE, { clearProps: "zIndex" }, tMorphZClear);
        } catch (e0) {}
        try {
          tl.set(
            mE,
            { autoAlpha: 0, pointerEvents: "none", visibility: "hidden" },
            tMorphHide
          );
        } catch (e1) {}
      }
    })();

    if (window.document && document.fonts) {
      document.fonts.ready.then(function () {
        refreshLayout();
        try {
          if (tl) {
            tl.invalidate();
          }
        } catch (eFon) {}
        /** Skip global `ScrollTrigger.refresh()` here — it often fires after pin release and can yank `scrollY` toward #story. */
      });
    }

    var resizeTick = 0;
    window.addEventListener(
      "resize",
      function () {
        if (resizeTick) {
          clearTimeout(resizeTick);
        }
        resizeTick = setTimeout(function () {
          epicStoryPinScrollPx = storyScrubEndPx();
          refreshLayout();
          try {
            if (storyTlInstance) {
              storyTlInstance.invalidate();
            }
          } catch (eRsz) {}
          epicStoryRefreshEpicPinsOnly("resize");
        }, 100);
      },
      { passive: true }
    );

    requestAnimationFrame(function () {
      refreshLayout();
      try {
        if (tl) {
          tl.invalidate();
        }
      } catch (eRaf) {}
      epicStoryRefreshEpicPinsOnly("buildStoryTimeline:postRaf");
    });

    storyTlInstance = tl;
    /** `serviceFadeBlock` reveal: see `else if (serviceFadeBlock)` on the story `tl` (t=0). */
    if (isEpicStoryDebug()) {
      try {
        var stInst = ScrollTrigger.getById("epic-story-scrub");
        var lbl = tl.labels || {};
        var cpy = {};
        for (var lk in lbl) {
          if (Object.prototype.hasOwnProperty.call(lbl, lk)) {
            cpy[lk] = Math.round(lbl[lk] * 1e3) / 1e3;
          }
        }
        epicStoryLog("timeline + ST ready", {
          totalDuration: Math.round(tl.totalDuration() * 1e3) / 1e3,
          nodeSplitSec: typeof lbl["nodeSplit"] === "number" ? lbl["nodeSplit"] : void 0,
          cardsDoneSec: typeof lbl["cardsDone"] === "number" ? lbl["cardsDone"] : void 0,
          allLabels: cpy,
        });
        if (stInst) {
          (function stDbg() {
            var vs = stInst.vars || {};
            var endVarStr;
            try {
              endVarStr =
                vs.end != null && typeof vs.end === "function"
                  ? vs.end.call(stInst, stInst)
                  : vs.end;
            } catch (eEv) {
              endVarStr = "error";
            }
            var s0 =
              stInst.start != null && typeof stInst.start === "function"
                ? stInst.start()
                : stInst.start;
            var e0 =
              stInst.end != null && typeof stInst.end === "function"
                ? stInst.end()
                : stInst.end;
            /** Numeric start/end are NaN/undefined until after layout; endVar is from vars. */
            epicStoryLog("ScrollTrigger", {
              start: s0,
              end: e0,
              varsStart: vs.start,
              endVar: endVarStr,
              pin: stInst.pin,
            });
            requestAnimationFrame(function () {
              var st2 = ScrollTrigger.getById("epic-story-scrub");
              if (!st2) {
                return;
              }
              epicStoryLog("ScrollTrigger (after rAF)", {
                start: st2.start,
                end: st2.end,
              });
            });
          })();
        } else {
          epicStoryLog("ScrollTrigger", { note: "getById epic-story-scrub not found" });
        }
      } catch (eST) {}
    }
    }
    startStoryTimeline();
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    if (document.fonts) {
      document.fonts.ready.then(function () {
        init();
      });
    } else {
      init();
    }
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (document.fonts) {
        document.fonts.ready.then(function () {
          init();
        });
      } else {
        init();
      }
    });
  }
}
