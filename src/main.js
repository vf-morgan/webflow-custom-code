/**
 * EPIC — Body intro scroll sequence (Webflow custom code)
 * Requires: gsap (Webflow), ScrollTrigger, SplitText — same major version (3.14.x)
 * Order: ScrollTrigger.min.js → SplitText.min.js → this bundle
 *
 * Line + cursor layout is injected into <head> so this works as JS-only in Webflow
 * (SplitText measures lines before the cursor exists; wrap would orphan the bar).
 */
function bootstrapEpicBodyIntro() {
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

  /** Expected: .body-intro > .body-intro__inner > .body-intro__stage > h2.value-prop (epic-gsap). */
  var SELECTORS = {
    bodyIntro: ".body-intro",
    valueProp: "h2.value-prop",
    stage: ".body-intro__stage",
  };

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  /** Required for Webflow JS-only: keeps end-of-line cursors on the same row as the text. */
  function injectBodyIntroLayoutStyles() {
    var id = "epic-body-intro-layout-styles";
    if (document.getElementById(id)) return;
    var el = document.createElement("style");
    el.id = id;
    el.textContent = [
      "h2.value-prop .value-prop-line,",
      ".value-prop .value-prop-line {",
      "  display: block !important;",
      "  text-align: center !important;",
      "  white-space: nowrap !important;",
      "  overflow: visible !important;",
      "  width: 100%;",
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
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        autoAlpha: 1,
        pointerEvents: "none",
      });
      return;
    }

    /**
     * GSAP SplitText: "spaces are not considered characters" — with type "lines,chars"
     * only, inter-word spaces are not given elements and can disappear. Include "words"
     * when splitting chars (see SplitText docs / type + smartWrap notes).
     */
    var split = new SplitText(h2, {
      type: "lines,words,chars",
      linesClass: "value-prop-line",
      wordsClass: "value-prop-word",
      charsClass: "value-prop-char",
      reduceWhiteSpace: false,
    });

    var contentLines = markEmptyLinesAndGetContent(split);
    var chars = split.chars;
    var cursors = injectCursors(contentLines);
    var charsByLine = groupCharsByLine(contentLines, chars);
    var stage = qs(SELECTORS.stage, bodyIntro) || bodyIntro;

    var morphDot = document.createElement("div");
    morphDot.className = "value-prop-morph-dot";
    morphDot.setAttribute("aria-hidden", "true");
    stage.appendChild(morphDot);
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
    gsap
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
    var pinTl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: bodyIntro,
        start: "top top",
        end: function () {
          return "+=" + Math.round(window.innerHeight * 5);
        },
        pin: true,
        pinSpacing: true,
        scrub: 0.75,
        anticipatePin: 1,
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
      },
      {
        autoAlpha: 1,
        left: "50vw",
        top: "50vh",
        xPercent: -50,
        yPercent: -50,
        width: 14,
        height: 14,
        borderRadius: "50%",
        duration: 0.22,
        ease: "power2.inOut",
      },
      0.04
    );

    pinTl.add(mergeTL, "mergeCircle");

    /** Extra scrub length after merge (no tweens): user scrolls here, then one-shot blue wash runs. */
    pinTl.to({}, { duration: 0.55, ease: "none" }, ">");

    function mergeCompleteProgress() {
      var tMerge = pinTl.labels.mergeCircle + mergeTL.duration();
      var d = pinTl.duration();
      return d > 0 ? Math.min(1, tMerge / d) : 1;
    }

    function reparentMorphDotToBody() {
      if (!morphDot.parentNode || morphDot.parentNode === document.body) return;
      document.body.appendChild(morphDot);
      morphDot.classList.add("value-prop-morph-dot--viewport");
    }

    function restoreMorphDotToStage() {
      if (morphDot.parentNode !== document.body) return;
      morphDot.classList.remove("value-prop-morph-dot--viewport");
      stage.appendChild(morphDot);
    }

    /** True only after forward blue-wash commits (solid blue); enables iris reverse on scroll-up. */
    var blueFieldCommitted = false;
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
      /** White dot for entire iris so it never matches the blue burst (blue-on-blue “disappears”). */
      blueWashActiveTl.set(morphDot, { backgroundColor: "#ffffff", autoAlpha: 1 }, 0);
      blueWashActiveTl.to(burst, {
        scale: 1,
        duration: 0.88,
        ease: "power2.out",
      });
      blueWashActiveTl.add(function commitBlueField() {
        /** Dot first, then surfaces + burst removal — avoids a frame with blue field but no visible circle. */
        gsap.set(morphDot, { backgroundColor: "#ffffff", autoAlpha: 1 });
        gsap.set([bodyIntro, document.documentElement, document.body], { backgroundColor: "#0f33ff" });
        removeBlueBurst();
        blueFieldCommitted = true;
      });
    }

    function playBlueWashReverse() {
      if (blueWashActiveTl) {
        blueWashActiveTl.kill();
        blueWashActiveTl = null;
      }
      removeBlueBurst();
      blueWashReverseInProgress = true;

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
          duration: 0.28,
          ease: "power2.in",
        },
        "-=0.28"
      );
      blueWashActiveTl.add(function finishBlueWashReverse() {
        removeBlueBurst();
        gsap.set(morphDot, { backgroundColor: "#0f33ff" });
        restoreMorphDotToStage();
        blueFieldCommitted = false;
        blueWashReverseInProgress = false;
        blueWashActiveTl = null;
      });
    }

    function resetBlueWashVisuals() {
      if (blueWashActiveTl) {
        blueWashActiveTl.kill();
        blueWashActiveTl = null;
      }
      blueWashReverseInProgress = false;
      removeBlueBurst();
      gsap.set([bodyIntro, document.documentElement, document.body], { backgroundColor: "#fbfbfb" });
      gsap.set(morphDot, { backgroundColor: "#0f33ff" });
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

    window.addEventListener(
      "resize",
      function () {
        ScrollTrigger.refresh();
      },
      { passive: true }
    );

    requestAnimationFrame(function () {
      ScrollTrigger.refresh();
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

bootstrapEpicBodyIntro();
