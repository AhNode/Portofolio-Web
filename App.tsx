
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Menu, X, Calendar, ChevronLeft, ChevronRight, Mail, Phone, User, GraduationCap, Zap, ExternalLink, Layers, Cpu, Database, History, Terminal, Send, Loader2, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import { PortfolioItem } from './types';

// Portfolio Data based on Resume
const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { 
    id: '1', 
    title: 'Kemenag Media', 
    role: 'Video Editor', 
    year: '2022-23', 
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?auto=format&fit=crop&q=80&w=1000',
    description: 'Video Editor for "Sumber belajar dan media belajar bimbingan teknis penerapan EDM dan e-RKAM Kemenag". Focused on creating clear, technical guidance learning media for the Ministry of Religious Affairs.'
  },
  { 
    id: '2', 
    title: 'AKMI Assessment', 
    role: 'Video Editor', 
    year: '2023', 
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1000',
    description: 'Editor for "Pembelajaran Asesmen Kompetensi Madrasah Indonesia (AKMI), Komponen II Kemenag". Produced educational assessment content to support the national madrasah competency framework.'
  },
  { 
    id: '3', 
    title: 'Visitasi AKMI', 
    role: 'Drone Pilot', 
    year: '2023', 
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=1000',
    description: 'Videographer and Drone Pilot for "Visitasi AKMI MTsN 2 Manggarai Barat Labuan Bajo". Captured cinematic aerial and ground footage to document the visitation process in a scenic location.'
  },
  { 
    id: '4', 
    title: 'Illustrator Meet', 
    role: 'Documentation', 
    year: '2023', 
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
    description: 'Documentation Videographer for "Pertemuan Illustrator AKMI" in Jakarta and Malang. Recorded the collaborative sessions and workshops of illustrators.'
  },
  { 
    id: '5', 
    title: 'AKMI Visuals', 
    role: 'Graphic Designer', 
    year: '2023', 
    image: 'https://images.unsplash.com/photo-1626785774573-4b7993143b0d?auto=format&fit=crop&q=80&w=1000',
    description: 'Illustrator for "Asesmen Kompetisi Madrasah Indonesia (AKMI)". Created engaging visual assets and illustrations used in the assessment materials.'
  },
  { 
    id: '6', 
    title: 'Telkom Akses', 
    role: 'Internship (BIB)', 
    year: '2023', 
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    description: 'Magang Beasiswa Indonesia Bangkit (BIB) at "Telkom Akses Pangkal Pinang". Gained professional industry experience in telecommunications infrastructure and project management.'
  },
];

const SKILLS = [
  { name: 'Adobe Photoshop', icon: 'Ps', level: '90%', desc: 'Advanced Compositing' },
  { name: 'Adobe Illustrator', icon: 'Ai', level: '85%', desc: 'Vector Art' },
  { name: 'Adobe Premiere', icon: 'Pr', level: '88%', desc: 'Video Editing' },
  { name: 'After Effects', icon: 'Ae', level: '80%', desc: 'Motion Graphics' },
  { name: 'Ms Excel', icon: 'X', level: '75%', desc: 'Data Management' },
  { name: 'Ms Word', icon: 'W', level: '90%', desc: 'Documentation' },
];

const EDUCATION = [
  { name: 'MAK Unggulan Informatika', period: '2022 - Present', type: 'Vocational High School', location: 'Jakarta' },
  { name: 'SMPN 110 Jakarta Selatan', period: '2019 - 2022', type: 'Junior High School', location: 'Jakarta' },
  { name: 'MI Ar-Ridho', period: '2013 - 2019', type: 'Primary School', location: 'Depok' },
];

