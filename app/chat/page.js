'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const username = `User${Math.floor(Math.random() * 1000)}`;
  const router = useRouter();

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data.messages);
    }

    fetchMessages();

    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const res = await fetch('/api/check-authentication');
      if (res.ok) {
        setAuthenticated(true);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      router.push('/');
    }
  };

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

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-grow p-2 border border-gray-300 rounded mr-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
}