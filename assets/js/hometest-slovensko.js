// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

// ----------------------------
// FULL QUESTION POOL — PohovorObčianstvo (slovenské občianstvo)
// Výber z 800-otázkovej banky produktu /slovensko/.
// Mix ľahších a náročnejších otázok s miernym sklonom k najťažším:
// štátne symboly, reálie SR, Veľká Morava, Uhorsko, národné obrodenie,
// vznik ČSR, štátne zriadenie, ekonomika a UNESCO.
// ----------------------------
const INLINE_TEST_QUESTIONS = [
  {
    q: "Kto je autorom textu štátnej hymny SR „Nad Tatrou sa blýska“?",
    a: [
      "Janko Matúška",
      "Ľudovít Štúr",
      "Pavol Országh Hviezdoslav"
    ],
    correct: 0
  },
  {
    q: "Od ktorého dátumu je euro oficiálnou menou na Slovensku?",
    a: [
      "od 1. januára 2009",
      "od 1. januára 2004",
      "od 1. mája 2004"
    ],
    correct: 0
  },
  {
    q: "Je 1. máj na Slovensku štátnym sviatkom, alebo dňom pracovného pokoja?",
    a: [
      "dňom pracovného pokoja (Sviatok práce)",
      "štátnym sviatkom",
      "bežným pracovným dňom"
    ],
    correct: 0
  },
  {
    q: "Ktorý samosprávny kraj SR hraničí ako jediný s Ukrajinou?",
    a: [
      "Košický aj Prešovský kraj",
      "iba Košický kraj",
      "iba Prešovský kraj"
    ],
    correct: 0
  },
  {
    q: "Ktoré z uvedených miest je centrom regiónu Záhorie?",
    a: [
      "Skalica, Senica aj Malacky — všetky sú záhorské mestá",
      "iba Skalica",
      "iba Malacky"
    ],
    correct: 0
  },
  {
    q: "Ktorá slovenská rieka ako jediná tečie na sever a jej vody končia v Baltskom mori?",
    a: [
      "Poprad",
      "Dunajec",
      "Bodrog"
    ],
    correct: 0
  },
  {
    q: "Aký je najvyšší vrch Veľkej Fatry?",
    a: [
      "Ostredok",
      "Borišov",
      "Ploská"
    ],
    correct: 0
  },
  {
    q: "Ktorý zo susedov SR nie je členom Európskej únie?",
    a: [
      "Ukrajina",
      "Rakúsko",
      "Maďarsko"
    ],
    correct: 0
  },
  {
    q: "Koľko obcí má približne Slovenská republika?",
    a: [
      "približne 2 900",
      "približne 500",
      "približne 10 000"
    ],
    correct: 0
  },
  {
    q: "Ktorý pápež schválil slovanskú liturgiu v rokoch 867–868?",
    a: [
      "Hadrián II.",
      "Ján VIII.",
      "Gregor Veľký"
    ],
    correct: 0
  },
  {
    q: "V ktorom roku sa odohrala bitka pri Bratislave (Brezalauspurc), ktorá znamenala koniec Veľkej Moravy?",
    a: [
      "v roku 907",
      "v roku 863",
      "v roku 1000"
    ],
    correct: 0
  },
  {
    q: "V ktorom roku sa odohrala bitka pri Moháči, v ktorej Osmanská ríša porazila Uhorsko?",
    a: [
      "v roku 1526",
      "v roku 1241",
      "v roku 1683"
    ],
    correct: 0
  },
  {
    q: "Ktorý osvietenský panovník zrušil v roku 1781 nevoľníctvo v Uhorsku a vydal tolerančný patent?",
    a: [
      "Jozef II.",
      "Leopold II.",
      "František I."
    ],
    correct: 0
  },
  {
    q: "Ktoré tri slovenské gymnáziá otvorené v 60. rokoch 19. storočia zatvorila maďarizačná vláda v rokoch 1874–1875?",
    a: [
      "Revúca, Martin, Kláštor pod Znievom",
      "Trnava, Bratislava, Košice",
      "Nitra, Žilina, Trenčín"
    ],
    correct: 0
  },
  {
    q: "Aký dokument o budúcom spoločnom štáte Čechov a Slovákov bol prijatý v USA v roku 1915?",
    a: [
      "Clevelandská dohoda",
      "Pittsburská dohoda",
      "Martinská deklarácia"
    ],
    correct: 0
  },
  {
    q: "Koľko poslancov má Národná rada SR?",
    a: [
      "150",
      "100",
      "200"
    ],
    correct: 0
  },
  {
    q: "O akých otázkach NEMOŽNO konať referendum v SR?",
    a: [
      "o základných právach a slobodách, o daniach a odvodoch, o štátnom rozpočte",
      "o vstupe do medzinárodných zväzov",
      "o zmene Ústavy SR"
    ],
    correct: 0
  },
  {
    q: "Kto je autorom hrdinskej básnickej skladby „Mor ho!“ z roku 1864?",
    a: [
      "Samo Chalupka",
      "Janko Kráľ",
      "Ján Botto"
    ],
    correct: 0
  },
  {
    q: "Koľko lokalít zo Slovenska je zapísaných v Zozname svetového dedičstva UNESCO?",
    a: [
      "osem lokalít",
      "päť lokalít",
      "dvanásť lokalít"
    ],
    correct: 0
  },
  {
    q: "Aká je základná sadzba dane z pridanej hodnoty (DPH) v SR?",
    a: [
      "23 %",
      "20 %",
      "19 %"
    ],
    correct: 0
  }
];

