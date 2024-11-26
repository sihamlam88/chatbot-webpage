
// Charger le token Hugging Face depuis token.js
import { HUGGINGFACE_TOKEN } from './token.js';

// Sélecteurs DOM
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// Fonction pour afficher un message dans l'interface
function displayMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll automatiquement
}

// Fonction pour interagir avec l'API Hugging Face
async function getChatbotResponse(userInput) {
  const apiUrl = 'https://api-inference.huggingface.co/models/openai-community/gpt2';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: userInput,
        options: { wait_for_model: true },
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur avec la réponse de l\'API.');
    }

    const data = await response.json();

    // Retourner la réponse générée par le modèle
    if (data && data.generated_text) {
      return data.generated_text;
    } else if (data && data[0]?.generated_text) {
      return data[0].generated_text;
    } else {
      throw new Error('Pas de réponse générée.');
    }
  } catch (error) {
    console.error(error);
    return "Je suis désolé, une erreur est survenue. Réessayez plus tard.";
  }
}

// Gestionnaire d'événements pour le formulaire
chatForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  const userInput = chatInput.value.trim();

  if (userInput) {
    displayMessage('user', userInput); // Affiche le message de l'utilisateur
    chatInput.value = ''; // Vide le champ d'entrée

    displayMessage('bot', 'Je réfléchis...'); // Message temporaire

    const botResponse = await getChatbotResponse(userInput); // Obtenir la réponse du chatbot

    // Remplace le message temporaire par la réponse réelle
    chatMessages.lastElementChild.innerText = botResponse;
  }
});



