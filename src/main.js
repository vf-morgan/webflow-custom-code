/**
 * Webflow custom code entry. Build: `npm run build` → one file `dist/main.js` (esbuild; `npm run dev` = Parcel + HMR).
 * Load: GSAP core + ScrollTrigger + SplitText before this script (SplitText for body-intro; story uses GSAP only).
 */
import { bootstrapEpicBodyIntro } from "./body-intro.js";
import { bootstrapEpicStoryServices } from "./epic-story-services.js";

bootstrapEpicBodyIntro();
bootstrapEpicStoryServices();
