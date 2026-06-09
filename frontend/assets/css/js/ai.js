
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", chatWithAI);

async function chatWithAI() {

    const inputField = document.getElementById("chat-input");

    const input = inputField.value.trim();

    const responseBox = document.getElementById("chat-response");

    if (input === "") {
        return;
    }

    responseBox.innerHTML += `
        <div style="margin-top:15px;text-align:right;">
            <p style="background:#0d6efd;color:white;padding:10px;border-radius:10px;display:inline-block;">
                <strong>You:</strong> ${input}
            </p>
        </div>
    `;

    inputField.value = "";

    try {

        const response = await fetch("/ai", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: input
            })

        });

        const data = await response.json();

        responseBox.innerHTML += `
            <div style="margin-top:15px;text-align:left;">
                <p style="background:#f1f1f1;padding:10px;border-radius:10px;display:inline-block;">
                    <strong>AI:</strong> ${data.reply}
                </p>
            </div>
        `;

    } catch (error) {

        responseBox.innerHTML += `
            <div style="margin-top:15px;color:red;">
                <p>
                    <strong>Error:</strong>
                    Unable to connect to AI backend
                </p>
            </div>
        `;
    }
}
