import {
  EPIC_BLUE_WASH_SCRUB_DURATION,
  EPIC_INTRO_PIN_SCROLL_VH,
  EPIC_INTRO_REENTRY_STAGE_FADE_END,
} from "./epic-constants.js";

export function bootstrapEpicBodyIntro() {
  "use strict";

  if (typeof window.gsap === "undefined") {
    console.warn("[body-intro] gsap not found on window.");
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var SplitText = window.SplitText;

  if (!ScrollTrigger || !SplitText) {
    console.warn("[body-intro] Load ScrollTrigger and SplitText before this script.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);

  var REDUCED_MOTION =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var valuePropResizePatched = false;

  /** Expected: .body-intro > .body-intro__inner > .body-intro__stage > h2.value-prop (epic-gsap). */
  var SELECTORS = {
    bodyIntro: ".body-intro",
    valueProp: "h2.value-prop",
    stage: ".body-intro__stage",
  };

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  /** Set window.__EPIC_DEBUG_VALUE_PROP = true, or ?epicDebug=1, or localStorage epicDebugValueProp=1 */
  function isValuePropDebug() {
    if (typeof window !== "undefined" && window.__EPIC_DEBUG_VALUE_PROP === true) {
      return true;
    }
    try {
      if (window.localStorage && window.localStorage.getItem("epicDebugValueProp") === "1") {
        return true;
      }
    } catch (e) {}
    try {
      var search = window.location && window.location.search;
      if (search && (/\bepicDebug=1\b/.test(search) || /\bepicDebug=valueProp\b/.test(search))) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  function _vpBox(el) {
    if (!el) {
      return null;
    }
    var r = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      class: (el.className && String(el.className).slice(0, 120)) || "",
      w: Math.round(r.width * 100) / 100,
      h: Math.round(r.height * 100) / 100,
    };
  }

  function logValuePropDebug(phase, data) {
    if (!isValuePropDebug()) {
      return;
    }
    var payload = data || {};
    try {
      window.__epicValuePropLastDebug = { phase: phase, at: new Date().toISOString(), data: payload };
    } catch (e) {}
    console.group("[epic body-intro] value-prop debug " + (phase || ""));
    console.log(payload);
    console.log("Read window.__epicValuePropLastDebug for the last snapshot.");
    console.groupEnd();
  }

  function gatherValuePropLayoutForDebug(h2, bodyIntro, split) {
    var inner = bodyIntro ? qs(".body-intro__inner", bodyIntro) : null;
    var stage = bodyIntro ? qs(SELECTORS.stage, bodyIntro) : null;
    var o = {
      viewInnerWidth: typeof window !== "undefined" ? window.innerWidth : 0,
      h2: _vpBox(h2),
      h2TextLen: h2 && h2.textContent ? h2.textContent.length : 0,
      h2ClientScroll: h2 ? { clientWidth: h2.clientWidth, scrollWidth: h2.scrollWidth } : null,
      bodyIntro: _vpBox(bodyIntro),
      inner: _vpBox(inner),
      stage: _vpBox(stage),
    };
    if (h2) {
      var cs = window.getComputedStyle(h2);
      o.h2Computed = {
        display: cs.display,
        whiteSpace: cs.whiteSpace,
        textWrap: cs.textWrap,
        width: cs.width,
        maxWidth: cs.maxWidth,
        minWidth: cs.minWidth,
      };
    }
    if (h2 && h2.parentElement) {
      var pcs = window.getComputedStyle(h2.parentElement);
      o.h2Parent = {
        tag: h2.parentElement.tagName,
        class: (h2.parentElement.className && String(h2.parentElement.className).slice(0, 80)) || "",
        display: pcs.display,
        flexDirection: pcs.flexDirection,
        alignItems: pcs.alignItems,
        w: Math.round(h2.parentElement.getBoundingClientRect().width * 100) / 100,
      };
    }
    if (split) {
      o.splitLines = split.lines ? split.lines.length : 0;
      o.splitWords = split.words ? split.words.length : 0;
      o.splitChars = split.chars ? split.chars.length : 0;
    }
    if (typeof SplitText !== "undefined" && SplitText.version) {
      o.splitTextVersion = SplitText.version;
    }
    o.fontsStatus =
      document.fonts && document.fonts.status
        ? document.fonts.status
        : "unknown";
    return o;
  }

  /** Required for Webflow JS-only: keeps end-of-line cursors on the same row as the text. */
  function injectBodyIntroLayoutStyles() {
    var id = "epic-body-intro-layout-styles";
    var el = document.getElementById(id);
    var css = [
      "/* .body-intro__stage often shrink-wraps to the <h2>’s text; then h2 width:100% is 100% of",
      "   that max-content and SplitText only sees one line. Stretch the stage in the flex chain. */",
      "/* Blue iris + pin-spacer use same blue as .body-intro so the pinned band is not transparent. */",
      "div.pin-spacer[class*=\"epic-body-intro-pin\"],",
      "div[class*=\"pin-spacer-epic-body-intro-pin\"] {",
      "  background: #0f33ff !important;",
      "}",
      ".epic-blue-burst {",
      "  position: fixed !important;",
      "  pointer-events: none !important;",
      "  z-index: 35 !important;",
      "  background: #0f33ff !important;",
      "  border-radius: 50% !important;",
      "  mix-blend-mode: normal !important;",
      "}",
      "/* Iris: absolute child of .body-intro. Do NOT set position:relative !important on .body-intro — it",
      "   overrides ScrollTrigger’s pin (fixed) and breaks pinning. Fixed pin establishes the containing block. */",
      ".body-intro.epic-body-intro--bursting { overflow: hidden !important; }",
      "/* Section iris: wins over page-level `.epic-blue-burst { position: fixed }` in Webflow embed. */",
      "body .body-intro > .epic-blue-burst.epic-blue-burst--section {",
      "  position: absolute !important;",
      "  left: 50% !important;",
      "  top: 50% !important;",
      "  pointer-events: none !important;",
      "  z-index: 28 !important;",
      "  background: #0f33ff !important;",
      "  border-radius: 50% !important;",
      "  mix-blend-mode: normal !important;",
      "}",
      "body .value-prop-morph-dot--viewport,",
      "body .value-prop-morph-dot--viewport.value-prop-morph-dot {",
      "  z-index: 40 !important;",
      "  position: fixed !important;",
      "}",
      ".value-prop-morph-dot {",
      "  box-sizing: border-box !important;",
      "  pointer-events: none !important;",
      "  border-radius: 50% !important;",
      "}",
      ".body-intro__stage { position: relative !important; }",
      "body .body-intro .body-intro__stage, .body-intro__stage {",
      "  display: block !important;",
      "  width: 100% !important;",
      "  min-width: 0 !important;",
      "  max-width: 100% !important;",
      "  align-self: stretch !important;",
      "  box-sizing: border-box !important;",
      "}",
      "/* Webflow: flex + align-items:center makes headings shrink to max-content; SplitText",
      "   then measures a single long line. Pin the heading to the full inner width. */",
      "/* With a wide inner (e.g. 66% of 1940px ≈ 1280px) + display type, a long <h2> can still",
      "   fit one visual line — h2 height ~1em, scrollWidth == clientWidth. That yields",
      "   splitLines:1. Cap line length so copy wraps; tune ch in Webflow if needed. */",
      "body .body-intro h2.value-prop, .body-intro__stage h2.value-prop,",
      "h2.value-prop, .value-prop {",
      "  display: block !important;",
      "  width: 100% !important;",
      "  min-width: 0 !important;",
      "  max-width: min(100%, 50ch) !important;",
      "  margin-left: auto !important;",
      "  margin-right: auto !important;",
      "  align-self: stretch !important;",
      "  white-space: normal !important;",
      "  box-sizing: border-box !important;",
      "  text-wrap: initial !important;",
      "  letter-spacing: normal !important;",
      "  line-height: 1.25 !important;",
      "}",
      "h2.value-prop .value-prop-line,",
      ".value-prop .value-prop-line {",
      "  display: block !important;",
      "  text-align: center !important;",
      "  white-space: nowrap !important;",
      "  overflow: visible !important;",
      "  width: 100%;",
      "  line-height: inherit !important;",
      "  min-height: 0;",
      "  box-sizing: border-box;",
      "}",
      "h2.value-prop .value-prop-line--empty,",
      ".value-prop .value-prop-line--empty {",
      "  display: none !important;",
      "}",
      "h2.value-prop .value-prop-word,",
      ".value-prop .value-prop-word {",
      "  display: inline-flex !important;",
      "  flex-direction: row !important;",
      "  flex-wrap: nowrap !important;",
      "  align-items: baseline !important;",
      "  flex-shrink: 0 !important;",
      "}",
      "h2.value-prop .value-prop-char,",
      ".value-prop .value-prop-char {",
      "  display: inline-flex !important;",
      "  align-items: baseline !important;",
      "  justify-content: flex-end;",
      "  overflow: hidden !important;",
      "  box-sizing: border-box !important;",
      "  flex-shrink: 0 !important;",
      "  flex-grow: 0 !important;",
      "}",
      "h2.value-prop .value-prop-cursor,",
      ".value-prop .value-prop-cursor {",
      "  flex-shrink: 0 !important;",
      "  display: inline-block !important;",
      "}",
      ".body-intro__inner, .body-intro__stage {",
      "  overflow: visible !important;",
      "}",
    ].join("\n");
    if (el) {
      el.textContent = css;
      return;
    }
    el = document.createElement("style");
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
  }

  function ensureStage(h2) {
    var parent = h2.parentElement;
    if (!parent) return null;
    if (parent.classList && parent.classList.contains("body-intro__stage")) return parent;
    var wrap = document.createElement("div");
    wrap.className = "body-intro__stage";
    parent.insertBefore(wrap, h2);
    wrap.appendChild(h2);
    return wrap;
  }

  function isLineEmpty(line) {
    return !/\S/.test(line.textContent || "");
  }

  function markEmptyLinesAndGetContent(split) {
    var content = [];
    for (var i = 0; i < split.lines.length; i++) {
      var line = split.lines[i];
      if (isLineEmpty(line)) {
        line.classList.add("value-prop-line--empty");
        continue;
      }
      content.push(line);
    }
    return content;
  }

  function injectCursors(lines) {
    var cursors = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var c = document.createElement("span");
      c.className = "value-prop-cursor";
      c.setAttribute("aria-hidden", "true");
      line.appendChild(c);
      cursors.push(c);
    }
    return cursors;
  }

  function groupCharsByLine(lines, allChars) {
    var map = lines.map(function () {
      return [];
    });
    for (var i = 0; i < allChars.length; i++) {
      var ch = allChars[i];
      for (var L = 0; L < lines.length; L++) {
        if (lines[L].contains(ch)) {
          map[L].push(ch);
          break;
        }
      }
    }
    return map;
  }

  function prepCharWidths(contentLines, allChars) {
    for (var i = 0; i < allChars.length; i++) {
      var ch = allChars[i];
      var inContent = false;
      for (var L = 0; L < contentLines.length; L++) {
        if (contentLines[L].contains(ch)) {
          inContent = true;
          break;
        }
      }
      if (!inContent) continue;
      var txt = ch.textContent || "";
      var isWhitespace = !/\S/.test(txt);
      var fontPx = parseFloat(window.getComputedStyle(ch).fontSize) || 16;
      var w = Math.max(ch.getBoundingClientRect().width, ch.offsetWidth || 0);
      w = Math.ceil(w * 2) / 2;
      if (w < 0.5) w = 0.5;
      if (isWhitespace) {
        w = Math.max(w, fontPx * 0.35);
      }
      gsap.set(ch, {
        display: "inline-flex",
        alignItems: "baseline",
        justifyContent: isWhitespace ? "center" : "flex-end",
        overflow: "hidden",
        boxSizing: "border-box",
        verticalAlign: "baseline",
        flexShrink: 0,
        flexGrow: 0,
        minWidth: w,
        width: w,
        maxWidth: w,
      });
    }
  }

  function cacheCursorCenterX(cursors) {
    var cx = window.innerWidth / 2;
    return cursors.map(function (c) {
      var r = c.getBoundingClientRect();
      return cx - (r.left + r.width / 2);
    });
  }

  /** Per-line translateY so each line-end cursor's vertical center lands on targetMidY (viewport px). */
  function computeMeetLineYs(lines, cursors, targetMidY) {
    return lines.map(function (line, i) {
      var c = cursors[i];
      if (!c) return 0;
      var r = c.getBoundingClientRect();
      var mid = r.top + r.height / 2;
      return targetMidY - mid;
    });
  }

  function readUnionRect(cursors, store) {
    var r = null;
    for (var i = 0; i < cursors.length; i++) {
      var br = cursors[i].getBoundingClientRect();
      if (br.width < 0.35 || br.height < 0.35) continue;
      if (!r) {
        r = { left: br.left, top: br.top, right: br.right, bottom: br.bottom };
      } else {
        r.left = Math.min(r.left, br.left);
        r.top = Math.min(r.top, br.top);
        r.right = Math.max(r.right, br.right);
        r.bottom = Math.max(r.bottom, br.bottom);
      }
    }
    if (!r) {
      if (store && store.last) return store.last;
      var cx0 = window.innerWidth / 2;
      var cy0 = window.innerHeight / 2;
      var w0 = 48;
      var h0 = 48;
      return {
        left: cx0 - w0 / 2,
        top: cy0 - h0 / 2,
        width: w0,
        height: h0,
        cx: cx0,
        cy: cy0,
      };
    }
    var w = r.right - r.left;
    var h = r.bottom - r.top;
    var cx = (r.left + r.right) / 2;
    var cy = (r.top + r.bottom) / 2;
    /** One visible cursor → tiny union → stray “pixel square” on screen; expand around center. */
    var minSpan = 28;
    if (w < minSpan || h < minSpan) {
      w = Math.max(minSpan, w);
      h = Math.max(minSpan, h);
    }
    var out = {
      left: cx - w / 2,
      top: cy - h / 2,
      width: w,
      height: h,
      cx: cx,
      cy: cy,
    };
    if (store) store.last = out;
    return out;
  }

  /**
   * Same center as cursor union, but width === height so border-radius reads as a true circle
   * (vertical cursor bars otherwise produce a wide flat “pill” or square-looking morph).
   */
  function readUnionCircleMetrics(cursors, store) {
    var u = readUnionRect(cursors, store);
    var side = Math.max(u.width || 0, u.height || 0, 28);
    return { cx: u.cx, cy: u.cy, side: side };
  }

  function init() {
    var bodyIntro = qs(SELECTORS.bodyIntro);
    var h2 = qs(SELECTORS.valueProp, bodyIntro || document);
    if (!bodyIntro || !h2) return;

    injectBodyIntroLayoutStyles();

    if (h2.dataset.valuePropInit === "1") return;
    h2.dataset.valuePropInit = "1";

    ensureStage(h2);

    if (REDUCED_MOTION) {
      gsap.set(h2, { autoAlpha: 1, color: "#ffffff" });
      gsap.set(bodyIntro, { backgroundColor: "#0f33ff" });
      return;
    }

    /**
     * Webflow (and some heading styles) use white-space: nowrap, which makes SplitText
     * see a single visual line. Force normal wrapping for measurement, then run split
     * on the next frames so max-width (e.g. 66% inner) is in effect.
     */
    h2.style.setProperty("white-space", "normal", "important");
    h2.style.setProperty("width", "100%", "important");
    h2.style.setProperty("min-width", "0", "important");
    h2.style.setProperty("align-self", "stretch", "important");

    var stageShell = h2.parentElement;
    if (stageShell && stageShell.classList && stageShell.classList.contains("body-intro__stage")) {
      stageShell.style.setProperty("width", "100%", "important");
      stageShell.style.setProperty("min-width", "0", "important");
      stageShell.style.setProperty("max-width", "100%", "important");
      stageShell.style.setProperty("align-self", "stretch", "important");
    }
    var innerForChain = bodyIntro ? qs(".body-intro__inner", bodyIntro) : null;
    if (innerForChain) {
      innerForChain.style.setProperty("min-width", "0", "important");
    }

    /**
     * SplitText lines are fixed at split time. Per GSAP docs: use autoSplit + onSplit
     * so a reflow (fonts, Webflow layout, or width change) re-splits; return timelines
     * from onSplit so GSAP can revert/sync on re-split.
     */
    function onSplitValueProp(split) {
      logValuePropDebug("onSplit (lines after SplitText)", gatherValuePropLayoutForDebug(h2, bodyIntro, split));
      if (isValuePropDebug() && split.lines && split.lines.length === 1) {
        console.warn(
          "[epic value-prop] SplitText reports 1 line. For long copy, the heading’s used width is usually the whole paragraph width (no wrap). " +
            "Check h2/stage/inner box widths in the pre-SplitText log, and Webflow for nowrap / narrow flex parent."
        );
      }
      var contentLines = markEmptyLinesAndGetContent(split);
      var chars = split.chars;
      var cursors = injectCursors(contentLines);
      var charsByLine = groupCharsByLine(contentLines, chars);
      var stage = qs(SELECTORS.stage, bodyIntro) || bodyIntro;

      var morphDot = stage.querySelector(".value-prop-morph-dot");
      if (!morphDot) {
        morphDot = document.createElement("div");
        morphDot.className = "value-prop-morph-dot";
        morphDot.setAttribute("aria-hidden", "true");
        stage.appendChild(morphDot);
      }
      try {
        window.__epicMorphDot = morphDot;
      } catch (e) {}
      gsap.set(morphDot, {
        autoAlpha: 0,
        pointerEvents: "none",
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        width: 0,
        height: 0,
        scale: 0,
        transformOrigin: "50% 50%",
        borderRadius: "50%",
        visibility: "hidden",
      });

      prepCharWidths(contentLines, chars);
  
      gsap.set(h2, { autoAlpha: 0 });
      gsap.set(cursors, { scaleX: 0, autoAlpha: 0, transformOrigin: "left center" });
  
      var cachedDx = [];
      var unionStore = { last: null };
  
      function refreshCursorDx() {
        cachedDx = cacheCursorCenterX(cursors);
        readUnionRect(cursors, unionStore);
      }
  
      /** Fade: start top 80% → end top top */
      var fadeTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: bodyIntro,
            start: "top 80%",
            end: "top top",
            scrub: 0.5,
          },
        })
        .to(h2, { autoAlpha: 1, ease: "none" });
  
      /** Pinned scrub sequence (onUpdate wired after merge; holder avoids forward-ref). */
      var pinBlueWashScroll = { onUpdate: null };
      /** True only after forward blue-wash commits. Must exist before `pinTl` onUpdate references it. */
      var blueFieldCommitted = false;
      /** After first blue commit, soften re-entry: ramp stage opacity over early pin progress (scroll down). */
      var introStageReentryFadeEnabled = false;
      var pinTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "epic-body-intro-pin",
          trigger: bodyIntro,
          start: "top top",
          end: function () {
            return "+=" + Math.round(window.innerHeight * EPIC_INTRO_PIN_SCROLL_VH);
          },
          pin: true,
          pinSpacing: true,
          scrub: 0.55,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onEnter: refreshCursorDx,
          onEnterBack: refreshCursorDx,
          onRefresh: function (self) {
            if (self.progress > 0.001) refreshCursorDx();
          },
          onUpdate: function (self) {
            if (typeof pinBlueWashScroll.onUpdate === "function") {
              pinBlueWashScroll.onUpdate(self);
            }
            if (introStageReentryFadeEnabled && stage) {
              var fe = reentryFadeEndProgress;
              var eps = 0.018;
              /** Past merge start, or at rest at pin start: full opacity. Else dim through collapseMeet + cursor x so bars never read as flying in/out. */
              if (self.progress >= fe || self.progress <= eps) {
                gsap.set(stage, { autoAlpha: 1 });
              } else {
                var u = fe <= 1e-6 ? 1 : self.progress / fe;
                var alpha = Math.min(1, Math.pow(u, 0.38));
                gsap.set(stage, { autoAlpha: alpha });
              }
            }
          },
        },
      });
  
      refreshCursorDx();

      /** When scrub sits before mergeCircle, nested mergeTL does not run — morph keeps merge end state
       *  unless we force hide at pin start (log: morphOpacity 1 at progress ~0 on second scrub). */
      pinTl.set(
        morphDot,
        {
          autoAlpha: 0,
          visibility: "hidden",
          pointerEvents: "none",
          position: "absolute",
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          width: 0,
          height: 0,
          scale: 0,
          transformOrigin: "50% 50%",
          borderRadius: "50%",
        },
        0
      );
  
      pinTl.addLabel("cursorsIn", 0);
      pinTl.to(
        cursors,
        {
          autoAlpha: 1,
          scaleX: 1,
          duration: 0.14,
          stagger: 0.05,
          ease: "power2.out",
        },
        "cursorsIn"
      );
  
      pinTl.addLabel("charsOut", ">");
      /** Near-instant per char so scrub reads as delete (not a sliding clip). Cursor follows via layout only. */
      var innerDur = 0.001;
      var staggerEach = 0.012;
      var charBlockEnd = 0;
      for (var li = 0; li < charsByLine.length; li++) {
        var row = charsByLine[li].slice();
        row.reverse();
        if (!row.length) continue;
        var rowSpan = innerDur + staggerEach * Math.max(0, row.length - 1);
        charBlockEnd = Math.max(charBlockEnd, rowSpan);
        pinTl.to(
          row,
          {
            width: 0,
            autoAlpha: 0,
            duration: innerDur,
            stagger: { each: staggerEach },
            ease: "none",
          },
          "charsOut"
        );
      }
  
      var movePos = "charsOut+=" + charBlockEnd;
      pinTl.call(refreshCursorDx, null, movePos);
      pinTl.to(
        cursors,
        {
          duration: 0.22,
          x: function (i) {
            return cachedDx[i] || 0;
          },
          ease: "power2.inOut",
        },
        movePos
      );
  
      pinTl.addLabel("collapseMeet", ">");
      var meetMidY = function () {
        return window.innerHeight * 0.5;
      };
      pinTl.to(
        contentLines,
        {
          duration: 0.26,
          ease: "power2.inOut",
          y: function (i) {
            return computeMeetLineYs(contentLines, cursors, meetMidY())[i] || 0;
          },
        },
        "collapseMeet"
      );
  
      pinTl.addLabel("mergeCircle", ">");
      /** Explicit hide only — avoid clearProps (caused stray visible frame / wrong coords before merge). */
      pinTl.set(
        morphDot,
        {
          autoAlpha: 0,
          visibility: "hidden",
          pointerEvents: "none",
          position: "absolute",
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          width: 0,
          height: 0,
          scale: 0,
          transformOrigin: "50% 50%",
          borderRadius: "50%",
          backgroundColor: "#0f33ff",
          borderWidth: 0,
          borderColor: "transparent",
        },
        "<mergeCircle"
      );
      /** Frozen at first forward pass through mergeCircle so scrub-reverse does not re-read cursors
       *  mid-tween (they can move off-screen / wrong order → union cy like -467 in debug logs). */
      var mergeSnap = {
        cx: (typeof window !== "undefined" ? window.innerWidth : 800) * 0.5,
        cy: (typeof window !== "undefined" ? window.innerHeight : 600) * 0.5,
        side: 28,
      };
      pinTl.call(
        function snapshotMergeGeomForScrub() {
          refreshCursorDx();
          var st = pinTl.scrollTrigger;
          if (st && st.direction < 0) {
            return;
          }
          var m = readUnionCircleMetrics(cursors, unionStore);
          mergeSnap.cx = m.cx;
          mergeSnap.cy = m.cy;
          mergeSnap.side = m.side;
        },
        null,
        "mergeCircle"
      );

      /** Cursors resolve into a blue circle (#0f33ff), then blue wash fills .body-intro. */
      var mergeUnion = {
        autoAlpha: 0,
        immediateRender: false,
        scale: 1,
        position: "fixed",
        left: function () {
          return mergeSnap.cx;
        },
        top: function () {
          return mergeSnap.cy;
        },
        xPercent: -50,
        yPercent: -50,
        width: function () {
          return mergeSnap.side;
        },
        height: function () {
          return mergeSnap.side;
        },
        borderRadius: "50%",
        backgroundColor: "#0f33ff",
        borderWidth: 0,
        borderColor: "transparent",
        borderStyle: "solid",
      };

      var mergeTL = gsap.timeline();
      mergeTL.fromTo(
        morphDot,
        mergeUnion,
        {
          autoAlpha: 1,
          visibility: "visible",
          scale: 1,
          duration: 0.04,
          ease: "none",
        },
        0
      );
      mergeTL.to(
        cursors,
        {
          autoAlpha: 0,
          duration: 0.03,
          ease: "none",
        },
        0.01
      );
      mergeTL.to(
        contentLines,
        {
          autoAlpha: 0,
          duration: 0.12,
          ease: "power2.inOut",
        },
        0.02
      );
      mergeTL.fromTo(
        morphDot,
        {
          autoAlpha: 1,
          position: "fixed",
          left: function () {
            return mergeSnap.cx;
          },
          top: function () {
            return mergeSnap.cy;
          },
          xPercent: -50,
          yPercent: -50,
          width: function () {
            return mergeSnap.side;
          },
          height: function () {
            return mergeSnap.side;
          },
          borderRadius: "50%",
          backgroundColor: "#0f33ff",
          borderWidth: 0,
          borderColor: "transparent",
          borderStyle: "solid",
        },
        {
          autoAlpha: 1,
          left: "50vw",
          top: "50vh",
          xPercent: -50,
          yPercent: -50,
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "#0f33ff",
          borderWidth: 0,
          borderColor: "transparent",
          duration: 0.22,
          ease: "power2.inOut",
        },
        0.04
      );

      pinTl.add(mergeTL, "mergeCircle");
      pinTl.addLabel("blueWashStart", ">");

      /** Diameter (px) so a circle centered in `el` scales to cover its box. */
      function sectionBurstCoverPx(el) {
        var r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : null;
        var w = r && r.width ? r.width : typeof window !== "undefined" ? window.innerWidth : 800;
        var h = r && r.height ? r.height : typeof window !== "undefined" ? window.innerHeight : 600;
        return Math.ceil(Math.hypot(w, h) * 1.08);
      }

      var blueWashDur = EPIC_BLUE_WASH_SCRUB_DURATION;
      var blueBgRamp = Math.max(0.06, blueWashDur * 0.2);
      var blueBurst = document.createElement("div");
      blueBurst.className = "epic-blue-burst epic-blue-burst--section";
      blueBurst.setAttribute("aria-hidden", "true");
      bodyIntro.appendChild(blueBurst);
      gsap.set(blueBurst, { visibility: "hidden", pointerEvents: "none", force3D: true });

      pinTl.set(
        morphDot,
        {
          autoAlpha: 0,
          visibility: "hidden",
          pointerEvents: "none",
        },
        "blueWashStart"
      );
      try {
        morphDot.classList.remove("value-prop-morph-dot--viewport");
      } catch (eClsBw) {}

      pinTl.set(
        blueBurst,
        {
          visibility: "visible",
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          width: function () {
            return sectionBurstCoverPx(bodyIntro);
          },
          height: function () {
            return sectionBurstCoverPx(bodyIntro);
          },
          scale: 0,
          transformOrigin: "50% 50%",
          autoAlpha: 1,
        },
        "blueWashStart"
      );

      pinTl.fromTo(
        blueBurst,
        { scale: 0 },
        {
          scale: 1,
          duration: blueWashDur,
          ease: "power2.out",
          immediateRender: false,
        },
        "blueWashStart"
      );

      pinTl.fromTo(
        bodyIntro,
        { backgroundColor: "#fbfbfb" },
        {
          backgroundColor: "#0f33ff",
          duration: blueBgRamp,
          ease: "none",
          immediateRender: false,
        },
        "blueWashStart+=" + (blueWashDur - blueBgRamp)
      );

      pinTl.to(
        blueBurst,
        {
          autoAlpha: 0,
          duration: 0.05,
          ease: "none",
        },
        "blueWashStart+=" + (blueWashDur - 0.05)
      );

      /** Pin progress (0–1) at `mergeCircle` label ≈ end of `collapseMeet` (bars/lines settled). */
      var pinDurForReentryFade = pinTl.duration();
      var reentryFadeEndProgress =
        pinDurForReentryFade > 0 &&
        pinTl.labels.mergeCircle != null &&
        typeof pinTl.labels.mergeCircle === "number"
          ? Math.min(0.52, pinTl.labels.mergeCircle / pinDurForReentryFade + 0.03)
          : EPIC_INTRO_REENTRY_STAGE_FADE_END;

      function blueWashStartProgress() {
        var t = pinTl.labels.blueWashStart;
        var d = pinTl.duration();
        return d > 0 ? t / d : 0;
      }

      function blueWashEndProgress() {
        var t = pinTl.labels.blueWashStart + blueWashDur;
        var d = pinTl.duration();
        return d > 0 ? Math.min(1, t / d) : 1;
      }

      function restoreMorphDotToStage() {
        if (morphDot.parentNode !== document.body) return;
        morphDot.classList.remove("value-prop-morph-dot--viewport");
        stage.appendChild(morphDot);
      }

      var morphBlueWashCommitted = false;

      pinBlueWashScroll.onUpdate = function (self) {
        var p = self.progress;
        var bws = blueWashStartProgress();
        var bwe = blueWashEndProgress();
        if (p >= bws - 1e-6 && p < bwe + 0.02) {
          try {
            bodyIntro.classList.add("epic-body-intro--bursting");
          } catch (eBurstOn) {}
        } else {
          try {
            bodyIntro.classList.remove("epic-body-intro--bursting");
          } catch (eBurstOff) {}
        }

        if (p >= bwe - 1e-5) {
          if (!morphBlueWashCommitted) {
            morphBlueWashCommitted = true;
            try {
              restoreMorphDotToStage();
            } catch (eRest) {}
            try {
              morphDot.classList.remove("value-prop-morph-dot--viewport");
            } catch (eVp) {}
            try {
              gsap.set(morphDot, {
                autoAlpha: 0,
                pointerEvents: "none",
                clearProps:
                  "left,top,width,height,borderRadius,transform,xPercent,yPercent,backgroundColor,borderWidth,borderColor,borderStyle,zIndex,visibility",
              });
            } catch (eMd) {}
            blueFieldCommitted = true;
            introStageReentryFadeEnabled = true;
            try {
              if (typeof window !== "undefined") {
                window.__epicMorphCommitDone = true;
              }
            } catch (eWin) {}
            requestAnimationFrame(function syncPinAfterBlueCommit() {
              try {
                var stSync = pinTl.scrollTrigger;
                if (stSync && pinTl) {
                  pinTl.progress(stSync.progress);
                }
                refreshCursorDx();
              } catch (eSyncFwd) {}
              try {
                ScrollTrigger.refresh();
              } catch (eRf) {}
            });
          }
        } else {
          if (morphBlueWashCommitted) {
            morphBlueWashCommitted = false;
            blueFieldCommitted = false;
            introStageReentryFadeEnabled = false;
            try {
              if (typeof window !== "undefined") {
                window.__epicMorphCommitDone = false;
              }
            } catch (eWin2) {}
            requestAnimationFrame(function syncPinAfterBlueScrubBack() {
              try {
                var stSync = pinTl.scrollTrigger;
                if (stSync && pinTl) {
                  pinTl.progress(stSync.progress);
                }
                refreshCursorDx();
              } catch (eSyncRev) {}
              try {
                ScrollTrigger.refresh();
              } catch (eRfRev) {}
            });
          }
        }
      };

      if (!valuePropResizePatched) {
        valuePropResizePatched = true;
        window.addEventListener(
          "resize",
          function () {
            ScrollTrigger.refresh();
          },
          { passive: true }
        );
      }
  
      requestAnimationFrame(function () {
        ScrollTrigger.refresh();
      });
  
      return gsap.timeline().add(fadeTl, 0).add(pinTl, 0);
    }

    function startValuePropSplit() {
      (function ensureMeasureWidth() {
        if (h2.getBoundingClientRect().width >= 2) return;
        if (!bodyIntro) return;
        var inner = qs(".body-intro__inner", bodyIntro);
        var base = inner
          ? inner.getBoundingClientRect().width
          : bodyIntro.getBoundingClientRect().width;
        if (base > 0) h2.style.setProperty("width", Math.floor(base) + "px", "important");
      })();

      logValuePropDebug("pre-SplitText (h2 still plain text)", gatherValuePropLayoutForDebug(h2, bodyIntro, null));

      var stOpts = {
        type: "lines,words,chars",
        autoSplit: true,
        onSplit: onSplitValueProp,
        linesClass: "value-prop-line",
        wordsClass: "value-prop-word",
        charsClass: "value-prop-char",
        reduceWhiteSpace: false,
      };
      if (typeof SplitText.create === "function") {
        SplitText.create(h2, stOpts);
      } else {
        new SplitText(h2, stOpts);
      }
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (!h2.isConnected) {
          h2.removeAttribute("data-value-prop-init");
          return;
        }
        startValuePropSplit();
      });
    });
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(init).catch(init);
    } else {
      init();
    }
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(init).catch(init);
      } else {
        init();
      }
    });
  }
}
