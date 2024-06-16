'use client';

import { useState, useEffect } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const username = `User${Math.floor(Math.random() * 1000)}`;

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data.messages);
    }

    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newMessage, username }),
    });

    if (res.ok) {
      const data = await res.json();
      setMessages([...messages, data.message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-scroll p-4">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-grow p-2 border border-gray-300 rounded mr-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Send</button>
      </form>
    </div>
  );
}
