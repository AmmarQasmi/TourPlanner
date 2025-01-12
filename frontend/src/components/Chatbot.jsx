import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (!userMessage.trim()) {
      alert("Please enter a message!");
      return;
    }

    setLoading(true);
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setUserMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { text: response.data.response, isUser: false },
      ]);
    } catch (error) {
      console.error("Error sending message to the backend:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-blue-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${
                message.isUser
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-800 border border-blue-200"
              }`}
            >
              <p className={`text-sm ${message.isUser ? "font-semibold" : "font-medium"}`}>
                {message.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-blue-100">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 text-sm border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;

