document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("message");
    const roleSelect = document.getElementById("role");
    const specialityWrapper = document.getElementById("specialityField");
    const hospitalWrapper = document.getElementById("hospitalIdField");

    if (!form || !message || !roleSelect) return;

    // Toggle doctor-only fields
    function toggleDoctorFields() {
        if (roleSelect.value === "doctor") {
            specialityWrapper.style.display = "block";
            hospitalWrapper.style.display = "block";
        } else {
            specialityWrapper.style.display = "none";
            hospitalWrapper.style.display = "none";
        }
    }

    toggleDoctorFields(); // Initial check
    roleSelect.addEventListener("change", toggleDoctorFields);

    // Handle form submit
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const payload = {
            full_name: document.getElementById("full_name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: roleSelect.value,
            phone_number: document.getElementById("phone_number").value,
            speciality: document.getElementById("speciality")?.value || "",
            hospital_id: document.getElementById("hospital_id")?.value || ""
        };

        try {
            const response = await fetch("/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
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
                message.innerText = data.error;
            }
        } catch (err) {
            message.style.color = "red";
            message.innerText = "Something went wrong";
            console.error(err);
        }
    });
});
