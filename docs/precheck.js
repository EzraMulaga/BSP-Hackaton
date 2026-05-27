const requirements = {
  sme: [
    { label: "Annual Report" },
    { label: "Business Plan" },
    { label: "IPA Registration" },
    {
      label: "Must be a Green Business",
      note: "A green business reduces environmental impact through clean energy, waste reduction, or eco-friendly operations."
    },
    { label: "Supplier Quote" }
  ],
  partnership: [{ label: "Memorandum of Understanding (MOU)" }],
  individual: [
    { label: "Proof of Income Source" },
    { label: "Age Requirement (18 years or older)" },
    { label: "Active BSP Account Status" },
    { label: "Supplier Quote" }
  ]
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
    <div class="result-badge ${ready ? "ready" : "not-ready"}">
      ${ready ? "Ready to Apply" : "Not Yet Ready"}
    </div>
  `;
}

applicantType.addEventListener("change", () => {
  const selected = applicantType.value;
  checklist.innerHTML = "";
  result.hidden = true;

  if (!selected) return;

  checklist.innerHTML = requirements[selected]
    .map((item, index) => renderChecklistItem(item, index))
    .join("");

  checklist.querySelectorAll('input[type="checkbox"]').forEach((box) => {
    box.addEventListener("change", updateResult);
  });

  updateResult();
  if (window.lucide) window.lucide.createIcons();
});
