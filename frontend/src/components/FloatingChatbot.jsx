import React , { useState } from "react";
import Chatbot from "../components/Chatbot";

function FloatingChatbot() {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };
    return (
        <>
            {/* Floating Chat Icon */}
            <div
                onClick={toggleChat}
                className="fixed bottom-5 right-5 bg-blue-500 p-4 rounded-full cursor-pointer shadow-lg z-40"
            >
                <span className="text-white text-lg font-bold">Chat</span>
            </div>

            {/* Chatbot Window */}
            {showChat && (
                <div className="fixed bottom-20 right-5 w-80 h-96 bg-white rounded-xl shadow-lg z-50 overflow-hidden flex flex-col">
                    <div className="bg-blue-600 p-2 text-white font-bold flex justify-between items-center">
                        <span>Chat with Us</span>
                        <button
                            onClick={toggleChat}
                            className="bg-blue-200 text-blue-800 p-1 rounded-full text-sm w-6 h-6 flex items-center justify-center"
                        >
                            X
                        </button>
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <Chatbot />
                    </div>
                </div>
            )}
        </>
    )
}

export default FloatingChatbot