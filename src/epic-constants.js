/**
 * Body intro: pinned section scroll length as a fraction of viewport height (`end: +=` on the intro pin).
 * Keep this comfortably above ~1 so the scrubbed pin timeline does not outrun the pin when users
 * scroll at normal speed.
 */
export var EPIC_INTRO_PIN_SCROLL_VH = 2.35;

/** Body intro: blue burst + background segment duration on the scrubbed pin timeline (seconds). */
export var EPIC_BLUE_WASH_SCRUB_DURATION = 0.88;

/**
 * Fallback only: when `mergeCircle` label / duration are unavailable, use this fraction of pin
 * progress (0–1) for the re-entry stage opacity ramp. Normally the code uses label time ÷ duration
 * so the ramp lasts through `collapseMeet` (vertical line motion) and ends near merge.
 */
export var EPIC_INTRO_REENTRY_STAGE_FADE_END = 0.38;
