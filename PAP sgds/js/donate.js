document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("donationForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const amount = parseFloat(form.amount.value);
    const method = form.method.value;
    const project = form.project.value;

    if (!name || !email || !amount || !method || !project) {
      alert("Please fill out all fields.");
      return;
    }

    if (amount <= 0) {
      alert("Donation amount must be greater than zero.");
      return;
    }

    alert(`Thank you, ${name}, for your donation of $${amount.toFixed(2)} via ${method.replace("_", " ")} to the "${project.replace("_", " ")}" project!`);

    form.reset();
  });
});
