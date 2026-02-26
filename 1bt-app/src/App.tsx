import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Awards from './components/Awards';
import Contact from './components/Contact';
import { X } from 'lucide-react';

function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinState, setJoinState] = useState<'idle' | 'success'>('idle');

  // Listen for the custom event from Navbar/Hero buttons — registered only once
  useEffect(() => {
    const handler = () => setIsJoinModalOpen(true);
    document.addEventListener('openJoinModal', handler);
    return () => document.removeEventListener('openJoinModal', handler);
  }, []);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinState('success');
    setTimeout(() => {
      setJoinState('idle');
      setIsJoinModalOpen(false);
    }, 2500);
  };

  return (
    <div className="bg-darkBg bg-grid text-slate-100 min-h-screen font-main selection:bg-uaBlue/30 relative">
      <Navbar />

      <main>
        <Hero />
        <Timeline />
        <Awards />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-darkerBg py-10 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Лого" className="h-7 w-7 rounded-full object-cover ring-1 ring-white/20" loading="lazy" />
            <span className="font-bold text-sm text-white/60">1 Б 123 ОБР ТРО</span>
          </div>
          <div className="text-slate-600 text-xs">&copy; {new Date().getFullYear()} Всі права захищено.</div>
        </div>
      </footer>

      {/* Join Modal — CSS transition, no Framer Motion */}
      {isJoinModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setIsJoinModalOpen(false); }}
          style={{ animation: 'fadeUp 0.25s ease both' }}
        >
          <div className="relative glass-panel border border-white/8 w-full max-w-md p-8 shadow-[0_25px_60px_rgba(0,0,0,0.5)]" style={{ animation: 'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both' }}>
            <button onClick={() => setIsJoinModalOpen(false)} className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <p className="text-xs font-bold tracking-[0.15em] text-uaBlue uppercase mb-1">Рекрутинг</p>
            <h2 className="text-2xl font-black text-white mb-1">Заявка на Долучення</h2>
            <p className="text-slate-400 text-sm mb-6">Залиште дані — рекрутер зв'яжеться найближчим часом.</p>

            {joinState === 'success' ? (
              <div className="text-center py-8 anim-scale-in">
                <div className="text-5xl mb-3">✅</div>
                <div className="font-bold text-green-400 text-lg">Заявку прийнято!</div>
                <div className="text-slate-400 text-sm mt-1">Ми зв'яжемося з вами найближчим часом.</div>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="flex flex-col gap-3.5">
                <input type="text" required placeholder="Ім'я та прізвище"
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-uaBlue transition-colors placeholder-slate-600"
                />
                <input type="tel" required placeholder="Номер телефону (+38...)"
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-uaBlue transition-colors placeholder-slate-600"
                />
                <textarea rows={3} placeholder="Військовий досвід, спеціальність (необов'язково)"
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-uaBlue transition-colors placeholder-slate-600 resize-none"
                />
                <button type="submit" className="bg-uaBlue hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-colors">
                  Відправити заявку →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
