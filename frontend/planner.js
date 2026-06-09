
// ======================================
// AI SCHEDULE PLANNER
// ======================================
function generateSchedule() {

    // GET INPUT FIELD
    const inputField = document.getElementById(
        "schedule-input"
    );

    // GET VALUE
    const input = inputField.value;

    // OUTPUT BOX
    const output = document.getElementById(
        "schedule-output"
    );

    // VALIDATION
    if (input.trim() === "") {

        alert(
            "Please enter tasks"
        );

        return;
    }

    // SPLIT TASKS
    const tasks = input.split(",");

    // START TIME
    let hour = 9;

    // CLEAR OLD OUTPUT
    output.innerHTML = `
        <h3>
            📅 AI Daily Schedule
        </h3>
    `;

    // GENERATE SCHEDULE
    tasks.forEach(task => {

        output.innerHTML += `

            <p>
                ⏰ ${hour}:00 -
                ${task.trim()}
            </p>

        `;

        hour += 2;
    });

    // CLEAR INPUT BOX
    inputField.value = "";
}
