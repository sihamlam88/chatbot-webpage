import { HUGGINGFACE_TOKEN } from './token.js';

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatbox');

// Fonction pour afficher un message
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
    if (data && data.length > 0 && data[0].generated_text) {
      return data[0].generated_text;
    } else {
      throw new Error('No generated response.');
    }
  } catch (error) {
    console.error(error);
    return "The chatbot couldn't generate a response. Please try again.";
  }
}

// Gestionnaire d'événements pour le formulaire de chat
chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userInput = chatInput.value.trim();

  // Check for empty input and display a warning if needed
  if (!userInput) {
    displayMessage('bot', 'Please enter something.');
    return; // Stop further execution
  }

  displayMessage('user', userInput);
  chatInput.value = ''; // Clear input field
  displayMessage('bot', 'Thinking...'); // Show thinking message
  const botResponse = await getChatbotResponse(userInput);
  chatMessages.lastElementChild.innerHTML = `<strong>Chatbot:</strong> ${botResponse}`; // Replace thinking message with response
});
