import React, { useState, useRef } from 'react';
import './App.css';
import { askQuestion, uploadPDF } from './api/api';

interface Message {
  sender: 'User' | 'Bot';
  text: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [model, setModel] = useState<'openai' | 'ollama' | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file to upload.');
    try {
      const response = await uploadPDF(file);
      alert(response.message);
    } catch (error: any) {
      alert(error.response?.data?.message || error.response?.data?.error || 'Upload failed.');
    }
  };

  const handleAsk = async () => {
    if (!question.trim() || loading) return;

    const userMessage: Message = { sender: 'User', text: question };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await askQuestion(question, model);
      const botMessage: Message = { 
        sender: 'Bot', 
        text: response.data.answer || 'No answer received.'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.response?.data?.error || 'Error fetching answer.';
      const botMessage: Message = { sender: 'Bot', text: errorMsg };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  const clearAll = () => {
    setFile(null);
    setQuestion('');
    setMessages([]);
    setModel(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="container">
      <h1>PDF Q&A Chatbot</h1>

      <div className="controls">
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={handleUpload}>Upload PDF</button>

        <div className="model-buttons">
          <button
            onClick={() => setModel('openai')}
            className={model === 'openai' ? 'active' : ''}
          >
            OpenAI
          </button>
          <button
            onClick={() => setModel('ollama')}
            className={model === 'ollama' ? 'active' : ''}
          >
            Ollama
          </button>
        </div>
      </div>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender.toLowerCase()}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="ask-box">
        <input
          type="text"
          value={question}
          placeholder="Ask a question..."
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleAsk()}
          disabled={loading}
        />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
        <button className="clear-btn" onClick={clearAll}>Clear All</button>
      </div>
    </div>
  );
}

export default App;
