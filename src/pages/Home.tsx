import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Video, Image as ImageIcon, Mic, Layout, Zap, Beaker } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickTools = [
  { label: 'Create Channel', icon: Layout, path: '/channel', color: 'bg-blue-600' },
  { label: 'ThumbMagic', icon: ImageIcon, path: '/thumbmagic', color: 'bg-purple-600' },
  { label: 'AI Script', icon: Sparkles, path: '/ai', color: 'bg-yellow-600' },
  { label: 'Video Optimize', icon: Video, path: '/video', color: 'bg-red-600' },
  { label: 'Clone Voice', icon: Mic, path: '/labs', color: 'bg-green-600' },
  { label: 'AI Labs', icon: Beaker, path: '/labs', color: 'bg-pink-600' },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-neutral-400">Welcome back! What are we creating today?</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickTools.map((tool, index) => (
          <motion.div
            key={tool.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={tool.path}
              className="group block p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-red-500/50 transition-all hover:shadow-2xl hover:shadow-red-500/10"
            >
              <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                <tool.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">{tool.label}</h3>
              <p className="text-neutral-500 text-sm">Professional AI tools to boost your content quality and reach.</p>
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="mt-12 p-8 bg-gradient-to-br from-red-600/20 to-purple-600/20 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-red-500 mb-4">
            <Zap size={24} className="fill-current" />
            <span className="font-bold uppercase tracking-widest text-sm">Pro Feature</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 max-w-md">Master the YouTube Algorithm with AI</h2>
          <p className="text-neutral-300 max-w-lg mb-6">Our advanced neural networks analyze viral trends and help you create content that viewers can't resist clicking.</p>
          <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">Get Started Free</button>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
          <Video size={300} />
        </div>
      </section>
    </div>
  );
}
