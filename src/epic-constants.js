/**
 * Body intro: pinned section scroll length as a fraction of viewport height (`end: +=` on the intro pin).
 * Keep this comfortably above ~1 so the scrubbed pin timeline does not outrun the pin when users
 * scroll at normal speed.
 */
export var EPIC_INTRO_PIN_SCROLL_VH = 1.35;

/** Body intro: blue burst + background segment duration on the scrubbed pin timeline (seconds). */
export var EPIC_BLUE_WASH_SCRUB_DURATION = 0.88;

/**
 * Fallback only: when `mergeCircle` label / duration are unavailable, use this fraction of pin
 * progress (0–1) for the re-entry stage opacity ramp. Normally the code uses label time ÷ duration
 * so the ramp lasts through `collapseMeet` (vertical line motion) and ends near merge.
 */
export var EPIC_INTRO_REENTRY_STAGE_FADE_END = 0.38;

/**
 * Story / services (`#story`): IntersectionObserver threshold (0–1) before the reveal runs.
 */
export var EPIC_STORY_IO_THRESHOLD = 0.08;

/**
 * Story / services: animated SVG connector above `.service-card` row. Set to `false` to turn off.
 */
export var EPIC_STORY_SERVICE_RAIL_ENABLED = true;

/**
 * Story / services: max height (px) of the rail SVG in the gap between `.service-statement` and cards.
 * If the measured gap is larger, the SVG is bottom-aligned so it sits just above the cards.
 */
export var EPIC_STORY_SERVICE_RAIL_GAP_PX = 64;
