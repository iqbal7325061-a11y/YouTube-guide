import React, { useState } from 'react';
import { generateText } from '../services/geminiService';
import { Video, Tag, FileText, Send, Loader2, Zap, Copy, Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function VideoPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleOptimize = async () => {
    if (!topic) return;
    setLoading(true);
    const prompt = `Optimize the following video topic for SEO and virality: "${topic}". 
    Provide: 
    1. A catchy "Viral Title" 
    2. A comprehensive 100-word "Description" with timestamps 
    3. 15 top "Tags"
    4. A "Hook" script (first 10 seconds).
    Format as JSON: { "title": "", "description": "", "tags": [], "hook": "" }`;
    
    const text = await generateText(prompt);
    try {
      setResult(JSON.parse(text || '{}'));
    } catch (e) {
      setResult({ raw: text });
    }
    setLoading(false);
  };

  const copy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold flex items-center gap-4">
          <Zap className="text-red-500 fill-current" /> Video SEO Optimizer
        </h1>
        <p className="text-neutral-400 mt-2">Rank #1 on YouTube search and recommended feeds.</p>
      </header>

      <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 mb-12 shadow-xl shadow-red-900/10">
        <div className="space-y-4">
          <label className="text-lg font-medium text-white">What is your video topic?</label>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-600 transition-all text-white"
              placeholder="e.g. How to make pasta at home"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button
              onClick={handleOptimize}
              disabled={loading}
              className="bg-red-600 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors disabled:opacity-50 text-white"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              Generate SEO
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 relative group">
              <h3 className="text-red-500 font-bold mb-3 flex items-center gap-2 text-white"><Video size={18} /> Viral Title</h3>
                <p className="text-white font-bold text-lg">{result.title}</p>
              <button onClick={() => copy(result.title, 'title')} className="absolute top-4 right-4 p-2 bg-neutral-800 rounded-lg group-hover:bg-neutral-700">
                {copiedField === 'title' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-neutral-400" />}
              </button>
            </div>

            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 relative group">
              <h3 className="text-red-500 font-bold mb-3 flex items-center gap-2 text-white"><Tag size={18} /> Viral Tags</h3>
              <div className="flex flex-wrap gap-2 ">
                {result.tags?.map((t: string) => <span key={t} className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs border border-red-500/20">{t}</span>)}
              </div>
              <button onClick={() => copy(result.tags?.join(', '), 'tags')} className="absolute top-4 right-4 p-2 bg-neutral-800 rounded-lg group-hover:bg-neutral-700">
                {copiedField === 'tags' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-neutral-400" />}
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 relative group">
              <h3 className="text-red-500 font-bold mb-3 flex items-center gap-2 text-white"><FileText size={18} /> Smart Description</h3>
              <p className="text-neutral-400 text-sm leading-relaxed whitespace-pre-wrap">{result.description}</p>
              <button onClick={() => copy(result.description, 'desc')} className="absolute top-4 right-4 p-2 bg-neutral-800 rounded-lg group-hover:bg-neutral-700">
                {copiedField === 'desc' ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-neutral-400" />}
              </button>
            </div>

            <div className="bg-neutral-800/30 p-6 rounded-2xl border border-dashed border-neutral-700">
              <h3 className="text-yellow-500 font-bold mb-3 flex items-center gap-2 text-white"><Sparkles size={18} /> Viral Hook</h3>
              <p className="text-neutral-300 text-sm italic italic tracking-wide">"{result.hook}"</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
