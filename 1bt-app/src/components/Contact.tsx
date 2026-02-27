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
    <section id="contact" className="py-10 md:py-16 relative">
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
                  { icon: MapPin, label: 'Локація', val: 'Первомайськ, Bogopol, Ukraine' },
                  { icon: Phone, label: 'Телефон', val: '+380 68 548 1825' },
                  { icon: Mail, label: 'Email', val: 'info@1bt-123tro.ua' },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-uaBlue flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">{label}</div>
                      {label === 'Телефон' ? (
                        <a href={`tel:${val.replace(/\s+/g, '')}`} className="text-base text-slate-200 mt-0.5 hover:text-uaBlue hover:underline transition-colors block">
                          {val}
                        </a>
                      ) : (
                        <div className="text-base text-slate-200 mt-0.5">{val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Соціальні мережі</p>
              <div className="flex gap-3">
                {/* Facebook */}
                <a href="https://www.facebook.com/profile.php?id=61582558701596" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1877f2] transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href="https://wa.me/380934759942" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#25D366] transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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
