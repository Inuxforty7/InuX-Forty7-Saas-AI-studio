import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { Box, BrainCircuit, Video as VideoIcon, Package, Menu, ChevronDown, ChevronUp, Mouse, Camera, Hand, ChevronsDown, ChevronsUp } from 'lucide-react';
import ShinyText from './components/ShinyText';
import TerminalPanel from './components/TerminalPanel';
import TargetCursor from './components/TargetCursor';
import RetroTvFrame from './components/RetroTvFrame';
import EcosystemSection from './components/EcosystemSection';
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
  const titleInnerRef = useRef<HTMLDivElement>(null);
  const subtitleInnerRef = useRef<HTMLDivElement>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const introCompletedRef = useRef(window.scrollY > 10);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setAppReady(true), 600); 
      }
      setLoadingProgress(progress);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const openTerminal = () => {
    window.history.pushState({ modal: 'terminal' }, '');
    setShowTerminal(true);
  };

  const closeTerminal = () => {
    setShowTerminal(false);
    if (window.history.state?.modal === 'terminal') {
      // If the state is still 'terminal', we initiated the close programmatically, so we pop the history.
      // But wait, history.back() will also fire popstate immediately or asynchronously.
      // To prevent re-triggering logic, that's fine since we already setShowTerminal(false).
      window.history.back();
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (!e.state || e.state.modal !== 'terminal') {
         setShowTerminal(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
      
      const headlineItems = containerRef.current?.querySelectorAll('.scroll-headline-item');
      const middleCards = containerRef.current?.querySelectorAll('.scroll-middle-card');

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

      const uiStart = 4.2; // Exato momento de impacto/tiro onde a UI vai entrar

      if (middleCards && middleCards.length > 0) {
        // Middle cards enter exactly at the impact of the shot and stay visible
        gsap.set(middleCards, { autoAlpha: 0, scale: 0.8, y: 50 });
        
        tl.to(middleCards, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, uiStart);
      }

      tl.to(scrollIndicatorRef.current, { pointerEvents: "none" }, 0);
      
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
           introCompletedRef.current = true;
           
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

          // Esconde os indicadores de scroll assim que começa a rolar
          if (self.progress > 0.005) {
            gsap.to('.scroll-prompt', { opacity: 0, autoAlpha: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          } else {
            gsap.to('.scroll-prompt', { opacity: 1, autoAlpha: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          }

          // Se chegou ao topo absoluto (Hero)
          if (self.progress === 0) {
            playState = 0;
            video.pause();
            gsap.to(video, { currentTime: 0, duration: 0.4, ease: "power2.out", overwrite: true });
            introCompletedRef.current = false;
            return;
          }

          // Controle contínuo e controlado total (mantém vídeo pausado e controla currentTime)
          video.pause();
          playState = self.direction === 1 ? 1 : -1;

          const duration = video.duration || 7.2;
          const targetTime = self.progress * duration;

          // Scrub super preciso e contínuo imediato no clique/arrasto
          gsap.to(video, { 
            currentTime: targetTime, 
            duration: 0.25, // Resposta instantânea, sem atraso de play nativo!
            ease: "power2.out", 
            overwrite: "auto" 
          });

          // Se chegou muito próximo do final, ativa breathing mode
          if (self.progress >= 0.98) {
            introCompletedRef.current = true;
          } else {
            introCompletedRef.current = false;
          }

          if (!reqId) syncLoop();
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

    // Magnetic & Liquid Stretch Hover Logic ("ESTICA 20K2" Node style)
    const handleNodeMagnetic = (element: HTMLElement | null, magneticIntensity = 0.3) => {
      if (!element) return () => {};
      
      const onMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const elemX = rect.left + rect.width / 2;
        const elemY = rect.top + rect.height / 2;
        
        const dx = e.clientX - elemX;
        const dy = e.clientY - elemY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 280) {
          const strength = (1 - distance / 280); // 1 at center, 0 at edge
          const targetX = dx * magneticIntensity * strength;
          const targetY = dy * magneticIntensity * strength;
          
          // Smooth Node magnetic & stretch logic (Better UX and readability)
          const targetSkewX = (dx / 280) * 1.5 * strength;
          const targetScaleX = 1 + (Math.abs(dx) / 400) * 0.03 * strength;
          const targetScaleY = 1 - (Math.abs(dy) / 400) * 0.01 * strength;
          
          gsap.to(element, {
            x: targetX,
            y: targetY,
            skewX: targetSkewX,
            scaleX: targetScaleX,
            scaleY: targetScaleY,
            z: 10,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto"
          });
        } else {
          gsap.to(element, {
            x: 0,
            y: 0,
            skewX: 0,
            scaleX: 1,
            scaleY: 1,
            z: 0,
            duration: 0.8,
            ease: "elastic.out(1.1, 0.4)",
            overwrite: "auto"
          });
        }
      };
      
      const onMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          skewX: 0,
          scaleX: 1,
          scaleY: 1,
          z: 0,
          duration: 1.0,
          ease: "elastic.out(1.1, 0.35)",
          overwrite: "auto"
        });
      };
      
      window.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseleave', onMouseLeave);
      
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('mouseleave', onMouseLeave);
      };
    };

    const cleanupTitle = handleNodeMagnetic(titleInnerRef.current, 0.35);
    const cleanupSubtitle = handleNodeMagnetic(subtitleInnerRef.current, 0.25);

    return () => {
      cleanupEvt();
      cleanupTitle();
      cleanupSubtitle();
      if ((video as any)._cleanupCustom) {
         (video as any)._cleanupCustom();
      }
    };
      
  }, { scope: containerRef });

  const cards = [
    { id: '01', title: 'O Código Visual', desc: <>Os <span className="highlight">47 comandos testados</span> que geram visuais de alto padrão.</>, icon: <Box size={32} strokeWidth={2.5} className="transition-colors w-7 h-7 sm:w-8 sm:h-8" />, themeColor: '#FF4500' },
    { id: '02', title: 'Pós-Produção Tática', desc: <>Estruturas prontas para aplicar. <span className="highlight">Prenda a atenção</span> nos 3 segundos.</>, icon: <Camera size={32} strokeWidth={2.5} className="transition-colors w-7 h-7 sm:w-8 sm:h-8" />, themeColor: '#FF4500' },
    { id: '03', title: 'O Filtro de Clientes', desc: <>A arquitetura para <span className="highlight">separar curiosos</span> de quem paga bem.</>, icon: <BrainCircuit size={32} strokeWidth={2.5} className="transition-colors w-7 h-7 sm:w-8 sm:h-8" />, themeColor: '#FF4500' },
    { id: '04', title: 'A Máquina Fantasma', desc: <><span className="highlight">Domine a automação oculta.</span> Deixe os sistemas fazerem o trabalho.</>, icon: <Package size={32} strokeWidth={2.5} className="transition-colors w-7 h-7 sm:w-8 sm:h-8" />, themeColor: '#FF4500' },
  ];

  return (
    <>
    {/* Initial Fast Loading Screen */}
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050106] transition-all duration-1000 ${
        appReady ? "opacity-0 pointer-events-none scale-105" : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      <div className="flex flex-col items-center">
         <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border border-[#FF4500]/20 flex items-center justify-center relative mb-8">
            <div className="absolute inset-2 md:inset-4 border border-[#FF4500] border-t-transparent rounded-full animate-spin [animation-duration:0.8s]"></div>
            <div className="absolute inset-4 md:inset-8 border border-white border-b-transparent rounded-full animate-spin [animation-duration:1.2s] [animation-direction:reverse]"></div>
            <div className="w-2 h-2 bg-[#FF4500] rounded-full animate-pulse blur-[1px]"></div>
         </div>
         <div className="flex flex-col items-center font-mono space-y-2 select-none text-center px-4">
            <span className="text-[#FF4500] text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-80 animate-pulse">
               Estabelecendo Conexão_
            </span>
            <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
               {loadingProgress}%
            </span>
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 mt-6 relative overflow-hidden rounded-full">
               <div 
                 className="absolute top-0 left-0 h-full bg-[#FF4500] transition-all duration-150 ease-out shadow-[0_0_10px_#FF4500]"
                 style={{ width: `${loadingProgress}%` }}
               ></div>
            </div>
         </div>
      </div>
    </div>

    <TargetCursor 
        spinDuration={4}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
    <RetroTvFrame />
    {showTerminal && (
      <TerminalPanel onClose={closeTerminal} />
    )}
    
    {/* Virtual Scroll Track */}
    <div ref={containerRef} className="relative h-[300vh] bg-gradient-to-br from-[#1e0524] via-[#0f0111] to-[#1f0701] font-sans selection:bg-[#FF4500]/40 text-white overflow-x-clip">
      
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
        {/* Cinematic Tech Overlays */}
        <div className="absolute inset-0 noise-bg pointer-events-none z-10"></div>
        <div className="absolute inset-0 scanlines pointer-events-none z-10"></div>

        {/* 1. Header */}
        <header 
          className="absolute top-0 left-0 w-full z-50 px-6 sm:px-10 md:px-[6vw] lg:px-[8vw] xl:px-[10vw] pb-4 flex justify-between items-center transition-all bg-transparent"
          style={{ paddingTop: 'calc(1.5rem + env(safe-area-inset-top, 0px))' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img 
              src="https://res.cloudinary.com/dwlfwnbt0/image/upload/v1773580247/lg-nux47_dzcmb8.svg" 
              alt="INUX FORTY7" 
              className="h-6 sm:h-8 md:h-7 lg:h-7 xl:h-8 w-auto opacity-90 hover:opacity-100 transition-opacity ml-4 sm:ml-0 drop-shadow-[0_4px_12px_rgba(255,255,255,0.35)]" 
            />
          </div>

          {/* Futuristic Shortcuts */}
          <nav className="flex items-center gap-4 sm:gap-6 z-50">
             <a href="#cofre" className="hidden sm:block font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/50 hover:text-[#FF4500] transition-colors">
               // PROTOCOLOS
             </a>
          </nav>
        </header>

        {/* 2. Fixed Background Video -> Now absolute in sticky container */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-gradient-to-br from-[#1e0524] via-[#0f0111] to-[#1f0701] flex flex-col items-center justify-start md:justify-center overflow-hidden">
          <div ref={videoContainerRef} className="w-full h-full origin-center relative flex justify-center items-start md:items-center z-0">
            <video 
              ref={videoRef}
              className="w-full h-[55vh] md:w-[92vw] lg:w-[88vw] xl:w-[84vw] md:h-full object-cover object-top md:object-cover opacity-90 scale-[1.05] md:scale-[1.02] origin-center transition-transform duration-700 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] md:[mask-image:linear-gradient(to_bottom,black_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(to_bottom,black_95%,transparent_100%)]"
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

        {/* 3. Initial Scroll Indicator Layer (Fixed -> Absolute) */}
        <div ref={scrollIndicatorRef} className="absolute top-0 left-0 w-full h-[100dvh] flex flex-col justify-end pb-[70px] sm:pb-[90px] md:pb-[calc(1vh+1rem)] lg:pb-[calc(1.5vh+1rem)] xl:pb-[calc(2vh+1rem)] px-6 sm:px-12 md:px-[6vw] lg:px-[8vw] xl:px-[10vw] z-10 pointer-events-none text-center lg:text-left items-center lg:items-start transition-all">
            
            <div className="flex flex-col items-center lg:items-start justify-center w-full relative z-10 gap-0 sm:gap-2">
                
                {/* Holographic Overlays */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] hologram-wireframe opacity-10 pointer-events-none z-0 overflow-hidden lg:hidden">
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 20 L100 20 M0 80 L100 80 M20 0 L20 100 M80 0 L80 100" stroke="rgba(240, 18, 206, 0.5)" strokeWidth="0.1" fill="none" />
                    <circle cx="50" cy="50" r="45" stroke="rgba(240, 18, 206, 0.2)" strokeWidth="0.05" fill="none" />
                    <circle cx="50" cy="50" r="30" stroke="rgba(240, 18, 206, 0.1)" strokeWidth="0.05" fill="none" />
                  </svg>
                </div>

                {/* Text Animation Container */}
                <div className="relative w-full flex flex-col justify-center px-4 sm:px-6 md:px-0">
                    
                    {/* Dark Backdrop Container for web/desktop text legibility */}
                    <div className="hidden lg:block absolute top-[15vh] left-1/2 -translate-x-1/2 w-[110vw] h-[75vh] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_60%)] pointer-events-none -z-10"></div>

                    <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start relative z-10 pt-[10vh] md:pt-[32vh] lg:pt-[36vh] xl:pt-[38vh] gap-[6vh] lg:gap-12 pl-0 md:pl-0 lg:pl-0">
                        
                        {/* MASSIVE TITLE */}
                        <div className="hero-title scroll-headline-item font-display font-black text-[13vw] sm:text-[11vw] md:text-[7vw] lg:text-[6vw] xl:text-[6.5vw] uppercase leading-[0.95] sm:leading-[0.9] md:leading-[0.85] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] text-white tracking-tighter md:tracking-[-3px] lg:tracking-[-4px] text-center lg:text-left flex flex-col items-center lg:items-start justify-center order-2 lg:order-1 mt-0 lg:-mt-[15vh] xl:-mt-[15vh]">
                           <div ref={titleInnerRef} className="animate-liquid-wiggle flex flex-col items-center lg:items-start select-none relative w-full">
                               {/* High-Tech Title Node Coordinates */}
                               <div className="hidden lg:flex items-center gap-1.5 mb-2 text-[10px] font-mono tracking-[0.2em] text-[#FF4500]/70">
                                  <span>[20K2_MODEL_NODE] // SCAN_CALB: 47_OBRO</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse"></span>
                               </div>
                               <span className="block origin-center lg:origin-left hero-glow-text whitespace-nowrap">
                                 ASSUMA O
                               </span>
                               <span className="block origin-center lg:origin-left hero-glow-text whitespace-nowrap behind-persona">
                                 CONTROLE.
                               </span>
                           </div>
                        </div>

                        {/* Precise Sleek Subtitle */}
                        <div className="scroll-headline-item flex justify-center lg:justify-end order-1 lg:order-2 w-full lg:w-auto transform lg:-translate-y-2 xl:-translate-y-4">
                           <div ref={subtitleInnerRef} className="animate-liquid-wiggle flex flex-col items-center lg:items-end justify-center -space-y-1.5 md:-space-y-2 lg:-space-y-3 select-none">
                               {/* High-Tech Node Identifier */}
                               <div className="hidden lg:flex items-center gap-1.5 mb-2 text-[10px] font-mono tracking-[0.2em] text-[#FF4500]/70">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse"></span>
                                  <span>NODE_SEC_20K2 // FREQ_47HZ</span>
                               </div>
                               <div className="flex items-center justify-center lg:justify-end gap-3 md:gap-5 px-4 lg:px-0">
                                   <span className="font-mono text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[28px] font-bold tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] text-white uppercase text-center lg:text-right [text-shadow:0_0_15px_rgba(255,255,255,0.6)] whitespace-nowrap">
                                      PARE DE TESTAR
                                   </span>
                                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-sm bg-[#FF4500] animate-pulse shadow-[0_0_15px_#FF4500] flex-shrink-0"></div>
                               </div>
                               <span className="font-mono text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[28px] font-bold tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.2em] text-white/90 uppercase text-center flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap mt-1 lg:mt-0">
                                  <span>A</span>
                                  <span className="text-[#FF4500] font-black text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[40px] drop-shadow-[0_0_20px_rgba(255,69,0,0.9)] scale-110 mx-1">SORTE</span>
                                  <span>COM</span>
                                  <span className="text-white font-black text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[40px] drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-110 ml-1">I.A.</span>
                               </span>
                            </div>
                        </div>
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
                        className="font-mono text-[7px] font-bold uppercase tracking-[0.4em] text-white/70 [text-shadow:0_0_15px_rgba(255,255,255,0.2)]"
                        color="#ffffff40"
                        shineColor="#ffffff"
                        spread={100}
                      />
                    </div>
                    <div className="hidden md:block">
                      <ShinyText 
                        text="DESLIZE PARA ACESSAR" 
                        disabled={false}
                        speed={3}
                        className="font-mono text-[7px] font-bold uppercase tracking-[0.4em] text-white/70 [text-shadow:0_0_15px_rgba(255,255,255,0.2)]"
                        color="#ffffff40"
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
           className="absolute inset-0 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-[12vh] md:pb-[8vh] lg:pb-[10vh] z-20 pointer-events-none"
        >
            <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center relative">
              
              {/* Subtext Paragraph (Now integrated here) */}
              <div ref={subtextRef} className="mb-6 md:mb-8 w-full relative max-w-[1200px] scroll-subtext-item opacity-0 invisible flex flex-col items-center text-center">
                  <div className="p-4 md:p-6 w-full flex flex-col items-center">
                    <p className="text-white/85 text-lg sm:text-xl md:text-[26px] font-secondary leading-[1.4] md:leading-[1.5] drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] font-medium w-full text-center tracking-tight">
                       Chega de guerra por migalhas. O ecossistema exato para dominar esse nível de impacto tá na tua mão agora. Projetado para mobile e PROs, <strong className="text-white font-bold white-glow">integre múltiplas IA</strong>, gere imagens cinematográficas e lance projetos <span className="text-white font-bold block mt-3 text-[1.1em]">com 1 clique.</span>
                    </p>
                  </div>
              </div>

               {/* High-Tech Tactical CTA */}
              <div className="w-full flex justify-center z-50 pointer-events-auto mt-[60px]">
                <div 
                  ref={ctaRef}
                  className="flex flex-col items-center opacity-0 invisible"
                >
                 <button 
                  onClick={() => {
                    const el = document.getElementById('ecosistema');
                    if(el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="cursor-target group relative inline-flex items-center justify-center bg-transparent w-full sm:w-auto"
                 >
                   <div className="absolute inset-0 border border-[#FF4500]/50 scale-[1.05] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                   <div className="relative btn-scanner bg-[#FF4500] rounded-none px-10 py-5 w-full flex items-center justify-center gap-4 transition-all duration-500 ease-out transform group-hover:-translate-y-1 active:scale-95 shadow-[0_10px_20px_rgba(255,69,0,0.3)] group-hover:shadow-[0_15px_30px_rgba(255,69,0,0.7)] hover:bg-[#ff571a] cursor-pointer">
                      <span className="font-display font-black text-base sm:text-lg md:text-xl tracking-[0.05em] text-white uppercase drop-shadow-sm">
                        EXPLORAR ECOSSISTEMA
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
                     <span>Integração 100% Segura</span>
                   </div>
                   <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
                   <div className="flex items-center gap-2">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00F0FF]"><circle cx="12" cy="12" r="10"></circle><path d="M8 12l2 2 4-4"></path></svg>
                     <span>Múltiplas Ferramentas</span>
                   </div>
                 </div>
                </div>
              </div>

            </div>
        </div>
      </div>
    </div>
    
    <div id="ecosistema">
      <EcosystemSection />
    </div>

    {/* Section added to provide CTA after Ecosystem */}
    <div className="w-full bg-[#030104] py-32 border-t border-white/5 flex flex-col items-center">
      <h2 className="font-display text-3xl md:text-5xl text-white font-black tracking-tight mb-8">
        PRONTO PARA MODULAR SEU FLUXO?
      </h2>
      <button 
        onClick={openTerminal}
        className="cursor-target group relative inline-flex items-center justify-center bg-transparent w-[90%] sm:w-auto"
      >
        <div className="absolute inset-0 border border-[#FF4500]/50 scale-[1.05] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
        <div className="relative btn-scanner bg-[#FF4500] rounded-none px-12 py-6 w-full flex items-center justify-center gap-4 transition-all duration-500 ease-out transform group-hover:-translate-y-1 active:scale-95 shadow-[0_10px_20px_rgba(255,69,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,69,0,0.7)] cursor-pointer">
           <span className="font-display font-black text-lg md:text-2xl tracking-[0.05em] text-white uppercase">
             DESTRAVAR ACESSO IMEDIATO
           </span>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="text-white transform group-hover:translate-x-1.5 transition-transform duration-500 ease-out"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
      </button>
    </div>

    </>
  );
}


