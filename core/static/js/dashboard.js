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
                <td>${appt.appointment_data}</td>
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
