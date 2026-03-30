import test from "node:test";
import assert from "node:assert/strict";
import { buildParcoursMarkdown } from "../public/kehlmann-reader/export.js";

test("parcours export includes lesson questions and student answers", () => {
  const markdown = buildParcoursMarkdown({
    modeLabel: "Offene Version",
    classroomName: "Klasse 10B",
    studentName: "Nora S.",
    complete: true,
    completedEntries: 12,
    totalEntries: 12,
    lessons: [
      {
        title: "Lektion 11 · Kehlmanns Haltung und persönliche Involvierung",
        summary: "Kehlmann, Verantwortung und Gegenwartsbezug.",
        reviewFocus: "Kehlmanns Haltung sichtbar machen.",
        pageRange: "S. 23-77",
        entries: [
          {
            title: "Humanität im Modus des Deals",
            moduleTitle: "Diplomatie",
            pageHint: "S. 57",
            passageLabel: "Humanität im Modus des Deals",
            context: "Rettung erscheint als Deal.",
            prompts: [
              "Wie macht die Passage Kehlmanns Zugriff auf historische Verantwortung sichtbar?"
            ],
            focusAnswers: [
              {
                prompt: "Wie macht die Passage Kehlmanns Zugriff auf historische Verantwortung sichtbar?",
                answer: "Die Szene zeigt Verantwortung als kalkuliertes politisches Handeln und nicht als reine Humanität."
              }
            ],
            signalWords: ["halbe Million", "Garantie"],
            writingFrame: "Mit Kehlmanns Aussagen gelesen wird deutlich, dass ...",
            theorySections: [
              {
                title: "Sekundärtext: Kehlmanns Rede „Im Steinbruch“",
                sourceTitle: "Festrede Brucknerfest Linz 2018",
                guidingQuestions: [
                  {
                    prompt: "Welche Verbindung stellt Kehlmann zwischen Kunst, Gedenken und politischer Gegenwart her?",
                    answer: "Er verbindet ästhetische Form mit einer ethischen Pflicht zur historischen Gegenwartslektüre."
                  }
                ],
                transferQuestions: [
                  {
                    prompt: "Vergleiche die Passage mit Kehlmanns Aussagen über Gedenken und politische Verantwortung.",
                    answer: "Die Passage zeigt, wie aus Erinnerung ein konkreter politischer Prüfstein für Gegenwart wird."
                  }
                ]
              }
            ],
            documentation: {
              completed: 8,
              total: 9,
              missing: ["Transfer 2: Noch offene Rückbindung an die Passage"]
            },
            answers: {
              observation: "Die Szene koppelt Rettung an Geld und öffentliche Bilder.",
              evidence: "halbe Million, Garantie, Fotograf",
              interpretation: "Kehlmann zeigt bewusst, dass Humanität politisch deformiert wird.",
              theory: "Im Podcast und in Im Steinbruch wird Verantwortung als Gegenwartsfrage markiert.",
              revision: "Noch genauer zeigen, wie Bildpolitik die Szene strukturiert."
            }
          }
        ],
        resources: [
          {
            title: "Kehlmann über Verantwortung und Erzählform",
            sourceTitle: "Daniel Kehlmann: Was ist eine gute Geschichte?",
            summary: "Podcast-Arbeitsstation",
            task: "Arbeite heraus, wie Kehlmann historische Verantwortung und erzählerische Verdichtung verbindet.",
            taskResponse: "Der Podcast zeigt, dass Verdichtung für Kehlmann keine Entlastung, sondern eine präzisere Verantwortung gegenüber dem Stoff ist.",
            questions: [
              {
                prompt: "Wie verbindet Kehlmann Form und Verantwortung?",
                answer: "Form ist für ihn die Voraussetzung dafür, Geschichte erinnerbar und diskutierbar zu machen."
              }
            ],
            documentation: {
              completed: 2,
              total: 2,
              missing: []
            }
          }
        ]
      }
    ]
  });

  assert.match(markdown, /Lektion 11 · Kehlmanns Haltung und persönliche Involvierung/);
  assert.match(markdown, /Fokusfragen und schriftliche Antworten:/);
  assert.match(markdown, /Wie macht die Passage Kehlmanns Zugriff auf historische Verantwortung sichtbar\?/);
  assert.match(markdown, /Antwort: Die Szene zeigt Verantwortung als kalkuliertes politisches Handeln/);
  assert.match(markdown, /Notizbuchfelder:/);
  assert.match(markdown, /Beobachtung: Die Szene koppelt Rettung an Geld und öffentliche Bilder\./);
  assert.match(markdown, /Theoriebezug: Im Podcast und in Im Steinbruch wird Verantwortung als Gegenwartsfrage markiert\./);
  assert.match(markdown, /Leitfragen zu Sekundärtext: Kehlmanns Rede „Im Steinbruch“/);
  assert.match(markdown, /Transfer zur Passage:/);
  assert.match(markdown, /Offene Lücken: Transfer 2: Noch offene Rückbindung an die Passage/);
  assert.match(markdown, /### Ressourcen-Aufträge/);
  assert.match(markdown, /Schriftliche Antwort: Der Podcast zeigt, dass Verdichtung/);
});
