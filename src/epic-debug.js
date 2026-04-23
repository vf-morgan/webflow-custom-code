/**
 * Gated console helpers for the EPIC handoff. Enable in staging with any of:
 * - URL: any query/hash containing "epicDebug" (e.g. ?epicDebug=1) — logs scrub (bucketed ~5%), lifecycle, and timeline setup
 * - localStorage: epicDebugStory=1
 * - window.__EPIC_DEBUG_STORY = true
 * - In DevTools, run: `__epicEnableStoryDebug()` (defined in attachEpicDebugToWindow) then reload
 * Verbose (extra, e.g. onRefresh, velocity in scrub): "epicDebugVerbose" in URL/hash or localStorage epicDebugStoryVerbose=1
 */
function urlStringForDebug() {
  if (typeof window === "undefined" || !window.location) {
    return "";
  }
  try {
    return (window.location.search || "") + (window.location.hash || "");
  } catch (e) {
    return "";
  }
}

function queryLooksLikeEpicDebugOn() {
  if (/epicDebug/i.test(urlStringForDebug())) {
    return true;
  }
  try {
    if (window.location && /epicDebug/i.test(String(window.location.href || ""))) {
      return true;
    }
  } catch (e) {}
  return false;
}

export function isEpicStoryDebug() {
  if (typeof window === "undefined") {
    return false;
  }
  if (window.__EPIC_DEBUG_STORY === true) {
    return true;
  }
  try {
    if (window.localStorage && window.localStorage.getItem("epicDebugStory") === "1") {
      return true;
    }
  } catch (e) {}
  if (queryLooksLikeEpicDebugOn()) {
    return true;
  }
  return false;
}

export function isEpicStoryDebugVerbose() {
  if (typeof window === "undefined") {
    return false;
  }
  if (window.__EPIC_DEBUG_STORY_VERBOSE === true) {
    return true;
  }
  try {
    if (window.localStorage && window.localStorage.getItem("epicDebugStoryVerbose") === "1") {
      return true;
    }
  } catch (e) {}
  try {
    if (/epicDebugVerbose/i.test(urlStringForDebug())) {
      return true;
    }
  } catch (e) {}
  return false;
}

export function epicStoryLog(phase, data) {
  if (!isEpicStoryDebug() || typeof window === "undefined" || !window.console) {
    return;
  }
  var t =
    typeof performance !== "undefined" && typeof performance.now === "function"
      ? Math.round(performance.now())
      : 0;
  try {
    if (data !== void 0) {
      console.log("[epic-story]", t + "ms", String(phase || ""), data);
    } else {
      console.log("[epic-story]", t + "ms", String(phase || ""));
    }
  } catch (e) {}
}

/** Exposes a single console command so URL/query issues do not block debugging. */
export function attachEpicDebugToWindow() {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.__epicEnableStoryDebug = function () {
      try {
        window.__EPIC_DEBUG_STORY = true;
        if (window.localStorage) {
          localStorage.setItem("epicDebugStory", "1");
          localStorage.setItem("epicDebugStoryVerbose", "1");
        }
      } catch (e) {}
      try {
        if (window.console) {
          console.info("[epic] Story debug + verbose enabled — reloading");
        }
      } catch (e2) {}
      window.location.reload();
    };
  } catch (e) {}
}

export function br(el) {
  if (!el || !el.getBoundingClientRect) {
    return null;
  }
  try {
    var r = el.getBoundingClientRect();
    return {
      left: Math.round(r.left * 10) / 10,
      top: Math.round(r.top * 10) / 10,
      w: Math.round(r.width * 10) / 10,
      h: Math.round(r.height * 10) / 10,
    };
  } catch (e) {
    return null;
  }
}
