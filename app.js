// app.js

async function getChatbotResponse(userInput) {
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY`,  // Replace with your actual OpenAI API Key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // or the appropriate model you're using
                prompt: userInput,
                max_tokens: 100,  // Adjust token limit as needed
                temperature: 0.7, // Adjust as needed for creativity
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data.choices[0].text;  // Assuming you're returning the response text
    } catch (error) {
        console.error('Error with the API response:', error);
        return "Sorry, there was an issue with the chatbot.";
    }
}

// Handle form submission and interaction with the chatbot
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    const userInput = document.querySelector("#userInput").value;
    const response = await getChatbotResponse(userInput);
    console.log("Chatbot response:", response);
    document.querySelector("#chatResponse").textContent = response; // Display response on page
});
