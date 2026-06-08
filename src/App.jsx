import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import './App.css';
import Owner from "./images/owner.webp";
import Blog1 from "./images/blog1.webp";
import Blog2 from "./images/blog2.jpg";
import Blog3 from "./images/blog3.webp";
import HomeImg from "./images/1780841387535.png";
import AboutImg from "./images/1780842821087.png";
import {
  Phone, MessageSquare, Sun, Moon, Globe, Users,
  ShieldCheck, Loader2, BookOpen, Menu, X,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TRANSLATIONS
───────────────────────────────────────────── */
const translations = {
  en: {
    navHome: "Home", navAbout: "About", navServices: "Services",
    navBlog: "Events", navOwner: "Leader", navContact: "Contact",
    heroTitle: "Experience the Majestic Beats of VRS Melam",
    heroSubtitle: "Bringing the traditional, high-energy rhythm of Southern Tamil Nadu to your grand celebrations.",
    bookBtn: "Book Our Performance",
    aboutTitle: "About Our Melam",
    aboutP1: "VRS Melam is a premier traditional percussion troupe dedicated to elevating your special occasions. With years of expertise, our energetic team delivers powerful rhythms that resonate with cultural heritage and pure celebration.",
    aboutP2: "Whether it is a temple festival, wedding celebration, corporate launch, or political event, we bring unmatched energy and professionalism to create unforgettable memories.",
    servicesTitle: "Our Premium Services",
    blogTitle: "Recent Vibrant Events",
    ownerTitle: "Meet the Leader",
    ownerRole: "Vellai Pandian alias Sudhan — Founder of VRS",
    ownerDesc: "Driven by passion and deep-rooted cultural respect, the founder of VRS Melam has spent over a decade mastering the art of traditional percussion. Under his visionary leadership, the troupe has successfully performed at over 5000+ events, earning a reputation for absolute synchronization and unmatched energetic displays.",
    contactTitle: "Connect With Us",
    contactSubtitle: "Ready to make your event unforgettable? Reach out to us instantly!",
    statYears: "Years Old Band", statClients: "Happy Clients",
    callUs: "Contact via Call", whatsappUs: "Contact via WhatsApp",
    footerText: "© 2026 VRS Chendai Melam · All rights reserved.",
    footerLink: "Want a site like this? Click here",
  },
  ta: {
    navHome: "முகப்பு", navAbout: "எங்களைப் பற்றி", navServices: "சேவைகள்",
    navBlog: "நிகழ்ச்சிகள்", navOwner: "நிர்வாகம்", navContact: "தொடர்பு",
    heroTitle: "VRS மேளத்தின் கம்பீர நாதத்தை அனுபவியுங்கள்",
    heroSubtitle: "பாரம்பரிய மேள தாளங்களை உங்கள் சுப நிகழ்ச்சிகளுக்கு கொண்டு சேர்க்கிறோம்.",
    bookBtn: "இப்பொழுதே முன்பதிவு செய்ய",
    aboutTitle: "எங்கள் மேளம்",
    aboutP1: "VRS மேளம் என்பது உங்கள் சிறப்பு நிகழ்வுகளை சிறப்பிக்க அர்ப்பணிக்கப்பட்ட ஒரு முன்னணி பாரம்பரிய தாள வாத்திய குழுவாகும். பல வருட அனுபவத்துடன், எங்கள் துடிப்பான குழு கலாச்சார பாரம்பரியத்தை பறைசாற்றும் சக்திவாய்ந்த இசையை வழங்குகிறது.",
    aboutP2: "கோயில் திருவிழாக்கள், திருமண விழாக்கள், கார்ப்பரேட் தொடக்க விழாக்கள் என அனைத்து சுப நிகழ்ச்சிகளுக்கும் ஈடு இணையற்ற ஆற்றலையும் தொழில்முறையையும் கொண்டு வருகிறோம்.",
    servicesTitle: "எங்கள் சேவைகள்",
    blogTitle: "சமீபத்திய நிகழ்வுகள்",
    ownerTitle: "நிறுவனரை சந்திக்கவும்",
    ownerRole: "வெள்ளைப்பாண்டியன் என்ற சுதன் — VRS நிறுவனர்",
    ownerDesc: "பாரம்பரிய கலை மீதுள்ள பற்று மற்றும் ஆழமான மரியாதையினால், VRS மேளத்தின் நிறுவனர் கடந்த பத்தாண்டுகளுக்கும் மேலாக இந்த கலையில் சிறந்து விளங்கி வருகிறார். அவரது தொலைநோக்கு பார்வையில், இக்குழு 5000-க்கும் மேற்பட்ட நிகழ்ச்சிகளை வெற்றிகரமாக நடத்தி, சிறந்த ஒத்திசைவுக்கு பெயர் பெற்றுள்ளது.",
    contactTitle: "எங்களை தொடர்பு கொள்ள",
    contactSubtitle: "உங்கள் நிகழ்வை மறக்க முடியாததாக மாற்ற தயாரா? உடனே எங்களை தொடர்பு கொள்ளுங்கள்!",
    statYears: "ஆண்டுகள்", statClients: "வாடிக்கையாளர்கள்",
    callUs: "தொலைபேசி அழைப்பு", whatsappUs: "வாட்ஸ்அப் தொடர்பு",
    footerText: "© 2026 VRS செண்டை மேளம் · அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    footerLink: "இது போன்ற தளம் வேண்டுமா? இங்கே கிளிக் செய்யுங்கள்",
  }
};

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCounter({ from, to, suffix = "" }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v) + suffix);
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-50px" });
  useEffect(() => {
    if (isInView) {
      const c = animate(count, to, { duration: 2.2, ease: "easeOut" });
      return c.stop;
    }
  }, [isInView, count, to]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ─────────────────────────────────────────────
   PARTICLES CONFIG
───────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 5 + 2,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: Math.random() * 12 + 10,
  delay: Math.random() * 6,
  opacity: Math.random() * 0.5 + 0.2,
}));

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [langSelected, setLangSelected] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLightboxImg, setSelectedLightboxImg] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', location: '', date: '' });
  const [loadProgress, setLoadProgress] = useState(0);

  const t = translations[lang];

  /* ── scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'about', 'services', 'blog', 'owner', 'contact'];
      const sp = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && sp >= el.offsetTop && sp < el.offsetTop + el.offsetHeight) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── auto-slide ── */
  useEffect(() => {
    const iv = setInterval(() => setCurrentSlide(p => (p === 2 ? 0 : p + 1)), 4000);
    return () => clearInterval(iv);
  }, [currentSlide]);

  /* ── image preload ── */
  useEffect(() => {
    const imgs = [HomeImg, AboutImg, Blog1, Blog2, Blog3, Owner,
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400"
    ];
    let loaded = 0;
    imgs.forEach(src => {
      const img = new Image();
      img.src = src;
      const done = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / imgs.length) * 100));
        if (loaded === imgs.length) setTimeout(() => setImagesLoaded(true), 600);
      };
      img.onload = done; img.onerror = done;
    });
  }, []);

  /* ── dark mode class ── */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleScroll = useCallback((e, id) => {
    e.preventDefault();
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      // Wait for the drawer collapse animation (300ms) before scrolling
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 320);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [mobileMenuOpen]);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };
  const stagger = {
    hidden: {}, visible: { transition: { staggerChildren: 0.12 } }
  };

  const NAV_ITEMS = [
    { id: 'home', label: t.navHome }, { id: 'about', label: t.navAbout },
    { id: 'services', label: t.navServices }, { id: 'blog', label: t.navBlog },
    { id: 'owner', label: t.navOwner }, { id: 'contact', label: t.navContact },
  ];

  /* ─── LOADING SCREEN ─── */
  if (!imagesLoaded) return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#f8f5f2] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ff00be18_0%,_transparent_70%)]" />

      {/* Drum icon pulse */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-6xl mb-8 select-none"
      >🥁</motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#ff00be] font-black text-2xl tracking-[0.3em] uppercase mb-2"
      >VRS MELAM</motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="text-neutral-400 text-xs tracking-widest uppercase mb-8"
      >Loading Experience…</motion.p>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-neutral-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#ff00be] to-[#ff69d1] rounded-full"
          style={{ width: `${loadProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-neutral-400 text-xs mt-2 font-mono">{loadProgress}%</p>
    </motion.div>
  );

  /* ─── LANGUAGE GATE ─── */
  if (!langSelected) return (
    <motion.div
      key="lang"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 bg-[#f8f5f2] flex flex-col items-center justify-center p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ff00be12_0%,_transparent_65%)]" />

      {/* Animated particles behind */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.slice(0, 12).map(p => (
          <motion.div key={p.id}
            className="absolute rounded-full bg-[#ff00be]"
            style={{ width: p.size, height: p.size, top: p.top, left: p.left, boxShadow: '0 0 8px #ff00be' }}
            animate={{ y: [0, -80, 0], opacity: [0.05, p.opacity * 0.4, 0.05] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="relative z-10 text-center max-w-sm w-full"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-5xl mb-6"
        >🥁</motion.div>

        <h1 className="text-[#0a0a0a] text-3xl font-black tracking-wider mb-1 uppercase">Choose Language</h1>
        <p className="text-neutral-500 text-base mb-2">உங்கள் மொழியை தேர்ந்தெடுக்கவும்</p>
        <div className="w-12 h-[3px] bg-[#ff00be] mx-auto mb-8 rounded" />

        <div className="grid grid-cols-2 gap-4">
          {[['en', 'English', '🇬🇧'], ['ta', 'தமிழ்', '🇮🇳']].map(([l, label, flag]) => (
            <motion.button key={l}
              whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setLang(l); setLangSelected(true); }}
              className="group relative py-5 px-4 rounded-2xl border-2 border-neutral-200 bg-white text-[#0a0a0a] font-black text-xl
                         hover:border-[#ff00be]/60 hover:bg-[#ff00be]/5 transition-all duration-300 overflow-hidden shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff00be]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-2xl block mb-1">{flag}</span>
              {label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  /* ─────── MAIN UI ─────── */
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        className={`min-h-screen relative overflow-x-hidden transition-colors duration-500
          ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f5f2] text-[#111]'}
          ${lang === 'ta' ? 'font-sans' : 'font-sans'}`}
      >

        {/* ── GLOBAL FONT IMPORT ── */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Noto+Sans+Tamil:wght@400;600;700;800&display=swap');
          body { font-family: 'Barlow', 'Noto Sans Tamil', sans-serif; }
          .font-display { font-family: 'Bebas Neue', 'Barlow', sans-serif; letter-spacing: 0.04em; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          html { scroll-behavior: smooth; }
          ::selection { background: #ff00be44; color: #fff; }
        `}</style>

        {/* ── AMBIENT BACKGROUND ── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {darkMode && <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff00be]/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[#ff00be]/5 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-900/10 rounded-full blur-[80px]" />
          </>}
          {/* Grain texture */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>

        {/* ── FLOATING PARTICLES ── */}
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
          {PARTICLES.map(p => (
            <motion.div key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.size, height: p.size,
                top: p.top, left: p.left,
                background: '#ff00be',
                boxShadow: `0 0 ${p.size * 3}px #ff00be`,
              }}
              animate={{ y: [0, -120, 0], x: [0, 30, 0], opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* ══════════════════════════════
            NAVBAR
        ══════════════════════════════ */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? darkMode
              ? 'bg-black/80 backdrop-blur-xl border-b border-[#ff00be]/15 shadow-[0_4px_30px_#ff00be11]'
              : 'bg-white/85 backdrop-blur-xl border-b border-neutral-200 shadow-sm'
            : 'bg-transparent'}
          ${selectedLightboxImg ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">

            {/* Logo */}
            <a href="#home" onClick={e => handleScroll(e, 'home')}
              className="font-display text-xl sm:text-2xl bg-gradient-to-r from-[#ff00be] to-[#ff69d1] bg-clip-text text-transparent shrink-0 tracking-widest">
              VRS MELAM
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <a key={item.id} href={`#${item.id}`} onClick={e => handleScroll(e, item.id)}
                  className={`relative px-4 py-2 text-sm font-bold rounded-full transition-all duration-200
                    ${activeSection === item.id
                      ? 'text-[#ff00be]'
                      : darkMode ? 'text-white/70 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'}
                  `}
                >
                  {activeSection === item.id && (
                    <motion.span layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[#ff00be]/10 border border-[#ff00be]/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setLang(p => p === 'en' ? 'ta' : 'en')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold transition-all
                  ${darkMode ? 'border-white/10 bg-white/5 text-white hover:border-[#ff00be]/40 hover:bg-[#ff00be]/10'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#ff00be]/40'}`}
              >
                <Globe className="w-3.5 h-3.5 text-[#ff00be]" />
                {lang === 'en' ? 'தமிழ்' : 'EN'}
              </button>

              <button onClick={() => setDarkMode(p => !p)}
                className={`p-2.5 rounded-full border transition-all
                  ${darkMode ? 'border-white/10 bg-white/5 text-yellow-400 hover:bg-white/10'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile hamburger */}
              <button onClick={() => setMobileMenuOpen(p => !p)}
                className={`lg:hidden p-2.5 rounded-full border transition-all
                  ${darkMode ? 'border-white/10 bg-white/5 text-white' : 'border-neutral-200 bg-white text-neutral-700'}`}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen
                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5 text-[#ff00be]" /></motion.span>
                    : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-5 h-5" /></motion.span>}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`lg:hidden overflow-hidden border-t
                  ${darkMode ? 'bg-black/95 backdrop-blur-xl border-[#ff00be]/15' : 'bg-white border-neutral-200'}`}
              >
                <div className="px-4 py-4 flex flex-col gap-1">
                  {/* Language toggle in mobile menu */}
                  <div className="flex gap-2 mb-3 pb-3 border-b border-white/10">
                    <button onClick={() => setLang(p => p === 'en' ? 'ta' : 'en')}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[#ff00be]/10 text-[#ff00be] border border-[#ff00be]/20">
                      <Globe className="w-4 h-4" />
                      {lang === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}
                    </button>
                  </div>
                  {NAV_ITEMS.map((item, i) => (
                    <motion.a
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      href={`#${item.id}`}
                      onClick={e => handleScroll(e, item.id)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-base transition-all
                        ${activeSection === item.id
                          ? 'text-[#ff00be] bg-[#ff00be]/10 border border-[#ff00be]/20'
                          : darkMode ? 'text-white/80 hover:bg-white/5' : 'text-neutral-700 hover:bg-neutral-100'}`}
                    >
                      <span className={`w-2 h-2 rounded-full transition-all ${activeSection === item.id ? 'bg-[#ff00be] scale-100' : 'bg-transparent scale-0'}`} />
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-12">

            {/* Text */}
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6 order-2 lg:order-1">
              <motion.div variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff00be]/30 bg-[#ff00be]/8 text-[#ff00be] text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-[#ff00be] animate-pulse" />
                Traditional · Tamil Nadu
              </motion.div>

              <motion.h1 variants={fadeUp}
                className={`font-display leading-none tracking-wide
                  ${lang === 'ta' ? 'text-3xl sm:text-4xl lg:text-5xl normal-case font-black' : 'text-4xl sm:text-5xl lg:text-[4.5rem]'}
                  ${darkMode ? 'text-white' : 'text-[#0a0a0a]'}`}
                style={{ lineHeight: 1.05 }}
              >
                {lang === 'en'
                  ? <><span className="text-[#ff00be]">Experience</span><br />the Majestic<br />Beats of VRS</>
                  : t.heroTitle}
              </motion.h1>

              <motion.p variants={fadeUp}
                className={`text-base sm:text-lg font-medium max-w-xl leading-relaxed
                  ${darkMode ? 'text-white/60' : 'text-neutral-600'}`}
              >{t.heroSubtitle}</motion.p>

              {/* Social + CTA */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <a href="#contact" onClick={e => handleScroll(e, 'contact')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-black text-white text-sm
                    bg-[#ff00be] shadow-lg shadow-[#ff00be]/30 hover:bg-[#d600a1] hover:-translate-y-0.5 transition-all duration-200">
                  {t.bookBtn}
                </a>

                <div className="flex items-center gap-2">
                  {[
                    { href: "https://www.youtube.com/@vrsambai7438", color: 'text-red-500', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                    { href: "https://www.instagram.com/vrs_jai_anjaneya_9003387065/", color: 'text-[#ff00be]', icon: <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                    { href: "https://www.facebook.com/vrs.jaianjaneya", color: 'text-blue-400', icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                  ].map(({ href, color, icon }, i) => (
                    <motion.a key={i} whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }}
                      href={href} target="_blank" rel="noreferrer"
                      className={`p-3 rounded-full border transition-colors ${color}
                        ${darkMode ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-neutral-200 bg-white hover:bg-neutral-50 shadow-sm'}`}
                    >{icon}</motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick stats */}
              <motion.div variants={fadeUp} className="flex gap-6 pt-2">
                {[['5000+', lang === 'en' ? 'Events' : 'நிகழ்ச்சிகள்'], ['13+', lang === 'en' ? 'Years' : 'ஆண்டுகள்']].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-[#ff00be] font-display text-3xl">{n}</p>
                    <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-neutral-500'}`}>{l}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-1 lg:order-2 flex justify-center"
            >
              <div className="absolute inset-0 bg-[#ff00be]/15 rounded-full blur-[80px] scale-75" />
              <motion.img src={HomeImg} alt="VRS Melam"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-md lg:max-w-xl object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <p className={`text-xs font-bold tracking-widest uppercase ${darkMode ? 'text-white/30' : 'text-neutral-400'}`}>Scroll</p>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-5 h-8 rounded-full border-2 border-[#ff00be]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#ff00be]" />
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════
            ABOUT
        ══════════════════════════════ */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 z-10 relative scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              <motion.div variants={fadeUp} className="relative flex justify-center">
                <div className="absolute inset-0 bg-[#ff00be]/10 rounded-3xl blur-[60px]" />
                <motion.img src={AboutImg} alt="About VRS Melam"
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}
                  className="relative w-full max-w-md object-contain drop-shadow-2xl"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-6">
                <div>
                  <p className={`text-xs font-black uppercase tracking-[0.2em] mb-3 text-[#ff00be]`}>Our Story</p>
                  <h2 className={`font-display text-4xl sm:text-5xl lg:text-6xl leading-none
                    ${darkMode ? 'text-white' : 'text-[#0a0a0a]'}`}>{t.aboutTitle}</h2>
                  <div className="w-16 h-1 bg-[#ff00be] mt-4 rounded" />
                </div>
                <p className={`text-base sm:text-lg font-medium leading-relaxed
                  ${darkMode ? 'text-white/65' : 'text-neutral-600'}`}>{t.aboutP1}</p>
                <p className={`text-base sm:text-lg font-medium leading-relaxed
                  ${darkMode ? 'text-white/65' : 'text-neutral-600'}`}>{t.aboutP2}</p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Temple Festivals', 'Weddings', 'Corporate Events', 'Political Events'].map(tag => (
                    <span key={tag}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border
                        ${darkMode ? 'border-[#ff00be]/20 bg-[#ff00be]/8 text-[#ff00be]' : 'border-[#ff00be]/30 bg-[#ff00be]/5 text-[#cc0097]'}`}
                    >{tag}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════
            SERVICES
        ══════════════════════════════ */}
        <section id="services" className={`py-24 px-4 sm:px-6 lg:px-8 z-10 relative scroll-mt-20
          ${darkMode ? 'bg-white/[0.02]' : 'bg-[#ff00be]/[0.03]'}`}>
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16">
              <p className="text-[#ff00be] text-xs font-black uppercase tracking-[0.2em] mb-3">What We Offer</p>
              <h2 className={`font-display text-4xl sm:text-5xl lg:text-6xl ${darkMode ? 'text-white' : 'text-[#0a0a0a]'}`}>
                {t.servicesTitle}
              </h2>
              <div className="w-16 h-1 bg-[#ff00be] mx-auto mt-5 rounded" />
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

              {[
                {
                  title: 'Chendai Melam',
                  tag: 'Vibrant Beats',
                  desc: 'Traditional spiritual rhythms and high-decibel energy perfectly timed for temple festivals, grand entries, and divine processions.',
                  img: 'https://tse3.mm.bing.net/th/id/OIP.G3sJyRG-vC3wZVFLN5bWVQHaE8?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3',
                  icon: '🥁'
                },
                {
                  title: 'Nazik Dhol',
                  tag: 'High Energy',
                  desc: 'Thumping corporate beats and celebration rhythms designed to grab attention, engage large crowds, and electrify store launches.',
                  img: 'https://tse2.mm.bing.net/th/id/OIP.OqvXBfDe64yzUBzGuBnmOAHaEK?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3',
                  icon: '🎶'
                },
                {
                  title: 'Panchavadyam',
                  tag: 'Classical',
                  desc: 'A majestic, classical blend of five traditional percussion instruments delivering an immersive, royal, and authentic cultural ambiance.',
                  img: 'https://1.bp.blogspot.com/-bTuuGiGWA6s/XVvH-KjLaOI/AAAAAAAAKM8/MdmVC40SfdsOSRWCvZBHO6T_QfcrftHjgCLcBGAs/s1600/panchavadyam.jpg',
                  icon: '🎺'
                },
              ].map((svc, i) => (
                <motion.div key={svc.title} variants={fadeUp}
                  className={`group rounded-3xl border overflow-hidden hover:-translate-y-2 transition-all duration-300
                    ${darkMode
                      ? 'bg-white/[0.03] border-white/8 hover:border-[#ff00be]/30 hover:shadow-[0_20px_50px_#ff00be15]'
                      : 'bg-white border-neutral-100 shadow-md shadow-neutral-100/80 hover:shadow-xl hover:border-[#ff00be]/20'}`}
                >
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-neutral-900">
                    <img src={svc.img} alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#ff00be] text-white text-[10px] font-black uppercase tracking-wider">
                      {svc.tag}
                    </div>
                    <div className="absolute bottom-3 left-3 text-2xl">{svc.icon}</div>
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-black mb-2 ${darkMode ? 'text-white' : 'text-[#0a0a0a]'}`}>{svc.title}</h3>
                    <div className="w-8 h-0.5 bg-[#ff00be] mb-3 rounded" />
                    <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-white/55' : 'text-neutral-600'}`}>{svc.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════
            EVENTS / BLOG
        ══════════════════════════════ */}
        <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 z-10 relative scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#ff00be]/10 border border-[#ff00be]/25 mb-4">
                <BookOpen className="w-5 h-5 text-[#ff00be]" />
              </div>
              <h2 className={`font-display text-4xl sm:text-5xl lg:text-6xl ${darkMode ? 'text-white' : 'text-[#0a0a0a]'}`}>
                {t.blogTitle}
              </h2>
              <div className="w-16 h-1 bg-[#ff00be] mx-auto mt-5 rounded" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative group">
              <div className={`overflow-hidden rounded-3xl border aspect-video relative
                ${darkMode ? 'border-white/8 shadow-2xl shadow-black/50' : 'border-neutral-200 shadow-2xl'}`}>
                <AnimatePresence mode="wait">
                  <motion.img key={currentSlide}
                    src={[Blog1, Blog2, Blog3][currentSlide]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => { setSelectedLightboxImg([Blog1, Blog2, Blog3][currentSlide]); setZoomScale(1); }}
                    className="w-full h-full object-cover cursor-zoom-in"
                    alt={`Event ${currentSlide + 1}`}
                  />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                {/* Nav arrows */}
                {[-1, 1].map(dir => (
                  <button key={dir}
                    onClick={e => { e.stopPropagation(); setCurrentSlide(p => (p + dir + 3) % 3); }}
                    className={`absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center
                      bg-black/40 hover:bg-[#ff00be] text-white backdrop-blur-sm transition-all duration-200
                      opacity-0 group-hover:opacity-100 font-bold text-lg
                      ${dir === -1 ? 'left-4' : 'right-4'}`}
                  >{dir === -1 ? '❮' : '❯'}</button>
                ))}

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {[0, 1, 2].map(i => (
                    <button key={i} onClick={e => { e.stopPropagation(); setCurrentSlide(i); }}
                      className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-6 bg-[#ff00be]' : 'w-2 bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedLightboxImg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[150] bg-black/97 backdrop-blur-md flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0 right-0 h-16 px-6 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent z-10">
                  <span className="text-white/50 text-xs font-mono bg-black/30 px-3 py-1 rounded-full border border-white/10">
                    {Math.round(zoomScale * 100)}%
                  </span>
                  <div className="flex items-center gap-2">
                    {['+', '-'].map(sym => (
                      <button key={sym} onClick={() => setZoomScale(p => sym === '+' ? Math.min(p + 0.5, 3) : Math.max(p - 0.5, 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 font-black">{sym}</button>
                    ))}
                    <button onClick={() => setSelectedLightboxImg(null)}
                      className="ml-2 p-2.5 rounded-full bg-[#ff00be] hover:bg-[#d600a1] text-white transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <motion.div drag={zoomScale > 1} dragConstraints={{ left: -400, right: 400, top: -300, bottom: 300 }}
                  style={{ scale: zoomScale }} className="cursor-move">
                  <img src={selectedLightboxImg} alt="Event"
                    className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl select-none pointer-events-none" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ══════════════════════════════
            OWNER
        ══════════════════════════════ */}
        <section id="owner" className={`py-24 px-4 sm:px-6 lg:px-8 z-10 relative scroll-mt-20
          ${darkMode ? 'bg-white/[0.02]' : 'bg-[#ff00be]/[0.03]'}`}>
          <div className="max-w-7xl mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              <motion.div variants={fadeUp} className="relative max-w-sm mx-auto lg:mx-0 order-2 lg:order-1">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-3xl border-2 border-[#ff00be]/20 border-dashed animate-spin-slow" style={{ animation: 'spin 20s linear infinite' }} />
                <div className="absolute -inset-2 bg-[#ff00be]/10 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden border-4 border-[#ff00be]/50 shadow-2xl shadow-[#ff00be]/20 aspect-square">
                  <img src={Owner} alt="Founder" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* Award badge */}
                <motion.div
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring' }}
                  className="absolute -bottom-4 -right-4 bg-[#ff00be] text-white rounded-2xl px-4 py-3 shadow-xl shadow-[#ff00be]/40 text-center">
                  <p className="font-display text-2xl leading-none">5000+</p>
                  <p className="text-[10px] font-black uppercase tracking-wider mt-0.5">Events</p>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-6 order-1 lg:order-2">
                <p className="text-[#ff00be] text-xs font-black uppercase tracking-[0.2em]">Our Founder</p>
                <h2 className={`font-display text-4xl sm:text-5xl lg:text-6xl leading-none ${darkMode ? 'text-white' : 'text-[#0a0a0a]'}`}>
                  {t.ownerTitle}
                </h2>
                <div>
                  <h4 className="text-lg font-bold text-[#ff00be]">{t.ownerRole}</h4>
                  <div className="w-12 h-0.5 bg-[#ff00be] mt-2 rounded" />
                </div>
                <p className={`text-base sm:text-lg font-medium leading-relaxed ${darkMode ? 'text-white/65' : 'text-neutral-600'}`}>
                  {t.ownerDesc}
                </p>
                {/* Achievement pills */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[['13+', lang === 'en' ? 'Years Experience' : 'ஆண்டு அனுபவம்'], ['5000+', lang === 'en' ? 'Events Performed' : 'நிகழ்ச்சிகள்']].map(([n, l]) => (
                    <div key={l} className={`rounded-2xl border p-4
                      ${darkMode ? 'border-white/8 bg-white/[0.03]' : 'border-neutral-200 bg-white'}`}>
                      <p className="text-[#ff00be] font-display text-3xl">{n}</p>
                      <p className={`text-xs font-bold mt-1 ${darkMode ? 'text-white/50' : 'text-neutral-500'}`}>{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════
            CONTACT
        ══════════════════════════════ */}
        <section id="contact" className={`py-24 px-4 sm:px-6 lg:px-8 z-10 relative scroll-mt-20 border-t
          ${darkMode ? 'border-white/5' : 'border-neutral-200'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <p className="text-[#ff00be] text-xs font-black uppercase tracking-[0.2em] mb-3">Get In Touch</p>
              <h2 className={`font-display text-4xl sm:text-5xl lg:text-6xl mb-4 ${darkMode ? 'text-white' : 'text-[#0a0a0a]'}`}>
                {t.contactTitle}
              </h2>
              <p className={`text-base sm:text-lg font-medium max-w-xl mx-auto ${darkMode ? 'text-white/55' : 'text-neutral-600'}`}>
                {t.contactSubtitle}
              </p>
              <div className="w-16 h-1 bg-[#ff00be] mx-auto mt-6 rounded" />
            </motion.div>

            {/* Stats */}
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-10">
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-[#ff00be]" />, num: 13, suffix: '+', label: t.statYears },
                { icon: <Users className="w-5 h-5 text-[#ff00be]" />, num: 5000, suffix: '+', label: t.statClients },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp}
                  className={`rounded-2xl border p-5 flex flex-col items-center gap-2
                    ${darkMode ? 'border-white/8 bg-white/[0.03]' : 'border-neutral-200 bg-white shadow-sm'}`}>
                  {s.icon}
                  <p className="font-display text-4xl text-[#ff00be]">
                    <AnimatedCounter from={0} to={s.num} suffix={s.suffix} />
                  </p>
                  <p className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-neutral-500'}`}>{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <motion.a variants={fadeUp}
                whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                href="tel:+919003387065"
                className={`flex items-center justify-center gap-3 p-5 rounded-2xl border-2 font-black text-base transition-all
                  ${darkMode
                    ? 'border-white/15 bg-white/[0.04] text-white hover:border-[#ff00be]/40 hover:bg-[#ff00be]/8'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:border-[#ff00be]/40 shadow-sm'}`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#ff00be]/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#ff00be]" />
                </div>
                {t.callUs}
              </motion.a>

              <motion.button variants={fadeUp}
                whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                onClick={() => setIsBookingModalOpen(true)}
                className="flex items-center justify-center gap-3 p-5 rounded-2xl border-2 font-black text-base transition-all
                  bg-[#ff00be] border-[#ff00be] text-white hover:bg-[#d600a1] hover:border-[#d600a1] shadow-lg shadow-[#ff00be]/30"
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                {t.whatsappUs}
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════
            FOOTER
        ══════════════════════════════ */}
        <footer className={`py-10 px-4 border-t z-10 relative
          ${darkMode ? 'bg-black border-white/5' : 'bg-neutral-100 border-neutral-200'}`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="#home" onClick={e => handleScroll(e, 'home')}
              className="font-display text-xl bg-gradient-to-r from-[#ff00be] to-[#ff69d1] bg-clip-text text-transparent tracking-widest">
              VRS MELAM
            </a>
            <p className={`text-sm font-semibold text-center ${darkMode ? 'text-white/40' : 'text-neutral-500'}`}>
              {t.footerText}
            </p>
            <a
              href="https://sundarkandan.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-[#ff00be] hover:text-[#d600a1] transition-colors underline underline-offset-4 decoration-[#ff00be]/40 hover:decoration-[#d600a1] whitespace-nowrap"
            >
              {t.footerLink} →
            </a>
          </div>
        </footer>

        {/* ══════════════════════════════
            BOOKING MODAL
        ══════════════════════════════ */}
        <AnimatePresence>
          {isBookingModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsBookingModalOpen(false)}
                className="fixed inset-0 bg-black/75 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`relative z-10 w-full max-w-md rounded-3xl p-7 border shadow-2xl
                  ${darkMode ? 'bg-[#0d0d0d] border-[#ff00be]/20' : 'bg-white border-neutral-200'}`}
              >
                <button onClick={() => setIsBookingModalOpen(false)}
                  className={`absolute top-5 right-5 p-2 rounded-full transition-colors
                    ${darkMode ? 'hover:bg-white/10 text-white/60' : 'hover:bg-neutral-100 text-neutral-500'}`}>
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#ff00be]/10 border border-[#ff00be]/20 flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5 text-[#ff00be]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#ff00be]">
                    {lang === 'ta' ? 'நிகழ்ச்சி முன்பதிவு' : 'Event Booking'}
                  </h3>
                  <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-white/40' : 'text-neutral-500'}`}>
                    {lang === 'ta' ? 'விவரங்களை பூர்த்தி செய்து வாட்ஸ்அப்பில் அனுப்பவும்' : 'Fill details to send via WhatsApp'}
                  </p>
                </div>

                <form onSubmit={e => {
                  e.preventDefault();
                  const msg = lang === 'ta'
                    ? `வணக்கம் VRS செண்டை மேளம்,\n\nநிகழ்ச்சி முன்பதிவு விவரங்கள்:\n\n👤 பெயர்: ${bookingForm.name}\n📍 இடம்: ${bookingForm.location}\n📅 தேதி: ${bookingForm.date}`
                    : `Hello VRS Chendai Melam,\n\nBooking Request:\n\n👤 Name: ${bookingForm.name}\n📍 Location: ${bookingForm.location}\n📅 Date: ${bookingForm.date}`;
                  window.open(`https://wa.me/919003387065?text=${encodeURIComponent(msg)}`, '_blank');
                  setIsBookingModalOpen(false);
                }} className="space-y-4">
                  {[
                    { key: 'name', label: lang === 'ta' ? 'உங்கள் பெயர்' : 'Your Name', placeholder: lang === 'ta' ? 'எ.கா. சுந்தர்' : 'e.g. Sundar', type: 'text' },
                    { key: 'location', label: lang === 'ta' ? 'நிகழ்ச்சி இடம்' : 'Event Location', placeholder: lang === 'ta' ? 'மாவட்டம்' : 'District', type: 'text' },
                    { key: 'date', label: lang === 'ta' ? 'நிகழ்ச்சி தேதி' : 'Event Date', placeholder: '', type: 'date' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className={`block text-[10px] font-black uppercase tracking-[0.15em] mb-1.5
                        ${darkMode ? 'text-white/50' : 'text-neutral-500'}`}>{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        value={bookingForm[f.key]}
                        onChange={e => setBookingForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 font-bold text-sm outline-none transition-all
                          ${darkMode
                            ? 'bg-white/[0.04] border-white/10 focus:border-[#ff00be]/50 text-white placeholder-white/25'
                            : 'bg-neutral-50 border-neutral-200 focus:border-[#ff00be]/50 text-neutral-900 placeholder-neutral-400'}`}
                      />
                    </div>
                  ))}

                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit"
                    className="w-full py-4 rounded-xl bg-[#ff00be] text-white font-black tracking-wide text-sm
                      shadow-lg shadow-[#ff00be]/25 hover:bg-[#d600a1] transition-all flex items-center justify-center gap-2 mt-2">
                    <MessageSquare className="w-4 h-4" />
                    {lang === 'ta' ? 'வாட்ஸ்அப்பில் அனுப்பவும்' : 'Send via WhatsApp'}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
}