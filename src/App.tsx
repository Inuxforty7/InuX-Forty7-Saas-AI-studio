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
import { useState, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });


export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const painTextRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselScrollRef = useRef<HTMLDivElement>(null);
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

  // Efeito Realista Imersivo de "Pressão na Tela" ao tocar (Touchpad/Mouse/Dedo)
  useEffect(() => {
    const ui = uiContainerRef.current;
    const vc = videoContainerRef.current;
    
    // Anima apenas o conteúdo visual para não quebrar a lógica do "fixed" no contêiner de scroll
    const pressDown = (e: Event) => {
      if ((e.target as HTMLElement).closest('.scroll-middle-card')) return;
      if ((e.target as HTMLElement).closest('.terminal-modal')) return;
      // Não queremos aplicar isso na barra de rolagem. A barra de rolagem não faz parte do document wrapper interativo,
      // mas como o pointerdown pega na window, checamos a largura.
      if (e instanceof PointerEvent && e.clientX > window.innerWidth - 20) return;

      gsap.to([ui, vc], { 
        scale: 0.98, 
        filter: "brightness(0.9)",
        duration: 0.4, 
        ease: "power2.out",
        transformOrigin: "center center"
      });
    };

    const pressUp = () => {
      gsap.to([ui, vc], { 
        scale: 1, 
        filter: "brightness(1)",
        duration: 0.7, 
        ease: "elastic.out(1.1, 0.4)" 
      });
    };

    window.addEventListener('pointerdown', pressDown, { passive: true });
    window.addEventListener('pointerup', pressUp, { passive: true });
    window.addEventListener('pointercancel', pressUp, { passive: true });
    
    // Libera a pressão se o usuário começar a dar scroll ativamente "scroll e arrastamento" 
    // Garante que o scroll não fique travado / congelado por bug de pointer
    window.addEventListener('scroll', pressUp, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', pressDown);
      window.removeEventListener('pointerup', pressUp);
      window.removeEventListener('pointercancel', pressUp);
      window.removeEventListener('scroll', pressUp);
    };
  }, []);

  const openTerminal = () => {
    window.history.pushState({ modal: 'terminal' }, '');
    setShowTerminal(true);
  };

  const closeTerminal = () => {
    setShowTerminal(false);
    if (window.history.state?.modal === 'terminal') {
      // If the state is still 'terminal', we pop history back
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

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (appReady && !showTerminal) {
      interval = setInterval(() => {
        const ele = carouselScrollRef.current;
        if (!ele) return;
        
        // Pause auto-play if user is interacting
        if (ele.getAttribute('data-is-down') === 'true') return;
        if (ele.matches(':hover')) return;
        
        const cardWidth = window.innerWidth < 640 ? window.innerWidth * 0.85 : 320;
        const gap = 24;
        let newScrollLeft = ele.scrollLeft + cardWidth + gap;
        
        // Loop back to start if we reached the end
        if (newScrollLeft >= ele.scrollWidth - ele.clientWidth - 10) {
          newScrollLeft = 0;
        }
        
        ele.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [appReady, showTerminal]);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // Preload/warm-up the video to avoid scrub lagging
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
      gsap.set(painTextRef.current, { y: 15, autoAlpha: 0 });
      gsap.set(subtextRef.current, { y: 25, autoAlpha: 0 });
      gsap.set(cardsRefs.current, { x: 100, autoAlpha: 0 });
      gsap.set(carouselRef.current, { y: 250, autoAlpha: 0 });
      gsap.set(ctaRef.current, { y: 50, autoAlpha: 0 });

      // Timeline mestre baseada em segundos (Exatamente 1:1 com o tempo do vídeo)
      
      const headlineItems = containerRef.current?.querySelectorAll('.scroll-headline-item');
      const middleCards = containerRef.current?.querySelectorAll('.scroll-middle-card');

      if (headlineItems && headlineItems.length > 0) {
        // Devolvemos com precisão a estética original da animação de saída da hero, de forma perfeitamente orgânica e acoplada ao vídeo
        tl.to(headlineItems, { 
          opacity: 0, 
          scale: 1.08, 
          filter: "blur(6px)", 
          y: -40, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power2.inOut" 
        }, 0.2); 
      }

      const uiStart = 4.2; // Exato momento de impacto/tiro onde a UI vai entrar
      const earlyStart = 0.3; // Imediatamente após a hero text começar a subir
      
      tl.to(scrollIndicatorRef.current, { pointerEvents: "none" }, 0);
      
      // Gradient overlay darkens progressively
      tl.to(overlayRef.current, { opacity: 0.5, duration: 1.5, ease: "power1.inOut" }, earlyStart);
      tl.to(overlayRef.current, { opacity: 1, duration: 1.0, ease: "power2.inOut" }, uiStart - 0.5);
      
      // Early entrance: pain text and carousel appear quickly, pulled up like a hook as hero text leaves
      tl.to(painTextRef.current, { y: 0, autoAlpha: 1, duration: 1.6, ease: "power3.out" }, earlyStart);
      tl.to(carouselRef.current, { y: 60, autoAlpha: 1, duration: 2.0, ease: "power3.out" }, earlyStart + 0.1);

      // Auto-preview peek drag effect
      tl.to(carouselScrollRef.current, { 
        scrollLeft: 120, 
        duration: 0.8, 
        ease: "power1.inOut", 
        yoyo: true, 
        repeat: 1 
      }, earlyStart + 0.8);
      
      // Fade out pain text before impact
      tl.to(painTextRef.current, { y: -10, autoAlpha: 0, duration: 0.8, ease: "power2.in" }, uiStart - 0.8);
      
      // Final Snap/Impact moment - Efeito de corda/âncora tensionada puxando
      tl.to(subtextRef.current, { y: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out" }, uiStart + 0.1);
      tl.to(carouselRef.current, { y: 0, autoAlpha: 1, duration: 1.2, ease: "elastic.out(1, 0.4)" }, uiStart + 0.05);
      tl.to(ctaRef.current, { y: 0, autoAlpha: 1, duration: 1.0, ease: "elastic.out(1, 0.5)" }, uiStart + 0.2);

      // --- NO EXIT ANIMATION ---
      // We removed the exit animation so that the texts, cards, and CTA remain visible at the end of the scroll.
      
      let playState = 0; // 0: idle, 1: forward, -1: reverse
      let reqId: number | null = null;

      // Loop de sincronização total: a UI segue o vídeo milimetricamente!
      const syncLoop = () => {
        if (!video) return;
        
        let ct = video.currentTime;
        tl.time(ct); // Sincroniza a timeline da UI com o vídeo
        
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

      const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (!video) return;

          // Se chegou ao topo absoluto (Hero)
          if (self.progress === 0) {
            playState = 0;
            video.pause();
            gsap.to(video, { currentTime: 0, duration: 0.3, ease: "power2.out", overwrite: true });
            gsap.to('.scroll-prompt', { opacity: 1, autoAlpha: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
            introCompletedRef.current = false;
            return;
          }

          // Esconde os indicadores de scroll assim que começa a rolar
          if (self.progress > 0.005) {
            gsap.to('.scroll-prompt', { opacity: 0, autoAlpha: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          } else {
            gsap.to('.scroll-prompt', { opacity: 1, autoAlpha: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          }

          const duration = video.duration || 7.2;
          const targetTime = self.progress * duration;

          video.pause();
          playState = self.direction === 1 ? 1 : -1;
          
          // STRICT 1:1 Scrub - O mais rápido possível no desktop pra não ter delay na barra lateral
          gsap.to(video, { 
            currentTime: targetTime, 
            duration: isTouch ? 0.2 : 0.05, 
            ease: "none", 
            overwrite: "auto" 
          });
          
          if (!reqId) syncLoop();

          // Ativa o breathing mode se o progresso estiver próximo do final
          if (self.progress >= 0.98) {
            introCompletedRef.current = true;
          } else {
            introCompletedRef.current = false;
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
    { 
      id: '01', 
      title: 'Engenharia de Prompts', 
      desc: <>De textos a <span className="highlight text-[#FF4500]">imagens cinematográficas</span>. A anatomia do prompt perfeito para dominar a geração visual.</>, 
      videoSrc: 'https://res.cloudinary.com/dwlfwnbt0/video/upload/v1780410914/Camera_slowly_pushes_in_O...n_high_end_tech_aesthetic_txvlhg.mp4' 
    },
    { 
      id: '02', 
      title: 'Cinemática de IA', 
      desc: <>Articulando o movimento. Transforme arte estática em <span className="highlight text-[#FF4500]">vídeos de alto impacto</span> em poucos segundos.</>, 
      videoSrc: 'https://res.cloudinary.com/dwlfwnbt0/video/upload/v1780411479/Parallax_pan_across_monitor_202606021644_su3ulj.mp4'
    },
    { 
      id: '03', 
      title: 'UX Mobile 3D', 
      desc: <>Interfaces imersivas. Domine spatial design para criar <span className="highlight text-[#FF4500]">experiências web 3D</span> fluidas em tela de celular.</>, 
      videoSrc: 'https://res.cloudinary.com/dwlfwnbt0/video/upload/v1780416978/Smartphone_screen_scrolling_3D_o__202606021816_p6fg3s.mp4' 
    },
    { 
      id: '04', 
      title: 'O Arsenal Supremo', 
      desc: <>A visão do mestre. <span className="highlight text-[#FF4500]">Modelos e ferramentas integradas</span> (OpenAI, Gemini, Claude, Vercel, CapCut) num fluxo imbatível.</>, 
      videoSrc: 'https://res.cloudinary.com/dwlfwnbt0/video/upload/v1780417220/Glowing_glass_3D_logos_rotating_202606021819_tyexlg.mp4'
    },
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
    <div ref={containerRef} className="relative h-[115vh] md:h-[120vh] bg-gradient-to-br from-[#1e0524] via-[#0f0111] to-[#1f0701] font-sans selection:bg-[#FF4500]/40 text-white overflow-x-clip">
      
      {/* Cinematic Tech Overlays */}
      <div className="fixed inset-0 noise-bg pointer-events-none z-10"></div>
      <div className="fixed inset-0 scanlines pointer-events-none z-10"></div>

      {/* 1. Header */}
      <header 
        className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 md:px-[6vw] lg:px-[8vw] xl:px-[10vw] pb-4 flex justify-between items-center transition-all bg-transparent"
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

      {/* 2. Fixed Background Video */}
      <div className="fixed inset-0 w-full h-[100dvh] z-0 pointer-events-none bg-gradient-to-br from-[#1e0524] via-[#0f0111] to-[#1f0701] flex flex-col items-center justify-start md:justify-center overflow-hidden">
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
          className="absolute inset-0 z-10 opacity-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.3)_50%,rgba(10,2,0,0.8)_85%,#080200_100%)]"
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
         className="fixed inset-0 w-full h-[100dvh] flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-6 sm:pb-[8vh] lg:pb-[10vh] z-20 pointer-events-none"
      >
          <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center relative">
            
            {/* Unified Floating Text Area */}
            <div className="w-full relative max-w-[850px] min-h-[90px] sm:min-h-[120px] mb-4 sm:mb-6 flex items-center justify-center text-center">
              {/* Early Pain Text */}
              <div 
                ref={painTextRef} 
                className="absolute inset-x-0 mx-auto w-full flex flex-col items-center justify-center text-center opacity-0 invisible z-30 pointer-events-none"
              >
                 <p className="text-white/95 drop-shadow-lg text-sm sm:text-lg md:text-2xl font-display font-medium tracking-tight max-w-[700px] px-4 leading-normal">
                    E se você pudesse criar experiências como esta <span className="text-[#FF4500] font-bold block sm:inline">em poucos segundos?</span>
                 </p>
              </div>

              {/* Subtext Paragraph */}
              <div 
                ref={subtextRef} 
                className="w-full scroll-subtext-item opacity-0 invisible flex flex-col items-center justify-center text-center"
              >
                  <p className="text-[#f8f9fa] text-xs sm:text-base md:text-lg font-secondary leading-normal drop-shadow-[0_4px_12px_rgba(0,0,0,1)] 
                  [text-shadow:0_1px_4px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.8)] font-medium w-full tracking-tight px-4">
                     <span className="block mb-0.5 sm:mb-1 text-white/80">Se torne um super designer do futuro começando do absoluto zero.</span>
                     <span className="block mb-0.5 sm:mb-1 text-[#FF4500] font-bold drop-shadow-md">Domine o novo mercado criativo produzindo até 47x mais rápido</span>
                     <span className="block text-white font-extrabold text-[1.05em] tracking-normal drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">tendo o controle absoluto das melhores IAs criativas do mundo.</span>
                  </p>
              </div>
            </div>

            {/* Horizontal Carousel */}
            <div ref={carouselRef} className="w-full relative z-40 opacity-0 invisible flex flex-col items-center group">
               {/* Drag Indicator Indicator */}
               <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/50 text-xs sm:text-sm font-secondary tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-pulse"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                 <span>Arraste para explorar</span>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-pulse"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </div>
               
               <div className="w-full relative max-w-[100vw] sm:max-w-7xl mx-auto flex items-center">
                 {/* Left Arrow */}
                 <button 
                   onClick={() => {
                     const ele = carouselScrollRef.current;
                     if (ele) {
                       const cardWidth = window.innerWidth < 640 ? window.innerWidth * 0.85 : 320;
                       ele.scrollTo({ left: ele.scrollLeft - cardWidth - 24, behavior: 'smooth' });
                     }
                   }}
                   className="absolute left-2 sm:left-4 z-50 p-2 sm:p-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/60 hover:border-[#FF4500]/50 hover:scale-110 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex pointer-events-auto shadow-lg"
                   aria-label="Anterior"
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                 </button>

                 <div 
                   ref={carouselScrollRef}
                   className="w-[calc(100%+2rem)] sm:w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory pointer-events-auto hidden-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-6 -mx-4 sm:mx-0 cursor-grab active:cursor-grabbing"
                   onMouseDown={(e) => {
                     const ele = carouselScrollRef.current;
                     if (!ele) return;
                     ele.setAttribute('data-is-down', 'true');
                     ele.setAttribute('data-start-x', e.pageX.toString());
                     ele.setAttribute('data-scroll-left', ele.scrollLeft.toString());
                   }}
                   onMouseLeave={(e) => {
                     const ele = carouselScrollRef.current;
                     if (ele) ele.setAttribute('data-is-down', 'false');
                   }}
                   onMouseUp={(e) => {
                     const ele = carouselScrollRef.current;
                     if (ele) ele.setAttribute('data-is-down', 'false');
                   }}
                   onMouseMove={(e) => {
                     const ele = carouselScrollRef.current;
                     if (!ele || ele.getAttribute('data-is-down') !== 'true') return;
                     e.preventDefault();
                     const startX = parseFloat(ele.getAttribute('data-start-x') || '0');
                     const scrollLeft = parseFloat(ele.getAttribute('data-scroll-left') || '0');
                     const x = e.pageX;
                     const walk = (x - startX) * 2; // Scroll-fast
                     ele.scrollLeft = scrollLeft - walk;
                   }}
                 >
                   <div className="flex gap-3 sm:gap-6 w-max px-[7.5vw] sm:px-12 md:px-16 mt-2 lg:mx-auto">
                     {cards.map((card) => (
                       <div key={card.id} className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[320px] md:w-[360px] h-[220px] sm:h-[240px] md:h-[260px] relative flex flex-col bg-[#050106] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-[#FF4500]/60 hover:shadow-[0_0_30px_rgba(255,69,0,0.15)] transform hover:-translate-y-1 transition-all duration-500 will-change-transform group/card isolate">
                          {/* Video thumbnail background */}
                          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl md:rounded-3xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050106] via-[#050106]/70 to-transparent z-10" />
                            
                            <video 
                              src={card.videoSrc}
                              className="w-full h-full object-cover scale-[1.02] group-hover/card:scale-105 transition-transform duration-700 brightness-[0.85] group-hover/card:brightness-110"
                              autoPlay 
                              muted 
                              loop 
                              playsInline
                            />
                          </div>
                          
                          {/* Card Content layer */}
                          <div className="relative z-20 flex flex-col justify-end h-full p-5 sm:p-6">
                             <div className="flex items-center gap-3 mb-2">
                               <div className="text-[#FF4500] font-mono text-xs font-bold tracking-widest">{card.id}</div>
                               <h3 className="font-display font-bold text-base md:text-lg uppercase tracking-wider text-white drop-shadow-md">{card.title}</h3>
                             </div>
                             <p className="text-white/80 font-secondary text-xs sm:text-sm md:text-sm leading-relaxed transform translate-y-2 opacity-80 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 line-clamp-3">
                               {card.desc}
                             </p>
                          </div>
                       </div>
                     ))}
                   </div>
                 </div>

                 {/* Right Arrow */}
                 <button 
                   onClick={() => {
                     const ele = carouselScrollRef.current;
                     if (ele) {
                       const cardWidth = window.innerWidth < 640 ? window.innerWidth * 0.85 : 320;
                       let newScrollLeft = ele.scrollLeft + cardWidth + 24;
                       if (newScrollLeft >= ele.scrollWidth - ele.clientWidth - 10) newScrollLeft = 0;
                       ele.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
                     }
                   }}
                   className="absolute right-2 sm:right-4 z-50 p-2 sm:p-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/60 hover:border-[#FF4500]/50 hover:scale-110 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex pointer-events-auto shadow-lg"
                   aria-label="Próximo"
                 >
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                 </button>
               </div>
            </div>

             {/* High-Tech Tactical CTA */}
            <div className="w-full flex justify-center z-50 pointer-events-auto mt-[20px] sm:mt-[30px]">
              <div 
                ref={ctaRef}
                className="flex flex-col items-center opacity-0 invisible"
              >
               <button 
                onClick={openTerminal}
                className="cursor-target group relative inline-flex items-center justify-center bg-transparent w-full sm:w-auto"
               >
                 <div className="absolute inset-0 border border-[#FF4500]/50 scale-[1.05] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                 <div className="relative btn-scanner bg-[#FF4500] rounded-none px-10 py-5 w-full flex items-center justify-center gap-4 transition-all duration-500 ease-out transform group-hover:-translate-y-1 active:scale-95 shadow-[0_10px_20px_rgba(255,69,0,0.3)] group-hover:shadow-[0_15px_30px_rgba(255,69,0,0.7)] hover:bg-[#ff571a] cursor-pointer">
                    <span className="font-display font-black text-base sm:text-lg md:text-base tracking-[0.05em] text-white uppercase drop-shadow-sm">
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

    </>
  );
}
