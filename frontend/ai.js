
// ======================================
// AI TASK SUGGESTIONS
// ======================================
function generateSuggestions() {

    const input = document.getElementById(
        "task-input"
    ).value;

    const container = document.getElementById(
        "suggestions-container"
    );

    container.innerHTML = "";

    if (input === "") {

        alert(
            "Please enter a task"
        );

        return;
    }

    const suggestions = [

        `Break "${input}" into smaller tasks`,

        `Set a deadline for "${input}"`,

        `Work on "${input}" for 30 minutes`,

        `Track progress daily for "${input}"`

    ];

    suggestions.forEach(tip => {

        const card = document.createElement(
            "div"
        );

        card.className = "task-card";

        card.innerHTML = `
            <h3>🤖 AI Suggestion</h3>
            <p>${tip}</p>
        `;

        container.appendChild(card);

    });
}

// ======================================
// CHATBOT BUTTON
// ======================================
document.getElementById(
    "send-btn"
).addEventListener(
    "click",
    chatWithAI
);

// ======================================
// AI CHATBOT
// ======================================
function chatWithAI() {

    const inputField = document.getElementById(
        "chat-input"
    );

    const input = inputField.value.trim();

    const responseBox = document.getElementById(
        "chat-response"
    );

    if (input === "") {

        alert(
            "Please type something"
        );

        return;
    }

    let response = "";

    // AI RESPONSES
    if (
        input.toLowerCase().includes("stress")
    ) {

        response =
            "🌿 Take a short break and relax.";

    } else if (
        input.toLowerCase().includes("sad")
    ) {

        response =
            "💙 Better days are coming.";

    } else if (
        input.toLowerCase().includes("study")
    ) {

        response =
            "📚 Study step by step consistently.";

    } else {

        response =
            "🚀 Keep working towards your goals.";
    }

    // SHOW CHAT
    responseBox.innerHTML += `

        <div style="margin-top:20px;">

            <p>
                <strong>You:</strong>
                ${input}
            </p>

            <p>
                <strong>AI:</strong>
                ${response}
            </p>

            <hr>

        </div>
    `;

    // CLEAR INPUT
    inputField.value = "";
}
