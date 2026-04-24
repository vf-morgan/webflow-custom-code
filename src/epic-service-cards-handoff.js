/**
 * Scrubbed Flip: morph dot (x ≈ screen center) → 6 .service-card elements in their Webflow layout,
 * scroll-scrubbed on #story. Cluster uses **x only** (y transform always 0) so motion reads as a
 * horizontal spread, not a large vertical shove (stacking y=circCy + y=0 would make every card
 * “jump” vertically to the dot). For “row vertically centered in the view”, pin #story and design
 * that section to center its content (e.g. min-h + flex) — the script does not re-layout the page.
 */
import { EPIC_STORY_CARDS_SCRUB_PX } from "./epic-constants.js";

var BURST_DUR = 0.75;
var ST_ID = "epic-service-cards-burst";

var _installed = false;
var _stackLiftEl = null;

function getCards() {
  return typeof window !== "undefined" && window.gsap
    ? window.gsap.utils.toArray("#story .service-card")
    : [];
}

function resetCardsDom() {
  var g = window.gsap;
  if (!g) return;
  var cards = getCards();
  if (cards.length) {
    g.set(cards, { x: 0, y: 0, clearProps: "transform" });
    g.set(cards, { opacity: 0, pointerEvents: "none" });
  }
  var inner = document.querySelectorAll("#story .service-card > *");
  if (inner && inner.length) {
    g.set(inner, { opacity: 0 });
  }
}

function killById(ScrollTrigger) {
  if (!ScrollTrigger) return;
  var st = ScrollTrigger.getById && ScrollTrigger.getById(ST_ID);
  if (st) st.kill(true);
}

/**
 * @param {object} opts
 * @param {object} [opts.gsap]
 * @param {object} [opts.ScrollTrigger]
 * @param {HTMLElement} opts.morphEl
 * @param {number} [opts.scrubPx]
 * @param {string} [opts.storyId]
 */
