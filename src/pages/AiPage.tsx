import React, { useState } from 'react';
import { generateText } from '../services/geminiService';
import { Sparkles, Send, Loader2, Bot, User, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AiPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [copied, setCopied] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const response = await generateText(userMsg, "You are a professional YouTube Script Writer and Idea Generator. Help the user create engaging content, scripts, and video structures.");
    
    setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't generate a response." }]);
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Sparkles className="text-yellow-500" /> AI Script Master
        </h1>
        <p className="text-neutral-400">Generate high-retention scripts and video ideas.</p>
      </header>

      <div className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
              <Bot size={64} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">How can I help you today?</h3>
              <p className="max-w-sm">Ask me for video ideas, scripts for a specific topic, or how to structure your next viral video.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 relative group ${
                msg.role === 'user' ? 'bg-red-600' : 'bg-neutral-800 border border-white/5'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                {msg.role === 'assistant' && (
                  <button 
                    onClick={() => copyToClipboard(msg.content)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-700 p-1.5 rounded-lg text-neutral-400 hover:text-white"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-4">
              <div className="bg-neutral-800 border border-white/5 rounded-2xl p-4 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-red-500" />
                <span className="text-sm text-neutral-400">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-neutral-900 border-t border-neutral-800">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl py-4 pl-4 pr-16 outline-none focus:ring-2 focus:ring-red-600 transition-all font-medium"
              placeholder="Type your video topic or question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 p-3 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-900/40"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
