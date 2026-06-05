import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";
import {
  Box,
  BrainCircuit,
  Video as VideoIcon,
  Package,
  Menu,
  ChevronDown,
  ChevronUp,
  Mouse,
  Camera,
  Hand,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";
import ShinyText from "./components/ShinyText";
import TerminalPanel from "./components/TerminalPanel";
import TargetCursor from "./components/TargetCursor";
import RetroTvFrame from "./components/RetroTvFrame";
import { useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const miniBenefits = [
  { tag: "PROSPECÇÃO" },
  { tag: "CÓDIGO ELITE" },
  { tag: "VISUAL 8K" },
  { tag: "SCRAPING" },
  { tag: "VIRAL COPIAR/COLAR" },
  { tag: "DESIGN PORTFÓLIO" },
  { tag: "AUTOMAÇÃO PURA" }
];

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
  const glassRef = useRef<HTMLDivElement>(null);
  const titleInnerRef = useRef<HTMLDivElement>(null);
  const subtitleInnerRef = useRef<HTMLDivElement>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isCarouselDragging, setIsCarouselDragging] = useState(false);
  const [benefitIndex, setBenefitIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBenefitIndex((prev) => (prev + 1) % miniBenefits.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  // High-performance Carousel dragging physics refs
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  const getCardStepWidth = () => {
    if (window.innerWidth < 640) {
      return window.innerWidth * 0.8 + 12; // 80vw + gap
    } else if (window.innerWidth < 768) {
      return 300 + 24; // sm:w-[300px] + gap-6
    } else if (window.innerWidth < 1024) {
      return 340 + 24; // md:w-[340px] + gap-6
    } else {
      return 360 + 24; // lg:w-[360px] + gap-6
    }
  };

  const handleDragStart = (clientX: number) => {
    const ele = carouselScrollRef.current;
    if (!ele) return;

    // Kill any active kinetic scroll tweens to allow immediate interruption of momentum
    gsap.killTweensOf(ele);

    isDownRef.current = true;
    setIsCarouselDragging(true);
    startXRef.current = clientX;
    scrollLeftStartRef.current = ele.scrollLeft;

    lastXRef.current = clientX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
  };

  const handleDragMove = (clientX: number, isTouchEvent = false) => {
    if (!isDownRef.current) return;
    const ele = carouselScrollRef.current;
    if (!ele) return;

    const deltaX = clientX - startXRef.current;

    // Realtime 1:1 scroll updates
    ele.scrollLeft = scrollLeftStartRef.current - deltaX;

    // Physics tracking for kinetic slide
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    if (dt > 10) {
      const dx = clientX - lastXRef.current;
      velocityRef.current = dx / dt; // pixels per millisecond
      lastXRef.current = clientX;
      lastTimeRef.current = now;
    }
  };

  const handleDragEnd = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setIsCarouselDragging(false);

    const ele = carouselScrollRef.current;
    if (!ele) return;

    const step = getCardStepWidth();
    const currentScroll = ele.scrollLeft;
    const vel = velocityRef.current;

    let targetScroll = currentScroll;

    // Release with velocity triggers dynamic kinetic glide
    if (Math.abs(vel) > 0.1) {
      // Direct projection of velocity momentum
      targetScroll = currentScroll - vel * 200;
    }

    // Snap cleanly to the nearest card
    targetScroll = Math.round(targetScroll / step) * step;

    // Boundaries checks
    const maxScroll = ele.scrollWidth - ele.clientWidth;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    // GSAP delivers buttery smooth deceleration and snap animation
    gsap.to(ele, {
      scrollLeft: targetScroll,
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

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

  // Efeito Realista Imersivo de "Pressão na Tela" e Drag-to-Scroll (Arrastar a tela inteira)
  useEffect(() => {
    const ui = uiContainerRef.current;
    const vc = videoContainerRef.current;

    let isDraggingScreen = false;
    let startY = 0;
    let initialScrollY = 0;

    const pressDown = (e: Event) => {
      if ((e.target as HTMLElement).closest(".scroll-middle-card")) return;
      if ((e.target as HTMLElement).closest(".terminal-modal")) return;

      const evt = e as PointerEvent;
      if (evt.clientX > window.innerWidth - 20) return;

      isDraggingScreen = true;
      startY = evt.clientY;
      initialScrollY = window.scrollY;

      gsap.to([ui, vc], {
        scale: 0.98,
        filter: "brightness(0.9)",
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "center center",
      });

      document.body.style.userSelect = "none";
    };

    const pressMove = (e: Event) => {
      if (!isDraggingScreen) return;
      // Impede arrasto se estiver tentando rolagem horizontal no carrossel
      if ((e.target as HTMLElement).closest(".scroll-middle-card")) return;

      const evt = e as PointerEvent;
      const dy = evt.clientY - startY;
      window.scrollTo({
        top: initialScrollY - dy * 1.5, // Multiplicador para sensação um pouco mais sensível
        behavior: "auto",
      });
    };

    const pressUp = () => {
      isDraggingScreen = false;
      document.body.style.userSelect = "";

      gsap.to([ui, vc], {
        scale: 1,
        filter: "brightness(1)",
        duration: 0.7,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    window.addEventListener("pointerdown", pressDown, { passive: true });
    window.addEventListener("pointermove", pressMove, { passive: false });
    window.addEventListener("pointerup", pressUp, { passive: true });
    window.addEventListener("pointercancel", pressUp, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", pressDown);
      window.removeEventListener("pointermove", pressMove);
      window.removeEventListener("pointerup", pressUp);
      window.removeEventListener("pointercancel", pressUp);
    };
  }, []);

  const openTerminal = () => {
    window.history.pushState({ modal: "terminal" }, "");
    setShowTerminal(true);
  };

  const closeTerminal = () => {
    setShowTerminal(false);
    if (window.history.state?.modal === "terminal") {
      // If the state is still 'terminal', we pop history back
      window.history.back();
    }
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (!e.state || e.state.modal !== "terminal") {
        setShowTerminal(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
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
        if (ele.getAttribute("data-is-down") === "true") return;
        if (ele.matches(":hover")) return;

        const cardWidth =
          window.innerWidth < 640 ? window.innerWidth * 0.85 : 320;
        const gap = 24;
        let newScrollLeft = ele.scrollLeft + cardWidth + gap;

        // Loop back to start if we reached the end
        if (newScrollLeft >= ele.scrollWidth - ele.clientWidth - 10) {
          newScrollLeft = 0;
        }

        ele.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [appReady, showTerminal]);

  useGSAP(
    () => {
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
        ctaBtn.addEventListener("mousemove", (e) => {
          const rect = ctaBtn.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);

          // Move container slightly
          gsap.to(ctaBtn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        ctaBtn.addEventListener("mouseleave", () => {
          gsap.to(ctaBtn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
            overwrite: "auto",
          });
        });
      }

      const initScroll = () => {
        const tl = gsap.timeline({ paused: true });

        // Prepara os estados iniciais invisíveis (UI)
        gsap.set(overlayRef.current, { opacity: 0 }); // Deixa o vídeo 100% claro no início
        gsap.set(glassRef.current, { opacity: 0 });
        gsap.set(uiContainerRef.current, { pointerEvents: "none" });
        gsap.set(painTextRef.current, { y: 15, autoAlpha: 0 });
        gsap.set(subtextRef.current, { y: 25, autoAlpha: 0 });
        gsap.set(cardsRefs.current, { x: 100, autoAlpha: 0 });
        gsap.set(carouselRef.current, { y: 250, autoAlpha: 0 });
        gsap.set(ctaRef.current, { y: 50, autoAlpha: 0 });

        // Timeline mestre baseada em segundos (Exatamente 1:1 com o tempo do vídeo)

        const headlineItems = containerRef.current?.querySelectorAll(
          ".scroll-headline-item",
        );
        const middleCards = containerRef.current?.querySelectorAll(
          ".scroll-middle-card",
        );

        // We decoupled the headlineItems animation from the synchronized timeline to prevent
        // browser video-buffered frames from causing momentary "freezes" or lags at the very beginning of the scroll.
        // Instead, the hero text animations are triggered immediately and responsively in the ScrollTrigger direction handlers.

        const uiStart = 4.2; // Exato momento de impacto/tiro onde a UI vai entrar
        const earlyStart = 0.3; // Imediatamente após a hero text começar a subir

        tl.to(scrollIndicatorRef.current, { pointerEvents: "none" }, 0);

        // Gradient overlay darkens progressively
        tl.to(
          overlayRef.current,
          { opacity: 0.5, duration: 1.5, ease: "power1.inOut" },
          earlyStart,
        );
        tl.to(
          overlayRef.current,
          { opacity: 1, duration: 1.0, ease: "power2.inOut" },
          uiStart - 0.5,
        );

        // Early entrance: pain text and carousel appear quickly, pulled up like a hook as hero text leaves
        tl.to(
          painTextRef.current,
          { y: 0, autoAlpha: 1, duration: 1.4, ease: "power3.out" },
          1.5,
        );
        tl.to(
          carouselRef.current,
          { y: 60, autoAlpha: 1, duration: 2.0, ease: "power3.out" },
          earlyStart + 0.1,
        );

        // Auto-preview peek drag effect
        tl.to(
          carouselScrollRef.current,
          {
            scrollLeft: 120,
            duration: 0.8,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
          },
          earlyStart + 0.8,
        );

        // Fade out pain text before impact
        tl.to(
          painTextRef.current,
          { y: -10, autoAlpha: 0, duration: 0.8, ease: "power2.in" },
          uiStart - 0.8,
        );

        // Final Snap/Impact moment - Efeito de corda/âncora tensionada puxando
        tl.to(
          subtextRef.current,
          { y: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out" },
          uiStart + 0.4,
        );
        tl.to(
          carouselRef.current,
          { y: 0, autoAlpha: 1, duration: 1.2, ease: "elastic.out(1, 0.4)" },
          uiStart + 0.05,
        );
        tl.to(
          ctaRef.current,
          { y: 0, autoAlpha: 1, duration: 1.0, ease: "elastic.out(1, 0.5)" },
          uiStart + 0.2,
        );

        // Desfoque em "liquid glass" perto do final (5.35 segundos) para dar destaque aos textos
        tl.to(
          glassRef.current,
          { opacity: 1, duration: 1.5, ease: "power2.inOut" },
          5.35,
        );

        // --- NO EXIT ANIMATION ---
        // We removed the exit animation so that the texts, cards, and CTA remain visible at the end of the scroll.

        let playState = 0; // 0: idle, 1: forward, -1: reverse
        let reqId: number | null = null;
        let isHeadlineVisible = true;

        // Loop de sincronização total: a UI segue o vídeo milimetricamente!
        const syncLoop = () => {
          if (!video) return;

          let ct = video.currentTime;
          tl.time(ct); // Sincroniza a timeline da UI com o vídeo

          // Se o vídeo chegar ao fim no modo forward, pausa
          if (
            playState === 1 &&
            ct >= (video.duration > 0 ? video.duration - 0.1 : 7.2)
          ) {
            video.pause();
            introCompletedRef.current = true;

            if (
              videoContainerRef.current &&
              !videoContainerRef.current.classList.contains("breathing-active")
            ) {
              videoContainerRef.current.classList.add("breathing-active");
              gsap.to(videoContainerRef.current, {
                scale: 1.015,
                duration: 25,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            }
          } else if (
            playState === -1 ||
            playState === 0 ||
            (playState === 1 &&
              ct < (video.duration > 0 ? video.duration - 0.2 : 7.0))
          ) {
            if (
              videoContainerRef.current &&
              videoContainerRef.current.classList.contains("breathing-active")
            ) {
              videoContainerRef.current.classList.remove("breathing-active");
              gsap.killTweensOf(videoContainerRef.current, "scale");
              gsap.to(videoContainerRef.current, {
                scale: 1,
                duration: 2.5,
                ease: "power2.out",
              });
            }
          }

          reqId = requestAnimationFrame(syncLoop);
        };

        const isTouch =
          typeof window !== "undefined" &&
          ("ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (!video) return;

            // Se chegou ao topo absoluto (Hero) ou extremamente perto (essencial para mobile bounce)
            if (self.progress < 0.04) {
              if (playState !== 0 || !isHeadlineVisible) {
                playState = 0;
                video.pause();
                gsap.killTweensOf(video);
                video.currentTime = 0;
                tl.time(0);

                isHeadlineVisible = true;
                if (headlineItems && headlineItems.length > 0) {
                  gsap.killTweensOf(headlineItems);
                  gsap.to(headlineItems, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    y: 0,
                    duration: 0.6,
                    stagger: 0.03,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }

                gsap.to(".scroll-prompt", {
                  opacity: 1,
                  autoAlpha: 1,
                  duration: 0.4,
                  ease: "power2.out",
                  overwrite: "auto",
                });
                introCompletedRef.current = false;
              }
              return;
            }

            // Esconde os indicadores de scroll assim que começa a rolar
            if (self.progress > 0.005) {
              gsap.to(".scroll-prompt", {
                opacity: 0,
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
            } else {
              gsap.to(".scroll-prompt", {
                opacity: 1,
                autoAlpha: 1,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            if (self.direction === 1) {
              // Animates out the hero texts immediately and smoothly, only if currently visible
              if (self.progress > 0.01 && isHeadlineVisible) {
                isHeadlineVisible = false;
                if (headlineItems && headlineItems.length > 0) {
                  gsap.killTweensOf(headlineItems);
                  gsap.to(headlineItems, {
                    opacity: 0,
                    scale: 1.08,
                    filter: "blur(6px)",
                    y: -40,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }
              }

              // Scroll Atua como um "Play" para iniciar toda a experiência visual organicamente
              if (playState !== 1) {
                playState = 1;
                gsap.killTweensOf(video);
                video.play().catch(() => {});
                if (!reqId) syncLoop();

                // Completa a rolagem automaticamente para o final da section (Apenas para desktop sem toque!)
                if (
                  !isTouch &&
                  containerRef.current &&
                  window.scrollY < containerRef.current.scrollHeight * 0.8
                ) {
                  window.scrollTo({
                    top: containerRef.current.scrollHeight,
                    behavior: "smooth",
                   });
                }
              }
            } else if (self.direction === -1 && self.progress < 0.95) {
              // Animates the hero texts back in beautifully with zero latency, only once on boundary
              if (self.progress < 0.9 && !isHeadlineVisible) {
                isHeadlineVisible = true;
                if (headlineItems && headlineItems.length > 0) {
                  gsap.killTweensOf(headlineItems);
                  gsap.to(headlineItems, {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    y: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }
              }

              // Scroll Reverso -> Rewind fluido
              if (playState !== -1) {
                playState = -1;
                video.pause();
                gsap.killTweensOf(video);

                gsap.to(video, {
                  currentTime: 0,
                  duration: video.currentTime * 0.5,
                  ease: "none",
                  overwrite: "auto",
                  onComplete: () => {
                    playState = 0;
                  },
                });

                if (!reqId) syncLoop();

                // Scroll automático de volta para o topo (Apenas no desktop!)
                if (!isTouch && window.scrollY > 0) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }
            }

            if (!reqId) syncLoop();

            // Ativa o breathing mode se o progresso estiver próximo do final
            if (self.progress >= 0.98) {
              introCompletedRef.current = true;
            } else {
              introCompletedRef.current = false;
            }
          },
        });

        // Limpeza segura da animação
        (video as any)._cleanupCustom = () => {
          if (reqId) cancelAnimationFrame(reqId);
        };

        // Auto-play de segurança se já estiver scrollado
        if (window.scrollY > 10) {
          video.currentTime = video.duration > 0 ? video.duration - 0.1 : 6.0;
          tl.time(video.currentTime);
          if (headlineItems && headlineItems.length > 0) {
            gsap.set(headlineItems, {
              opacity: 0,
              scale: 1.08,
              filter: "blur(6px)",
              y: -40,
            });
          }
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
        video.addEventListener("loadeddata", handleLoad);
        cleanupEvt = () => video.removeEventListener("loadeddata", handleLoad);
      }

      // Magnetic & Liquid Stretch Hover Logic ("ESTICA 20K2" Node style)
      const handleNodeMagnetic = (
        element: HTMLElement | null,
        magneticIntensity = 0.3,
      ) => {
        if (!element) return () => {};

        const onMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const elemX = rect.left + rect.width / 2;
          const elemY = rect.top + rect.height / 2;

          const dx = e.clientX - elemX;
          const dy = e.clientY - elemY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 280) {
            const strength = 1 - distance / 280; // 1 at center, 0 at edge
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
              overwrite: "auto",
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
              overwrite: "auto",
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
            overwrite: "auto",
          });
        };

        window.addEventListener("mousemove", onMouseMove);
        element.addEventListener("mouseleave", onMouseLeave);

        return () => {
          window.removeEventListener("mousemove", onMouseMove);
          element.removeEventListener("mouseleave", onMouseLeave);
        };
      };

      const cleanupTitle = handleNodeMagnetic(titleInnerRef.current, 0.35);
      const cleanupSubtitle = handleNodeMagnetic(
        subtitleInnerRef.current,
        0.25,
      );

      return () => {
        cleanupEvt();
        cleanupTitle();
        cleanupSubtitle();
        if ((video as any)._cleanupCustom) {
          (video as any)._cleanupCustom();
        }
      };
    },
    { scope: containerRef },
  );

  const cards = [
    {
      id: "01",
      title: "Engenharia de Prompts",
      desc: (
        <>
          De textos a{" "}
          <span className="highlight text-[#FF4500]">
            imagens cinematográficas
          </span>
          . A anatomia do prompt perfeito para dominar a geração visual.
        </>
      ),
      videoSrc:
        "https://res.cloudinary.com/dwlfwnbt0/video/upload/v1780410914/Camera_slowly_pushes_in_O...n_high_end_tech_aesthetic_txvlhg.mp4",
    },
    {
      id: "02",
      title: "Cinemática de IA",
      desc: (
        <>
          Articulando o movimento. Transforme arte estática em{" "}
          <span className="highlight text-[#FF4500]">
            vídeos de alto impacto
          </span>{" "}
          em poucos segundos.
        </>
      ),
      videoSrc:
        "https://res.cloudinary.com/dwlfwnbt0/video/upload/v1780411479/Parallax_pan_across_monitor_202606021644_su3ulj.mp4",
    },
    {
      id: "03",
      title: "UX Mobile 3D",
      desc: (
        <>
          Interfaces imersivas. Domine spatial design para criar{" "}
          <span className="highlight text-[#FF4500]">experiências web 3D</span>{" "}
          fluidas em tela de celular.
        </>
      ),
      videoSrc:
        "https://res.cloudinary.com/dwlfwnbt0/video/upload/v1780416978/Smartphone_screen_scrolling_3D_o__202606021816_p6fg3s.mp4",
    },
    {
      id: "04",
      title: "O Arsenal Supremo",
      desc: (
        <>
          A visão do mestre.{" "}
          <span className="highlight text-[#FF4500]">
            Modelos e ferramentas integradas
          </span>{" "}
          (OpenAI, Gemini, Claude, Vercel, CapCut) num fluxo imbatível.
        </>
      ),
      videoSrc:
        "https://res.cloudinary.com/dwlfwnbt0/video/upload/v1780417220/Glowing_glass_3D_logos_rotating_202606021819_tyexlg.mp4",
    },
  ];

  return (
    <>
      {/* Initial Fast Loading Screen */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050106] transition-all duration-1000 ${
          appReady
            ? "opacity-0 pointer-events-none scale-105"
            : "opacity-100 pointer-events-auto scale-100"
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
      {showTerminal && <TerminalPanel onClose={closeTerminal} />}

      {/* Virtual Scroll Track */}
      <div
        ref={containerRef}
        className="relative h-[115vh] md:h-[120vh] bg-gradient-to-br from-[#1e0524] via-[#0f0111] to-[#1f0701] font-sans selection:bg-[#FF4500]/40 text-white overflow-x-clip"
      >
        {/* Cinematic Tech Overlays */}
        <div className="fixed inset-0 noise-bg pointer-events-none z-10"></div>
        <div className="fixed inset-0 scanlines pointer-events-none z-10"></div>

        {/* 1. Header */}
        <header
          className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 md:px-[6vw] lg:px-[8vw] xl:px-[10vw] pb-4 flex justify-between items-center transition-all bg-transparent"
          style={{ paddingTop: "calc(1.5rem + env(safe-area-inset-top, 0px))" }}
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
            <a
              href="#cofre"
              className="hidden sm:block font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/50 hover:text-[#FF4500] transition-colors"
            >
              // PROTOCOLOS
            </a>
          </nav>
        </header>

        {/* 2. Fixed Background Video */}
        <div className="fixed inset-0 w-full h-[100dvh] z-0 pointer-events-none bg-gradient-to-br from-[#1e0524] via-[#0f0111] to-[#1f0701] flex flex-col items-center justify-start md:justify-center overflow-hidden">
          <div
            ref={videoContainerRef}
            className="w-full h-full origin-center relative flex justify-center items-start md:items-center z-0"
          >
            <video
              ref={videoRef}
              className="w-full h-[55vh] md:w-[92vw] lg:w-[88vw] xl:w-[84vw] md:h-full object-cover object-top md:object-cover opacity-90 scale-[1.05] md:scale-[1.02] origin-center transition-transform duration-700 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] md:[mask-image:linear-gradient(to_bottom,black_50%,rgba(0,0,0,0.85)_70%,rgba(0,0,0,0.4)_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(to_bottom,black_50%,rgba(0,0,0,0.85)_70%,rgba(0,0,0,0.4)_85%,transparent_100%)]"
              muted
              playsInline
              preload="auto"
            >
              <source
                src="https://res.cloudinary.com/dwlfwnbt0/video/upload/v1777566643/v2_hero_jiik6p.mp4"
                type="video/mp4"
              />
            </video>
            {/* Persistent subtle gradient from bottom for mobile to blend perfectly into the background */}
            <div className="absolute bottom-0 w-full md:hidden bg-gradient-to-t from-[#0f0111] via-[#0f0111]/60 to-transparent pointer-events-none h-[25vh]"></div>
          </div>
          {/* Transparent top, darkened middle/bottom to match the vibrant HUD look */}
          <div
            ref={overlayRef}
            className="absolute inset-0 z-10 opacity-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.3)_50%,rgba(10,2,0,0.8)_85%,#080200_100%)]"
          ></div>
          {/* Liquid Glass blur overlay near the end to make text readable */}
          <div
            ref={glassRef}
            className="absolute inset-0 z-11 pointer-events-none backdrop-blur-md bg-black/10"
          ></div>
        </div>

        {/* 3. Initial Scroll Indicator Layer (Fixed -> Absolute) */}
        <div
          ref={scrollIndicatorRef}
          className="absolute top-0 left-0 w-full h-[100dvh] flex flex-col justify-end pb-[70px] sm:pb-[90px] md:pb-[calc(1vh+1rem)] lg:pb-[calc(1.5vh+1rem)] xl:pb-[calc(2vh+1rem)] px-6 sm:px-12 md:px-[6vw] lg:px-[8vw] xl:px-[10vw] z-10 pointer-events-none text-center lg:text-left items-center lg:items-start transition-all"
        >
          <div className="flex flex-col items-center lg:items-start justify-center w-full relative z-10 gap-0 sm:gap-2">
            {/* Holographic Overlays */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] hologram-wireframe opacity-10 pointer-events-none z-0 overflow-hidden lg:hidden">
              <svg
                className="absolute inset-0 w-full h-full opacity-30"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 20 L100 20 M0 80 L100 80 M20 0 L20 100 M80 0 L80 100"
                  stroke="rgba(240, 18, 206, 0.5)"
                  strokeWidth="0.1"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(240, 18, 206, 0.2)"
                  strokeWidth="0.05"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke="rgba(240, 18, 206, 0.1)"
                  strokeWidth="0.05"
                  fill="none"
                />
              </svg>
            </div>

            {/* Text Animation Container */}
            <div className="relative w-full flex flex-col justify-center px-4 sm:px-6 md:px-0">
              <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start relative z-10 pt-[11vh] md:pt-[10vh] lg:pt-0 lg:-mt-[8vh] xl:-mt-[12vh] gap-[2vh] lg:gap-12 pl-0 md:pl-0 lg:pl-0">
                
                {/* Animated Mini Benefits / Testimonial Carousel - Compact Mystery Cyber Badge styled as a vertical badge on mobile to avoid covering the face and positioned high up in the sketched area */}
                <div 
                  id="benefits-ticker-container"
                  className="scroll-headline-item animate-liquid-wiggle w-[58px] h-auto min-h-[75px] sm:w-[165px] sm:min-h-0 sm:h-auto lg:w-[210px] bg-[#03070D]/95 border border-[#FF4500]/30 py-2 px-1 sm:p-2 sm:py-1.5 sm:px-2.5 rounded-[4px] absolute flex flex-col sm:flex-row items-center justify-start gap-1 sm:gap-2.5 backdrop-blur-md overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.9)] border-l-[3px] border-l-[#FF4500] pointer-events-auto -top-[72vh] sm:-top-[52vh] right-4 sm:right-6 lg:-top-[62vh] xl:-top-[68vh] lg:right-4 xl:right-4 z-30"
                >
                  <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-r from-transparent via-[#FF4555]/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-[1px] bg-gradient-to-r from-transparent via-[#FF4555]/30 to-transparent"></div>

                  {/* Blinking Cyber Core Pin */}
                  <div className="flex-shrink-0 relative flex h-1 sm:h-2 w-1 sm:w-2 select-none">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4500] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 sm:h-2 w-1 sm:w-2 bg-[#FF4500]"></span>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start leading-none select-none text-center sm:text-left">
                    <span className="hidden sm:inline text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase mb-1 whitespace-nowrap">
                      // PROTOCOLO ATIVO
                    </span>
                    <span className="inline sm:hidden text-[5.5px] font-mono tracking-[0.05em] text-white/40 uppercase mb-1 whitespace-normal break-words leading-none text-center">
                      // PROTOCOLO<br/>ATIVO
                    </span>
                    <div className="h-auto sm:h-5 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={benefitIndex}
                          initial={{ opacity: 0, y: 2, filter: "blur(2px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -2, filter: "blur(2px)" }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="font-mono text-[9px] sm:text-[10px] lg:text-[11px] text-[#FF4500] font-black tracking-[0.02em] sm:tracking-[0.15em] uppercase select-none drop-shadow-[0_0_8px_rgba(255,69,0,0.6)] whitespace-normal break-words leading-tight text-center sm:text-left"
                        >
                          <span className="hidden sm:inline">{miniBenefits[benefitIndex].tag}</span>
                          <span className="block sm:hidden">
                            {(() => {
                              const tag = miniBenefits[benefitIndex].tag;
                              const parts = tag.split(" ");
                              const formattedParts: string[] = [];
                              parts.forEach(part => {
                                if (part.includes("/")) {
                                  const subParts = part.split("/");
                                  subParts.forEach((sub, subIdx) => {
                                    if (subIdx < subParts.length - 1) {
                                      formattedParts.push(sub + "/");
                                    } else {
                                      formattedParts.push(sub);
                                    }
                                  });
                                } else {
                                  formattedParts.push(part);
                                }
                              });
                              return formattedParts.map((word, idx) => (
                                <span key={idx} className="block leading-[1.1] tracking-normal mb-0.5 last:mb-0">
                                  {word}
                                </span>
                              ));
                            })()}
                          </span>
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: MASSIVE TITLE */}
                <div className="order-2 lg:order-2 flex flex-col items-center lg:items-end justify-center -mt-[12vh] sm:-mt-[8vh] lg:-mt-[18vh] xl:-mt-[18vh] -top-[6vh] sm:top-0 lg:-translate-x-16 xl:-translate-x-24 relative w-full lg:w-auto">
                  {/* MASSIVE TITLE TEXT */}
                  <div className="hero-title scroll-headline-item font-display font-black text-[13vw] sm:text-[11vw] md:text-[5.5vw] lg:text-[4.5vw] xl:text-[4.2vw] 2xl:text-[60px] uppercase leading-[0.95] sm:leading-[0.9] md:leading-[0.85] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] lg:drop-shadow-[0_0px_60px_rgba(3,0,5,0.7)] text-white tracking-tighter md:tracking-[-2px] lg:tracking-[-3px] text-center lg:text-right flex flex-col items-center lg:items-end justify-center relative w-full lg:w-auto">
                    {/* Local ultra-feathered background accent behind texts on web to ensure supreme legibility with absolutely zero harsh lines or cuts */}
                    <div className="hidden lg:block absolute -inset-x-32 -inset-y-16 bg-[radial-gradient(circle_at_center,rgba(3,0,5,0.75)_0%,rgba(3,0,5,0.4)_50%,transparent_100%)] blur-[40px] rounded-full pointer-events-none -z-10" />
                    <div
                      ref={titleInnerRef}
                      className="animate-liquid-wiggle flex flex-col items-center lg:items-end select-none relative w-full"
                    >
                      {/* High-Tech Title Node Coordinates */}
                      <div className="hidden lg:flex items-center gap-1.5 mb-2 text-[10px] font-mono tracking-[0.2em] text-[#FF4500]/70">
                        <span>[20K2_MODEL_NODE] // SCAN_CALB: 47_OBRO</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse"></span>
                      </div>
                      <span className="block origin-center lg:origin-right hero-glow-text whitespace-nowrap">
                        ASSUMA O
                      </span>
                      <span className="block origin-center lg:origin-right hero-glow-text whitespace-nowrap behind-persona">
                        CONTROLE.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Precise Sleek Subtitle */}
                <div className="scroll-headline-item flex justify-center lg:justify-start order-1 lg:order-1 w-full lg:w-auto -mt-[35vh] sm:-mt-[15vh] lg:-mt-[21vh] xl:-mt-[21vh] drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] lg:drop-shadow-[0_0px_60px_rgba(3,0,5,0.7)] relative">
                  {/* Local ultra-feathered background accent behind texts on web to ensure supreme legibility with absolutely zero harsh lines or cuts */}
                  <div className="hidden lg:block absolute -inset-x-32 -inset-y-16 bg-[radial-gradient(circle_at_center,rgba(3,0,5,0.75)_0%,rgba(3,0,5,0.4)_50%,transparent_100%)] blur-[40px] rounded-full pointer-events-none -z-10" />
                  <div
                    ref={subtitleInnerRef}
                    className="animate-liquid-wiggle flex flex-col items-center lg:items-start justify-center -space-y-1.5 md:-space-y-2 lg:-space-y-3 select-none"
                  >
                    {/* High-Tech Node Identifier */}
                    <div className="hidden lg:flex items-center gap-1.5 mb-2 text-[10px] font-mono tracking-[0.2em] text-[#FF4500]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse"></span>
                      <span>NODE_SEC_20K2 // FREQ_47HZ</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-5 px-4 lg:px-0">
                      <span className="font-mono text-[16px] sm:text-[20px] md:text-[18px] lg:text-[26px] xl:text-[32px] 2xl:text-[36px] font-bold tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] text-white uppercase text-center lg:text-left [text-shadow:0_0_15px_rgba(255,255,255,0.6)] whitespace-nowrap">
                        PARE DE TESTAR
                      </span>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 lg:w-3 lg:h-3 rounded-sm bg-[#FF4500] animate-pulse shadow-[0_0_15px_#FF4500] flex-shrink-0"></div>
                    </div>
                    <span className="font-mono text-[16px] sm:text-[20px] md:text-[18px] lg:text-[26px] xl:text-[32px] 2xl:text-[36px] font-bold tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.2em] text-white/90 uppercase text-center flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap mt-1 lg:mt-0">
                      <span>A</span>
                      <span className="text-[#FF4500] font-black text-[22px] sm:text-[26px] md:text-[25px] lg:text-[38px] xl:text-[46px] 2xl:text-[50px] drop-shadow-[0_0_20px_rgba(255,69,0,0.9)] scale-110 mx-1">
                        SORTE
                      </span>
                      <span>COM</span>
                      <span className="text-white font-sans font-black text-[22px] sm:text-[26px] md:text-[25px] lg:text-[38px] xl:text-[46px] 2xl:text-[50px] drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-110 ml-1 tracking-[-0.12em]">
                        I.A.
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Robotic Hand Scroll Indicator - Unified for Web/Mobile - Respeitando Safe Areas */}
          <motion.div
            className="scroll-prompt absolute bottom-0 left-0 w-full flex flex-col items-center pointer-events-none z-50"
            style={{
              paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="relative mb-0">
                {/* Ring Pulse Effect */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 bg-[#FF4500]/10 rounded-full blur-xl h-10 w-10 mx-auto"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
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
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col items-center z-10 relative"
                    >
                      <ChevronsUp
                        size={28}
                        strokeWidth={2.5}
                        className="text-[#FF4500] drop-shadow-[0_0_10px_rgba(255,69,0,0.8)]"
                      />
                    </motion.div>

                    <div className="w-[1.5px] h-10 bg-gradient-to-t from-transparent via-[#FF4500] to-transparent relative -mt-4">
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[10px] bg-white rounded-full shadow-[0_0_10px_#fff]"
                        animate={{ y: [30, -5], opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </div>

                  <Mouse
                    size={28}
                    strokeWidth={1.2}
                    className="hidden md:block w-9 h-9"
                  />
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
          className="fixed inset-0 w-full h-[100dvh] flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-6 sm:pb-[8vh] md:pb-[5vh] lg:pb-[6vh] xl:pb-[7vh] z-20 pointer-events-none"
        >
          <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center relative">
            {/* Unified Floating Text Area */}
            <div className="w-full relative max-w-[850px] min-h-[60px] sm:min-h-[100px] md:min-h-[110px] lg:min-h-[120px] mb-2 sm:mb-4 lg:mb-6 flex items-center justify-center text-center">
              {/* Early Pain Text */}
              <div
                ref={painTextRef}
                className="absolute inset-x-0 mx-auto w-full flex flex-col items-center justify-center text-center opacity-0 invisible z-30 pointer-events-none mt-16 sm:mt-20 px-4"
              >
                <div className="bg-[#050106]/40 backdrop-blur-md border border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-[620px] shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col items-center">
                  {/* Tech pre-header */}
                  <div className="text-white/60 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1 sm:mb-2 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#FF4500] rounded-full animate-pulse shadow-[0_0_8px_#FF4500]"></span>
                    <span>PRODUÇÃO EXTREMA</span>
                    <span className="w-1.5 h-1.5 bg-[#FF4500] rounded-full animate-pulse shadow-[0_0_8px_#FF4500]"></span>
                  </div>

                  {/* Main early pain heading */}
                  <h3 className="text-white font-display text-[17px] sm:text-2xl md:text-3xl font-medium tracking-tight leading-[1.3] sm:leading-normal [text-shadow:0_4px_16px_rgba(0,0,0,0.85),0_2px_4px_rgba(0,0,0,0.95)]">
                    <span className="block">
                      E se você pudesse criar experiências
                    </span>
                    <span className="block mt-1 sm:mt-1.5">
                      como esta{" "}
                      <span className="text-[#FF4500] font-black tracking-wide [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_15px_rgba(255,69,0,0.45)]">
                        em poucos segundos?
                      </span>
                    </span>
                  </h3>
                </div>
              </div>

              {/* Subtext Paragraph */}
              <div
                ref={subtextRef}
                className="w-full scroll-subtext-item opacity-0 invisible flex flex-col items-center justify-center text-center -mt-16 sm:mt-2 md:mt-3 lg:mt-4 mb-4 sm:mb-0 px-2 sm:px-4"
              >
                {/* Tech pre-header */}
                <div className="text-white/60 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1 sm:mb-2 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FF4500] rounded-full animate-pulse shadow-[0_0_8px_#FF4500]"></span>
                  <span>ACESSO IMEDIATO</span>
                  <span className="w-1.5 h-1.5 bg-[#FF4500] rounded-full animate-pulse shadow-[0_0_8px_#FF4500]"></span>
                </div>

                {/* Main Heading Text */}
                <h3 className="text-white font-display text-[23px] sm:text-3xl md:text-[3.2vw] lg:text-[2.8vw] xl:text-[2.4vw] 2xl:text-[42px] md:whitespace-nowrap font-black uppercase tracking-tight leading-none mb-3 [text-shadow:0_4px_16px_rgba(0,0,0,0.85),0_2px_4px_rgba(0,0,0,0.95)]">
                  Domine a I.A. sob seu{" "}
                  <span className="text-[#FF4500] [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_20px_rgba(255,69,0,0.5)]">
                    controle absoluto
                  </span>
                </h3>

                {/* Body Paragraph Context Hook */}
                <p className="text-white font-sans text-[15px] sm:text-lg md:text-[19px] lg:text-[21px] max-w-[800px] leading-relaxed sm:leading-relaxed font-normal tracking-wide px-1 [text-shadow:0_2px_12px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.25)]">
                  Faça a inteligência artificial trabalhar a seu favor sob comando total. Sem ter domínio de nenhuma, você terá acesso a{" "}
                  <span className="text-[#FF4500] font-extrabold [text-shadow:0_2px_6px_rgba(0,0,0,0.9)]">
                    47 habilidades
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Horizontal Carousel */}
            <div
              ref={carouselRef}
              className="w-full relative z-40 opacity-0 invisible flex flex-col items-center gap-1 sm:gap-2 lg:gap-3 group"
            >
              {/* Drag Indicator */}
              <div className="flex items-center gap-2 text-white/50 text-[10px] sm:text-xs font-secondary tracking-[0.15em] uppercase select-none pointer-events-none mb-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="animate-pulse text-[#FF4500]"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Arraste para explorar</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="animate-pulse text-[#FF4500]"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="w-full relative max-w-[100vw] sm:max-w-7xl mx-auto flex items-center">
                {/* Left Arrow */}
                <button
                  onClick={() => {
                    const ele = carouselScrollRef.current;
                    if (ele) {
                      const step = getCardStepWidth();
                      // Round current scroll to closest card step, then subtract 1 step
                      let targetScroll =
                        Math.round(ele.scrollLeft / step) * step - step;
                      if (targetScroll < -20) {
                        const maxScroll = ele.scrollWidth - ele.clientWidth;
                        targetScroll = maxScroll;
                      }
                      targetScroll = Math.round(targetScroll / step) * step;
                      gsap.to(ele, {
                        scrollLeft: targetScroll,
                        duration: 0.55,
                        ease: "power2.out",
                        overwrite: "auto",
                      });
                    }
                  }}
                  className="absolute -left-2 sm:left-2 md:left-6 lg:left-8 z-50 p-2 sm:p-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/60 hover:border-[#FF4500]/50 hover:scale-110 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex pointer-events-auto shadow-lg shadow-black/50"
                  aria-label="Anterior"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <div
                  ref={carouselScrollRef}
                  className={`w-[calc(100%+2rem)] sm:w-full overflow-x-auto overflow-y-hidden pointer-events-auto hidden-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-4 sm:pb-6 -mx-4 sm:mx-0 cursor-grab active:cursor-grabbing selection:bg-transparent scroll-middle-card ${isCarouselDragging ? "scroll-auto" : "snap-x snap-mandatory"}`}
                  onMouseDown={(e) => handleDragStart(e.pageX)}
                  onMouseMove={(e) => handleDragMove(e.pageX)}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={(e) => handleDragStart(e.touches[0].pageX)}
                  onTouchMove={(e) => handleDragMove(e.touches[0].pageX, true)}
                  onTouchEnd={handleDragEnd}
                >
                  <div className="flex gap-3 sm:gap-6 w-max px-[7.5vw] sm:px-12 md:px-16 mt-2 lg:mx-auto">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className="snap-center sm:snap-start shrink-0 w-[80vw] sm:w-[300px] md:w-[340px] lg:w-[360px] h-[210px] sm:h-[235px] md:h-[245px] lg:h-[255px] relative flex flex-col bg-[#050106] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-[#FF4500]/60 hover:shadow-[0_0_30px_rgba(255,69,0,0.15)] transform hover:-translate-y-1.5 transition-all duration-500 will-change-transform group/card isolate scroll-middle-card"
                      >
                        {/* Video thumbnail background */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl md:rounded-3xl">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050106] via-[#050106]/70 to-transparent z-10" />

                          <video
                            src={card.videoSrc}
                            className="w-full h-full object-cover scale-[1.02] group-hover/card:scale-[1.08] transition-transform duration-700 brightness-[0.8] group-hover/card:brightness-100"
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        </div>

                        {/* Card Content layer */}
                        <div className="relative z-20 flex flex-col justify-end h-full p-4 sm:p-6">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-[#FF4500] font-mono text-[10px] sm:text-xs font-extrabold tracking-widest bg-black/45 px-1.5 py-0.5 rounded border border-white/5">
                              {card.id}
                            </div>
                            <h3 className="font-display font-bold text-sm sm:text-base md:text-[17px] uppercase tracking-wider text-white drop-shadow-md">
                              {card.title}
                            </h3>
                          </div>
                          <p className="text-white/80 font-secondary text-xs sm:text-[13px] leading-relaxed transition-all duration-500 line-clamp-3 opacity-100 translate-y-0 sm:translate-y-4 sm:opacity-0 sm:group-hover/card:translate-y-0 sm:group-hover/card:opacity-100">
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
                      const step = getCardStepWidth();
                      const maxScroll = ele.scrollWidth - ele.clientWidth;
                      // Round current scroll to closest card step, then add 1 step
                      let targetScroll =
                        Math.round(ele.scrollLeft / step) * step + step;
                      if (targetScroll >= maxScroll + 20) {
                        targetScroll = 0;
                      }
                      targetScroll = Math.round(targetScroll / step) * step;
                      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
                      gsap.to(ele, {
                        scrollLeft: targetScroll,
                        duration: 0.55,
                        ease: "power2.out",
                        overwrite: "auto",
                      });
                    }
                  }}
                  className="absolute -right-2 sm:right-2 md:right-6 lg:right-8 z-50 p-2 sm:p-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/60 hover:border-[#FF4500]/50 hover:scale-110 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex pointer-events-auto shadow-lg shadow-black/50"
                  aria-label="Próximo"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* High-Tech Tactical CTA */}
            <div className="w-full flex justify-center z-50 pointer-events-auto mt-2 sm:mt-5 lg:mt-6">
              <div
                ref={ctaRef}
                className="flex flex-col items-center opacity-0 invisible"
              >
                <button
                  onClick={openTerminal}
                  className="cursor-target group relative inline-flex items-center justify-center bg-transparent w-full sm:w-auto"
                >
                  <div className="absolute inset-0 border border-[#FF4500]/50 scale-[1.05] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                  <div className="relative btn-scanner bg-[#FF4500] rounded-none px-6 sm:px-10 py-3 sm:py-5 w-full flex items-center justify-center gap-2 sm:gap-4 transition-all duration-500 ease-out transform group-hover:-translate-y-1 active:scale-95 shadow-[0_10px_20px_rgba(255,69,0,0.3)] group-hover:shadow-[0_15px_30px_rgba(255,69,0,0.7)] hover:bg-[#ff571a] cursor-pointer">
                    <span className="font-display font-black text-sm sm:text-lg md:text-base tracking-[0.05em] text-white uppercase drop-shadow-sm">
                      DESTRAVAR ACESSO IMEDIATO
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      className="text-white transform group-hover:translate-x-1.5 transition-transform duration-500 ease-out sm:w-[24px] sm:h-[24px]"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </button>

                {/* Trust Badges */}
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-white/50 font-secondary tracking-widest uppercase">
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#00F0FF]"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>Integração 100% Segura</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>
                  <div className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#00F0FF]"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 12l2 2 4-4"></path>
                    </svg>
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
