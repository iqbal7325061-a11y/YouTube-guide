import React, { useState } from 'react';
import { Mic, Video, Beaker, Plus, Loader2, Play, Download, Trash2, Key } from 'lucide-react';
import { motion } from 'motion/react';

export default function Labs() {
  const [apiKey, setApiKey] = useState('');
  const [cloning, setCloning] = useState(false);
  const [text, setText] = useState('');
  const [clonedVoices, setClonedVoices] = useState<any[]>([]);

  const handleClone = () => {
    setCloning(true);
    setTimeout(() => {
      setCloning(false);
      setClonedVoices([...clonedVoices, { id: Date.now(), name: 'My Custom Voice', date: '2024-05-24' }]);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold flex items-center gap-4">
          <Beaker className="text-pink-500" /> AI Labs
        </h1>
        <p className="text-neutral-400 mt-2">Next-generation audio and video cloning technology.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white ">
        <div className="space-y-8">
          {/* ElevenLabs API Key */}
          <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Key size={20} className="text-yellow-500" /> ElevenLabs Setup</h3>
            <div className="space-y-2">
              <label className="text-sm text-neutral-400">API Key</label>
              <input
                type="password"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                placeholder="Paste your ElevenLabs API Key here"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-[10px] text-neutral-500">Your key is stored locally for session use.</p>
            </div>
          </div>

          {/* Voice Cloning */}
          <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Mic size={20} className="text-sky-500" /> Voice Clone</h3>
            <div className="space-y-4">
              <p className="text-sm text-neutral-400">Upload a 5-minute clear audio file of your voice to create a clone.</p>
              <div className="border-2 border-dashed border-neutral-700 rounded-2xl p-10 flex flex-col items-center justify-center text-neutral-500 hover:border-sky-500 transition-colors cursor-pointer">
                <Plus size={32} className="mb-2" />
                <p>Upload Voice Data</p>
              </div>
              <button
                onClick={handleClone}
                className="w-full bg-sky-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-sky-700 transition-colors"
                disabled={cloning}
              >
                {cloning ? <Loader2 className="animate-spin" /> : <Mic size={20} />}
                Start Cloning Process
              </button>
            </div>
          </div>

          <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Video size={20} className="text-orange-500" /> Video Avatar Clone</h3>
            <div className="space-y-4">
              <p className="text-sm text-neutral-400">Animate static images into talking avatars using prompts.</p>
              <div className="aspect-video bg-neutral-800 rounded-2xl border border-neutral-700 flex items-center justify-center text-neutral-500">
                <Video size={48} className="opacity-20" />
              </div>
              <textarea
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4 h-24 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                placeholder="What should the avatar say?..."
              />
              <button className="w-full bg-orange-600 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors">Generate Video Clone</button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6">Your Cloned Ecosystem</h3>
            <div className="space-y-4 flex-1">
              {clonedVoices.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                  <Beaker size={64} className="mb-4" />
                  <p>No cloned assets yet. Start by cloning your voice or creating a video avatar.</p>
                </div>
              ) : (
                clonedVoices.map((voice) => (
                  <div key={voice.id} className="bg-neutral-800 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-sky-600/20 rounded-full flex items-center justify-center text-sky-500">
                        <Mic size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold">{voice.name}</h4>
                        <p className="text-xs text-neutral-500">{voice.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400"><Play size={18} /></button>
                       <button className="p-2 hover:bg-neutral-700 rounded-lg text-neutral-400"><Download size={18} /></button>
                       <button className="p-2 hover:bg-red-900/30 rounded-lg text-red-500"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