// Decorative Corner Component
const TechCorners = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#f97316]/50" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#f97316]/50" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#f97316]/50" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#f97316]/50" />
  </>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  
  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'ArrowLeft') navigateItem('prev');
      if (e.key === 'ArrowRight') navigateItem('next');
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);


  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateItem = (direction: 'next' | 'prev') => {
    if (!selectedItem) return;
    const currentIndex = PORTFOLIO_ITEMS.findIndex(a => a.id === selectedItem.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % PORTFOLIO_ITEMS.length;
    } else {
      nextIndex = (currentIndex - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length;
    }
    setSelectedItem(PORTFOLIO_ITEMS[nextIndex]);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    // Replace this with your actual webhook URL (e.g., Discord Webhook, Zapier, etc.)
    const WEBHOOK_URL = ""; 

    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `**New Portfolio Message**\n**From:** ${formState.name}\n**Email:** ${formState.email}\n**Message:** ${formState.message}`
          })
        });
      } else {
        // Simulate network request if no webhook is configured
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#f97316] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <AIChat />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50 border-2 border-white px-3 py-1">A. DZAKY</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Work', 'About', 'Contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase() === 'work' ? 'portfolio' : item.toLowerCase())}
              className="hover:text-[#f97316] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden md:inline-block bg-white text-black border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#f97316] hover:border-[#f97316] hover:text-white transition-all duration-300 cursor-pointer"
          data-hover="true"
        >
          Hire Me
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Work', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase() === 'work' ? 'portfolio' : item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#f97316] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero" className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#fbbf24] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10"
          >
            <MapPin className="w-4 h-4" />
            <span>Jakarta, Indonesia</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center flex-col">
            <GradientText 
              text="AHMAD" 
              as="h1" 
              className="text-[15vw] md:text-[13vw] leading-[0.85] font-black tracking-tighter text-center" 
            />
             <GradientText 
              text="DZAKY" 
              as="h1" 
              className="text-[15vw] md:text-[13vw] leading-[0.85] font-black tracking-tighter text-center -mt-4 md:-mt-10" 
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-1 bg-[#f97316] mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-3xl mx-auto text-gray-300 leading-relaxed px-4 uppercase tracking-widest flex flex-col md:flex-row items-center gap-2 md:gap-4"
          >
            <span>Graphic Designer</span>
            <span className="hidden md:inline text-[#f97316]">•</span>
            <span>Video Editor</span>
            <span className="hidden md:inline text-[#f97316]">•</span>
            <span>Drone Pilot</span>
          </motion.p>
        </motion.div>
      </header>

      {/* PORTFOLIO SECTION - HISTORIC TIMELINE LAYOUT */}
      <section id="portfolio" className="relative z-10 py-20 md:py-40 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-32">
            <div className="text-[#f97316] font-mono text-sm tracking-[0.5em] uppercase mb-4 animate-pulse">
               ● Archive System
            </div>
            <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] text-white mb-6">
              Selected <br className="md:hidden" /> <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>Works</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed font-light">
              A chronological timeline of professional projects, ranging from government education media to aerial cinematography.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Central Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/20 transform md:-translate-x-1/2 hidden md:block"></div>
            
            <div className="flex flex-col gap-0">
              {PORTFOLIO_ITEMS.map((item, index) => (
                <ArtistCard 
                  key={item.id} 
                  item={item} 
                  index={index}
                  onClick={() => setSelectedItem(item)} 
                />
              ))}
            </div>

             {/* End of Timeline Indicator */}
             <div className="flex justify-center mt-12">
                <div className="bg-[#f97316] text-black px-6 py-2 text-xs font-bold uppercase tracking-widest font-mono rounded-full relative z-10">
                   End of Log
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - FUTURISTIC / HISTORICAL / ARCHIVE THEME */}
      <section id="about" className="relative z-10 py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/5">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #202020 1px, transparent 1px), linear-gradient(to bottom, #202020 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative">
          
          {/* Section Header */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6">
             <div>
               <div className="flex items-center gap-2 text-[#f97316] font-mono text-xs tracking-widest mb-2">
                  <Terminal className="w-4 h-4" /> SYSTEM_ACCESS // AUTHORIZED
               </div>
               <h2 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase">
                 Identity <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>Log</span>
               </h2>
             </div>
             <div className="text-right hidden md:block">
                <div className="text-xs font-mono text-gray-500">ID: AD-0608 // CLASSIFIED</div>
                <div className="text-xs font-mono text-[#f97316] animate-pulse">STATUS: ONLINE</div>
             </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* COL 1: Profile Identity Card (Futuristic ID) */}
            <div className="lg:col-span-4 relative group">
                <div className="h-full bg-[#0a0a0a] border border-white/10 p-1 relative overflow-hidden">
                   <TechCorners />
                   
                   <div className="relative h-[400px] lg:h-full w-full overflow-hidden bg-black">
                      <img 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" 
                        className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-700"
                        alt="Profile"
                      />
                      {/* Scanline Effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-50"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#f97316] shadow-[0_0_15px_#f97316] animate-[scan_3s_linear_infinite] opacity-50"></div>
                      
                      {/* Overlay Data */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                         <h3 className="text-3xl font-heading font-bold text-white uppercase">Ahmad Dzaky</h3>
                         <div className="flex justify-between items-end border-t border-white/20 pt-3 mt-2">
                            <span className="font-mono text-xs text-[#f97316]">VISUAL_SPECIALIST</span>
                            <span className="font-mono text-[10px] text-gray-500">Lvl. PRO</span>
                         </div>
                      </div>
                   </div>
                </div>
            </div>

            {/* COL 2: Data Terminal (Bio & Stats) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
               
               {/* Bio Terminal */}
               <div className="bg-[#0f0f0f] border border-white/10 p-8 relative group hover:border-[#f97316]/30 transition-colors">
                  <TechCorners />
                  <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                     <Cpu className="w-4 h-4 text-[#f97316]" />
                     <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Bio_Sequence.txt</span>
                  </div>
                  <p className="font-mono text-sm md:text-base leading-relaxed text-gray-300">
                    <span className="text-[#f97316] mr-2">{'>'}</span>
                    "Hello, I am Ahmad Dzaky. Currently deployed at MAK Unggulan Informatika. My core programming involves visual storytelling through graphic design and video editing. I execute creative directives with precision and technical expertise."
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                     {['Creative', 'Technical', 'Discipline'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 text-[10px] uppercase font-mono tracking-wider border border-white/10 text-gray-400">
                           {tag}
                        </span>
                     ))}
                  </div>
               </div>

               {/* System Stats Grid */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'EXP', val: '2 YEARS' },
                    { label: 'PROJECTS', val: '15+' },
                    { label: 'CLIENTS', val: '4+' },
                    { label: 'LOCATION', val: 'JKT-ID' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/10 p-4 flex flex-col justify-between hover:bg-white/5 transition-colors">
                       <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">{stat.label}</span>
                       <span className="font-heading font-bold text-xl md:text-2xl text-white">{stat.val}</span>
                    </div>
                  ))}
               </div>

               {/* Quick Capabilities Row */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                  {/* SKILLS (Technical Modules) */}
                  <div className="bg-[#0f0f0f] border border-white/10 p-6 relative">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                           <Database className="w-4 h-4 text-[#f97316]" />
                           <h4 className="font-bold font-heading text-sm uppercase tracking-wider">Installed Modules</h4>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">V.2.4</span>
                     </div>
                     <div className="space-y-4">
                        {SKILLS.slice(0,4).map((skill) => (
                           <div key={skill.name} className="group/skill">
                              <div className="flex justify-between text-[10px] font-mono uppercase mb-1">
                                 <span className="text-white">{skill.name}</span>
                                 <span className="text-[#f97316]">{skill.level}</span>
                              </div>
                              <div className="h-1.5 bg-white/5 w-full overflow-hidden flex gap-[2px]">
                                 {[...Array(10)].map((_, i) => (
                                    <div 
                                      key={i}
                                      className={`flex-1 transition-colors duration-300 ${
                                        parseInt(skill.level) / 10 > i ? 'bg-[#f97316] opacity-80' : 'bg-white/10'
                                      }`}
                                    />
                                 ))}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* HISTORY (Chronological Log) */}
                  <div className="bg-[#0f0f0f] border border-white/10 p-6 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                           <History className="w-4 h-4 text-[#f97316]" />
                           <h4 className="font-bold font-heading text-sm uppercase tracking-wider">History Log</h4>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">ASCENDING</span>
                     </div>
                     
                     <div className="relative pl-4 border-l border-white/10 space-y-6">
                        {EDUCATION.map((edu, i) => (
                           <div key={i} className="relative">
                              <div className="absolute -left-[21px] top-1 w-2 h-2 bg-[#0a0a0a] border border-[#f97316] rounded-full"></div>
                              <div className="flex flex-col">
                                 <span className="font-mono text-[10px] text-[#f97316] mb-1">[{edu.period}]</span>
                                 <span className="font-bold text-sm text-white uppercase leading-tight">{edu.name}</span>
                                 <span className="text-[10px] text-gray-500 uppercase mt-1">{edu.type}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#f97316] font-mono text-xs tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse"></span>
                Available for work
             </div>
             <h2 className="text-5xl md:text-8xl font-heading font-bold text-white mb-6">
               Get in <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>Touch</span>
             </h2>
             <p className="text-gray-400 max-w-xl mx-auto font-light text-lg">
               Have a project in mind? Connect via direct channels or send a secure message below.
             </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: Contact Form (Live Message) */}
            <div className="relative bg-[#0f0f0f] border border-white/10 p-8 rounded-2xl overflow-hidden group">
               <TechCorners />
               <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <MessageSquare className="w-5 h-5 text-[#f97316]" />
                  <h3 className="text-xl font-heading font-bold text-white uppercase">Live Message Feed</h3>
               </div>

               <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Identification (Name)</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#f97316] focus:outline-none transition-colors font-mono"
                      placeholder="ENTER NAME..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Return Frequency (Email)</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#f97316] focus:outline-none transition-colors font-mono"
                      placeholder="ENTER EMAIL..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Transmission Data (Message)</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#f97316] focus:outline-none transition-colors font-mono resize-none"
                      placeholder="TYPE MESSAGE HERE..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                    className="w-full bg-[#f97316] text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'submitting' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : submitStatus === 'success' ? (
                      <><CheckCircle className="w-4 h-4" /> Transmission Sent</>
                    ) : submitStatus === 'error' ? (
                      <><AlertCircle className="w-4 h-4" /> Error - Retry</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Transmission</>
                    )}
                  </button>
               </form>
            </div>

            {/* Right: Contact Cards */}
            <div className="flex flex-col gap-6">
              {[
                { name: 'WhatsApp', val: '+62 882-1403-4450', icon: Phone, action: 'Chat Now', link: 'https://wa.me/6288214034450' },
                { name: 'Email', val: 'Mydzaky0608@gmail.com', icon: Mail, action: 'Send Message', link: 'mailto:Mydzaky0608@gmail.com' },
                { name: 'Location', val: 'Jakarta, Indonesia', icon: MapPin, action: 'View Map', link: 'https://maps.google.com/?q=Pesanggrahan,Jakarta+Selatan' },
              ].map((contact, i) => (
                <motion.a
                  key={i}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/10 p-6 hover:border-[#f97316]/50 transition-colors duration-500 flex items-center gap-6 h-[140px]"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                   {/* Hover Effect Background */}
                   <div className="absolute inset-0 bg-gradient-to-r from-[#f97316]/0 to-[#f97316]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   
                   <div className="relative z-10 w-16 h-16 bg-white/5 rounded-lg flex flex-shrink-0 items-center justify-center group-hover:bg-[#f97316] group-hover:text-black transition-all duration-500 text-white">
                      <contact.icon className="w-6 h-6" />
                   </div>
                   
                   <div className="relative z-10 flex-1 min-w-0">
                      <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">{contact.name}</h3>
                      <div className="text-lg font-bold text-white truncate mb-2">
                         {contact.val}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-mono text-[#f97316] uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                         {contact.action} <ExternalLink className="w-3 h-3" />
                      </div>
                   </div>
                </motion.a>
              ))}
            </div>

          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
             <div className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-white">AHMAD DZAKY</div>
             <div className="text-xs font-mono text-gray-600 mt-2">
               Jakarta, Indonesia • EST 2007
             </div>
          </div>
          
          <div className="flex gap-8">
            <a href="mailto:Mydzaky0608@gmail.com" className="text-gray-500 hover:text-[#f97316] transition-colors"><Mail /></a>
            <a href="https://wa.me/6288214034450" className="text-gray-500 hover:text-[#f97316] transition-colors"><Phone /></a>
          </div>
        </div>
      </footer>

      {/* Portfolio Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#121212] border border-white/10 flex flex-col md:flex-row shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black text-white border border-white/20 hover:bg-[#f97316] hover:border-[#f97316] transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateItem('prev'); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 text-white hover:bg-[#f97316] transition-colors border border-white/10 backdrop-blur-sm hidden md:block"
                data-hover="true"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateItem('next'); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 text-white hover:bg-[#f97316] transition-colors border border-white/10 backdrop-blur-sm hidden md:block"
                data-hover="true"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-7/12 h-64 md:h-[600px] relative bg-[#0a0a0a]">
                <motion.img 
                  key={selectedItem.id}
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-5/12 p-8 md:p-16 flex flex-col justify-center bg-[#121212] relative border-l border-white/10">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 text-[#f97316] mb-6">
                     <Calendar className="w-4 h-4" />
                     <span className="font-mono text-sm tracking-widest uppercase">{selectedItem.year}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-none mb-4 text-white">
                    {selectedItem.title}
                  </h3>
                  
                  <p className="text-lg text-gray-400 font-medium tracking-wide mb-8 border-l-2 border-[#f97316] pl-4">
                    {selectedItem.role}
                  </p>
                  
                  <p className="text-gray-300 leading-relaxed text-base font-light mb-10">
                    {selectedItem.description}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {['Multimedia', 'Creative', 'Production'].map((tag) => (
                         <span key={tag} className="px-4 py-2 bg-white/5 text-xs uppercase tracking-wider text-white/60 border border-white/5">
                             {tag}
                         </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
