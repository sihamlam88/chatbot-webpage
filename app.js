// Ton token API Hugging Face
const apiToken = "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";

// Fonction pour obtenir une réponse du chatbot via l'API Hugging Face
async function getBotResponse(input) {
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/openai-community/gpt2", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: input, // Le message utilisateur envoyé au chatbot
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();
        return data[0]?.generated_text || "Désolé, je ne peux pas répondre pour le moment.";
    } catch (error) {
        console.error("Erreur lors de la communication avec le chatbot :", error);
        return "Une erreur est survenue. Réessayez plus tard.";
    }
}

// Fonction qui gère l'envoi du message et l'affichage des réponses
async function processInput() {
    const userInput = document.getElementById("userInput").value;

    if (userInput.trim() === "") {
        alert("Veuillez entrer un message !");
        return;
    }

    // Ajoute le message utilisateur au chat
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<div><strong>Vous :</strong> ${userInput}</div>`;

    // Vide le champ de texte
    document.getElementById("userInput").value = "";

    // Obtient la réponse du chatbot
    const botResponse = await getBotResponse(userInput);
    chatbox.innerHTML += `<div><strong>Chatbot :</strong> ${botResponse}</div>`;

    // Garde la vue scrolée vers le bas
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Ajoute un événement pour détecter l'appui sur "Entrée"
document.getElementById("userInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        processInput();
    }
});

