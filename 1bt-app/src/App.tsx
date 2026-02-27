import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Awards from './components/Awards';
import Contact from './components/Contact';
import { X, Send, Shield } from 'lucide-react';

function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinState, setJoinState] = useState<'idle' | 'success'>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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

      {/* Join Modal */}
      {isJoinModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ animation: 'fadeUp 0.2s ease both' }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsJoinModalOpen(false); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#010204]/85 backdrop-blur-xl" />

          {/* Modal Panel */}
          <div
            ref={modalRef}
            className="relative w-full max-w-lg overflow-hidden"
            style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
            onMouseMove={handleMouseMove}
          >
            {/* Gradient border wrapper → blue to yellow border */}
            <div
              className="relative z-10 rounded-2xl p-[1px] shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
              style={{ background: 'linear-gradient(105deg, #005ce6 0%, #003a99 30%, rgba(255,255,255,0.07) 55%, #c8a200 85%, #ffdf2a 100%)' }}
            >
            {/* Glass body — spotlight lives here so it's not clipped by the opaque bg */}
            <div className="relative bg-[#04080e]/95 rounded-[calc(1rem-1px)] overflow-hidden">
              {/* Spotlight glow — follows cursor, inside panel so bg can't block it */}
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,92,230,0.28), transparent 70%)`,
                  transition: 'background 0.05s linear',
                }}
              />

              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-white/6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-uaBlue/10 border border-uaBlue/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield size={22} className="text-uaBlue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-uaBlue uppercase mb-1">Рекрутинг · В/Ч А7052</p>
                  <h2 className="text-2xl font-black text-white leading-tight">Заявка на Долучення</h2>
                  <p className="text-slate-500 text-sm mt-1">Залиште дані — рекрутер зв'яжеться найближчим часом.</p>
                </div>
                <button
                  data-testid="modal-close"
                  onClick={() => setIsJoinModalOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="px-8 py-6">
                {joinState === 'success' ? (
                  <div className="text-center py-10" style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both' }}>
                    <div
                      className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-green-400">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="font-black text-xl text-white mb-1">Заявку прийнято!</div>
                    <div className="text-slate-400 text-sm">Ми зв'яжемося з вами найближчим часом.</div>
                  </div>
                ) : (
                  <form onSubmit={handleJoinSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Ім'я та прізвище</label>
                      <input
                        type="text"
                        required
                        placeholder="Іван Петренко"
                        className="w-full bg-white/4 border border-white/8 hover:border-white/15 focus:border-uaBlue rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-colors placeholder-slate-600"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Номер телефону</label>
                      <input
                        type="tel"
                        required
                        placeholder="+38 (099) 000-00-00"
                        className="w-full bg-white/4 border border-white/8 hover:border-white/15 focus:border-uaBlue rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-colors placeholder-slate-600"
                      />
                    </div>

                    {/* Experience */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                        Досвід та інше <span className="text-slate-700 normal-case tracking-normal font-normal">(необов'язково)</span>
                      </label>
                      <textarea
                        rows={3}
                      placeholder="Військовий досвід, спеціальність, навички... Також можна вказати Telegram, email або інший зручний спосіб зв'язку."
                        className="w-full bg-white/4 border border-white/8 hover:border-white/15 focus:border-uaBlue rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-colors placeholder-slate-600 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="group relative w-full flex items-center justify-center gap-2.5 bg-uaBlue hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(0,92,230,0.4)] active:scale-[0.98] mt-1"
                    >
                      <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
                      Відправити заявку
                    </button>
                  </form>
                )}
              </div>

              {/* Footer hint */}
              {joinState !== 'success' && (
                <div className="px-8 pb-6 flex items-center gap-2">
                  <div className="flex-1 h-px bg-white/5" />
                  <p className="text-[11px] text-slate-600 px-2">Дані захищено · В/Ч А7052</p>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
              )}
            </div>
            </div>{/* end gradient border wrapper */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
