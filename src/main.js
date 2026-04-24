/**
 * Webflow custom code entry. Build: `npm run build` → one file `dist/main.js` (esbuild; `npm run dev` = Parcel + HMR).
 * Load: GSAP core, Flip, ScrollTrigger + SplitText (3.x) before this script.
 * Service card scrub is installed from body-intro after the blue field commits (epic-service-cards-handoff).
 */
import { bootstrapEpicBodyIntro } from "./body-intro.js";

bootstrapEpicBodyIntro();