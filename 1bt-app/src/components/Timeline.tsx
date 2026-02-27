import { useInView } from '../hooks/useInView';
import { useRef, useState } from 'react';

const historyData = [
  {
    year: '2018',
    date: '14 Березня 2018',
    title: 'Формування',
    text: 'На базі Первомайського ОМВК Миколаївської області сформовано кадр управління батальйону ТрО на підставі директиви Командувача військ ОК "Південь".',
    accent: '#3b82f6',
    tag: 'Початок',
    size: 'half',
  },
  {
    year: '2022',
    date: '15 Січня 2022',
    title: 'Офіційне Створення',
    text: 'Офіційна дата створення 1-го батальйону територіальної оборони в/ч А7052.',
    accent: '#005ce6',
    tag: 'Заснування',
    size: 'half',
  },
  {
    year: '2022',
    date: 'Лютий – Березень 2022',
    title: 'Повномасштабне Вторгнення',
    text: 'Переведено на штат воєнного часу. Зайняли позиції оборони Первомайського району та Південноукраїнської АЕС.',
    accent: '#7c3aed',
    tag: 'Оборона',
    size: 'full',
  },
  {
    year: '2022',
    date: 'Травень – Листопад 2022',
    title: 'Оборона Миколаєва',
    text: 'Передислоковано до сектора оборони Миколаєва. Участь у звільненні районів Миколаївської та Херсонської областей.',
    accent: '#0891b2',
    tag: 'Миколаїв',
    size: 'half',
  },
  {
    year: '22–24',
    date: 'Груд. 2022 – Вер. 2024',
    title: 'Дніпровські Острови',
    text: 'Перший ешелон оборони: острови, узбережжя Дніпровського лиману та правий берег Дніпра.',
    accent: '#d97706',
    tag: 'Дніпро',
    size: 'half',
  },
  {
    year: 'NOW',
    date: 'З Грудня 2024',
    title: 'Харківщина — Активна служба',
    text: 'Батальйон бере безпосередню участь у бойових діях у визначених районах Харківської області. Особовий склад виконує бойові завдання на передньому краї.',
    accent: '#dc2626',
    tag: 'Активно',
    size: 'featured',
    active: true,
  },
];

type Item = typeof historyData[0];

const Card = ({ item, delay = 0 }: { item: Item; delay?: number }) => {
  const { ref: inViewRef, isVisible } = useInView();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isFeatured = item.size === 'featured';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div ref={inViewRef} className={`sr sr-up ${isVisible ? 'reveal' : ''}`} style={{ transitionDelay: `${delay}s` }}>
      <div
        ref={cardRef}
        className={`relative glass-panel overflow-hidden h-full group transition-all duration-300
          ${isFeatured ? 'p-8 md:p-10' : 'p-6'}`}
        style={{
          borderColor: `${item.accent}30`,
          boxShadow: isFeatured ? `0 0 40px -5px ${item.accent}30` : undefined,
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Interactive Spotlight Hover Effect */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${item.accent}35, transparent 50%)`
          }}
        />

        {/* Content Container (elevated above spotlight) */}
        <div className="relative z-10">
          {/* Accent glow top edge */}
          <div className="absolute top-[-24px] left-[-24px] right-[-24px] h-[2px]" style={{ background: `linear-gradient(to right, ${item.accent}, transparent)` }} />

          {/* Watermark year */}
          <div
            className="absolute bottom-0 right-0 font-bold leading-none select-none pointer-events-none tracking-tighter"
            aria-hidden
            style={{
              color: item.accent,
              opacity: 0.07,
              fontSize: isFeatured ? '11rem' : '7rem',
              lineHeight: 0.8,
            }}
          >
            {item.year}
          </div>

          {/* Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full flex items-center gap-1.5"
              style={{ color: item.accent, background: `${item.accent}18`, border: `1px solid ${item.accent}35` }}
            >
              {item.active && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />}
              {item.tag}
            </span>
            <span className="text-xs text-slate-600">{item.date}</span>
          </div>

          {/* Title */}
          <h3
            className={`font-black text-white leading-tight mb-3 ${isFeatured ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'}`}
          >
            {item.title}
          </h3>

          {/* Text */}
          <p className={`text-slate-400 leading-relaxed ${isFeatured ? 'text-lg max-w-4xl' : 'text-base'}`}>
            {item.text}
          </p>

          {/* Featured-only: glowing year pill bottom left */}
          {isFeatured && (
            <div
              className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-base font-bold tracking-wide uppercase"
              style={{
                background: `${item.accent}20`, color: item.accent, border: `1px solid ${item.accent}40`
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: item.accent }} />
              Зараз
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const { ref: headRef, isVisible: headVisible } = useInView();

  const half = historyData.filter(d => d.size === 'half');
  const full = historyData.find(d => d.size === 'full')!;
  const featured = historyData.find(d => d.size === 'featured')!;

  return (
    <section id="history" className="py-10 md:py-16 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div ref={headRef} className={`sr sr-up mb-12 ${headVisible ? 'reveal' : ''}`}>
          <p className="text-sm font-bold tracking-[0.15em] text-uaBlue uppercase mb-2">Хронологія</p>
          <h2 className="text-6xl md:text-7xl font-black text-white leading-none mb-8">Бойовий Шлях</h2>

          {/* Styled Stat Badge */}
          <div className="inline-flex py-8">
            <div className="glass-panel rounded-2xl p-5 md:p-6 border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-uaBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-4 md:gap-6 relative z-10">
                <div className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                  4
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="text-sm md:text-base font-bold text-slate-300 leading-tight">
                  Напрямки <br className="hidden md:block" />бойових дій
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-4">
          {/* Row 1: two half cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card item={half[0]} delay={0} />
            <Card item={half[1]} delay={0.07} />
          </div>

          {/* Row 2: full-width card */}
          <Card item={full} delay={0.1} />

          {/* Row 3: two half cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card item={half[2]} delay={0.05} />
            <Card item={half[3]} delay={0.12} />
          </div>

          {/* Row 4: featured active card */}
          <Card item={featured} delay={0.08} />
        </div>
      </div>
    </section>
  );
};

export default Timeline;
