const applicationForm = document.getElementById("applicationForm");
const applicationConfirmation = document.getElementById("applicationConfirmation");
const confirmationMessage = document.getElementById("confirmationMessage");

if (applicationForm && applicationConfirmation && confirmationMessage) {
  applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const referenceNumber = Math.floor(1000 + Math.random() * 9000);
    confirmationMessage.textContent = `Application Submitted! Reference: GRN-2025-${referenceNumber}. BSP will contact you within 3–5 business days.`;

    applicationForm.hidden = true;
    applicationConfirmation.hidden = false;
  });
}
