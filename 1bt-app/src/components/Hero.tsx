import { useState, useEffect } from 'react';

const Hero = () => {
  // Generate random radar pings
  const [pings, setPings] = useState<{ id: number; top: string; left: string; size: number }[]>([]);

  useEffect(() => {
    // Generate 2-4 random pings every 2.5 seconds
    const interval = setInterval(() => {
      const pingCount = Math.floor(Math.random() * 3) + 2;
      const newPings = Array.from({ length: pingCount }).map((_, i) => ({
        id: Date.now() + i,
        // Keep them mostly within the 20%-80% range so they don't clip the outer circle text
        top: `${Math.floor(Math.random() * 60) + 20}%`,
        left: `${Math.floor(Math.random() * 60) + 20}%`,
        size: Math.random() > 0.5 ? 3 : 2, // 2 or 3 (w-2/w-3 class equivalents)
      }));
      setPings(newPings);
    }, 2500);

    return () => clearInterval(interval);
  }, []);
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Orbs — pure CSS, GPU-composited */}
      <div className="absolute rounded-full opacity-20 pointer-events-none" style={{
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, #005ce6 0%, transparent 70%)',
        top: '-200px', right: '-200px',
        willChange: 'transform',
        animation: 'float 12s ease-in-out infinite',
      }} />
      <div className="absolute rounded-full opacity-10 pointer-events-none" style={{
        width: '550px', height: '550px',
        background: 'radial-gradient(circle, #ffdf2a 0%, transparent 70%)',
        bottom: '-180px', left: '-130px',
        willChange: 'transform',
        animation: 'float 16s ease-in-out infinite reverse',
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-28 pb-16">

          {/* Text — CSS entrance animations */}
          <div className="anim-fade-up">
            <h1 className="font-black leading-[0.9] mb-8" style={{ fontSize: 'clamp(4rem, 9vw, 8rem)' }}>
              <span className="block text-white">1-й</span>
              <span className="block text-white">Батальйон</span>
              <span className="block" style={{
                background: 'linear-gradient(135deg, #005ce6 0%, #33aaff 40%, #ffdf2a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>123 ТРО</span>
            </h1>

            {/* Styled subtitle */}
            <div className="flex items-start gap-3 mb-10 max-w-[480px]">
              <div className="w-[3px] flex-shrink-0 self-stretch rounded-full" style={{
                background: 'linear-gradient(to bottom, #005ce6, #ffdf2a)',
              }} />
              <p className="text-slate-300 text-lg leading-relaxed">
                <span className="font-semibold text-white">Батальйон територіальної оборони (В/Ч А7052).</span>
                <br />Здійснює захист суверенітету та цілісності України.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href="#history" className="group flex items-center gap-2 bg-uaBlue text-white font-bold px-7 py-3.5 rounded-full hover:bg-blue-500 transition-colors text-base">
                Бойовий шлях <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <button
                onClick={() => document.dispatchEvent(new Event('openJoinModal'))}
                className="bg-white/5 border border-white/10 text-white font-bold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors text-base"
              >
                Долучитись
              </button>
            </div>

            <div className="mt-14 flex gap-8 pt-8 border-t border-white/5 justify-center lg:justify-start">
              {[
                { num: '253', label: 'Нагороджених' },
                { num: '2022', label: 'Рік заснування' },
                { num: '4', label: 'Напрямки бойових дій' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl font-black text-white tracking-tight">
                    {s.num}
                  </div>
                  <div className="text-sm text-slate-500 mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Military Radar Effect - Scaled up & Intensified */}
          <div className="anim-scale-in delay-1 flex justify-center items-center relative z-0 mt-8 lg:mt-0 w-[360px] md:w-[480px] h-[360px] md:h-[480px]">
            {/* Radar Grid Lines & Rings - Increased thickness and scale */}
            <div className="absolute w-[360px] md:w-[480px] h-[360px] md:h-[480px] rounded-full border-2 border-[#10b981]/30" />
            <div className="absolute w-[260px] md:w-[340px] h-[260px] md:h-[340px] border-2 border-[#10b981]/30 border-dashed rounded-full animate-spin" style={{ animationDuration: '80s' }} />
            <div className="absolute w-[160px] md:w-[200px] h-[160px] md:h-[200px] border-2 border-[#10b981]/15 rounded-full" />
            
            {/* Crosshairs */}
            <div className="absolute w-[360px] md:w-[480px] h-[2px] bg-[#10b981]/30" />
            <div className="absolute w-[2px] h-[360px] md:h-[480px] bg-[#10b981]/30" />
            
            {/* The sweeping radar beam - Intensified opacity */}
            <div 
              className="absolute w-[360px] md:w-[480px] h-[360px] md:h-[480px] rounded-full pointer-events-none animate-spin"
              style={{
                background: 'conic-gradient(from 0deg, transparent 70%, rgba(16, 185, 129, 0.15) 85%, rgba(16, 185, 129, 0.9) 100%)',
                animationDuration: '7s',
                animationTimingFunction: 'linear'
              }}
            />

            {/* CRT Scanline Overlay */}
            <div className="absolute w-[360px] md:w-[480px] h-[360px] md:h-[480px] rounded-full overflow-hidden pointer-events-none z-10 opacity-70">
              <div className="w-full h-full animate-scanline" />
            </div>

            {/* Compass Degree Markers */}
            {[
              { deg: '000°', dir: 'N', style: { top: '8px', left: '50%', transform: 'translateX(-50%)' } },
              { deg: '090°', dir: 'E', style: { right: '8px', top: '50%', transform: 'translateY(-50%)' } },
              { deg: '180°', dir: 'S', style: { bottom: '8px', left: '50%', transform: 'translateX(-50%)' } },
              { deg: '270°', dir: 'W', style: { left: '8px', top: '50%', transform: 'translateY(-50%)' } },
            ].map(({ deg, dir, style }) => (
              <div
                key={deg}
                className="absolute z-20 pointer-events-none text-center"
                style={style}
              >
                <div className="text-[8px] md:text-[9px] font-mono leading-tight" style={{ color: 'rgba(16, 185, 129, 0.9)', textShadow: '0 0 6px rgba(16,185,129,0.7)' }}>
                  <div className="font-bold tracking-widest text-[7px] md:text-[8px]">{dir}</div>
                  <div className="opacity-60">{deg}</div>
                </div>
              </div>
            ))}

            {/* Glowing radar ping targets (Dynamic) */}
            {pings.map((ping) => (
              <div 
                key={ping.id} 
                className={`absolute rounded-full bg-[#10b981] shadow-[0_0_15px_#10b981] ${ping.size === 3 ? 'w-3 h-3' : 'w-2 h-2'}`}
                style={{ top: ping.top, left: ping.left }}
              >
                <div className="w-full h-full rounded-full bg-[#10b981] animate-ping" style={{ animationDuration: '2s' }} />
              </div>
            ))}

            <div style={{ animation: 'float 7s ease-in-out infinite', willChange: 'transform' }} className="relative group z-10">
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70" style={{ background: 'radial-gradient(circle, #005ce6 0%, transparent 70%)' }} />
              
              {/* Main Physical Body of the 3D Badge */}
              <div className="relative w-[240px] md:w-[320px] aspect-square rounded-full overflow-hidden bg-[#050a14] border-[3px] border-[#1a2540]"
                style={{
                  boxShadow: '0 40px 80px -20px rgba(0,92,230,0.8), inset 0 -20px 40px rgba(0,0,0,1), inset 0 6px 15px rgba(255,255,255,0.5)',
                }}
              >
                {/* 3D Glass Lens Overlay - Deep volume */}
                <div className="absolute inset-0 z-10 rounded-full pointer-events-none" style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.0) 35%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,1) 100%)',
                  boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.9), inset 0 -12px 25px rgba(0,0,0,1)',
                }} />
                
                {/* Secondary Highlight reflection at the very top (curved glass rim) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[75%] h-[20%] rounded-[100%] bg-gradient-to-b from-white/60 to-transparent blur-[1px] z-20 pointer-events-none" style={{ transform: 'rotateX(40deg)' }} />
                
                {/* Logo Image */}
                <img
                  src="/logo.jpeg"
                  alt="Лого 1-Б 123 ОБР ТРО"
                  loading="eager"
                  className="w-full h-full object-cover scale-[1.08] mt-[2%]"
                  style={{ filter: 'contrast(1.2) brightness(0.9) saturate(1.1)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
