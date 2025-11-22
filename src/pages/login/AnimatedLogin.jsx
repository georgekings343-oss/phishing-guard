import React from 'react';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import MFAForm from './components/MFAForm';
import SecurityBadges from './components/SecurityBadges';

// AnimatedLogin.jsx
// A single-file page that keeps your existing form/components but adds
// a Lovable-style animated background and subtle node/particle motion.

export default function AnimatedLogin({ showMFA = false }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#071020] via-[#071a39] to-[#0b2340] text-foreground">

      {/* Decorative animated background elements (nodes, grid, subtle particles) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#071020" />
              <stop offset="100%" stopColor="#0b2340" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
        </svg>

        {/* grid overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px, 40px 40px' }} />

        {/* floating nodes */}
        <div className="absolute inset-0">
          <div className="node node-1" />
          <div className="node node-2" />
          <div className="node node-3" />
          <div className="node node-4" />
          <div className="node node-5" />
        </div>

        {/* soft vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(10,15,30,0.0) 30%, rgba(0,0,0,0.25) 100%)' }} />
      </div>

      {/* Main content (left form card) */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* Left: structured PhishGuard-style card (uses your existing components) */}
          <div className="bg-white/95 dark:bg-white/5 rounded-2xl shadow-elevation-2 p-8 border border-border backdrop-blur-sm">
            <LoginHeader />

            <div className="mt-4">
              {/* Render either LoginForm or MFA depending on showMFA prop */}
              {!showMFA ? (
                <LoginForm onSubmit={() => {}} loading={false} error={null} />
              ) : (
                <MFAForm onSubmit={() => {}} onResendCode={() => {}} loading={false} error={null} email="" />
              )}

              <div className="mt-6">
                <SecurityBadges />
              </div>
            </div>
          </div>

          {/* Right: Lovable-style illustrative panel (background image area) */}
          <div className="hidden md:flex flex-col items-center justify-center rounded-2xl overflow-hidden p-6 relative">
            <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-4xl font-extrabold text-white drop-shadow-md">SmartMove</h2>
              <p className="mt-3 text-white/90 max-w-xs">A digital defense project designed to detect, prevent, and respond to phishing attacks.</p>

              <div className="mt-8 w-full max-w-xs">
                <div className="flex items-center justify-center space-x-3">
                  <button className="px-5 py-2 rounded-full bg-accent text-accent-foreground font-medium">Get Started</button>
                  <button className="px-5 py-2 rounded-full bg-transparent border border-white/30 text-white/90">Try Detection</button>
                </div>
              </div>
            </div>

            {/* subtle animated glows */}
            <div className="absolute -left-24 -top-12 w-72 h-72 rounded-full blur-3xl opacity-40 bg-gradient-to-br from-[#1f6bd6] to-[#8b5cf6] animate-blob" />
            <div className="absolute -right-24 -bottom-12 w-72 h-72 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] animate-blob animation-delay-2000" />
          </div>

        </div>
      </div>

      {/* Inline styles for animations and nodes */}
      <style>{`
        /* animated nodes */
        .node { position: absolute; width: 14px; height: 14px; border-radius: 9999px; box-shadow: 0 6px 20px rgba(2,6,23,0.6); opacity: 0.9; }
        .node-1 { background: rgba(14,165,233,0.95); left: 10%; top: 20%; animation: float1 8s ease-in-out infinite; }
        .node-2 { background: rgba(99,102,241,0.95); left: 35%; top: 10%; animation: float2 10s ease-in-out infinite; }
        .node-3 { background: rgba(16,185,129,0.95); left: 70%; top: 35%; animation: float3 12s ease-in-out infinite; }
        .node-4 { background: rgba(236,72,153,0.9); left: 85%; top: 65%; animation: float1 9s ease-in-out infinite; }
        .node-5 { background: rgba(249,115,22,0.9); left: 50%; top: 78%; animation: float2 11s ease-in-out infinite; }

        @keyframes float1 {
          0% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-18px) translateX(8px) scale(1.05); }
          100% { transform: translateY(0px) translateX(0px) scale(1); }
        }
        @keyframes float2 {
          0% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(22px) translateX(-12px) scale(0.95); }
          100% { transform: translateY(0px) translateX(0px) scale(1); }
        }
        @keyframes float3 {
          0% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-30px) translateX(18px) scale(1.08); }
          100% { transform: translateY(0px) translateX(0px) scale(1); }
        }

        /* blob animation classes */
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        @keyframes blob {
          0% { transform: translateY(0) scale(1); }
          33% { transform: translateY(-12px) scale(1.05); }
          66% { transform: translateY(8px) scale(0.98); }
          100% { transform: translateY(0) scale(1); }
        }

        /* small helpful tweaks for the left card on dark bg */
        @media (min-width: 768px) {
          .security-card { background: rgba(255,255,255,0.95); }
        }
      `}</style>
    </div>
  );
}
