document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("message");

    if (!form || !message) {
        console.error("Form or message element not found!");
        return;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const full_name = document.getElementById("full_name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('/api/register/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ full_name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                message.style.color = "green";
                message.innerText = data.message;
                setTimeout(() => {
                    window.location.href = "/api/login-page/";
                }, 1500);
            } else {
                message.style.color = "red";
                message.innerText = data.error || "Something went wrong";
            }
        } catch (err) {
            message.style.color = "red";
            message.innerText = "An error occurred.";
            console.error(err);
        }
    });
});

// Display field based on user role (admin/user)
const roleSelect = document.getElementById("role");
const adminCodeField = document.getElementById("staffIDField");

roleSelect.addEventListener("change", function () {
    if (this.value === "staff") {
        adminCodeField.style.display = "block";
    } else {
        adminCodeField.style.display = "none";
    }
});

if (roleSelect.value === "staff") {
    adminCodeField.style.display = "block";
}