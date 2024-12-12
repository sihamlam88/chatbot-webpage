import os

# Get the API key from environment variables
chatbot_api_key = os.getenv("CHATBOT_API_KEY")

# Simulate chatbot interaction (replace this with your actual logic)
def chatbot_response(user_input):
    # Use the chatbot API key to interact with the chatbot API
    if chatbot_api_key:
        # Example: Call to the chatbot API (this is just a simulation)
        return f"Chatbot response to '{user_input}' with API key: {chatbot_api_key}"
    else:
        return "API key not found."

# Example interaction
if __name__ == "__main__":
    user_input = input("Ask the chatbot: ")
    print(chatbot_response(user_input))
