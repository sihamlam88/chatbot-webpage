const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const chatOutput = document.getElementById("chat-output");

// L'URL de l'API Hugging Face
const apiURL = "https://api-inference.huggingface.co/models/openai-community/gpt2";

// Fonction pour envoyer une requête à Hugging Face
async function sendMessage(message) {
    // Récupération du token depuis une variable d'environnement (via GitHub Secrets)
    const apiToken = process.env.HUGGINGFACE_TOKEN;

    const headers = {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json",
    };

    const body = JSON.stringify({
        inputs: message,
    });

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`);
        }

        const data = await response.json();
        if (data && data.generated_text) {
            return data.generated_text;
        } else {
            return "Je n'ai pas compris. Pouvez-vous reformuler ?";
        }
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        return "Une erreur est survenue. Réessayez plus tard.";
    }
}

// Gérer l'envoi de message
sendButton.addEventListener("click", async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) {
        return;
    }

    // Affiche le message de l'utilisateur
    chatOutput.innerHTML += `<p><strong>Vous :</strong> ${userMessage}</p>`;

    // Envoie le message au chatbot et récupère la réponse
    const botReply = await sendMessage(userMessage);

    // Affiche la réponse du bot
    chatOutput.innerHTML += `<p><strong>Chatbot :</strong> ${botReply}</p>`;

    // Efface l'entrée utilisateur
    chatInput.value = "";
});


