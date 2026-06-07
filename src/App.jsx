import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Phone, MessageSquare, Sun, Moon, Globe, Award, Calendar, Users, Music, ShieldCheck, Loader2, BookOpen, Menu, X } from 'lucide-react';
import HomeImg from "./images/1780841387535.png";
import AboutImg from "./images/1780842821087.png";

// Language Translations Data
const translations = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navServices: "Services",
    navBlog: "Events",
    navOwner: "Leader",
    navContact: "Contact",
    heroTitle: "Experience the Majestic Beats of VRS Chendai Melam",
    heroSubtitle: "Bringing the traditional, high-energy rhythm of Kerala & Tamil Nadu to your grand celebrations.",
    bookBtn: "Book Our Performance",
    aboutTitle: "About Our Melam",
    aboutP1: "VRS Chendai Melam is a premier traditional percussion troupe dedicated to elevating your special occasions. With years of expertise, our energetic team delivers powerful rhythms that resonate with cultural heritage and pure celebration.",
    aboutP2: "Whether it is a temple festival, wedding celebration, corporate launch, or political event, we bring unmatched energy and professionalism to create unforgettable memories.",
    servicesTitle: "Our Premium Services",
    service1: "Temple Festivals (Utsavam)",
    service1Desc: "Traditional spiritual rhythms perfectly timed for divine processions and cultural festivals.",
    service2: "Grand Weddings & Receptions",
    service2Desc: "A majestic and royal welcome for the bride, groom, and guests with high-decibel energy.",
    service3: "Corporate & Store Openings",
    service3Desc: "Attract crowds and energize your brand launch with vibrant, synchronized traditional beats.",
    blogTitle: "Recent Vibrant Events",
    blogEvent1: "Thrissur Pooram Style Performance",
    blogEvent2: "Royal Destination Wedding Welcome",
    blogEvent3: "Mega Corporate Launch Beats",
    ownerTitle: "Meet the Owner",
    ownerRole: "Founder & Lead Percussionist",
    ownerDesc: "Driven by passion and deep-rooted cultural respect, the founder of VRS Chendai Melam has spent over a decade mastering the art of traditional percussion. Under his visionary leadership, the troupe has successfully performed at over 500+ events, earning a reputation for absolute synchronization and unmatched energetic displays.",
    contactTitle: "Connect With Us",
    contactSubtitle: "Ready to make your event unforgettable? Reach out to us instantly!",
    statYears: "Years Old Band",
    statClients: "Happy Clients",
    callUs: "Contact via Calling",
    whatsappUs: "Contact via WhatsApp",
    footerText: "© 2026 VRS Chendai Melam. All rights reserved."
  },
  ta: {
    navHome: "முகப்பு",
    navAbout: "எங்களைப் பற்றி",
    navServices: "சேவைகள்",
    navBlog: "நிகழ்ச்சிகள்",
    navOwner: "நிர்வாகம்",
    navContact: "தொடர்புக்கு",
    heroTitle: "விஆர்எஸ் செண்டை மேளத்தின் கம்பீர நாதத்தை அனுபவியுங்கள்",
    heroSubtitle: "கேரளா மற்றும் தமிழ்நாட்டின் பாரம்பரிய, அதிர்வெண் கொண்ட மேள தாளங்களை உங்கள் சுப நிகழ்ச்சிகளுக்கு கொண்டு சேர்க்கிறோம்.",
    bookBtn: "இப்பொழுதே முன்பதிவு செய்ய",
    aboutTitle: "எங்கள் மேளத்தைப் பற்றி",
    aboutP1: "விஆர்எஸ் செண்டை மேளம் என்பது உங்கள் சிறப்பு நிகழ்வுகளை சிறப்பிக்க அர்ப்பணிக்கப்பட்ட ஒரு முன்னணி பாரம்பரிய தாள வாத்திய குழுவாகும். பல வருட அனுபவத்துடன், எங்கள் துடிப்பான குழு கலாச்சார பாரம்பரியத்தை பறைசாற்றும் சக்திவாய்ந்த இசையை வழங்குகிறது.",
    aboutP2: "கோயில் திருவிழாக்கள், திருமண விழாக்கள், கார்ப்பரேட் தொடக்க விழாக்கள் என அனைத்து சுப நிகழ்ச்சிகளுக்கும் ஈடு இணையற்ற ஆற்றலையும் தொழில்முறையையும் கொண்டு வருகிறோம்.",
    servicesTitle: "எங்களது பிரத்யேக சேவைகள்",
    service1: "கோயில் திருவிழாக்கள் (உற்சவம்)",
    service1Desc: "தெய்வீக ஊர்வலங்கள் மற்றும் கலாச்சார விழாக்களுக்காக கச்சிதமாக வடிவமைக்கப்பட்ட பாரம்பரிய ஆன்மீக நாதங்கள்.",
    service2: "திருமணங்கள் மற்றும் வரவேற்பு விழா",
    service2Desc: "மணமகன், மணமகள் மற்றும் விருந்தினர்களை அதிக அதிர்வெண் கொண்ட மேள தாளங்களுடன் கம்பீரமாக வரவேற்றல்.",
    service3: "கார்ப்பரேட் மற்றும் கடையை திறப்பு விழா",
    service3Desc: "துடிப்பான, ஒத்திசைக்கப்பட்ட பாரம்பரிய இசையின் மூலம் கூட்டத்தை ஈர்த்து உங்கள் பிராண்ட் துவக்கத்தை சிறப்பாக்குங்கள்.",
    blogTitle: "சமீபத்திய துடிப்பான நிகழ்வுகள்",
    blogEvent1: "திருச்சூர் பூரம் பாணி மேளPerformance",
    blogEvent2: "அரச குடும்ப பாணி திருமண வரவேற்பு",
    blogEvent3: "மாபெரும் கார்ப்பரேட் நிறுவன துவக்க விழா",
    ownerTitle: "உரிமையாளரை சந்திக்கவும்",
    ownerRole: "நிறுவனர் மற்றும் தலைமை தாளவாத்திய கலைஞர்",
    ownerDesc: "பாரம்பரிய கலை மீதுள்ள பற்று மற்றும் ஆழமான மரியாதையினால், விஆர்எஸ் செண்டை மேளத்தின் நிறுவனர் கடந்த பத்தாண்டுகளுக்கும் மேலாக இந்த கலையில் சிறந்து விளங்கி வருகிறார். அவரது தொலைநோக்கு பார்வையில், இக்குழு 500-க்கும் மேற்பட்ட நிகழ்ச்சிகளை வெற்றிகரமாக நடத்தி, சிறந்த ஒத்திசைவுக்கு பெயர் பெற்றுள்ளது.",
    contactTitle: "எங்களை தொடர்பு கொள்ள",
    contactSubtitle: "உங்கள் நிகழ்வை மறக்க முடியாததாக மாற்ற தயாரா? உடனே எங்களை தொடர்பு கொள்ளுங்கள்!",
    statYears: "ஆண்டுகள் அனுபவம்",
    statClients: "மகிழ்ச்சியான வாடிக்கையாளர்கள்",
    callUs: "தொலைபேசி மூலம் அழைக்க",
    whatsappUs: "வாட்ஸ்அப் மூலம் தொடர்பு கொள்ள",
    footerText: "© 2026 விஆர்எஸ் செண்டை மேளம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
  }
};

