import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatComponent = () => {
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        // Use the correct port for the WebSocket connection
        const socket = new SockJS('http://localhost:8083/chat');
        const stompClient = Stomp.over(() => socket);

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            setConnected(true);

            stompClient.subscribe('/topic/messages', (message) => {
                showMessage(JSON.parse(message.body));
            });
        }, (error) => {
            console.error('Connection error:', error);
            setConnected(false);
        });

        setStompClient(stompClient);

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, []);

    const showMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = () => {
        if (connected && stompClient && messageInput.trim() !== '') {
            const chatMessage = {
                content: messageInput,
            };
            stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
            setMessageInput('');
        } else {
            console.error('STOMP client is not connected or message is empty.');
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div id="chatBox">
                {messages.map((msg, index) => (
                    <div key={index}>{msg.content}</div>
                ))}
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage} disabled={!connected}>Send</button>
        </div>
    );
};

export default ChatComponent;
