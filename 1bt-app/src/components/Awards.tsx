import { useInView } from '../hooks/useInView';
import { useRef, useState } from 'react';

const stateAwards = [
  { name: 'Орден "Богдана Хмельницького" III ст.', count: 2, img: '/ribbons/bohdan.svg' },
  { name: 'Орден "За мужність" III ст.', count: 11, img: '/ribbons/courage.svg', wide: true },
  { name: 'Медаль "За військову службу Україні"', count: 3, img: '/ribbons/mil_service.svg' },
  { name: 'Медаль "За оборону України"', count: 52, highlight: true, img: '/ribbons/defense.svg' },
];
const depAwards = [
  { name: '"Хрест Сил ТрО"', count: 32, img: '/ribbons/tro_cross.svg' },
  { name: 'Медаль "За поранення"', count: 78, isRed: true, img: '/ribbons/wound.svg' },
  { name: '"Знак пошани"', count: 7, img: '/ribbons/honor.svg' },
  { name: '"Захиснику України"', count: 3, img: '/ribbons/defender.svg' },
  { name: '"Золотий хрест"', count: 45, highlight: true, img: '/ribbons/golden_cross.svg' },
  { name: 'Іменна вогнепальна зброя', count: 4, img: '/ribbons/gun.png', square: true },
  { name: 'Інші відзнаки', count: 16, img: '/ribbons/ZSU.png', square: true },
];

type AwardItem = { name: string; count: number; highlight?: boolean; isRed?: boolean; img?: string; wide?: boolean; square?: boolean };

const AwardCard = ({ item, index }: { item: AwardItem; index: number }) => {
  const isGold = index % 2 !== 0;
  const color = isGold ? '#ffdf2a' : '#005ce6';
  const glow = isGold
    ? '0 0 10px rgba(255,223,42,0.4), 0 0 20px rgba(234,179,8,0.2)'
    : '0 0 10px rgba(0,92,230,0.5), 0 0 20px rgba(0,92,230,0.3)';

  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      className={`glass-panel p-4 flex items-center gap-4 border transition-all duration-300 relative overflow-hidden group
      ${item.highlight ? 'border-uaBlue/30' : item.isRed ? 'border-red-500/20' : 'border-white/5 hover:border-white/10'}`}
      style={{ transform: isHovered ? 'translateY(-2px)' : 'translateY(0)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Spotlight Hover Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${color}35, transparent 50%)`
        }}
      />

      <div className="relative z-10 flex items-center gap-4 w-full">
        <div
          className="text-4xl font-bold tracking-tight min-w-[3.5rem] text-center"
          style={{ color, textShadow: glow }}
        >
          {item.count}
        </div>

        {item.img ? (
          <div className={`${
            item.square ? 'w-8 h-8' : item.wide ? 'w-[45px] h-3.5 md:h-4' : 'w-10 h-3.5 md:h-4'
          } shrink-0 rounded-[3px] overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.5)]`}>
            <img src={item.img} alt={`Іконка ${item.name}`} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0 mx-[17px]" />
        )}

        <div className="text-base text-slate-300 leading-snug">{item.name}</div>
      </div>
    </div>
  );
};

const StatCard = ({ item }: { item: { n: string; label: string; isGold: boolean } }) => {
  const color = item.isGold ? '#ffdf2a' : '#005ce6';
  const shadow = item.isGold
    ? '0 0 15px rgba(255,223,42,0.4), 0 0 30px rgba(234,179,8,0.2)'
    : '0 0 15px rgba(0,92,230,0.5), 0 0 30px rgba(0,92,230,0.3)';

  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      className="glass-panel p-5 text-center border border-white/5 relative overflow-hidden group transition-all duration-300"
      style={{ transform: isHovered ? 'translateY(-2px)' : 'translateY(0)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${color}35, transparent 50%)`
        }}
      />
      <div className="relative z-10">
        <div className="text-5xl font-bold tracking-tighter">
          <span style={{ color, textShadow: shadow }}>{item.n}</span>
        </div>
        <div className="text-sm text-slate-500 mt-2 uppercase tracking-wider">{item.label}</div>
      </div>
    </div>
  );
};

const Awards = () => {
  const { ref: headRef, isVisible: headVisible } = useInView();
  const { ref: statsRef, isVisible: statsVisible } = useInView();
  const { ref: leftRef, isVisible: leftVisible } = useInView();
  const { ref: rightRef, isVisible: rightVisible } = useInView();

  return (
    <section id="awards" className="py-10 md:py-16 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className={`sr sr-up mb-12 ${headVisible ? 'reveal' : ''}`}>
          <p className="text-sm font-bold tracking-[0.15em] text-uaBlue uppercase mb-2">Відзнаки</p>
          <h2 className="text-6xl md:text-7xl font-black text-white mb-5">Наші Нагороди</h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            За мужність та захист суверенітету України{' '}
            <span className="text-white font-bold">253 військовослужбовці</span>{' '}
            відзначені державними та відомчими нагородами.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className={`sr sr-up sr-d1 grid grid-cols-3 gap-4 max-w-xl mb-12 ${statsVisible ? 'reveal' : ''}`}>
          {[
            { n: '68',  label: 'Держ. нагороди', isGold: false },
            { n: '185', label: 'Відомчі відзнаки', isGold: true },
            { n: '253', label: 'Усього', isGold: false },
          ].map((s, i) => (
            <StatCard key={i} item={s} />
          ))}
        </div>

        {/* Award lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div ref={leftRef} className={`sr sr-left ${leftVisible ? 'reveal' : ''}`}>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">Державні нагороди</h3>
            <div className="flex flex-col gap-2.5">
              {stateAwards.map((a, i) => <AwardCard key={i} item={a} index={i} />)}
            </div>
          </div>
          <div ref={rightRef} className={`sr sr-right sr-d1 ${rightVisible ? 'reveal' : ''}`}>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">Відомчі відзнаки</h3>
            <div className="flex flex-col gap-2.5">
              {depAwards.map((a, i) => <AwardCard key={i} item={a} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
