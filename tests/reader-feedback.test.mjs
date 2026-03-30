import test from "node:test";
import assert from "node:assert/strict";
import { evaluateReaderSebFeedback } from "../src/services/reader-feedback.mjs";

test("SEB feedback rewards close analytical reading with theory integration", () => {
  const result = evaluateReaderSebFeedback({
    lessonId: "lesson-auftakt",
    moduleId: "auftakt",
    entryId: "auftakt-2",
    theoryId: "naturalismus",
    note: {
      observation:
        "Die Passage bindet Thiel eng an Arbeit, Körper und Gleise; schon die Bildgebung der Bahnumgebung macht sichtbar, dass seine Existenz kaum vom Dienst zu trennen ist.",
      evidence:
        "Arbeit, Körper, Pfosten, Gleise",
      interpretation:
        "Die Szene zeigt nicht nur einen Beruf, sondern inszeniert eine Determinierung der Figur, weil der Text Thiels Körper über die Arbeitswelt lesbar macht. Gerade dadurch wird seine innere Verletzlichkeit nicht psychologisch erklärt, sondern aus den äußeren Bedingungen entwickelt.",
      theory:
        "Naturalistisch ist die Passage, weil Milieu, Arbeit und körperliche Belastung zusammenwirken. Die Wortwahl zu Gleisen und Pfosten verdeutlicht, dass die Figur als Produkt sozialer und materieller Wirklichkeit erscheint.",
      revision:
        "Ich will die These noch präzisieren und genauer zeigen, wodurch die Wortwahl Arbeit und innere Gefährdung miteinander verschränkt."
    }
  });

  assert.ok(result.overallScore >= 70);
  assert.equal(result.profile.find((item) => item.label === "Textbindung").level === "sehr stark" || result.profile.find((item) => item.label === "Textbindung").level === "tragfähig", true);
  assert.ok(result.strengths.some((item) => item.includes("textinternen Spur")));
  assert.ok(result.cautions.some((item) => item.includes("Theorie-Linse")));
  assert.ok(result.nextMoves.length > 0);
});

test("SEB feedback diagnoses vague summary and pushes toward interpretive sharpening", () => {
  const result = evaluateReaderSebFeedback({
    lessonId: "lesson-gewalt",
    moduleId: "lene",
    entryId: "lene-2",
    theoryId: "perspektive",
    note: {
      observation:
        "Man merkt, dass es schwierig ist und dass Lene irgendwie streng ist.",
      evidence:
        "",
      interpretation:
        "Dann passiert wieder etwas Unangenehmes und es ist insgesamt sehr heftig und traurig.",
      theory:
        "Das hat mit Perspektive zu tun.",
      revision:
        "Ich will es besser machen."
    }
  });

  assert.ok(result.overallScore < 65);
  assert.equal(result.profile.find((item) => item.label === "Deutungstiefe").level, "noch deutlich zu schärfen");
  assert.ok(result.cautions.some((item) => item.includes("Ereignisabfolge") || item.includes("Wertwörter")));
  assert.ok(result.nextMoves.some((item) => item.includes("Wirkungsverb") || item.includes("Signal")));
  assert.ok(result.summary.includes("textgestützten Interpretation"));
});
