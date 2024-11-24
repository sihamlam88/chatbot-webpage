const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const chatOutput = document.getElementById("chat-output");

let HUGGINGFACE_TOKEN;

// Charger le token à partir du fichier généré par GitHub Actions
fetch('./token.js')
    .then(response => response.text())
    .then(data => {
        eval(data); // Exécute le contenu de token.js pour initialiser HUGGINGFACE_TOKEN
    })
    .catch(error => console.error("Erreur lors du chargement du token :", error));

const apiURL = "https://api-inference.huggingface.co/models/openai-community/gpt2";

async function sendMessage(message) {
    if (!HUGGINGFACE_TOKEN) {
        return "Le token n'est pas disponible. Réessayez plus tard.";
    }

    const headers = {
        "Authorization": `Bearer ${HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
    };

    const body = JSON.stringify({ inputs: message });

    try {
        const response = await fetch(apiURL, { method: "POST", headers, body });
        if (!response.ok) throw new Error(`Erreur : ${response.status}`);

        const data = await response.json();
        return data.generated_text || "Je n'ai pas compris. Pouvez-vous reformuler ?";
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        return "Une erreur est survenue. Réessayez plus tard.";
    }
}

sendButton.addEventListener("click", async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatOutput.innerHTML += `<p><strong>Vous :</strong> ${userMessage}</p>`;
    const botReply = await sendMessage(userMessage);
    chatOutput.innerHTML += `<p><strong>Chatbot :</strong> ${botReply}</p>`;
    chatInput.value = "";
});