// Reusable Counter Component
function AnimatedCounter({ from, to, suffix = "" }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [langSelected, setLangSelected] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  // Preload Images Strategy
  useEffect(() => {
    const imageList = [
      HomeImg,
      AboutImg,
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop"
    ];

    let loadedCount = 0;
    imageList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageList.length) {
          setTimeout(() => setImagesLoaded(true), 800);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageList.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 90; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const selectLanguage = (selectedLang) => {
    setLang(selectedLang);
    setLangSelected(true);
  };

  return (
    <AnimatePresence mode="wait">
      {/* STEP 1: Core Image Assets Loader Screen */}
      {!imagesLoaded && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="mb-4"
          >
            <Loader2 className="w-12 h-12 text-[#ff00be] animate-spin" />
          </motion.div>
          <p className="text-sm font-black tracking-widest text-[#ff00be] uppercase animate-pulse">
            VRS Chendai Melam
          </p>
        </motion.div>
      )}

      {/* STEP 2: Language Gateway Selection Interstitial */}
      {imagesLoaded && !langSelected && (
        <motion.div
          key="lang-gate"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 text-white"
        >
          <div className="absolute inset-0 bg-[#ff00be]/5 rounded-full filter blur-3xl transform scale-75 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-8 max-w-md w-full z-10"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider mb-2">
                Choose Your Language
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-400">
                உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்
              </h2>
              <div className="w-16 h-1 bg-[#ff00be] mx-auto mt-4 rounded" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => selectLanguage('en')}
                className="flex-1 py-4 px-6 rounded-2xl border-2 border-neutral-800 bg-neutral-900/50 text-xl font-black hover:border-[#ff00be] hover:bg-[#ff00be]/10 transition-all duration-300 transform active:scale-95"
              >
                English
              </button>
              <button
                onClick={() => selectLanguage('ta')}
                className="flex-1 py-4 px-6 rounded-2xl border-2 border-neutral-800 bg-neutral-900/50 text-xl font-black hover:border-[#ff00be] hover:bg-[#ff00be]/10 transition-all duration-300 transform active:scale-95"
              >
                தமிழ்
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* STEP 3: Main Dynamic Dashboard UI */}
      {imagesLoaded && langSelected && (
        <motion.div 
          key="main-ui"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`min-h-screen relative overflow-x-hidden pt-20 transition-colors duration-500 tracking-normal
            scrollbar-thin scrollbar-track-transparent 
            ${lang === 'ta' ? 'font-sans antialiased leading-relaxed' : 'font-sans'}
            ${darkMode ? 'bg-black text-white' : 'bg-white text-neutral-900'}
            [*::-webkit-scrollbar]:w-2
            [*::-webkit-scrollbar-track]:bg-transparent
            ${darkMode ? '[*::-webkit-scrollbar-thumb]:bg-[#ff00be]/30' : '[*::-webkit-scrollbar-thumb]:bg-[#ff00be]/50'}
            [*::-webkit-scrollbar-thumb]:rounded-full
            hover:[*::-webkit-scrollbar-thumb]:bg-[#ff00be]
          `}
        >
          
          {/* Background Particles Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  top: p.top,
                  left: p.left,
                  backgroundColor: '#ff00be',
                  boxShadow: '0 0 12px #ff00be'
                }}
                animate={{
                  y: [0, -120, 0],
                  x: [0, 40, 0],
                  opacity: [0.2, 0.8, 0.2]
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* FIXED Navigation Bar */}
          <nav className={`fixed top-0 left-0 w-full h-20 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
            darkMode ? 'bg-black/80 border-[#ff00be]/20' : 'bg-white/80 border-neutral-900/10'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
              
              {/* Branding Logo */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg sm:text-2xl font-black tracking-wider cursor-pointer whitespace-nowrap flex-shrink-0"
                onClick={(e) => handleSmoothScroll(e, 'home')}
              >
                VRS <span className="text-[#ff00be]">CHENDAI MELAM</span>
              </motion.div>
              
              {/* Desktop Menu Links - Switched to xl breakpoint to give long Tamil text optimal space */}
              <div className="hidden xl:flex items-center space-x-3 lg:space-x-5 font-extrabold whitespace-nowrap">
                {['Home', 'About', 'Services', 'Blog', 'Owner', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                    className={`transition-colors hover:text-[#ff00be] ${
                      lang === 'ta' ? 'text-xs lg:text-sm tracking-wide font-bold' : 'text-sm lg:text-base'
                    }`}
                  >
                    {t[`nav${item}`]}
                  </a>
                ))}
              </div>

              {/* Functional Controls Group - Fixed sizing to prevent viewport dropping */}
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                {/* Language Switcher */}
                <button 
                  onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
                  className={`p-2 rounded-full border transition-transform active:scale-95 ${
                    darkMode ? 'border-[#ff00be] text-[#ff00be]' : 'border-neutral-900 text-neutral-900'
                  }`}
                  title="Switch Language"
                >
                  <Globe className="w-4 h-4 sm:w-5 h-5" />
                </button>

                {/* Theme Toggle */}
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full border transition-transform active:scale-95 ${
                    darkMode ? 'border-[#ff00be] text-[#ff00be]' : 'border-neutral-900 text-neutral-900'
                  }`}
                  title="Toggle Theme"
                >
                  {darkMode ? <Sun className="w-4 h-4 sm:w-5 h-5" /> : <Moon className="w-4 h-4 sm:w-5 h-5" />}
                </button>

                {/* Hamburger Trigger Button - Displays gracefully on smaller viewports */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className={`p-2 rounded-xl border xl:hidden transition-transform active:scale-95 ${
                    darkMode ? 'border-[#ff00be] text-[#ff00be]' : 'border-neutral-900 text-neutral-900'
                  }`}
                >
                  <Menu className="w-5 h-5 sm:w-6 h-6" />
                </button>
              </div>
            </div>
          </nav>

          {/* SIDE BALL MOBILE MENU DRAWER PANEL */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black z-50 xl:hidden"
                />
                
                {/* Drawer Panel */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", bounce: 0.05, duration: 0.35 }}
                  className={`fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] z-50 p-6 flex flex-col justify-between xl:hidden border-l shadow-2xl ${
                    darkMode ? 'bg-neutral-950 border-[#ff00be]/20 text-white' : 'bg-white border-neutral-200 text-neutral-900'
                  }`}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800/10 dark:border-white/10">
                      <span className="font-black text-sm tracking-widest text-[#ff00be] uppercase">
                        {lang === 'ta' ? 'பட்டி' : 'Navigation'}
                      </span>
                      <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-1.5 rounded-lg border border-neutral-500/30 hover:text-[#ff00be]"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-col space-y-3">
                      {['Home', 'About', 'Services', 'Blog', 'Owner', 'Contact'].map((item) => (
                        <a
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
                          className="text-base font-bold tracking-wide py-2.5 px-4 rounded-xl transition-colors hover:bg-[#ff00be]/10 hover:text-[#ff00be]"
                        >
                          {t[`nav${item}`]}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800/10 dark:border-white/10 text-center text-xs font-semibold opacity-60">
                    VRS CHENDAI MELAM • 2026
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Home / Hero Section */}
          <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              
              {/* Left Side: Text and CTA Elements */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-left space-y-5 sm:space-y-6 order-2 lg:order-1"
              >
                <motion.div variants={fadeInUp} className="inline-block p-2.5 rounded-full bg-[#ff00be]/10 border border-[#ff00be]/30">
                  <Music className="w-6 h-6 text-[#ff00be]" />
                </motion.div>
                
                <motion.h1 
                  variants={fadeInUp}
                  className={`font-black uppercase tracking-tight leading-tight text-3xl sm:text-4xl lg:text-5xl ${
                    lang === 'ta' ? 'text-2xl sm:text-4xl lg:text-5xl normal-case' : ''
                  }`}
                >
                  {t.heroTitle}
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp}
                  className={`text-base sm:text-lg font-medium max-w-xl text-justify sm:text-left ${
                    darkMode ? 'text-gray-300' : 'text-neutral-700'
                  }`}
                >
                  {t.heroSubtitle}
                </motion.p>
                
                <motion.div variants={fadeInUp} className="pt-2">
                  <a 
                    href="#contact" 
                    onClick={(e) => handleSmoothScroll(e, 'contact')}
                    className="inline-block px-8 py-3.5 rounded-full font-black text-white bg-[#ff00be] shadow-lg shadow-[#ff00be]/40 hover:bg-[#d600a1] transition-all transform hover:-translate-y-1 text-center text-sm sm:text-base"
                  >
                    {t.bookBtn}
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Side: Clean Transparent PNG Hero Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative order-1 lg:order-2 w-full max-w-md lg:max-w-xl mx-auto flex justify-center items-center"
              >
                <div className="absolute inset-0 bg-[#ff00be]/10 rounded-full filter blur-3xl transform scale-90 pointer-events-none" />
                <div className="relative w-full max-h-[50vh] lg:max-h-[70vh] flex justify-center items-center">
                  <img 
                    src={HomeImg} 
                    alt="VRS Chendai Melam Live Performance" 
                    className="w-full h-auto object-contain max-h-[50vh] lg:max-h-[70vh]"
                  />
                </div>
              </motion.div>

            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 my-4 px-4 max-w-7xl mx-auto z-10 relative scroll-mt-24">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Column 1: Image container */}
              <motion.div 
                variants={fadeInUp}
                className="w-full max-w-3xl lg:max-w-4xl mx-auto flex justify-center items-center order-first lg:order-1"
              >
                <div className="relative w-full max-h-[65vh] lg:max-h-[80vh] flex justify-center items-center">
                  <img 
                    src={AboutImg} 
                    alt="Chendai Melam Cultural Heritage" 
                    className="w-full h-auto object-contain max-h-[65vh] lg:max-h-[80vh]"
                  />
                </div>
              </motion.div>

              {/* Column 2: Content Text Container */}
              <motion.div variants={fadeInUp} className="space-y-6 order-last lg:order-2 w-full">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                  {t.aboutTitle}
                </h2>
                <div className="w-20 h-2 bg-[#ff00be] rounded" />
                <p className="text-base sm:text-lg leading-relaxed font-medium text-justify">{t.aboutP1}</p>
                <p className="text-base sm:text-lg leading-relaxed font-medium text-justify">{t.aboutP2}</p>
              </motion.div>
            </motion.div>
          </section>

          {/* Services Section */}
          <section id="services" className={`py-24 px-4 z-10 relative scroll-mt-24 transition-colors duration-500 ${
            darkMode ? 'bg-neutral-950' : 'bg-[#ff00be]/5'
          }`}>
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-4">
                  {t.servicesTitle}
                </h2>
                <div className="w-20 h-2 bg-[#ff00be] mx-auto rounded" />
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {/* Service 1 */}
                <motion.div variants={fadeInUp} className={`p-6 sm:p-8 rounded-3xl border transform hover:-translate-y-2 transition-all duration-300 ${
                  darkMode ? 'bg-black border-[#ff00be]/20' : 'bg-white border-neutral-200 shadow-md shadow-neutral-100'
                }`}>
                  <div className="p-4 bg-[#ff00be]/10 rounded-2xl w-fit mb-6 text-[#ff00be]">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-4">{t.service1}</h3>
                  <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed">{t.service1Desc}</p>
                </motion.div>

                {/* Service 2 */}
                <motion.div variants={fadeInUp} className={`p-6 sm:p-8 rounded-3xl border transform hover:-translate-y-2 transition-all duration-300 ${
                  darkMode ? 'bg-black border-[#ff00be]/20' : 'bg-white border-neutral-200 shadow-md shadow-neutral-100'
                }`}>
                  <div className="p-4 bg-[#ff00be]/10 rounded-2xl w-fit mb-6 text-[#ff00be]">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-4">{t.service2}</h3>
                  <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed">{t.service2Desc}</p>
                </motion.div>

                {/* Service 3 */}
                <motion.div variants={fadeInUp} className={`p-6 sm:p-8 rounded-3xl border transform hover:-translate-y-2 transition-all duration-300 ${
                  darkMode ? 'bg-black border-[#ff00be]/20' : 'bg-white border-neutral-200 shadow-md shadow-neutral-100'
                }`}>
                  <div className="p-4 bg-[#ff00be]/10 rounded-2xl w-fit mb-6 text-[#ff00be]">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-4">{t.service3}</h3>
                  <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed">{t.service3Desc}</p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Blog / Events Gallery Section */}
          <section id="blog" className="py-24 px-4 max-w-7xl mx-auto z-10 relative scroll-mt-24">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-block p-2.5 rounded-full bg-[#ff00be]/10 border border-[#ff00be]/30 mb-3">
                  <BookOpen className="w-6 h-6 text-[#ff00be]" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-4">
                  {t.blogTitle}
                </h2>
                <div className="w-20 h-2 bg-[#ff00be] mx-auto rounded" />
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {/* Blog Card 1 */}
                <motion.div variants={fadeInUp} className={`group rounded-3xl overflow-hidden border transition-all duration-300 ${
                  darkMode ? 'bg-neutral-950 border-[#ff00be]/10' : 'bg-white border-neutral-200 shadow-lg'
                }`}>
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <img 
                      src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" 
                      alt="Event 1" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-black group-hover:text-[#ff00be] transition-colors line-clamp-2 leading-snug">{t.blogEvent1}</h3>
                  </div>
                </motion.div>

                {/* Blog Card 2 */}
                <motion.div variants={fadeInUp} className={`group rounded-3xl overflow-hidden border transition-all duration-300 ${
                  darkMode ? 'bg-neutral-950 border-[#ff00be]/10' : 'bg-white border-neutral-200 shadow-lg'
                }`}>
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <img 
                      src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" 
                      alt="Event 2" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-black group-hover:text-[#ff00be] transition-colors line-clamp-2 leading-snug">{t.blogEvent2}</h3>
                  </div>
                </motion.div>

                {/* Blog Card 3 */}
                <motion.div variants={fadeInUp} className={`group rounded-3xl overflow-hidden border transition-all duration-300 ${
                  darkMode ? 'bg-neutral-950 border-[#ff00be]/10' : 'bg-white border-neutral-200 shadow-lg'
                }`}>
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <img 
                      src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop" 
                      alt="Event 3" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-black group-hover:text-[#ff00be] transition-colors line-clamp-2 leading-snug">{t.blogEvent3}</h3>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Owner Section */}
          <section id="owner" className="py-24 px-4 max-w-7xl mx-auto z-10 relative scroll-mt-24">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div 
                variants={fadeInUp}
                className="relative rounded-3xl overflow-hidden aspect-square max-w-sm sm:max-w-md mx-auto border-4 border-[#ff00be] shadow-xl order-2 lg:order-1"
              >
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" 
                  alt="Troupe Owner" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6 order-1 lg:order-2 w-full">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                  {t.ownerTitle}
                </h2>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#ff00be]">{t.ownerRole}</h4>
                  <div className="w-20 h-1 bg-[#ff00be] mt-2 rounded" />
                </div>
                <p className="text-base sm:text-lg leading-relaxed font-medium text-justify">{t.ownerDesc}</p>
              </motion.div>
            </motion.div>
          </section>

          {/* Contact Section */}
          <section id="contact" className={`py-24 px-4 z-10 relative border-t scroll-mt-24 transition-colors duration-500 ${
            darkMode ? 'bg-neutral-950 border-[#ff00be]/20' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-4">
                  {t.contactTitle}
                </h2>
                <p className="text-base sm:text-lg font-medium opacity-90 max-w-xl mx-auto">{t.contactSubtitle}</p>
                <div className="w-20 h-2 bg-[#ff00be] mx-auto mt-6 rounded" />
              </motion.div>

              {/* Highlight Metrics with Animated Count */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12"
              >
                <motion.div 
                  variants={fadeInUp}
                  className={`p-5 rounded-2xl border flex items-center justify-center space-x-3 font-extrabold text-lg sm:text-xl ${
                    darkMode ? 'bg-black border-[#ff00be]/20 text-white' : 'bg-white border-neutral-200 text-neutral-800 shadow-sm'
                  }`}
                >
                  <ShieldCheck className="w-6 h-6 text-[#ff00be] flex-shrink-0" />
                  <div className="flex items-center">
                    <span className="text-2xl font-black text-[#ff00be] mr-1">
                      <AnimatedCounter from={0} to={13} suffix="+" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold block ml-1 text-left">{t.statYears}</span>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className={`p-5 rounded-2xl border flex items-center justify-center space-x-3 font-extrabold text-lg sm:text-xl ${
                    darkMode ? 'bg-black border-[#ff00be]/20 text-white' : 'bg-white border-neutral-200 text-neutral-800 shadow-sm'
                  }`}
                >
                  <Users className="w-6 h-6 text-[#ff00be] flex-shrink-0" />
                  <div className="flex items-center">
                    <span className="text-2xl font-black text-[#ff00be] mr-1">
                      <AnimatedCounter from={0} to={5000} suffix="+" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold block ml-1 text-left">{t.statClients}</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Call Buttons */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
              >
                <motion.a 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="tel:+919876543210" 
                  className={`flex items-center justify-center space-x-3 p-5 rounded-2xl border-2 font-black text-lg transition-all shadow-md ${
                    darkMode 
                      ? 'bg-black border-[#ff00be] text-white' 
                      : 'bg-white border-neutral-900 text-neutral-900 shadow-neutral-100'
                  }`}
                >
                  <Phone className="w-5 h-5 text-[#ff00be]" />
                  <span>{t.callUs}</span>
                </motion.a>

                <motion.a 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/919876543210" 
                  target="_blank" 
                  rel="noreferrer"
                  className={`flex items-center justify-center space-x-3 p-5 rounded-2xl border-2 font-black text-lg transition-all shadow-md ${
                    darkMode 
                      ? 'bg-black border-[#ff00be] text-white' 
                      : 'bg-white border-neutral-900 text-neutral-900 shadow-neutral-100'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 text-[#ff00be]" />
                  <span>{t.whatsappUs}</span>
                </motion.a>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className={`py-8 text-center text-xs sm:text-sm font-bold border-t ${
            darkMode ? 'bg-black border-[#ff00be]/10 text-gray-500' : 'bg-white border-neutral-200 text-neutral-500'
          }`}>
            <p>{t.footerText}</p>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}