export function installScrubbedServiceCardsBurst(opts) {
  "use strict";
  var gsap = (opts && opts.gsap) || (typeof window !== "undefined" && window.gsap);
  var ScrollTrigger = (opts && opts.ScrollTrigger) || (typeof window !== "undefined" && window.ScrollTrigger);
  var Flip = typeof window !== "undefined" && window.Flip;
  var morphEl = opts && opts.morphEl;
  var scrubPx = (opts && opts.scrubPx) || EPIC_STORY_CARDS_SCRUB_PX;
  var storyId = (opts && opts.storyId) || "story";

  if (!gsap || !ScrollTrigger || !Flip) {
    // #region agent log
    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "efd621" }, body: JSON.stringify({ sessionId: "efd621", hypothesisId: "H1", runId: "pre-fix", location: "epic-service-cards-handoff:install:early", message: "install_skip", data: { reason: "plugins", hasGsap: !!gsap, hasST: !!ScrollTrigger, hasFlip: !!Flip }, timestamp: Date.now() }) }).catch(function () {});
    // #endregion
    return;
  }
  if (!morphEl || !morphEl.getBoundingClientRect) {
    // #region agent log
    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "efd621" }, body: JSON.stringify({ sessionId: "efd621", hypothesisId: "H1", runId: "pre-fix", location: "epic-service-cards-handoff:install:early", message: "install_skip", data: { reason: "no_morph" }, timestamp: Date.now() }) }).catch(function () {});
    // #endregion
    return;
  }
  if (_installed) {
    // #region agent log
    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "efd621" }, body: JSON.stringify({ sessionId: "efd621", hypothesisId: "H2", runId: "pre-fix", location: "epic-service-cards-handoff:install:early", message: "install_skip", data: { reason: "already_installed" }, timestamp: Date.now() }) }).catch(function () {});
    // #endregion
    return;
  }
  var storyEl = document.getElementById(storyId);
  if (!storyEl) {
    // #region agent log
    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "efd621" }, body: JSON.stringify({ sessionId: "efd621", hypothesisId: "H1", runId: "pre-fix", location: "epic-service-cards-handoff:install:early", message: "install_skip", data: { reason: "no_story", storyId: storyId }, timestamp: Date.now() }) }).catch(function () {});
    // #endregion
    return;
  }

  gsap.registerPlugin(ScrollTrigger, Flip);
  resetCardsDom();

  var cards = getCards();
  if (cards.length === 0) {
    // #region agent log
    fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "efd621" }, body: JSON.stringify({ sessionId: "efd621", hypothesisId: "H1", runId: "pre-fix", location: "epic-service-cards-handoff:install:early", message: "install_skip", data: { reason: "no_cards" }, timestamp: Date.now() }) }).catch(function () {});
    // #endregion
    return;
  }

  _stackLiftEl = null;
  try {
    document.body.classList.add("epic-burst-below-morph");
    if (storyEl.parentNode && storyEl.parentNode !== document.body) {
      _stackLiftEl = storyEl.parentNode;
      gsap.set(_stackLiftEl, { position: "relative", zIndex: 35, force3D: false });
    }
  } catch (eStack) {
    /* */
  }

  try {
    void (storyEl && storyEl.offsetHeight);
  } catch (e0) {
    /* */
  }

  var circleRect = morphEl.getBoundingClientRect();
  var circCx = circleRect.left + circleRect.width * 0.5;
  // circCy intentionally unused for cluster: pairing y= circCy - cardCy made Flip tween mostly
  // vertical (dot is viewport-centered; cards are often much lower in #story). Horizontal-only: y:0.
  for (var i = 0; i < cards.length; i++) {
    var el = cards[i];
    var br = el.getBoundingClientRect();
    var cardCx = br.left + br.width * 0.5;
    var dx = circCx - cardCx;
    gsap.set(el, { x: dx, y: 0, opacity: 1, pointerEvents: "auto" });
  }

  var state = Flip.getState(cards);
  gsap.set(cards, { x: 0, y: 0, clearProps: "transform" });

  var flipTl = Flip.from(state, {
    duration: BURST_DUR,
    ease: "none",
    stagger: 0.06,
    absolute: true,
    scale: true,
  });

  var handoffMainTl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  handoffMainTl.add(flipTl, 0);
  handoffMainTl.add(
    gsap.to("#" + storyId + " .service-card > *", {
      opacity: 1,
      duration: 0.28,
      stagger: 0.04,
      ease: "none",
    }),
    0.45
  );
  handoffMainTl.to(
    morphEl,
    { autoAlpha: 0, scale: 0, duration: 0.2, ease: "none" },
    0.72
  );
  handoffMainTl.pause(0);

  var endAdd = Math.min(scrubPx, 1600);
  if (endAdd < 1) {
    endAdd = 1;
  }

  /**
   * "top bottom" in scroll Y = #story's top at viewport bottom. If commit fires after the user
   * has already passed that, progress would be >0 (logs showed ~0.26) and the dot → cluster is skipped.
   * `start: max(natural, scrollY)` (absolute pixels) so t=0 is at the later of: story entering, or "now" at install.
   */
  var vh = window.innerHeight;
  var scrollY0 = (typeof window.pageYOffset === "number" ? window.pageYOffset : 0) || 0;
  var sr0 = storyEl.getBoundingClientRect();
  var storyTopDoc0 = sr0.top + scrollY0;
  var naturalStartY = storyTopDoc0 - vh;
  var startScrollY = Math.max(naturalStartY, scrollY0);
  if (startScrollY < 0) {
    startScrollY = 0;
  }

  var st = ScrollTrigger.create({
    id: ST_ID,
    trigger: storyEl,
    start: startScrollY,
    end: "+=" + endAdd,
    pin: true,
    pinSpacing: true,
    scrub: 0.55,
    animation: handoffMainTl,
    anticipatePin: 0,
    invalidateOnRefresh: true,
  });

  // #region agent log
  fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "efd621" }, body: JSON.stringify({ sessionId: "efd621", hypothesisId: "H3", runId: "post-fix", location: "epic-service-cards-handoff:install:ok", message: "flip_st_created", data: { nCards: cards.length, endAdd: endAdd, naturalStartY: naturalStartY, startScrollY: startScrollY, scrollY0: scrollY0 }, timestamp: Date.now() }) }).catch(function () {});
  // #endregion

  _installed = true;
  try {
    if (typeof window !== "undefined") {
      window.__epicServiceCardsStInstalled = true;
      window.__epicBurstStartScrollY = startScrollY;
    }
  } catch (e0) {
    /* */
  }

  requestAnimationFrame(function () {
    if (typeof console !== "undefined" && console.info) {
      var st2 = ScrollTrigger.getById && ScrollTrigger.getById(ST_ID);
      console.info("[epic] service cards Flip + ScrollTrigger OK", {
        stProgress: st2 ? st2.progress : "—",
        scroll: window.pageYOffset,
      });
    }
    // #region agent log
    (function () {
      var st3 = ScrollTrigger.getById && ScrollTrigger.getById(ST_ID);
      var sy = typeof window.pageYOffset === "number" ? window.pageYOffset : 0;
      fetch("http://127.0.0.1:7893/ingest/7d36643c-3119-4e7b-9535-9cb0977654ec", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "efd621" }, body: JSON.stringify({ sessionId: "efd621", hypothesisId: "H3", runId: "post-fix", location: "epic-service-cards-handoff:install:afterRefresh", message: "st_state", data: { progress: st3 ? st3.progress : null, start: st3 && st3.start, end: st3 && st3.end, scrollY: sy, nCards: cards.length, expectT0: st3 && sy != null && st3.start != null && Math.abs(sy - st3.start) < 2 }, timestamp: Date.now() }) }).catch(function () {});
    })();
    // #endregion
    try {
      ScrollTrigger.refresh();
    } catch (e1) {
      /* */
    }
  });
}

/**
 * Reveal card inner copy (not in scrub timeline) once burst has mostly played — tied to rAF;
 * for a crisper look you can add these tweens to the same timeline once stable.
 */
export function killScrubbedServiceCardsBurst(ScrollTrigger) {
  "use strict";
  killById(ScrollTrigger || (typeof window !== "undefined" && window.ScrollTrigger));
  resetCardsDom();
  _installed = false;
  var g2 = typeof window !== "undefined" && window.gsap;
  try {
    document.body.classList.remove("epic-burst-below-morph");
  } catch (eBr) {
    /* */
  }
  try {
    if (g2 && _stackLiftEl) {
      g2.set(_stackLiftEl, { clearProps: "zIndex,position" });
    }
  } catch (eLift) {
    /* */
  }
  _stackLiftEl = null;
  try {
    if (typeof window !== "undefined") {
      window.__epicServiceCardsStInstalled = false;
      try {
        delete window.__epicBurstStartScrollY;
      } catch (e0) {
        /* */
      }
    }
  } catch (e) {
    /* */
  }
}

if (typeof window !== "undefined") {
  window.__epicInstallScrubbedServiceCardsBurst = installScrubbedServiceCardsBurst;
  window.__epicKillScrubbedServiceCardsBurst = function __epicKillScrub() {
    killScrubbedServiceCardsBurst(window.ScrollTrigger);
  };
  window.__epicServiceCardsStInstalled = false;
}
