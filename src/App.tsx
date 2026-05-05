import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { Box, BrainCircuit, Video as VideoIcon, Package, Menu, ChevronDown, ChevronUp, Mouse, Camera, Hand, ChevronsDown, ChevronsUp } from 'lucide-react';
import ShinyText from './components/ShinyText';
import TerminalPanel from './components/TerminalPanel';
import TargetCursor from './components/TargetCursor';
import { useState, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);


export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const uiContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    if (!showTerminal) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [showTerminal]);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to preload/warm-up the video to avoid scrub lagging
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => video.pause()).catch(() => {});
    }

    // Magnetic Button Hover Logic
    const ctaBtn = ctaRef.current;
    if (ctaBtn) {
      ctaBtn.addEventListener('mousemove', (e) => {
        const rect = ctaBtn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        
        // Move container slightly
        gsap.to(ctaBtn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out', overwrite: "auto" });
      });
      
      ctaBtn.addEventListener('mouseleave', () => {
        gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)', overwrite: "auto" });
      });
    }

    const initScroll = () => {
      const tl = gsap.timeline({ paused: true });

      // Prepara os estados iniciais invisíveis (UI)
      gsap.set(overlayRef.current, { opacity: 0 }); // Deixa o vídeo 100% claro no início
      gsap.set(uiContainerRef.current, { pointerEvents: "none" });
      gsap.set(subtextRef.current, { y: 40, autoAlpha: 0 });
      gsap.set(cardsRefs.current, { x: 100, autoAlpha: 0 });
      gsap.set(ctaRef.current, { y: 50, autoAlpha: 0 });

      // Timeline mestre baseada em segundos (Exatamente 1:1 com o tempo do vídeo)
      
      const headlineItems = scrollIndicatorRef.current?.querySelectorAll('.scroll-headline-item');
      const middleCards = scrollIndicatorRef.current?.querySelectorAll('.scroll-middle-card');

      if (headlineItems && headlineItems.length > 0) {
        // Headline exits immediately as user starts scrolling
        tl.to(headlineItems, { 
          opacity: 0, 
          scale: 1.1, 
          filter: "blur(4px)", 
          y: -20, 
          duration: 0.4, 
          stagger: 0.1, 
          ease: "power3.in" 
        }, 0.2); 
      }

      if (middleCards && middleCards.length > 0) {
        // Middle cards enter during the "gun draw" sequence
        gsap.set(middleCards, { autoAlpha: 0, scale: 0.8, y: 50 });
        
        tl.to(middleCards, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, 0.8);

        // Middle cards exit before impact
        tl.to(middleCards, {
          autoAlpha: 0,
          scale: 1.2,
          filter: "blur(10px)",
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in"
        }, 3.8);
      }

      tl.to(scrollIndicatorRef.current, { pointerEvents: "none" }, 0);
      
      const uiStart = 4.2; // Exato momento de impacto/tiro onde a UI vai entrar
      
      tl.to(overlayRef.current, { opacity: 1, duration: 1.2, ease: "power2.inOut" }, uiStart - 0.5);
      tl.to(subtextRef.current, { y: 0, autoAlpha: 1, duration: 1.0, ease: "expo.out" }, uiStart + 0.1);
      tl.to(ctaRef.current, { y: 0, autoAlpha: 1, duration: 1.0, ease: "expo.out" }, uiStart + 0.6);

      // --- NO EXIT ANIMATION ---
      // We removed the exit animation so that the texts, cards, and CTA remain visible at the end of the scroll.
      
      let playState = 0; // 0: idle, 1: forward, -1: reverse
      let reqId: number | null = null;

      // Loop de sincronização total: a UI segue o vídeo milimetricamente!
      const syncLoop = () => {
        if (!video) return;
        
        let ct = video.currentTime;
        tl.time(ct); // Sincroniza a timeline da UI com o vídeo
        
        if (ct > uiStart + 0.3 && uiContainerRef.current) {
           uiContainerRef.current.style.pointerEvents = "auto";
        } else if (uiContainerRef.current) {
           uiContainerRef.current.style.pointerEvents = "none";
        }

        // Se o vídeo chegar ao fim no modo forward, pausa
        if (playState === 1 && ct >= (video.duration > 0 ? video.duration - 0.1 : 7.2)) {
           video.pause();
           
           if (videoContainerRef.current && !videoContainerRef.current.classList.contains("breathing-active")) {
             videoContainerRef.current.classList.add("breathing-active");
             gsap.to(videoContainerRef.current, {
               scale: 1.015,
               duration: 25,
               ease: "sine.inOut",
               yoyo: true,
               repeat: -1
             });
           }
        } else if (playState === -1 || playState === 0 || (playState === 1 && ct < (video.duration > 0 ? video.duration - 0.2 : 7.0))) {
           if (videoContainerRef.current && videoContainerRef.current.classList.contains("breathing-active")) {
             videoContainerRef.current.classList.remove("breathing-active");
             gsap.killTweensOf(videoContainerRef.current, "scale");
             gsap.to(videoContainerRef.current, { scale: 1, duration: 2.5, ease: "power2.out" });
           }
        }

        reqId = requestAnimationFrame(syncLoop);
      };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (!video) return;

          // Se chegou ao topo absoluto, reseta tudo
          if (self.progress === 0) {
            playState = 0;
            video.pause();
            gsap.to(video, { currentTime: 0, duration: 0.6, ease: "power2.out", overwrite: true });
            gsap.to('.scroll-prompt', { opacity: 1, autoAlpha: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            return;
          }

          // Esconde os indicadores de scroll assim que começa a rolar
          if (self.progress > 0.005) {
            gsap.to('.scroll-prompt', { opacity: 0, autoAlpha: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          }

          // Rolar para Baixo -> Play Nativo (Máxima fluidez e FPS alto)
          if (self.direction === 1 && playState !== 1) {
            playState = 1;
            gsap.killTweensOf(video);
            const playPromise = video.play();
            if (playPromise !== undefined) playPromise.catch(() => {});
            if (!reqId) syncLoop();
          } 
          // Rolar para Cima -> Scrub Suave Proportionado ao Scroll
          else if (self.direction === -1) {
            playState = -1;
            video.pause();
            
            // Mapeia o currentTime diretamente ao progresso do scroll com amortecimento
            const duration = video.duration || 6.0;
            const targetTime = self.progress * duration;

            gsap.to(video, { 
              currentTime: targetTime, 
              duration: 0.4, 
              ease: "power1.out", 
              overwrite: true 
            });
            
            if (!reqId) syncLoop();
          }
        }
      });
      
      // Limpeza segura da animação
      (video as any)._cleanupCustom = () => {
         if (reqId) cancelAnimationFrame(reqId);
      };

      // Auto-play de segurança se já estiver scrollado
      if (window.scrollY > 10) {
         video.currentTime = video.duration > 0 ? video.duration - 0.1 : 6.0;
         tl.time(video.currentTime);
         if (!reqId) syncLoop();
      }
    };

    // Previne problemas de metadados antes de injetar nas lógicas
    let cleanupEvt: () => void;
    if (video.readyState >= 2) { 
      initScroll();
      cleanupEvt = () => {};
    } else {
      const handleLoad = () => initScroll();
      video.addEventListener('loadeddata', handleLoad);
      cleanupEvt = () => video.removeEventListener('loadeddata', handleLoad);
    }

    return () => {
      cleanupEvt();
      if ((video as any)._cleanupCustom) {
         (video as any)._cleanupCustom();
      }
    };
      
  }, { scope: containerRef });

  const cards = [
    { id: '01', title: 'O Código Visual', desc: <>Os <span className="highlight">47 comandos testados</span> que geram visuais de alto padrão. Seus concorrentes parecerão amadores.</>, icon: <Box size={24} strokeWidth={2} className="icon-cyan-glow text-[#FF4500] group-hover:text-white transition-colors" />, themeColor: '#FF4500' },
    { id: '02', title: 'Pós-Produção Tática', desc: <>Estruturas prontas para aplicar. <span className="highlight">Prenda a atenção</span> nos primeiros 3 segundos de vídeo.</>, icon: <Camera size={24} strokeWidth={2} className="icon-cyan-glow text-[#FF4500] group-hover:text-white transition-colors" />, themeColor: '#FF4500' },
    { id: '03', title: 'O Filtro de Clientes', desc: <>A arquitetura secreta para <span className="highlight">separar curiosos de quem paga bem</span>. Feche projetos caros sem implorar.</>, icon: <BrainCircuit size={24} strokeWidth={2} className="icon-cyan-glow text-[#FF4500] group-hover:text-white transition-colors" />, themeColor: '#FF4500' },
    { id: '04', title: 'A Máquina Fantasma', desc: <><span className="highlight">Domine a automação oculta.</span> Deixe os sistemas fazerem o trabalho pesado enquanto você foca em ganhar dinheiro.</>, icon: <Package size={24} strokeWidth={2} className="icon-cyan-glow text-[#FF4500] group-hover:text-white transition-colors" />, themeColor: '#FF4500' },
  ];

  return (
    <>
    <TargetCursor 
        spinDuration={4}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
    {showTerminal && (
      <TerminalPanel onClose={() => setShowTerminal(false)} />
    )}
    
    {/* Virtual Scroll Track: Dá aos usuários área suficiente para engatilhar as direções de forma segura e responsiva. */}
    <div ref={containerRef} className="relative h-[200vh] bg-gradient-to-br from-[#1e0524] via-[#0f0111] to-[#1f0701] font-sans selection:bg-[#FF4500]/40 text-white overflow-x-hidden">
      
      {/* Cinematic Tech Overlays */}
      <div className="noise-bg"></div>
      <div className="scanlines"></div>

      {/* 1. Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-10 py-3 md:py-5 flex justify-between items-center transition-all bg-gradient-to-b from-black/80 to-transparent">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img 
            src="https://res.cloudinary.com/dwlfwnbt0/image/upload/v1773580247/lg-nux47_dzcmb8.svg" 
            alt="INUX FORTY7" 
            className="h-6 sm:h-8 md:h-10 w-auto opacity-90 hover:opacity-100 transition-opacity" 
          />
        </div>

        {/* Futuristic Shortcuts */}
        <nav className="flex items-center gap-4 sm:gap-6 z-50">
           <a href="#cofre" className="hidden sm:block font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/50 hover:text-[#FF4500] transition-colors">
             // PROTOCOLOS
           </a>
        </nav>
      </header>

      {/* 2. Fixed Background Video */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-gradient-to-br from-[#1e0524] via-[#0f0111] to-[#1f0701] flex flex-col items-center justify-start overflow-hidden">
        <div ref={videoContainerRef} className="w-full h-full origin-center relative flex justify-center">
          <video 
            ref={videoRef}
            className="w-full h-[55vh] md:w-auto md:h-full md:max-h-[100vh] md:max-w-[100vw] object-cover object-top md:object-contain opacity-90 scale-[1.05] md:scale-100 origin-center [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] md:[mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
            muted 
            playsInline
            preload="auto"
          >
            <source src="https://res.cloudinary.com/dwlfwnbt0/video/upload/v1777566643/v2_hero_jiik6p.mp4" type="video/mp4" />
          </video>
          {/* Persistent subtle gradient from bottom for mobile to blend perfectly into the background */}
          <div className="absolute bottom-0 w-full md:hidden bg-gradient-to-t from-[#0f0111] via-[#0f0111]/60 to-transparent pointer-events-none h-[25vh]"></div>
        </div>
        {/* Transparent top, darkened middle/bottom to match the vibrant HUD look */}
        <div 
          ref={overlayRef} 
          className="absolute inset-0 z-10 opacity-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_0%,transparent_80%,rgba(10,2,0,0.8)_95%,#080200_100%)]"
        ></div>
      </div>

      {/* 3. Initial Scroll Indicator Layer (Fixed) */}
      <div ref={scrollIndicatorRef} className="fixed top-0 left-0 w-full h-[100dvh] flex flex-col justify-end pb-[70px] sm:pb-[90px] md:pb-[10vh] px-6 sm:px-12 md:px-16 lg:px-24 z-10 pointer-events-none text-center items-center">
          
          <div className="flex flex-col items-center justify-center w-full relative z-10 gap-0 sm:gap-2">
              
              {/* Holographic Overlays */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] hologram-wireframe opacity-10 pointer-events-none z-0 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 20 L100 20 M0 80 L100 80 M20 0 L20 100 M80 0 L80 100" stroke="rgba(240, 18, 206, 0.5)" strokeWidth="0.1" fill="none" />
                  <circle cx="50" cy="50" r="45" stroke="rgba(240, 18, 206, 0.2)" strokeWidth="0.05" fill="none" />
                  <circle cx="50" cy="50" r="30" stroke="rgba(240, 18, 206, 0.1)" strokeWidth="0.05" fill="none" />
                </svg>
              </div>

              {/* Text Animation Container */}
              <div className="relative w-full flex flex-col items-center md:items-start">
                  
                  {/* Active Headline Content */}
                  <div className="w-full flex flex-col items-center justify-end md:justify-center relative h-full pt-[65vh] md:pt-[72vh] pb-[5vh] md:pb-[10vh]">
                      
                      {/* Precise Sleek Subtitle */}
                      <div className="scroll-headline-item mb-6 md:mb-10 relative z-10 w-full flex justify-center px-4">
                         <div className="flex flex-col items-center justify-center -space-y-1 md:-space-y-2">
                             <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 px-4 md:px-8">
                                 <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-sm bg-[#FF4500] animate-pulse shadow-[0_0_15px_#FF4500] flex-shrink-0"></div>
                                 <span className="font-mono text-[18px] sm:text-[20px] md:text-[26px] lg:text-[32px] font-bold tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.4em] text-white/90 uppercase text-center [text-shadow:0_0_10px_rgba(255,255,255,0.5)] whitespace-nowrap">
                                    PARE DE TESTAR
                                 </span>
                                 <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-sm bg-[#FF4500] animate-pulse shadow-[0_0_15px_#FF4500] flex-shrink-0"></div>
                             </div>
                             <span className="font-mono text-[16px] sm:text-[18px] md:text-[24px] lg:text-[32px] font-bold tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em] text-white/90 uppercase text-center flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 whitespace-nowrap">
                                <span>A</span>
                                <span className="text-[#FF4500] font-black text-[24px] sm:text-[28px] md:text-[32px] lg:text-[42px] drop-shadow-[0_0_20px_rgba(255,69,0,0.9)] scale-110 mx-1">SORTE</span>
                                <span>COM</span>
                                <span className="text-white font-black text-[24px] sm:text-[28px] md:text-[32px] lg:text-[42px] drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-110 ml-1">I.A.</span>
                             </span>
                         </div>
                      </div>

                      {/* MASSIVE TITLE */}
                      <div className="hero-title scroll-headline-item font-display font-black text-[14vw] sm:text-[6rem] md:text-[8vw] lg:text-[10vw] uppercase leading-[0.9] md:leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-white w-full tracking-tighter md:tracking-[-6px] text-center relative z-10 flex flex-col items-center justify-center mb-0">
                          <span className="block origin-center hero-glow-text whitespace-nowrap">
                            ASSUMA O
                          </span>
                          <span className="block origin-center hero-glow-text whitespace-nowrap">
                            CONTROLE.
                          </span>
                      </div>
                  </div>

                  {/* Cards Clustered (Centered during scroll) */}
                  <div className="absolute top-[80%] sm:top-[75%] md:top-[65%] lg:top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6">
                    {cards.map((card) => (
                      <div 
                        key={card.id}
                        className="cursor-target scroll-middle-card relative group flex flex-col items-start p-4 sm:p-5 md:p-6 bg-[#0a0208]/80 backdrop-blur-md border border-white/10 hover:border-[#FF4500]/60 transition-colors duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                      >
                        {/* HUD Corner markers */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-[#FF4500] transition-colors"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 group-hover:border-[#FF4500] transition-colors"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 group-hover:border-[#FF4500] transition-colors"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-[#FF4500] transition-colors"></div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                           <div className="p-1.5 sm:p-2 bg-[#FF4500]/10 rounded-sm w-fit group-hover:bg-[#FF4500]/20 transition-colors">
                              {card.icon}
                           </div>
                           <span className="font-mono text-[9px] sm:text-[10px] text-[#FF4500] font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100">
                             // MOD_{card.id}
                           </span>
                        </div>
                        <h3 className="font-display text-[11px] sm:text-xs md:text-sm font-black uppercase text-white tracking-widest mb-1.5 sm:mb-2 text-left leading-tight group-hover:text-white transition-colors">
                          {card.title}
                        </h3>
                        <p className="font-sans text-[9px] sm:text-[10px] md:text-xs text-white/50 text-left leading-relaxed hidden sm:block">
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>
               </div>
          </div>

          {/* Robotic Hand Scroll Indicator - Unified for Web/Mobile - Respeitando Safe Areas */}
          <motion.div 
            className="scroll-prompt absolute bottom-0 left-0 w-full flex flex-col items-center pointer-events-none z-50"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
          >
              <div className="flex flex-col items-center gap-1">
                  <div className="relative mb-0">
                    {/* Ring Pulse Effect */}
                    <motion.div 
                      className="absolute inset-x-0 bottom-0 bg-[#FF4500]/10 rounded-full blur-xl h-10 w-10 mx-auto"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.1, 0.2, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    ></motion.div>
                    
                    <motion.div
                      className="relative text-[#FF4500]/90 drop-shadow-[0_0_10px_rgba(255,69,0,0.4)] flex justify-center"
                      animate={{ 
                        y: [0, -12, 0],
                        scale: [1, 0.95, 1],
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                      }}
                    >
                      {/* Mobile Cyber Indicator */}
                      <div className="md:hidden flex flex-col items-center">
                        <motion.div
                          animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="flex flex-col items-center z-10 relative"
                        >
                          <ChevronsUp size={28} strokeWidth={2.5} className="text-[#FF4500] drop-shadow-[0_0_10px_rgba(255,69,0,0.8)]" />
                        </motion.div>
                        
                        <div className="w-[1.5px] h-10 bg-gradient-to-t from-transparent via-[#FF4500] to-transparent relative -mt-4">
                          <motion.div 
                            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[10px] bg-white rounded-full shadow-[0_0_10px_#fff]"
                            animate={{ y: [30, -5], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                      </div>

                      <Mouse size={28} strokeWidth={1.2} className="hidden md:block w-9 h-9" />
                    </motion.div>
                  </div>

                  <div className="md:hidden">
                    <ShinyText 
                      text="DESLIZE PARA ACESSAR" 
                      disabled={false}
                      speed={3}
                      className="font-mono text-[7px] font-bold uppercase tracking-[0.4em] text-white/40 [text-shadow:0_0_8px_rgba(255,255,255,0.05)]"
                      color="#ffffff15"
                      shineColor="#ffffff"
                      spread={100}
                    />
                  </div>
                  <div className="hidden md:block">
                    <ShinyText 
                      text="ROLE PARA ACESSAR" 
                      disabled={false}
                      speed={3}
                      className="font-mono text-[8px] font-bold uppercase tracking-[0.4em] text-white/40 [text-shadow:0_0_8px_rgba(255,255,255,0.05)]"
                      color="#ffffff15"
                      shineColor="#ffffff"
                      spread={100}
                    />
                  </div>
              </div>
          </motion.div>
      </div>

      {/* 4. Interactive UI Layer */}
      <div 
         ref={uiContainerRef} 
         className="fixed inset-0 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-[12vh] md:pb-[15vh] z-20 pointer-events-none"
      >
          <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center relative">
            
            {/* Subtext Paragraph (Now integrated here) */}
            <div ref={subtextRef} className="mb-6 md:mb-12 w-full relative max-w-5xl scroll-subtext-item opacity-0 invisible flex flex-col items-center text-center">
                <div className="p-5 md:p-8 w-full border-none shadow-none flex flex-col items-center bg-transparent backdrop-blur-none rounded-none">
                  <p className="text-white/80 text-lg sm:text-xl md:text-2xl font-secondary leading-[1.6] drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] font-light w-full text-center max-w-4xl tracking-tight">
                     Chega de guerra por migalhas. O sistema exato para dominar esse nível de impacto tá na tua mão agora. Muda o jogo, <strong className="text-white font-bold">destrave o cofre</strong>, produza <span className="text-[#FF4500] font-bold">47x mais rápido</span> e <span className="text-white font-bold block mt-2">cobre caro.</span>
                  </p>
                </div>
            </div>

             {/* High-Tech Tactical CTA */}
            <div className="w-full flex justify-center z-50 pointer-events-auto">
              <div 
                ref={ctaRef}
                className="flex flex-col items-center opacity-0 invisible"
              >
               <button 
                onClick={() => setShowTerminal(true)}
                className="cursor-target group relative inline-flex items-center justify-center bg-transparent w-full sm:w-auto"
               >
                 <div className="absolute inset-0 border border-[#FF4500]/50 scale-[1.05] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                 <div className="relative btn-scanner bg-[#FF4500] rounded-none px-10 py-5 w-full flex items-center justify-center gap-4 transition-all duration-500 ease-out transform group-hover:-translate-y-1 active:scale-95 shadow-[0_10px_20px_rgba(255,69,0,0.3)] group-hover:shadow-[0_15px_30px_rgba(255,69,0,0.7)] hover:bg-[#ff571a] cursor-pointer">
                    <span className="font-display font-black text-base sm:text-lg md:text-xl tracking-[0.05em] text-white uppercase drop-shadow-sm">
                      DESTRAVAR ACESSO IMEDIATO
                    </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="text-white transform group-hover:translate-x-1.5 transition-transform duration-500 ease-out">
                       <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
                    </svg>
                 </div>
               </button>
               
               {/* Trust Badges */}
               <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-white/50 font-secondary tracking-widest uppercase">
                 <div className="flex items-center gap-2">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00F0FF]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                   <span>Checkout 100% Seguro</span>
                 </div>
                 <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
                 <div className="flex items-center gap-2">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00F0FF]"><circle cx="12" cy="12" r="10"></circle><path d="M8 12l2 2 4-4"></path></svg>
                   <span>Garantia de 7 Dias</span>
                 </div>
               </div>
              </div>
            </div>

          </div>
      </div>
    </div>
    </>
  );
}


