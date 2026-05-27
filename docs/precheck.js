const requirements = {
  sme: {
    items: [
      { label: "Annual Report" },
      { label: "Business Plan" },
      { label: "IPA Registration" },
      {
        label: "Must be a Green Business that supports ESG principles",
        note: "ESG stands for Environmental, Social, and Governance, covering responsible business practices such as sustainability, community impact, and good management."
      },
      { label: "Supplier Quote" }
    ],
    infoCards: [
      { title: "Equity Contribution", detail: "Capital equity contribution must be at least 10% of the loan amount." },
      { title: "Loan Terms", detail: "Available repayment period: 2 to 5 years." }
    ]
  },
  partnership: {
    items: [{ label: "Memorandum of Understanding (MOU)" }],
    infoCards: []
  },
  individual: {
    items: [
      {
        label: "Proof of Income Source",
        note: "If rural applicant, collateral options may be negotiated (e.g. land, assets)."
      },
      {
        label: "Cooperative or Registered Association membership (IPA-registered)",
        note: "Especially relevant for rural applicants as an alternative collateral pathway."
      },
      { label: "Active BSP Account Status" },
      { label: "Supplier Quote" },
      { label: "BSP Savings Account held with BSP" }
    ],
    infoCards: [
      { title: "Equity Contribution", detail: "Equity contribution must be at least 5% of the loan amount." },
      { title: "Loan Terms", detail: "Available repayment period: 3 to 7 years." }
    ]
  }
};

const applicantType = document.getElementById("applicantType");
const checklist = document.getElementById("checklist");
const result = document.getElementById("result");

function renderChecklistItem(data, index) {
  return `
    <div class="check-item">
      <input type="checkbox" id="req-${index}" name="requirement-${index}" />
      <div>
        <label for="req-${index}">
          ${data.label}
          ${
            data.note
              ? `<button class="tooltip" type="button" aria-label="More information" aria-describedby="tip-${index}">
                  <i data-lucide="info" aria-hidden="true"></i>
                  <span id="tip-${index}" role="tooltip">${data.note}</span>
                </button>`
              : ""
          }
        </label>
        ${data.note ? `<p class="hint">Select or hover the info icon for qualification guidance.</p>` : ""}
      </div>
    </div>
  `;
}

function renderInfoCard(card) {
  return `
    <div class="info-card">
      <p class="info-card-title">${card.title}</p>
      <p>${card.detail}</p>
    </div>
  `;
}

function updateResult() {
  const boxes = checklist.querySelectorAll('input[type="checkbox"]');
  const checked = checklist.querySelectorAll('input[type="checkbox"]:checked').length;
  const total = boxes.length;

  if (!total) {
    result.hidden = true;
    return;
  }

  const score = Math.round((checked / total) * 100);
  const ready = checked === total;
  result.hidden = false;
  result.innerHTML = `
    <strong>Readiness Score: ${checked}/${total} (${score}%)</strong>
    <div class="progress-track" role="progressbar" aria-valuenow="${score}" aria-valuemin="0" aria-valuemax="100" aria-label="Pre-check readiness">
      <div class="progress-bar" style="width: ${score}%"></div>
    </div>
    ${
      ready
        ? `<a class="cta-btn cta-primary result-action" href="application.html">Proceed to Application <span aria-hidden="true">→</span></a>`
        : `<div class="result-badge not-ready">Not Yet Ready</div>`
    }
  `;
}

applicantType.addEventListener("change", () => {
  const selected = applicantType.value;
  checklist.innerHTML = "";
  result.hidden = true;

  if (!selected) return;

  const config = requirements[selected];
  const checklistMarkup = config.items.map((item, index) => renderChecklistItem(item, index)).join("");
  const infoMarkup = config.infoCards.length
    ? `<div class="info-cards">${config.infoCards.map((card) => renderInfoCard(card)).join("")}</div>`
    : "";

  checklist.innerHTML = `${checklistMarkup}${infoMarkup}`;

  checklist.querySelectorAll('input[type="checkbox"]').forEach((box) => {
    box.addEventListener("change", updateResult);
  });

  updateResult();
  if (window.lucide) window.lucide.createIcons();
});