// ----------------------------
// SHUFFLE — runs before DOM logic
// ----------------------------
function shuffleAnswers(question) {
  const combined = question.a.map((opt, index) => ({
    text: opt,
    isCorrect: index === question.correct
  }));
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  question.a = combined.map(item => item.text);
  question.correct = combined.findIndex(item => item.isCorrect);
}

INLINE_TEST_QUESTIONS.forEach(q => shuffleAnswers(q));

// ----------------------------
// BUILD ROWS (after shuffle so object references are stable)
// ----------------------------
const rows = [];
for (let i = 0; i < INLINE_TEST_QUESTIONS.length; i += QUESTIONS_PER_ROW) {
  rows.push(INLINE_TEST_QUESTIONS.slice(i, i + QUESTIONS_PER_ROW));
}

// ----------------------------
// ALL DOM LOGIC INSIDE DOMContentLoaded
// ----------------------------
document.addEventListener("DOMContentLoaded", function () {

  const totalQuestions    = INLINE_TEST_QUESTIONS.length;
  let correctCount        = 0;
  let wrongCount          = 0;
  let answeredCount       = 0;
  let currentRow          = 0;

  const rowAnsweredCounts = new Array(rows.length).fill(0);

  const container = document.getElementById("inline-test-questions");
  if (!container) {
    console.error("hometest-slovensko: #inline-test-questions not found in DOM.");
    return;
  }

  // ----------------------------
  // PROGRESS
  // ----------------------------
  function updateProgressDisplay() {
    const el = document.getElementById("inline-progress-text");
    if (el) el.textContent = "Pokrok: " + answeredCount + " / " + totalQuestions + " otázok";
  }

  function updateProgressBar() {
    const bar = document.getElementById("inline-progressbar");
    if (bar) bar.style.width = ((answeredCount / totalQuestions) * 100) + "%";
  }

  // ----------------------------
  // END CARD
  // ----------------------------
  function createDonutChart() {
    const pct = Math.round((correctCount / totalQuestions) * 100);
    const C   = 2 * Math.PI * 40;
    return (
      '<div class="donut-wrapper">' +
        '<svg width="120" height="120" viewBox="0 0 100 100">' +
          '<circle cx="50" cy="50" r="40" stroke="#daeeff" stroke-width="12" fill="none"></circle>' +
          '<circle cx="50" cy="50" r="40" stroke="#0B4EA2" stroke-width="12" fill="none"' +
            ' stroke-dasharray="' + ((pct / 100) * C) + ' ' + ((1 - pct / 100) * C) + '"' +
            ' transform="rotate(-90 50 50)" stroke-linecap="round"></circle>' +
        '</svg>' +
        '<div class="donut-center">' + pct + '%</div>' +
      '</div>'
    );
  }

  function createEndCard() {
    const pct  = Math.round((correctCount / totalQuestions) * 100);
    const card = document.createElement("div");
    card.className = "inline-question-card end-card";
    const title =
      pct >= 80 ? "Výborná práca!" :
      pct >= 50 ? "Dobrý výsledok!" :
      pct >= 25 ? "Dobrý začiatok!" :
      "Treba trénovať ďalej!";
    card.innerHTML =
      "<h3>" + title + "</h3>" +
      createDonutChart() +
      "<p>Práve ste vyskúšali len ukážku našich otázok. " +
      "Získajte prístup k <strong>800 otázkam, 300 článkom s AI hodnotením a simuláciám pohovoru</strong> a pripravte sa systematicky.</p>" +
      '<a href="https://civiclearn.com/slovensko/checkout" class="hero-primary-btn">Získať plný prístup</a>';
    return card;
  }

  // ----------------------------
  // RENDER
  // ----------------------------
  function renderRow(rowIndex) {
    if (!rows[rowIndex]) return;
    rows[rowIndex].forEach(function (q, offset) {
      var absoluteIndex = rowIndex * QUESTIONS_PER_ROW + offset;
      container.appendChild(createQuestionCard(q, absoluteIndex, rowIndex));
    });
  }

  function createQuestionCard(questionObj, absoluteIndex, rowIndex) {
    var card = document.createElement("div");
    card.className = "inline-question-card";

    var title = document.createElement("h3");
    title.textContent = questionObj.q;
    card.appendChild(title);

    var feedback = document.createElement("div");
    feedback.className = "inline-feedback";

    questionObj.a.forEach(function (opt, i) {
      var btn = document.createElement("button");
      btn.className = "inline-option-btn";
      btn.textContent = opt;

      btn.onclick = function () {
        answeredCount++;
        rowAnsweredCounts[rowIndex]++;
        updateProgressDisplay();
        updateProgressBar();

        var allBtns = card.querySelectorAll("button");
        allBtns.forEach(function (b) { b.disabled = true; });

        if (i === questionObj.correct) {
          correctCount++;
          btn.style.background  = "rgba(24, 160, 110, 0.15)";
          btn.style.borderColor = "#18a06e";
          btn.style.color       = "#14805a";
          feedback.textContent  = "Správne!";
          feedback.classList.add("inline-correct");
        } else {
          wrongCount++;
          btn.style.background  = "rgba(230, 57, 70, 0.12)";
          btn.style.borderColor = "#e63946";
          btn.style.color       = "#c5303b";
          allBtns[questionObj.correct].style.background  = "rgba(24, 160, 110, 0.15)";
          allBtns[questionObj.correct].style.borderColor = "#18a06e";
          allBtns[questionObj.correct].style.color       = "#14805a";
          feedback.textContent = "Správna odpoveď: " + questionObj.a[questionObj.correct];
          feedback.classList.add("inline-wrong");
        }

        card.appendChild(feedback);

        if (absoluteIndex === totalQuestions - 1) {
          setTimeout(function () { container.appendChild(createEndCard()); }, 300);
          return;
        }

        var rowSize = rows[rowIndex].length;
        if (rowAnsweredCounts[rowIndex] === rowSize) {
          currentRow++;
          setTimeout(function () { renderRow(currentRow); }, 150);
        }
      };

      card.appendChild(btn);
    });

    return card;
  }

  // ----------------------------
  // INIT
  // ----------------------------
  renderRow(0);
  updateProgressDisplay();
  updateProgressBar();

}); // end DOMContentLoaded
