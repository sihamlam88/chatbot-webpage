
import { HUGGINGFACE_TOKEN } from './token.js'; // Assure-toi que le fichier token.js existe et contient ton token

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatbox');

// Fonction pour afficher un message dans l'interface
function displayMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', sender);
  messageElement.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Chatbot'}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
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
      throw new Error('Error with the API response.');
    }

    const data = await response.json();
    if (data && data.generated_text) {
      return data.generated_text;
    } else {
      throw new Error('No generated response.');
    }
  } catch (error) {
    console.error(error);
    return "Sorry, something went wrong. Please try again later.";
  }
}

// Gestionnaire d'événements pour le formulaire de chat
chatForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  const userInput = chatInput.value.trim();
  if (userInput) {
    displayMessage('user', userInput); // Affiche le message de l'utilisateur
    chatInput.value = ''; // Vide le champ d'entrée
    displayMessage('bot', 'Thinking...'); // Message temporaire
    const botResponse = await getChatbotResponse(userInput); // Obtenir la réponse du chatbot
    chatMessages.lastElementChild.innerHTML = `<strong>Chatbot:</strong> ${botResponse}`; // Affiche la réponse réelle du bot
  }
});



