
const API_URL = "http://127.0.0.1:5000/tasks";

// ======================================
// LOAD ALL TASKS
// ======================================
async function loadTasks() {

    try {

        const response = await fetch(API_URL);

        const tasks = await response.json();

        const taskList = document.getElementById(
            "task-list"
        );

        taskList.innerHTML = "";

        // ======================================
        // TASK COUNTERS
        // ======================================
        let totalTasks = tasks.length;

        let completedTasks = 0;

        let pendingTasks = 0;

        // ======================================
        // LOOP THROUGH TASKS
        // ======================================
        tasks.forEach(task => {

            // ======================================
            // REMINDER ALERT
            // ======================================

            // GET TODAY DATE
            const today = new Date();

            const todayDate = today.toISOString()
                .split("T")[0];

            // CHECK DUE DATE
            if (
                task.due_date &&
                task.due_date === todayDate &&
                task.status !== "Completed"
            ) {

                // SHOW ALERT
                setTimeout(() => {

                    alert(
                        `⏰ Reminder: "${task.title}" is due today!`
                    );

                    // PLAY SOUND
                    const sound = document.getElementById(
                        "reminder-sound"
                    );

                    if (sound) {

                        sound.play()
                            .catch(error => {
                                console.log(
                                    "Audio blocked by browser:",
                                    error
                                );
                            });
                    }

                }, 500);
            }

            // ======================================
            // COUNTERS
            // ======================================
            if (task.status === "Completed") {

                completedTasks++;

            } else {

                pendingTasks++;
            }

            // ======================================
            // CREATE TASK CARD
            // ======================================
            const taskCard = document.createElement(
                "div"
            );

            taskCard.className = "task-card";

            taskCard.innerHTML = `
                <h3>${task.title}</h3>

                <p>${task.description}</p>

                <p>
                    <strong>Priority:</strong>
                    ${task.priority}
                </p>

                <p>
                    <strong>Due Date:</strong>
                    ${task.due_date || "No Date"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${task.status}
                </p>

                <button class="complete-btn"
                    onclick="completeTask(${task.id})">
                    Complete
                </button>

                <button class="edit-btn"
                    onclick="editTask(
                        ${task.id},
                        '${task.title}',
                        '${task.description}'
                    )">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                </button>
            `;

            taskList.appendChild(taskCard);

        });

        // ======================================
        // UPDATE COUNTERS
        // ======================================
        document.getElementById(
            "total-tasks"
        ).innerText = totalTasks;

        document.getElementById(
            "completed-tasks"
        ).innerText = completedTasks;

        document.getElementById(
            "pending-tasks"
        ).innerText = pendingTasks;

    } catch (error) {

        console.log(
            "Error loading tasks:",
            error
        );

    }
}

// ======================================
// ADD NEW TASK
// ======================================
async function addTask() {

    // TASK TITLE
    const title = document.getElementById(
        "title"
    ).value;

    // TASK DESCRIPTION
    const description = document.getElementById(
        "description"
    ).value;

    // TASK PRIORITY
    const priority = document.getElementById(
        "priority"
    ).value;

    // TASK DUE DATE
    const dueDate = document.getElementById(
        "due-date"
    ).value;

    // VALIDATION
    if (title === "" || description === "") {

        alert("Please fill all fields");

        return;
    }

    try {

        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: title,
                description: description,
                priority: priority,
                due_date: dueDate
            })

        });

        // CLEAR INPUTS
        document.getElementById(
            "title"
        ).value = "";

        document.getElementById(
            "description"
        ).value = "";

        document.getElementById(
            "priority"
        ).value = "Medium";

        document.getElementById(
            "due-date"
        ).value = "";

        // RELOAD TASKS
        loadTasks();

    } catch (error) {

        console.log(
            "Error adding task:",
            error
        );

    }
}

// ======================================
// DELETE TASK
// ======================================
async function deleteTask(id) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        loadTasks();

    } catch (error) {

        console.log(
            "Error deleting task:",
            error
        );

    }
}

// ======================================
// COMPLETE TASK
// ======================================
async function completeTask(id) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: "Completed"
            })

        });

        loadTasks();

    } catch (error) {

        console.log(
            "Error updating task:",
            error
        );

    }
}

// ======================================
// EDIT TASK
// ======================================
async function editTask(
    id,
    oldTitle,
    oldDescription
) {

    const newTitle = prompt(
        "Edit Task Title:",
        oldTitle
    );

    if (newTitle === null) {

        return;
    }

    const newDescription = prompt(
        "Edit Task Description:",
        oldDescription
    );

    if (newDescription === null) {

        return;
    }

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: newTitle,
                description: newDescription
            })

        });

        loadTasks();

    } catch (error) {

        console.log(
            "Error editing task:",
            error
        );

    }
}

// ======================================
// DARK MODE TOGGLE
// ======================================
const themeToggle = document.getElementById(
    "theme-toggle"
);

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle(
        "dark-mode"
    );

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        themeToggle.innerText =
            "☀️ Light Mode";

    } else {

        themeToggle.innerText =
            "🌙 Dark Mode";
    }

});

// ======================================
// LOAD TASKS AUTOMATICALLY
// ======================================
loadTasks();