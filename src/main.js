/**
 * EPIC — Webflow custom code entry. Build: `npm run build` → one file `dist/main.js` (esbuild; `npm run dev` = Parcel + HMR).
 * Load: ScrollTrigger + SplitText (3.x) before this script.
 */
import { attachEpicDebugToWindow, isEpicStoryDebug, epicStoryLog } from "./epic-debug.js";
import { bootstrapEpicBodyIntro } from "./body-intro.js";
import { bootstrapEpicStoryAnim } from "./story-anim.js";

attachEpicDebugToWindow();

if (isEpicStoryDebug()) {
  try {
    epicStoryLog("main: bootstraps starting", {
      href: window.location && window.location.href,
      hasGsap: typeof window.gsap !== "undefined",
      hasST: typeof window.ScrollTrigger !== "undefined",
    });
  } catch (e0) {}
}
bootstrapEpicBodyIntro();
bootstrapEpicStoryAnim();
if (isEpicStoryDebug()) {
  try {
    epicStoryLog("main: bootstraps completed", {});
  } catch (e1) {}
}
