/**
 * Webflow custom code entry. Build: `npm run build` → one file `dist/main.js` (esbuild; `npm run dev` = Parcel + HMR).
 * Load: GSAP core, ScrollTrigger + SplitText (3.x) before this script. (Flip only if other page scripts need it.)
 */
import { bootstrapEpicBodyIntro } from "./body-intro.js";

bootstrapEpicBodyIntro();
