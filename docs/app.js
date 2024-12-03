// Import the Hugging Face token
import { HUGGINGFACE_TOKEN } from './token.js';

// Get references to DOM elements
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatbox');

// Function to display a message in the chatbox
function displayMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', sender);
  messageElement.innerHTML = `<strong>${sender === 'user' ? 'You' : 'Chatbot'}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to interact with Hugging Face API
async function getChatbotResponse(userInput) {
  const apiUrl = 'https://api-inference.huggingface.co/models/gpt2-medium';
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: userInput,
        options: {
          wait_for_model: true,
          use_cache: false,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error Response: ${errorText}`);
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
    return "The chatbot couldn't generate a response. Please try again.";
  }
}

// Event listener for form submission
chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userInput = chatInput.value.trim();

  if (!userInput) {
    displayMessage('bot', 'Please enter something.');
    return;
  }

  displayMessage('user', userInput);
  chatInput.value = '';
  displayMessage('bot', 'Thinking...');

  const botResponse = await getChatbotResponse(userInput);
  chatMessages.lastElementChild.innerHTML = `<strong>Chatbot:</strong> ${botResponse}`;
});

