const chatbox = document.getElementById('chatbox');
const inputBox = document.getElementById('inputBox');

// Simple responses based on keywords
const responses = {
    "hi": "Hello! How can I help you?",
    "hello": "Hi there! What can I assist you with?",
    "how are you": "I'm just a chatbot, but I'm doing fine! How about you?",
    "bye": "Goodbye! Have a great day!",
    "default": "Sorry, I don't understand that. Can you try asking something else?"
};

function getBotResponse(userInput) {
    // Normalize input to lowercase and remove extra spaces
    const normalizedInput = userInput.toLowerCase().trim();
    
    // Return a response based on the keyword match
    return responses[normalizedInput] || responses["default"];
}

function addMessageToChatbox(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom of the chat
}

inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && inputBox.value.trim() !== '') {
        const userInput = inputBox.value.trim();
        addMessageToChatbox(userInput, 'user');  // Show user message
        const botResponse = getBotResponse(userInput);  // Get bot response
        addMessageToChatbox(botResponse, 'bot');  // Show bot message
        inputBox.value = '';  // Clear the input box
    }
});
