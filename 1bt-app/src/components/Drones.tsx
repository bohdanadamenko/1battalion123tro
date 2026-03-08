import { Banknote, CheckSquare, Hourglass, ShieldCheck } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Drones = () => {
  const { ref, isVisible } = useInView();

  const benefits = [
    {
      icon: Banknote,
      title: 'Виплата 1 млн. грн.',
      description: '200 тис. грн. одразу при підписанні контракту, 300 тис. грн після першого бойового завдання і 500 тис. грн по завершенню контракту',
      color: 'text-green-400'
    },
    {
      icon: CheckSquare,
      title: 'Під час служби',
      description: 'щомісячне грошове забезпечення до 120 тис. грн., компенсація житла, медичне забезпечення, якісна стоматологія в т.ч. зубопротезування та ін.',
      color: 'text-blue-400'
    },
    {
      icon: Hourglass,
      title: 'Контракт на 2 роки',
      description: 'БЗВП до 45 днів, фахова підготовка від 5 до 60 днів, не менше 12 місяців участі у бойових діях',
      color: 'text-yellow-400'
    },
    {
      icon: ShieldCheck,
      title: 'По завершенню контракту',
      description: 'звільнення від призову на 1 рік, право виїзду за кордон, іпотека під 0,0% річних та ін.',
      color: 'text-green-500'
    }
  ];

  return (
    <section id="drones" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-uaBlue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">
              Вітаю! До уваги <span className="text-uaBlue">молодих</span> та <span className="text-uaYellow">відважних:</span>
              <br className="hidden md:block" /> ДРОНИ
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-uaBlue to-uaYellow mx-auto rounded-full" />
          </div>

          {/* Grid of benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`glass-panel p-8 hover:bg-white/[0.06] transition-all duration-300 group sr sr-d${index + 1} ${isVisible ? 'sr-up reveal' : ''}`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all ${benefit.color}`}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{benefit.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA specific to this section */}
          <div className={`mt-16 text-center sr sr-d5 ${isVisible ? 'sr-up reveal' : ''}`}>
             <button
                onClick={() => document.dispatchEvent(new Event('openJoinModal'))}
                className="group relative inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-uaBlue text-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,92,230,0.5)] active:scale-95 border border-white/10 overflow-hidden"
              >
                <span className="relative z-10">Залишити заявку в підрозділ БПЛА</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-uaBlue to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Drones;
