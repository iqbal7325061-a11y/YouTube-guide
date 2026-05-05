import React, { useState } from 'react';
import { generateText } from '../services/geminiService';
import { Layout, Wand2, Info, Loader2, Tag, Palette } from 'lucide-react';
import { motion } from 'motion/react';

export default function Channel() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    const prompt = `Generate perfect YouTube channel details for a channel about "${topic}". 
    Include: 3 catch names, a professional channel title, a compelling 200-word description, 15 relevant tags, and a creative concept for the Logo and Banner.
    Format as JSON: { "names": [], "title": "", "description": "", "tags": [], "logoIdea": "", "bannerIdea": "" }`;
    
    const text = await generateText(prompt);
    try {
      const json = JSON.parse(text || '{}');
      setResult(json);
    } catch (e) {
      setResult({ raw: text });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold flex items-center gap-4">
          <Layout className="text-blue-500" /> Channel Architect
        </h1>
        <p className="text-neutral-400 mt-2">Build a professional brand identity from scratch.</p>
      </header>

      <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 mb-12">
        <div className="space-y-4">
          <label className="text-lg font-medium">What is your channel about?</label>
          <div className="flex gap-4">
            <input
              type="text"
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g. AI Technology, Cooking with Spices, Gaming News"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
              Generate
            </button>
          </div>
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
              <h3 className="text-blue-500 font-bold mb-4 flex items-center gap-2 font-mono"><Info size={18} /> Channel Names</h3>
              <div className="space-y-2">
                {result.names?.map((n: string) => <div key={n} className="bg-neutral-800 p-3 rounded-xl border border-white/5">{n}</div>)}
              </div>
            </div>
            <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
              <h3 className="text-blue-500 font-bold mb-4 flex items-center gap-2 font-mono"><Tag size={18} /> Viral Tags</h3>
              <div className="flex flex-wrap gap-2">
                {result.tags?.map((t: string) => <span key={t} className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/20">{t}</span>)}
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
            <h3 className="text-blue-500 font-bold mb-4 flex items-center gap-2 font-mono">Professional Description</h3>
            <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">{result.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
              <h3 className="text-purple-500 font-bold mb-4 flex items-center gap-2 font-mono"><Palette size={18} /> Logo Concept</h3>
              <p className="text-neutral-400 text-sm italic">{result.logoIdea}</p>
            </div>
            <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800">
              <h3 className="text-purple-500 font-bold mb-4 flex items-center gap-2 font-mono"><Palette size={18} /> Banner Concept</h3>
              <p className="text-neutral-400 text-sm italic">{result.bannerIdea}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
