import { installScrubbedServiceCardsBurst, killScrubbedServiceCardsBurst } from "./epic-service-cards-handoff.js";
import { EPIC_INTRO_PIN_SCROLL_VH, EPIC_STORY_CARDS_SCRUB_PX } from "./epic-constants.js";

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
    if (document.getElementById(id)) return;
    var el = document.createElement("style");
    el.id = id;
    el.textContent = [
      "/* .body-intro__stage often shrink-wraps to the <h2>’s text; then h2 width:100% is 100% of",
      "   that max-content and SplitText only sees one line. Stretch the stage in the flex chain. */",
      "/* Blue iris: burst is below the morph. Pin-spacer gets same blue as .body-intro so the",
      "   empty band above a translated pinned intro is not transparent (no fixed-hero “hole”). */",
      "div.pin-spacer[class*=\"epic-body-intro-pin\"],",
      "div[class*=\"pin-spacer-epic-body-intro-pin\"] {",
      "  background: #0f33ff !important;",
      "}",
      ".epic-blue-burst {",
      "  position: fixed !important;",
      "  pointer-events: none !important;",
      "  z-index: 1 !important;",
      "  background: #0f33ff !important;",
      "  border-radius: 50% !important;",
      "  mix-blend-mode: normal !important;",
      "}",
      "body .value-prop-morph-dot--viewport,",
      "body .value-prop-morph-dot--viewport.value-prop-morph-dot {",
      "  z-index: 30 !important;",
      "  position: fixed !important;",
      "}",
      "/* value-prop-morph is appended last on body: z-30 can paint over #story. During service-card burst,",
      "   body.epic-burst-below-morph (set in handoff) lowers the morph; #story + parent are lifted. */",
      "body.epic-burst-below-morph .value-prop-morph-dot--viewport,",
      "body.epic-burst-below-morph .value-prop-morph-dot--viewport.value-prop-morph-dot {",
      "  z-index: 1 !important;",
      "}",
      "/* During burst, force #story to fill the viewport and center its content. Without this,",
      "   the morph dot (viewport center) and the cards (stuck in document flow) are in different",
      "   Y bands: Flip can look off-screen or mostly vertical. See /demo/epic-service-cards-standalone.html */",
      "body.epic-burst-below-morph #story {",
      "  position: relative !important;",
      "  z-index: 2 !important;",
      "  isolation: isolate !important;",
      "  min-height: 100dvh !important;",
      "  min-height: 100vh !important;",
      "  display: flex !important;",
      "  flex-direction: column !important;",
      "  justify-content: center !important;",
      "  align-items: center !important;",
      "  box-sizing: border-box !important;",
      "}",
      ".value-prop-morph-dot {",
      "  box-sizing: border-box !important;",
      "}",
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
      return {
        cx: window.innerWidth / 2,
        cy: window.innerHeight / 2,
        width: 7,
        height: 22,
      };
    }
    var w = r.right - r.left;
    var h = r.bottom - r.top;
    var out = {
      left: r.left,
      top: r.top,
      width: w,
      height: h,
      cx: (r.left + r.right) / 2,
      cy: (r.top + r.bottom) / 2,
    };
    if (store) store.last = out;
    return out;
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
      gsap.set(document.documentElement, { backgroundColor: "#0f33ff" });
      gsap.set(document.body, { backgroundColor: "#0f33ff" });
      var rmDot = document.createElement("div");
      rmDot.className =
        "value-prop-morph-dot value-prop-morph-dot--viewport value-prop-morph-dot--reduced-motion";
      rmDot.setAttribute("aria-hidden", "true");
      document.body.appendChild(rmDot);
      gsap.set(rmDot, {
        position: "fixed",
        left: "50vw",
        top: "50vh",
        xPercent: -50,
        yPercent: -50,
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderColor: "#4a69f8",
        borderWidth: 5,
        autoAlpha: 1,
        pointerEvents: "none",
      });
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
      gsap.set(morphDot, { autoAlpha: 0, pointerEvents: "none" });
  
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
          },
        },
      });
  
      refreshCursorDx();
  
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
      pinTl.set(
        morphDot,
        {
          autoAlpha: 0,
          clearProps:
            "left,top,width,height,borderRadius,transform,xPercent,yPercent,backgroundColor",
        },
        "<mergeCircle"
      );
      pinTl.call(refreshCursorDx, null, "mergeCircle");
  
      var mergeUnion = {
        autoAlpha: 0,
        immediateRender: false,
        position: "fixed",
        left: function () {
          return readUnionRect(cursors, unionStore).cx;
        },
        top: function () {
          return readUnionRect(cursors, unionStore).cy;
        },
        xPercent: -50,
        yPercent: -50,
        width: function () {
          return readUnionRect(cursors, unionStore).width;
        },
        height: function () {
          return readUnionRect(cursors, unionStore).height;
        },
        borderRadius: 0,
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
      mergeTL.fromTo(
        morphDot,
        {
          autoAlpha: 1,
          position: "fixed",
          left: function () {
            return readUnionRect(cursors, unionStore).cx;
          },
          top: function () {
            return readUnionRect(cursors, unionStore).cy;
          },
          xPercent: -50,
          yPercent: -50,
          width: function () {
            return readUnionRect(cursors, unionStore).width;
          },
          height: function () {
            return readUnionRect(cursors, unionStore).height;
          },
          borderRadius: 0,
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
          width: 28,
          height: 28,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          borderStyle: "solid",
          borderColor: "#4a69f8",
          borderWidth: 5,
          duration: 0.22,
          ease: "power2.inOut",
        },
        0.04
      );
  
      pinTl.add(mergeTL, "mergeCircle");
  
      /** After merge: lengthens pinTl  lowers mergeCompleteProgress (runtime ~0.83  target ~0.74–0.78) so blue+handoff aren’t the last 17% of intro scroll. */
      pinTl.to({}, { duration: 0.5, ease: "none" }, ">");
  
      function mergeCompleteProgress() {
        var tMerge = pinTl.labels.mergeCircle + mergeTL.duration();
        var d = pinTl.duration();
        return d > 0 ? Math.min(1, tMerge / d) : 1;
      }
  
      function reparentMorphDotToBody() {
        if (!morphDot.parentNode || morphDot.parentNode === document.body) return;
        document.body.appendChild(morphDot);
        morphDot.classList.add("value-prop-morph-dot--viewport");
        try {
          window.__epicMorphDot = morphDot;
        } catch (e) {}
      }
  
      function restoreMorphDotToStage() {
        if (morphDot.parentNode !== document.body) return;
        morphDot.classList.remove("value-prop-morph-dot--viewport");
        stage.appendChild(morphDot);
      }
  
      var blueWashReverseInProgress = false;
      var blueWashActiveTl = null;
      var blueBurstEl = null;
      var lastPinProgress = -1;
  
      function removeBlueBurst() {
        if (blueBurstEl && blueBurstEl.parentNode) {
          blueBurstEl.parentNode.removeChild(blueBurstEl);
        }
        blueBurstEl = null;
      }
  
      function playBlueWashOneShot() {
        if (blueWashActiveTl) {
          blueWashActiveTl.kill();
          blueWashActiveTl = null;
        }
        blueWashReverseInProgress = false;

        removeBlueBurst();
        var burst = document.createElement("div");
        burst.className = "epic-blue-burst";
        burst.setAttribute("aria-hidden", "true");
        document.body.appendChild(burst);
        blueBurstEl = burst;
        reparentMorphDotToBody();
  
        gsap.set(burst, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "260vmax",
          height: "260vmax",
          scale: 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });
  
        blueWashActiveTl = gsap.timeline({ defaults: { ease: "power2.out", overwrite: "auto" } });
        /**
         * Morph above .epic-blue-burst (layout CSS). Do not set html/body/intro blue until
         * commitBlueField — same color as the burst made the radial expand invisible on scroll down.
         */
        blueWashActiveTl.set(
          morphDot,
          {
            backgroundColor: "#ffffff",
            borderStyle: "solid",
            borderColor: "#4a69f8",
            borderWidth: 5,
            width: 28,
            height: 28,
            borderRadius: "50%",
            autoAlpha: 1,
            zIndex: 30,
          },
          0
        );
        blueWashActiveTl.to(burst, {
          scale: 1,
          duration: 0.88,
          ease: "power2.out",
        });
        blueWashActiveTl.add(function commitBlueField() {
          try {
            gsap.set(morphDot, {
              backgroundColor: "#ffffff",
              borderStyle: "solid",
              borderColor: "#4a69f8",
              borderWidth: 5,
              width: 28,
              height: 28,
              borderRadius: "50%",
              autoAlpha: 1,
              zIndex: 30,
            });
          } catch (e0) {}
          try {
            gsap.set([bodyIntro, document.documentElement, document.body], { backgroundColor: "#0f33ff" });
          } catch (e1) {}
          removeBlueBurst();
          blueFieldCommitted = true;
          try {
            if (typeof window !== "undefined") {
              window.__epicMorphCommitDone = true;
            }
          } catch (e3) {
            /* */
          }
          requestAnimationFrame(function () {
            // #region agent log
            fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "efd621" }, body: JSON.stringify({ sessionId: "efd621", hypothesisId: "H1", runId: "pre-fix", location: "body-intro:commitBlueField:rAF", message: "calling_install", data: { blueFieldCommitted: true, scrollY: window.pageYOffset, hasStory: !!document.getElementById("story") }, timestamp: Date.now() }) }).catch(function () {});
            // #endregion
            try {
              installScrubbedServiceCardsBurst({
                gsap: gsap,
                ScrollTrigger: ScrollTrigger,
                morphEl: morphDot,
                scrubPx: EPIC_STORY_CARDS_SCRUB_PX,
              });
            } catch (e2) {
              /* */
            }
            requestAnimationFrame(function () {
              try {
                ScrollTrigger.refresh();
              } catch (e4) {
                /* */
              }
            });
          });
        });
      }
  
      function playBlueWashReverse() {
        if (blueWashActiveTl) {
          blueWashActiveTl.kill();
          blueWashActiveTl = null;
        }
        removeBlueBurst();
        blueWashReverseInProgress = true;
  
        function startBlueIrisAndMorph() {
          try {
            killScrubbedServiceCardsBurst(ScrollTrigger);
          } catch (eKill) {
            /* */
          }
          gsap.set([bodyIntro, document.documentElement, document.body], { backgroundColor: "#fbfbfb" });
  
          var burst = document.createElement("div");
          burst.className = "epic-blue-burst";
          burst.setAttribute("aria-hidden", "true");
          document.body.appendChild(burst);
          blueBurstEl = burst;
          reparentMorphDotToBody();
  
          gsap.set(burst, {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            width: "260vmax",
            height: "260vmax",
            scale: 1,
            transformOrigin: "50% 50%",
            force3D: true,
          });
  
          blueWashActiveTl = gsap.timeline({ defaults: { overwrite: "auto" } });
          blueWashActiveTl.to(burst, {
            scale: 0,
            duration: 0.88,
            ease: "power2.in",
          });
          blueWashActiveTl.to(
            morphDot,
            {
              backgroundColor: "#0f33ff",
              borderWidth: 0,
              borderColor: "transparent",
              duration: 0.28,
              ease: "power2.in",
            },
            "-=0.28"
          );
          blueWashActiveTl.add(function finishBlueWashReverse() {
            removeBlueBurst();
            gsap.set(morphDot, {
              backgroundColor: "#0f33ff",
              borderWidth: 0,
              borderColor: "transparent",
            });
            restoreMorphDotToStage();
            blueFieldCommitted = false;
            blueWashReverseInProgress = false;
            blueWashActiveTl = null;
          });
        }
  
        startBlueIrisAndMorph();
      }
  
      function resetBlueWashVisuals() {
        if (blueWashActiveTl) {
          blueWashActiveTl.kill();
          blueWashActiveTl = null;
        }
        try {
          killScrubbedServiceCardsBurst(ScrollTrigger);
        } catch (eK) {
          /* */
        }
        blueWashReverseInProgress = false;
        removeBlueBurst();
        gsap.set([bodyIntro, document.documentElement, document.body], { backgroundColor: "#fbfbfb" });
        gsap.set(morphDot, {
          backgroundColor: "#0f33ff",
          borderWidth: 0,
          borderColor: "transparent",
        });
        restoreMorphDotToStage();
        blueFieldCommitted = false;
      }
  
      pinBlueWashScroll.onUpdate = function (self) {
        var mcp = mergeCompleteProgress();
        var p = self.progress;
        var last = lastPinProgress;
        if (last < 0) {
          if (p > mcp && (!blueFieldCommitted || blueWashReverseInProgress)) {
            playBlueWashOneShot();
          }
          lastPinProgress = p;
          return;
        }
        if (last <= mcp && p > mcp && (!blueFieldCommitted || blueWashReverseInProgress)) {
          playBlueWashOneShot();
        } else if (blueFieldCommitted && !blueWashReverseInProgress && last > mcp && p <= mcp) {
          playBlueWashReverse();
        } else if (!blueFieldCommitted && last > mcp && p <= mcp) {
          resetBlueWashVisuals();
        }
        lastPinProgress = p;
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
