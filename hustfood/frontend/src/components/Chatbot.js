import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/chat', {
                message: userMessage
            });
            setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { 
                text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.', 
                isUser: false 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <button 
                    className="chatbot-button"
                    onClick={() => setIsOpen(true)}
                >
                    <i className="fas fa-comments"></i>
                </button>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>HustFood Assistant</h3>
                        <button 
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
                            >
                                {message.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot-message">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nhập câu hỏi của bạn..."
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot; 