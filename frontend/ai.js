
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

        alert("Please enter a task");

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

async function chatWithAI() {

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

    // SHOW USER MESSAGE
    responseBox.innerHTML += `

        <div style="margin-top:20px;">

            <p>
                <strong>You:</strong>
                ${input}
            </p>

            <p id="loading-text">
                <strong>AI:</strong>
                Thinking...
            </p>

            <hr>

        </div>
    `;

    try {
const response = await fetch(
    "/ai",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: input
        })
    }
);

        const data = await response.json();

        // REMOVE LOADING TEXT
        const loadingText = document.getElementById(
            "loading-text"
        );

        if (loadingText) {

            loadingText.innerHTML = `
                <strong>AI:</strong>
                ${data.reply || "No response from AI"}
            `;
        }

    } catch (error) {

        responseBox.innerHTML += `

            <p style="color:red;">

                Error: Unable to connect to AI backend

            </p>
        `;
    }

    // CLEAR INPUT
    inputField.value = "";
}