document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector(".apppointments tbody");
    if (!tableBody) return;

    try {
        const response = await fetch("/api/appointments/"); // JSON API
        const data = await response.json();

        if (!response.ok) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">${data.error || 'Failed to load appointments'}</td></tr>`;
            return;
        }

        if (!data.appointments || data.appointments.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No appointments found</td></tr>`;
            return;
        }

        // Fill table
        tableBody.innerHTML = "";
        data.appointments.forEach(appt => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${appt.service_type}</td>
                <td>${appt.appointment_date}</td>
                <td>${appt.appointment_time}</td>
                <td>${appt.status}</td>
                <td>${appt.notes}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (err) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">Error loading appointments</td></tr>`;
        console.error(err);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById("appointmentForm");
    const serviceInput = document.getElementById("serviceType");
    const dateInput = document.getElementById("appointmentDate");
    const timeInput = document.getElementById("appointmentTime");
    const notesInput = document.getElementById("notes");
    const submitBtn = document.getElementById("submitBooking");
    const cancelBtn = document.getElementById("cancelBooking");

    // Show form when book button is clicked
    document.querySelectorAll(".service-card .book-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const serviceType = e.target.closest(".service-card").dataset.service;
            serviceInput.value = serviceType;
            dateInput.value = "";
            timeInput.value = "";
            notesInput.value = "";
            formContainer.style.display = "block";
            formContainer.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Hide form when cancel is clicked
    cancelBtn.addEventListener("click", () => {
        formContainer.style.display = "none";
    });

    // Submit the form via AJAX
    submitBtn.addEventListener("click", async () => {
        const service_type = serviceInput.value;
        const appointment_date = dateInput.value;
        const appointment_time = timeInput.value;
        const notes = notesInput.value;

        if (!appointment_date || !appointment_time) {
            alert("Please fill in date and time.");
            return;
        }

        try {
            const response = await fetch("/api/create-appointment/", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRFToken": getCookie('csrftoken') },
                body: JSON.stringify({ service_type, appointment_date, appointment_time, notes })
            });
            const data = await response.json();

            if (response.ok) {
                alert("Appointment booked successfully!");
                formContainer.style.display = "none";
                // Optionally: refresh appointments table
            } else {
                alert(data.error || "Failed to book appointment.");
            }
        } catch (err) {
            console.error(err);
            alert("Error booking appointment.");
        }
    });

    // Helper function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
