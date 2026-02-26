import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Головна', href: '#home' },
    { name: 'Шлях', href: '#history' },
    { name: 'Нагороди', href: '#awards' },
    { name: 'Контакти', href: '#contact' },
  ];

  return (
    <>
      {/* Floating Pill Nav */}
      <nav className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-full max-w-4xl px-4`}>
        <div className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-500 ${
          isScrolled ? 'glass-nav shadow-[0_0_30px_rgba(0,92,230,0.15)]' : 'glass-nav'
        }`}>
          {/* Logo + Name */}
          <a href="#home" className="flex items-center gap-1.5 md:gap-2.5 group">
            <img src="/logo.jpeg" alt="Лого" className="h-7 w-7 md:h-8 md:w-8 rounded-full object-cover ring-1 ring-white/20 group-hover:ring-uaBlue transition-all" />
            <span className="font-bold text-base tracking-tighter md:tracking-wide text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
              1Б · 123 ОБР ТРО
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="px-4 py-2 rounded-full text-base font-medium text-slate-400 hover:text-white hover:bg-white/8 transition-all"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Button — desktop: after nav links, mobile: always visible */}
          <button
            onClick={() => document.dispatchEvent(new Event('openJoinModal'))}
            className="hidden md:flex items-center gap-2 bg-uaBlue text-white text-base font-semibold px-5 py-2 rounded-full hover:bg-blue-500 transition-all hover:shadow-[0_0_20px_rgba(0,92,230,0.5)] active:scale-95"
          >
            Долучитись
          </button>

          {/* Mobile right side: Doluchytsya + Burger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => document.dispatchEvent(new Event('openJoinModal'))}
              className="bg-uaBlue text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-500 transition-colors active:scale-95"
            >
              Долучитись
            </button>
            <button
              className="text-white/70 hover:text-white p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown — only nav links here, no Doluchytsya button */}
        {isMobileMenuOpen && (
          <div className="mt-2 glass-nav rounded-2xl p-4 flex flex-col gap-1 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-base font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
