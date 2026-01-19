document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    if (!form) return; // Safety check

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('/api/login/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                message.style.color = "green";
                message.innerText = data.message;

                // Redirect after login
                setTimeout(() => {
                    window.location.href = "/api/appointments-page/"; // Redirect to appointments page
                }, 1000);
            } else {
                message.style.color = "red";
                message.innerText = data.error || "Login failed";
            }
        } catch (err) {
            message.style.color = "red";
            message.innerText = "Something went wrong, try again.";
        }
    });
});
