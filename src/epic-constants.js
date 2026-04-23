/**
 * Tuned together: body intro pin length vs #story scrub (ScrollTrigger `end: +=` multipliers).
 * pinStart: when the story pin begins (e.g. "top 80%" = when the section top hits 80% from viewport top; earlier in the document scroll than "top top").
 * scrub: `true` = playhead locked to scroll. A number (e.g. 0.1) = smooth "catch up" in seconds, which
 *   can desync st.progress vs timeline.progress during scrub (see H2 in debug-9fb82f.log). Optional small
 *   number only if you prefer eased lag over perfect sync.
 * scrub vh: scroll distance (px) for the full 0–1 ST progress; higher = more pixels per same timeline.
 * To sit the static service card row “higher” in the section, nudge in Webflow (e.g. margin on `.service-cards`, section padding) — the script measures the live layout.
 */
export var EPIC_INTRO_PIN_SCROLL_VH = 0.72;
export var EPIC_STORY_PIN_START = "top 80%";
export var EPIC_STORY_SCRUB_SMOOTH = true;
/** Full #story pin scroll (px) ≈ vh * this. Higher = more wheel travel for the same 0..1 story = scroll-led, slower per notch. */
export var EPIC_STORY_SCRUB_SCROLL_VH = 2.1;
/**
 * Reserved for other bundles / future use. `story-anim.js` runs the service-block 0→1 on the
 * #story pin timeline (t=0) so it scrubs with the proxy morph, not a separate window ScrollTrigger.
 */
export var EPIC_SERVICE_FADE_ST_START = "top bottom";
export var EPIC_SERVICE_FADE_ST_END = "top 50%";
export var EPIC_SERVICE_FADE_SCRUB = 0.2;
