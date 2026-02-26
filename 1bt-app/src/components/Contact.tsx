import { useState } from 'react';
import { MapPin, Mail, Send, Phone } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { ref: headRef, isVisible: headVisible } = useInView();
  const { ref: panelRef, isVisible: panelVisible } = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3500);
    }, 1200);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="container mx-auto px-6">
        <div ref={headRef} className={`sr sr-up mb-12 ${headVisible ? 'reveal' : ''}`}>
          <p className="text-sm font-bold tracking-[0.15em] text-uaBlue uppercase mb-2">Зв'язок</p>
          <h2 className="text-6xl md:text-7xl font-black text-white">Написати нам</h2>
        </div>

        <div ref={panelRef} className={`sr sr-up sr-d1 grid grid-cols-1 lg:grid-cols-5 gap-0 max-w-5xl glass-panel border border-white/5 overflow-hidden ${panelVisible ? 'reveal' : ''}`}>
          {/* Left info panel */}
          <div className="lg:col-span-2 bg-uaBlue/8 border-r border-white/5 p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl text-white mb-2">Контактна інформація</h3>
              <p className="text-slate-400 text-base mb-8">Підтримай свій підрозділ. Разом до перемоги!</p>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Локація', val: 'Україна' },
                  { icon: Phone, label: 'Телефон', val: '+38 099 000 00 00' },
                  { icon: Mail, label: 'Email', val: 'info@1bt-123tro.ua' },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-uaBlue flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
                      <div className="text-base text-slate-200 mt-0.5">{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Соціальні мережі</p>
              <div className="flex gap-3">
                {/* Facebook */}
                <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1877f2] transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#e1306c] transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </a>
                {/* Telegram */}
                <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0088cc] transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M21.94 3.29a2 2 0 0 0-2.03-.29L3.42 9.29a2 2 0 0 0 .13 3.76l3.45 1.12 1.55 4.86a1 1 0 0 0 1.7.37l2.17-2.17 4.23 3.11a2 2 0 0 0 3.11-1.3l2.7-13.4a2 2 0 0 0-.52-2.25zM10 15l-1-3.8 7.5-5.4L10 15z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {([
                { id: 'n', label: "Ім'я та прізвище", type: 'text', placeholder: 'Іван Петренко' },
                { id: 'e', label: 'Email або телефон', type: 'text', placeholder: '+38 099 ...' },
              ] as const).map(f => (
                <div key={f.id}>
                  <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-1.5">{f.label}</label>
                  <input type={f.type} required placeholder={f.placeholder}
                    className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-base text-slate-200 focus:outline-none focus:border-uaBlue transition-colors placeholder-slate-700"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-1.5">Повідомлення</label>
                <textarea required rows={4} placeholder="Ваше запитання або пропозиція..."
                  className="w-full bg-white/3 border border-white/8 rounded-xl px-4 py-3 text-base text-slate-200 focus:outline-none focus:border-uaBlue transition-colors placeholder-slate-700 resize-none"
                />
              </div>
              <button type="submit" disabled={formState !== 'idle'}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-colors ${
                  formState === 'success'
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                    : 'bg-uaBlue hover:bg-blue-500 text-white'
                }`}
              >
                {formState === 'idle' && <><Send size={16} /> Відправити</>}
                {formState === 'submitting' && <span className="animate-pulse">Відправлення...</span>}
                {formState === 'success' && '✓ Повідомлення надіслано!'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
