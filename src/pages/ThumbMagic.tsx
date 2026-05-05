import React, { useState } from 'react';
import { generateText } from '../services/geminiService';
import { GoogleGenAI } from '@google/genai';
import { ImageIcon, Wand2, Loader2, Download, Upload, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThumbMagic() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ text: `YouTube Thumbnail: ${prompt}, high contrast, saturated colors, clickbait style, professional, photorealistic` }],
        config: {
          imageConfig: { aspectRatio: '16:9' }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold flex items-center gap-4">
          <ImageIcon className="text-purple-500" /> ThumbMagic AI
        </h1>
        <p className="text-neutral-400 mt-2">Generate ultra-attractive thumbnails in seconds.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 text-white ">
          <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Upload size={18} /> Upload Frame</h3>
            <div className="border-2 border-dashed border-neutral-700 rounded-xl p-8 flex flex-col items-center justify-center text-neutral-500 hover:border-purple-500 transition-colors cursor-pointer">
              <Plus size={32} className="mb-2" />
              <p className="text-sm">Click to upload video frame</p>
            </div>
          </div>

          <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Wand2 size={18} /> Describe Content</h3>
            <textarea
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4 h-32 outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
              placeholder="Describe your video (e.g. A man shocked looking at a treasure chest with gold glow)..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-4 bg-purple-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-lg shadow-purple-900/40"
            >
              {loading ? <Loader2 className="animate-spin" /> : <ImageIcon size={20} />}
              Generate Attractive Thumbnail
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden min-h-[300px] flex items-center justify-center relative group">
            {image ? (
              <>
                <img src={image} alt="Generated" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href={image} download="thumbnail.png" className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                    <Download size={18} /> Download HD
                  </a>
                </div>
              </>
            ) : (
                <div className="text-center p-8 opacity-30 text-white">
                <ImageIcon size={64} className="mx-auto mb-4" />
                <p>Generated thumbnail will appear here.</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-4 text-white">
            <div className="flex-1 p-4 bg-neutral-900/50 rounded-xl border border-white/5 text-center">
              <span className="block text-xs uppercase text-neutral-500 font-bold mb-1">Ratio</span>
              <span className="font-mono">16:9 (Landscape)</span>
            </div>
            <div className="flex-1 p-4 bg-neutral-900/50 rounded-xl border border-white/5 text-center">
              <span className="block text-xs uppercase text-neutral-500 font-bold mb-1">Style</span>
              <span className="font-mono">Viral Clickbait</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
