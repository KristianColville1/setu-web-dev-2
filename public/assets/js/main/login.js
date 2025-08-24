/**
 * Handles login form submission via AJAX.
 * Submits credentials as JSON, processes server response,
 * and displays error messages or redirects on success.
 */

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Attaches submit handler to the login form.
   * Prevents default submission, sends credentials via fetch,
   * and handles success/error UI updates.
   */
  const form = document.querySelector("form[action='/authenticate']");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Remove any previous alert
    let alert = form.querySelector(".login-error-alert");
    if (alert) alert.remove();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data to be sent:", data);

    try {
      const response = await fetch("/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.redirect) {
        window.location.href = result.redirect;
      } else {
        // Insert alert under password field
        const passwordField = form.querySelector("input[name='password']");
        if (passwordField) {
          alert = document.createElement("div");
          alert.className = "notification is-danger login-error-alert";
          alert.textContent = result.error || "Incorrect email/password";
          passwordField.parentElement.insertAdjacentElement("afterend", alert);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  });
});
