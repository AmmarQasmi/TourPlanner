from flask import Flask, request, jsonify  # Importing necessary modules from Flask
import requests  # For making HTTP requests to the Hugging Face API
import time  # To pause execution between retries
from flask_cors import CORS  # Import CORS

from dotenv import load_dotenv
import os
load_dotenv()  # Load variables from .env file


app = Flask(__name__)  # Create a Flask app instance

# Enable CORS for the /chat route, allowing only requests from the React app
CORS(app, resources={r"/chat": {"origins": ["http://localhost:5173", "http://localhost:5001"]}})

# Hugging Face API details
HF_API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill" 

# HF_API_TOKEN = "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"  # Your Hugging Face API token
HF_API_TOKEN = os.getenv("HF_API_TOKEN")  # Access the variable


# Setting up the authorization header with your token
headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}

# Function to interact with the Hugging Face API
def query_huggingface_api(payload):
    while True:  # Keep trying to make the request until it succeeds
        try:
            # Sending a POST request to Hugging Face API with the user input as payload
            response = requests.post(HF_API_URL, headers=headers, json={"inputs": payload})
            print("Response Status Code:", response.status_code)  # Debugging: Check response status code
            print("Response Text:", response.text)  # Debugging: Check the response content
            
            # If the model is not loaded, retry after 30 seconds
            if response.status_code == 400 and "Model is currently loading" in response.text:
                print("Model is loading... Retrying in 30 seconds.")
                time.sleep(30)  # Wait for 30 seconds before retrying
                continue

            response.raise_for_status()  # If status code is not 200, it will raise an error
            return response.json()  # Return the JSON data from the response
        except requests.exceptions.RequestException as e:  # Handle errors like network issues
            print(f"Error querying Hugging Face API: {e}")
            return {"error": str(e)}  # Return error message in case of failure

# Flask route to handle chatbot interaction
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()  # Get the JSON data sent in the request
    user_input = data.get("message", "")  # Extract the "message" key (user's input)
    
    # If no message is provided, return an error
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # Query the Hugging Face API with the user input
    response = query_huggingface_api(user_input)

    # If there’s an error from the API, return it
    if "error" in response:
        return jsonify({"error": response["error"]}), 500

    # Extract the bot's response from the API response
    bot_response = response[0].get("generated_text", "Sorry, I couldn't generate a response.")
    
    # Return the bot's response as a JSON object
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    print("Starting chatbot backend server...")  # Message when starting the app
    app.run(debug=True, port=5001)  # Changed port to 5001
