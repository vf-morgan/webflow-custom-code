const fs = require("fs");
const p = "C:/Users/mever/webflow-custom-code/src/body-intro.js";
const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
const iStart = lines.findIndex((l) => l.replace(/\r$/, "") === "      if (animationParent) {");
const iElse = lines.findIndex((l, i) => i > iStart && l.replace(/\r$/, "").trim() === "} else {");
if (iStart < 0 || iElse < 0) {
  console.error("markers", iStart, iElse);
  process.exit(1);
}
const newBlock = [
  "      if (animationParent) {",
  "        /** #story: blue + Flip handoff are disabled. One ST = value-prop pinTl only. */",
  "        var endAp = Math.max(2, Math.round((window.innerHeight || 800) * EPIC_INTRO_PIN_SCROLL_VH));",
  "        ScrollTrigger.create({",
  "          id: EPIC_MAIN_ANIM_ST_ID,",
  "          trigger: animationParent,",
  '          start: "top top",',
  '          end: "+=" + endAp,',
  "          pin: true,",
  "          pinSpacing: true,",
  "          scrub: 0.55,",
  "          animation: pinTl,",
  "          anticipatePin: 0,",
  "          invalidateOnRefresh: true,",
  "          onEnter: refreshCursorDx,",
  "          onEnterBack: refreshCursorDx,",
  "          onRefresh: function (st0) {",
  "            if (st0 && st0.progress > 0.001) {",
  "              refreshCursorDx();",
  "            }",
  "          },",
  "        });",
  "        pinBlueWashScroll.onUpdate = function () {",
  "        };",
];
const out = lines.slice(0, iStart).concat(newBlock, lines.slice(iElse));
fs.writeFileSync(p, out.join("\n"), "utf8");
console.log("OK replaced lines", iStart + 1, "to", iElse, "->", newBlock.length, "new lines");
