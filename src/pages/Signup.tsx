import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, googleProvider, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Video, Mail, Lock, User, Phone, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        username: result.user.displayName || '',
        email: result.user.email,
        createdAt: new Date().toISOString(),
      }, { merge: true });
      navigate('/');
    } catch (err) {
      setError('Google Signup failed.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2); // In a real app, this would trigger Phone Auth (Recaptcha + Send OTP)
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        username,
        email,
        phoneNumber: phone,
        createdAt: new Date().toISOString(),
      });
      navigate('/');
    } catch (err) {
      setError('Signup failed. Email might be in use.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-red-900/20">
            <Video size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-neutral-400 mt-2 text-center">Start your journey as a Pro Content Creator.</p>
        </div>

        {error && <div className="bg-red-900/20 text-red-500 p-3 rounded-lg text-sm mb-6 border border-red-500/20 text-center">{error}</div>}

        {step === 1 ? (
          <>
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-semibold mb-6 hover:bg-neutral-200 transition-colors"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" referrerPolicy="no-referrer" />
              Continue with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-800"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-neutral-900 px-2 text-neutral-500">Or details</span></div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input
                    type="text"
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition-all text-white"
                    placeholder="Creator_King"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input
                    type="email"
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition-all text-white"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input
                    type="password"
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition-all text-white"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <input
                    type="tel"
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition-all text-white"
                    placeholder="+91 00000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/40"
              >
                Continue to Verify
              </button>
            </form>
          </>
        ) : (
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="text-center">
              <p className="text-neutral-300">Enter the OTP sent to <span className="text-red-500">{phone}</span></p>
              <p className="text-xs text-neutral-500 mt-1">(Demo: Enter any 6 digit code)</p>
            </div>
            <div className="flex justify-center gap-2">
              <input
                type="text"
                maxLength={6}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-3 px-4 text-center text-2xl tracking-[1em] focus:ring-2 focus:ring-red-600 outline-none transition-all text-white"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/40 flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} />
              Complete Signup
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-neutral-500 text-sm hover:text-neutral-300"
            >
              Back to details
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-neutral-400 text-sm">
          Already have an account? <Link to="/login" className="text-red-500 hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
