import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Box, 
  Triangle, 
  Scissors, 
  Image as ImageIcon, 
  Code2, 
  Copy, 
  Check, 
  Search, 
  Cpu, 
  Globe, 
  Sliders, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  ChevronDown,
  X,
  Plus,
  Play,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  MessageSquare,
  Smartphone,
  Eye,
  Bot,
  ExternalLink
} from 'lucide-react';
import { ecosystemData, PromptItem, ModelComparison, CreationGuide, AutomationTool, ProductivityHack } from '../data/ecosystem';

const TerminalPanel = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'prompts' | 'models' | 'creations' | 'automations' | 'productivity'>('prompts');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string>('');
  const [isWorkflowExpanded, setIsWorkflowExpanded] = useState<boolean>(true);
  
  // Immersive Split Selection states
  const [selectedPromptId, setSelectedPromptId] = useState<string>('workflow-3d');
  const [selectedModelId, setSelectedModelId] = useState<string>('m-1');
  
  
  // Mobile responsive layout mode: show list or details
  const [mobileViewMode, setMobileViewMode] = useState<'list' | 'detail'>('list');
  
  // Interactive UI states for simulators
  const [activePromptTutorialId, setActivePromptTutorialId] = useState<string | null>(null);
  const [tutorialProgress, setTutorialProgress] = useState<number>(0);
  const [tutorialIsRunning, setTutorialIsRunning] = useState<boolean>(false);
  
  // Live Playground Model simulator states
  const [selectedPlaygroundModel, setSelectedPlaygroundModel] = useState<string>('m-1');
  const [playgroundInput, setPlaygroundInput] = useState<string>('code_design');
  const [playgroundOutputText, setPlaygroundOutputText] = useState<string>('');
  const [isTypingPlayground, setIsTypingPlayground] = useState<boolean>(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Live Creations states
  const [clicksCount, setClicksCount] = useState<number>(0);

  // Mobile Scroll Hint State
  const [showMobileScrollHint, setShowMobileScrollHint] = useState<boolean>(true);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      // Any captured scroll event should hide the hint if it comes from inside the modal
      if (showMobileScrollHint && modalScrollRef.current && modalScrollRef.current.contains(e.target as Node)) {
        setShowMobileScrollHint(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, true); // true for capture phase to catch non-bubbling scroll events
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [showMobileScrollHint]);

  useEffect(() => {
    if (mobileViewMode !== 'detail') {
      setShowMobileScrollHint(false);
      return;
    }

    const timer = setTimeout(() => {
      const detailView = modalScrollRef.current?.querySelector('.mobile-slide-detail:not(.hidden)');
      const detailScroll = detailView?.querySelector('.custom-scroll, .overflow-y-auto, [class*="overflow-y-auto"]') as HTMLElement | null;
      const scrollElement = detailScroll || detailView as HTMLElement | null;
      
      if (scrollElement) {
        const isScrollable = scrollElement.scrollHeight > scrollElement.clientHeight + 10;
        setShowMobileScrollHint(isScrollable);
        
        if (isScrollable) {
          setTimeout(() => {
            setShowMobileScrollHint(false);
          }, 4500);
        }
      } else {
        setShowMobileScrollHint(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedPromptId, selectedModelId, mobileViewMode]);
  
  // Live Automations simulator states
  const [runningAutomationId, setRunningAutomationId] = useState<string | null>(null);
  const [automationLogs, setAutomationLogs] = useState<string[]>([]);
  const [isAutomationActive, setIsAutomationActive] = useState<boolean>(false);

  // Responsive scroll lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle Copy to Clipboard Action
  const handleCopy = (text: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(''), 2000);
      }).catch(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(''), 2000);
      });
    } else {
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
    }
  };

  // Navigations categories for sidebar layout
      const categories = [
    { id: 'prompts', label: 'TUTORIAIS & WORKFLOWS', icon: <Globe size={14} />, desc: 'Passo a passo para gerar seu site ou imagens' },
    { id: 'models', label: 'MODELOS DE INTELIGÊNCIA ARTIFICIAL', icon: <Cpu size={14} />, desc: 'Veja e compare as inteligências artificiais' },
  ];

  // Search Filters
  const filteredPrompts = useMemo(() => {
    return ecosystemData.prompts.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const allPromptsList = useMemo(() => {
    const special = {
      id: 'workflow-3d',
      title: 'WORKFLOW: WEB ARCHITECT 3D (SCROLLYTELLING)',
      idealModel: 'Gemini 3.1 Pro',
      tags: ['3D', 'SCROLLYTELLING', 'WORKFLOW'],
      description: 'Pipeline operacional imersivo para clonar e reestruturar interfaces 3D de alta-fidelidade.',
      howToUse: 'Siga os passos operacionais do pipeline e utilize um dos packs de payload de injeção direta.'
    };
    
    const special2 = {
      id: 'workflow-vfx',
      title: 'BLUEPRINT MESTRE: CLONAGEM VFX DE ALTA FIDELIDADE',
      idealModel: 'Nano Banana 2',
      tags: ['VFX', 'IMAGE', 'FACE SWAP'],
      description: 'Protocolos exatos para substituições faciais fotorealistas em qualquer pessoa.',
      howToUse: 'Siga o fluxo no painel Flow e copie o bloco de prompt correspondente à cena.'
    };

    const special3 = {
      id: 'workflow-deploy',
      title: 'ECOSSISTEMA & PIPELINE DE DEPLOYMENT',
      idealModel: 'Antigravity IDE',
      tags: ['DEPLOY', 'GIT', 'VERCEL', 'ECOSSISTEMA'],
      description: 'Fluxo final: da geração no AI Studio para gestão no Github e deploy direto na Vercel.',
      howToUse: 'Siga a instrução de sync ou exportação zipada para integração local ou remota.'
    };

    const matchesSearch = (item: any) => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const specials = [special, special2, special3].filter(matchesSearch);

    return [...specials, ...filteredPrompts];
  }, [filteredPrompts, searchQuery]);

  const filteredModels = useMemo(() => {
    return ecosystemData.models.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.bestFor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  

  

  

    // If tab changes, let's auto-select first of search query
  useEffect(() => {
    setMobileViewMode('list');
    document.querySelector('.terminal-modal')?.scrollTo({top: 0, behavior: 'instant'});
    if (activeTab === 'prompts' && allPromptsList.length > 0) {
      if (!allPromptsList.some(p => p.id === selectedPromptId)) {
        setSelectedPromptId(allPromptsList[0].id);
      }
    } else if (activeTab === 'models' && filteredModels.length > 0) {
      if (!filteredModels.some(m => m.id === selectedModelId)) {
        setSelectedModelId(filteredModels[0].id);
        setSelectedPlaygroundModel(filteredModels[0].id);
      }
    }
  }, [activeTab, searchQuery]);

  // Prompt CSS visual thumbnails generator
  const renderPromptThumbnail = (id: string) => {
    switch (id) {
      case 'img-01': // Cyber-Noir High Fashion
        return (
          <div className="relative w-full h-24 rounded hidden sm:flex bg-[#030107] border border-white/5 overflow-clip flex flex-col justify-between p-2 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF0055]/5 to-transparent bg-[size:100%_40px] animate-[scanMove_6s_infinite_linear]"></div>
            <div className="absolute top-4 right-1/4 w-12 h-[1px] bg-cyan-400 opacity-20 blur-[1px]"></div>
            <div className="absolute bottom-6 left-12 w-8 h-[2px] bg-[#FF4500] opacity-30 blur-[1px]"></div>
            <div className="flex justify-between items-start z-10">
              <span className="text-[6.5px] font-mono text-cyan-400/80 tracking-widest">[LUT: NEON_NOIR_FASHION]</span>
              <span className="text-[6px] font-mono text-white/30">REC // 8K_RAW</span>
            </div>
            <div className="mx-auto w-8 h-8 border border-dashed border-[#00F0FF]/30 relative flex items-center justify-center">
              <div className="absolute -inset-1 border border-cyan-400/10 rounded-sm"></div>
              <Sparkles size={10} className="text-cyan-400/60 animate-pulse" />
            </div>
            <div className="flex justify-between items-end z-10 text-[6px] font-mono text-white/40">
              <span>F/0.95 LEICA NOCTILUX</span>
              <span className="text-[#FF4500] animate-pulse">● MODEL_OBRO_SCAN</span>
            </div>
          </div>
        );
      case 'img-02': // Brutalist Cave
        return (
          <div className="relative w-full h-24 rounded hidden sm:flex bg-[#07070a] border border-white/5 overflow-clip flex flex-col justify-between p-2 flex-shrink-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,69,0,0.1),transparent_70%)]"></div>
            <div className="absolute w-[50px] h-[90px] bg-zinc-900 border-r border-white/10 skew-y-[12deg] top-[-10px] left-[-5px]"></div>
            <div className="absolute w-[70px] h-[60px] bg-zinc-950 border-t border-white/10 -skew-x-[20deg] bottom-[-5px] right-[2px]"></div>
            <div className="absolute left-[45%] top-0 bottom-0 w-[1px] bg-[#FF4500]/60 shadow-[0_0_8px_#FF4500]"></div>
            <div className="flex justify-between items-start z-10">
              <span className="text-[6.5px] font-mono text-white/50 tracking-wider">BRUTALIST_PAVILION.RAW</span>
              <span className="text-[6px] font-mono text-white/20">ISO 100</span>
            </div>
            <div className="w-4 h-4 rounded-full border border-white/15 ml-auto z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#FF4500]"></div>
            </div>
            <div className="text-[6px] font-mono text-white/30 z-10">
              Muted Slate Palette // Negative Space
            </div>
          </div>
        );
      case 'img-03': // Hardware microchip
        return (
          <div className="relative w-full h-24 rounded hidden sm:flex bg-[#040810] border border-white/5 overflow-clip flex flex-col justify-between p-2 flex-shrink-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08),transparent_60%)]"></div>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
            <div className="text-[6.5px] font-mono text-white/40 tracking-widest">[MACRO_PRODUCT_HARDWARE]</div>
            <div className="mx-auto w-10 h-10 bg-black/80 border border-[#00F0FF]/30 p-1 flex flex-col justify-between relative shadow-[0_0_15px_rgba(0,240,255,0.15)] rounded-sm">
              <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-3 bg-cyan-400"></div>
              <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1 h-3 bg-[#FF4500]"></div>
              <div className="text-[5px] font-mono text-cyan-400 text-center uppercase leading-none mt-0.5">INUX CORE</div>
              <div className="flex justify-center gap-0.5 mb-0.5">
                <span className="w-0.5 h-1 bg-[#FF4500]"></span>
                <span className="w-1 h-1 bg-[#00F0FF] rounded-full animate-ping"></span>
                <span className="w-0.5 h-1 bg-cyan-400"></span>
              </div>
            </div>
            <div className="flex justify-between items-end text-[6px] font-mono text-white/40 z-10">
              <span>COPPER_FILAMENTS_8K</span>
              <span className="text-[#00F0FF]">COPIED PROTOCOL</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-24 rounded hidden sm:flex bg-[#080d16] border border-white/5 overflow-clip flex flex-col justify-between p-2 flex-shrink-0">
            <div className="absolute top-0 left-0 w-2 h-2 bg-[#FF4500]/50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.04),transparent_80%)]"></div>
            <div className="flex justify-between items-start z-10">
              <span className="text-[6.5px] font-mono text-[#FF4500] tracking-widest">// MODELO ASSOCIA: IA</span>
              <span className="text-[6px] text-white/30 font-mono">STATUS: HIGH_FID_8K</span>
            </div>
            <div className="mx-auto flex items-center justify-center py-1">
              <ImageIcon size={14} className="text-[#FF4500]/30 animate-pulse" />
            </div>
            <div className="flex justify-between items-end text-[6px] font-mono text-white/40">
              <span>GRID MATRIX BIND</span>
              <span className="text-white/20">READY SETUP: 47_OBRO</span>
            </div>
          </div>
        );
    }
  };

  // Run Cinematic prompt step tutorial
  const triggerPromptTutorial = (id: string) => {
    setActivePromptTutorialId(id);
    setTutorialIsRunning(true);
    setTutorialProgress(0);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setTutorialProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTutorialIsRunning(false);
      }
    }, 200);
  };

  // Live Playground Simulator for models
  const runModelPlaygroundDemo = (modelId: string, inputType: string) => {
    setSelectedModelId(modelId);
    setSelectedPlaygroundModel(modelId);
    setPlaygroundInput(inputType);
    setIsTypingPlayground(true);
    setPlaygroundOutputText('');

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    const matchModel = ecosystemData.models.find(m => m.id === modelId) || ecosystemData.models[0];
    const modelName = matchModel ? matchModel.name : "Claude";
    
    let generatedAnswer = "";
    if (inputType === 'code_design') {
      generatedAnswer = `// Gerado em alta-definição pelo ${modelName}:\nimport React from 'react';\nimport { motion } from 'framer-motion';\n\nexport default function EliteGrid() {\n  return (\n    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-[#01050D] border border-[#FF4500]/20 rounded">\n      <div className="p-4 border-l-2 border-[#FF4500] bg-black/60">\n        <h3 className="text-white font-mono uppercase text-xs font-black">Mecanismo Ativo</h3>\n        <p className="text-white/60 text-[10px] uppercase">Ajuste de bento-grid modular ultra-polido</p>\n      </div>\n    </div>\n  );\n}`;
    } else if (inputType === 'copy') {
      generatedAnswer = `--- MENSAGEM DO DEPARTAMENTO DE DESIGN TRIDIMENSIONAL // ${modelName} ---\n\n🚨 Pare de desperdiçar tráfego qualificado com templates estáticos e sem vida.\n\nSabe por que marcas de luxo e tecnologia convertem acima da média?\nPelo scrollytelling interativo tridimensional. A explosão modular de produtos retém a atenção e convence o cliente instantaneamente.\n\nCopie nossos payloads operacionais e controle o comportamento visual da sua aplicação com a suíte de prompts INUX FORTY7 no Gemini 3.1 Pro.`;
    } else {
      generatedAnswer = `// DIAGRAMA DE PAINEL DE CONTEXTO ULTRA-ALTO [${modelName}]\n> Servidor Inbound HTTP 200 ligado em 47Hz\n> Sincronização milimétrica de estados via webhooks do Make.com\n> Banco relacional mapeado e indexado sem latency buffers.`;
    }

    let charIdx = 0;
    typingTimerRef.current = setInterval(() => {
      setPlaygroundOutputText(prev => prev + generatedAnswer.charAt(charIdx));
      charIdx++;
      if (charIdx >= generatedAnswer.length) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setIsTypingPlayground(false);
      }
    }, 8);
  };

  // Run code model playground initially or on switch model
  useEffect(() => {
    if (activeTab === 'models' && selectedModelId) {
      runModelPlaygroundDemo(selectedModelId, 'code_design');
    }
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [activeTab, selectedModelId]);

  // Handle running of automations scripts
  const runAutomationScript = (id: string, code: string) => {
    setRunningAutomationId(id);
    setIsAutomationActive(true);
    setAutomationLogs([]);

    const logSteps = [
      `> INICIALIZANDO TERMINAL COMPILADOR: SUÍTE 0x47`,
      `> REQUISITANDO AMBIENTE SEGURO DE TRANSFERÊNCIA...`,
      `[Conectado] Carregando metadados locais do script...`,
      `[Ativo] Iniciando scraping de páginas no DOM...`,
      `[Filtro] Varrendo seletores: table, list, cards, li...`,
      `> ENCONTRADO: 148 registros qualificados de clientes em tempo real!`,
      `> PARSANDO BUFFER DE DADOS EM ARQUIVO EXCEL CSV...`,
      `> CONCLUÍDO COM SUCESSO! leads_extraidos_inux47.csv [24.8 KB]`
    ];

    let logIdx = 0;
    const interval = setInterval(() => {
      setAutomationLogs(prev => [...prev, logSteps[logIdx]]);
      logIdx++;
      if (logIdx >= logSteps.length) {
        clearInterval(interval);
        setIsAutomationActive(false);
      }
    }, 250);
  };

  return (
    <div ref={modalScrollRef} className="fixed inset-0 z-[100] bg-[#03070D] font-mono text-white flex flex-col overflow-y-auto lg:overflow-clip selection:bg-[#FF4500] selection:text-white terminal-modal custom-scroll">
      
      {/* Scrollbar & blinker style inject */}
      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 69, 0, 0.2);
          border-radius: 2px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 69, 0, 0.5);
        }
        @keyframes scanMove {
          0% { transform: translateY(0vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {/* MOBILE SCROLL HINT OVERLAY */}
      <AnimatePresence>
        {showMobileScrollHint && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] pointer-events-none flex flex-col items-center justify-center gap-1.5 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
          >
            <div className="bg-[#FF4500]/90 text-white font-mono text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full border border-white/20 uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,69,0,0.5)]">
               <span>ROLE PARA VER MAIS</span>
               <ArrowDown size={10} className="animate-bounce" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Holographic Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.01)_0%,rgba(0,0,0,0.92)_100%)]"></div>
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255, 69, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 69, 0, 0.1) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF4500]/30 to-transparent animate-[scanMove_10s_infinite_linear]"></div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#FF4500]/40 pointer-events-none z-50"></div>
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#FF4500]/40 pointer-events-none z-50"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#FF4500]/40 pointer-events-none z-50"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#FF4500]/40 pointer-events-none z-50"></div>

      {/* Main Screen Container Frame */}
      <div className="relative z-10 w-full max-w-[1500px] min-h-[100vh] lg:h-full lg:min-h-0 mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col justify-start lg:justify-between">
        
        {/* Top Header Controls with HUD branding */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-5 bg-[#FF4500] -skew-x-12 animate-pulse shadow-[0_0_10px_#FF4500]"></div>
            <div className="flex items-center gap-1.5">
               <span className="text-base sm:text-xl font-bold tracking-widest text-white uppercase">INUX</span>
               <span className="text-base sm:text-xl font-bold tracking-widest text-[#FF4500] drop-shadow-[0_0_10px_#FF4500] uppercase">FORTY7</span>
            </div>
            <span className="font-mono text-[7px] sm:text-[8.5px] tracking-widest text-white/40 border border-white/5 px-2 py-0.5 ml-1 sm:ml-2 bg-white/5 uppercase rounded-[1px] whitespace-nowrap">
               ECOSYSTEM v3.0 // ATIVO
            </span>
          </div>

          <button 
            onClick={onClose}
            className="cursor-target w-full sm:w-auto relative group px-4 sm:px-5 py-2.5 sm:py-2 border border-[#FF4500]/30 bg-transparent hover:bg-[#FF4500]/10 text-white/80 hover:text-white font-mono text-[9px] sm:text-[11px] font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_12px_rgba(255,69,0,0.2)] active:scale-95"
          >
            <X size={12} className="text-[#FF4500]" />
            <span>[ FECHAR ACESSO ECOSSISTEMA ]</span>
          </button>
        </header>

        {/* Global HUD Stats Ribbon */}
        <div className="mb-3 sm:mb-4 border border-white/5 bg-[#080D18]/45 p-2 sm:p-3 flex flex-wrap gap-y-1.5 sm:gap-y-2 gap-x-4 sm:gap-x-6 items-center justify-between text-[8px] sm:text-[12px] sm:text-[10.5px] tracking-wider text-white/40 relative overflow-clip flex-shrink-0">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF4500]/60"></div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping"></div>
            <span>SISTEMA: <strong className="text-white font-bold">PORTÁTIL COPIAR & COLAR</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>PACKS DISPONÍVEIS: <strong className="text-[#FF4500] font-black">[47 / 47 DESBLOQUEADOS]</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
             <span>SUPORTE EXTRA: <strong className="text-white">SEM DEPÊNCIAS COMPLEXAS</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
             <span>MÉTODO: <strong className="text-[#FF4500] font-bold">ONBOARDING IMERSIVO</strong></span>
          </div>
        </div>

        {/* Dynamic Multi-Layer Dashboard Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch lg:min-h-0 relative pb-10 lg:pb-0">
          
          {/* Mobile Category select tabs (horizontal slide) */}
          <div className="lg:hidden w-full relative mb-1 flex-shrink-0">
            {/* Scroll/Swipe horizontal hint gradient */}
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[#03070D] to-transparent pointer-events-none z-10"></div>
            <div className="w-full flex overflow-x-auto gap-1.5 pb-2 pt-0.5 snap-x hidden-scrollbar scroll-smooth pl-1 pr-6">
              {categories.map((cat, idx) => {
              const isActive = activeTab === cat.id;
              const mobileLabels: Record<string, string> = {
                prompts: "CINEMA 8K",
                models: "I.A. MODELS",
                
              };
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id as any);
                    setSearchQuery('');
                  }}
                  className={`snap-center shrink-0 flex items-center gap-2 px-4 py-3 border rounded-[2px] font-mono text-[11.5px] font-black uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "border-[#FF4500] bg-[#FF4500]/10 text-white shadow-[0_0_10px_rgba(255,69,0,0.15)]"
                      : "border-white/5 bg-black/40 text-white/50 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-[#FF4500]" : "text-white/30"}>
                    {cat.icon}
                  </span>
                  <span>{mobileLabels[cat.id] || cat.label}</span>
                </button>
              );
            })}
            </div>
          </div>

          {/* Left Sidebar Layout Navigation (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col min-h-0 h-full border border-white/10 bg-[#0B1221]/90  p-4 relative shadow-2xl overflow-clip justify-between">
              <div className="flex flex-col min-h-0">
                {/* HUD Internal Console Title */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2.5 flex-shrink-0">
                   <div className="flex items-center gap-2">
                     <Terminal size={12} className="text-[#FF4500]/85" />
                     <span className="text-[10px] tracking-widest font-black text-white/70">MENU OPERACIONAL</span>
                   </div>
                   <div className="flex items-center gap-1">
                     <span className="w-1 h-1 bg-[#FF4500] rounded-sm animate-pulse"></span>
                     <span className="w-1 h-1 bg-[#00F0FF] rounded-sm"></span>
                   </div>
                </div>

                <p className="text-[10px] text-white/30 leading-snug uppercase mb-4 tracking-wide flex-shrink-0">
                   Acesse as guias tecnológicas abaixo. Nossos packs foram organizados em seções limpas de visualização lateral.
                </p>

                {/* Vertical Category Side Selectors */}
                <div className="flex flex-col gap-2 overflow-visible lg:overflow-y-auto custom-scroll pr-1 flex-1">
                    {categories.map((cat, idx) => {
                      const isActive = activeTab === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveTab(cat.id as any);
                            setSearchQuery('');
                          }}
                          className={`cursor-target group relative w-full text-left p-3.5 border transition-all duration-200 flex items-center gap-3 rounded-[2px] active:scale-95`}
                          style={{
                            borderColor: isActive ? '#FF4500' : 'rgba(255,255,255,0.05)',
                            backgroundColor: isActive ? 'rgba(255,69,0,0.08)' : 'rgba(0,0,0,0.3)',
                            color: isActive ? 'white' : 'rgba(255,255,255,0.5)'
                          }}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FF4500]"></div>
                          )}
                          <div className={`p-0.5 rounded-[1px] transition-colors ${isActive ? 'text-[#FF4500]' : 'text-white/30 group-hover:text-white'}`}>
                            {cat.icon}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-bold tracking-wider uppercase leading-none mb-1">
                              {cat.label}
                            </span>
                            <span className="text-[9px] tracking-wide text-white/40 group-hover:text-white/50 transition-colors uppercase truncate select-none">
                              {cat.desc}
                            </span>
                          </div>
                          <ChevronRight size={10} className={`ml-auto opacity-20 transition-transform ${isActive ? 'translate-x-[2px] opacity-100 text-[#FF4500]' : ''}`} />
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Console logs bottom banner */}
              <div className="mt-4 pt-3 border-t border-white/5 flex flex-col font-mono text-[8.5px] text-white/30 leading-snug flex-shrink-0 select-none">
                 <div className="flex justify-between items-center text-[#FF4500] font-black text-[9px] mb-1">
                    <span>&gt;_ CONSOLE_HUD</span>
                    <span className="animate-pulse">ONLINE</span>
                 </div>
                 <p>&gt; Sistema otimizado para preencher telas.</p>
                 <p className="text-[#00F0FF]">&gt; Sem scroll externo. Navegação ativa.</p>
              </div>
          </div>

          {/* Main Dashboard Panel Showcase (Right 9 columns) */}
          <div className="col-span-1 lg:col-span-9 flex flex-col min-h-0 h-full gap-3">
             
             {/* Search HUD bar */}
             <div className="border border-white/10 bg-[#0B1221]/80  p-3 flex flex-col sm:flex-row gap-3 items-center justify-between flex-shrink-0 rounded-[1px]">
                <div className="relative w-full sm:max-w-md">
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                   <input 
                     type="text" 
                     placeholder={`Pesquisar na guia ${categories.find(c=>c.id===activeTab)?.label}...`}
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-9 pr-9 py-2.5 bg-black/60 border border-white/5 rounded-[1px] font-mono text-[12.5px] text-white placeholder-white/35 focus:outline-none focus:border-[#FF4500] focus:shadow-[0_0_8px_rgba(255,69,0,0.15)] transition-all uppercase"
                   />
                   {searchQuery && (
                     <button 
                       onClick={() => setSearchQuery('')}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                     >
                       <X size={12} />
                     </button>
                   )}
                </div>

                <div className="text-[9.5px] text-white/30 uppercase tracking-widest text-right flex-shrink-0 font-medium">
                   Análise: <span className="text-[#FF4500] font-bold">
                    {activeTab === 'prompts' && allPromptsList.length}
                    {activeTab === 'models' && filteredModels.length}
                   </span> itens disponíveis
                </div>
             </div>

             {/* Tab Contents: List Detail Master Split View Grid */}
             <div className="flex-1 min-h-0 relative">
                  <AnimatePresence mode="wait">
                      
                      {/* CATEGORY 1: PROMPTS CINEMATOGRÁFICOS */}
                      {activeTab === 'prompts' && (
                        <motion.div 
                          key="prompts"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full min-h-0"
                        >
                          {/* Inner List (Left side of split grid, taking 4 spans) */}
                          <div className={`col-span-1 lg:col-span-4 flex-col border border-white/5 bg-[#0B1221]/50 p-2.5 rounded-[1px] h-auto lg:h-full lg:min-h-0 ${mobileViewMode === 'detail' ? 'hidden lg:flex' : 'flex mobile-slide-list'}`}>
                            <div className="text-[8.5px] text-white/40 tracking-widest uppercase mb-2 select-none border-b border-white/5 pb-1 flex justify-between flex-shrink-0">
                              <span>1. SELECIONE UM WORKFLOW</span>
                              <span className="text-orange-500 font-bold">[{allPromptsList.length}]</span>
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5 overflow-visible lg:overflow-y-auto custom-scroll pr-1">
                              {allPromptsList.length === 0 ? (
                                <div className="text-center py-6 text-white/20 text-xs">Nenhum prompt encontrado</div>
                              ) : (
                                allPromptsList.map((item) => {
                                  const isSelected = selectedPromptId === item.id;
                                  return (
                                    <button
                                      key={item.id}
                                      onClick={() => { setSelectedPromptId(item.id); setMobileViewMode('detail'); document.querySelector('.terminal-modal')?.scrollTo({top: 0, behavior: 'smooth'}); }}
                                      className={`text-left p-4 sm:p-3 border transition-all duration-150 flex flex-col rounded-[2px] active:scale-98 select-target ${
                                        isSelected 
                                          ? "border-[#FF4500] bg-[#FF4500]/10 text-white" 
                                          : "border-white/5 bg-black/35 text-white/50 hover:text-white"
                                      }`}
                                    >
                                      <div className="flex justify-between items-center w-full"><div className="flex flex-col overflow-clip"><span className="text-[14px] font-black tracking-wide uppercase truncate block leading-tight">{item.title}</span><span className="text-[11px] text-white/50 uppercase mt-1.5 tracking-wider truncate">{item.idealModel}</span></div><ChevronRight size={16} className="text-white/20 flex-shrink-0" /></div>
                                    </button>
                                  );
                                })
                              )}
                            </div>
                          </div>

                          {/* Inner Detail Card (Right side of split grid, taking 8 spans) */}
                          <div className={`col-span-1 lg:col-span-8 border border-white/10 bg-[#0B1221]/90 p-4 rounded-[1px] h-auto lg:h-full lg:min-h-0 overflow-visible flex-col justify-start lg:justify-between ${mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex mobile-slide-detail'}`}>
                            {(() => {
                              const item = allPromptsList.find(p => p.id === selectedPromptId) || allPromptsList[0] || ecosystemData.prompts[0];
                              if (!item) return <div className="text-center py-6 text-white/20 text-xs">Selecione um prompt analítico.</div>;
                              const isCopied = copiedId === item.id;
                              const isTutorialActive = activePromptTutorialId === item.id;
                              if (item.id === 'workflow-3d') {
                                return (
                                  <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
                                    <div className="flex flex-col gap-3 min-h-0 overflow-visible lg:overflow-y-auto custom-scroll flex-1 lg:pr-1 lg:pb-1">
                                      <button 
                                        className="lg:hidden text-[#FF4500] hover:text-white flex items-center justify-center gap-2 font-mono text-[12px] uppercase font-bold w-full bg-[#FF4500]/10 px-4 py-3 rounded-[2px] border border-[#FF4500]/30 active:scale-95 transition-all mb-4"
                                        onClick={() => { setMobileViewMode('list'); document.querySelector('.terminal-modal')?.scrollTo({top: 0, behavior: 'instant'}); }}
                                      >
                                        <ArrowLeft size={12} />
                                        <span>Voltar para Lista</span>
                                      </button>

                                      {/* Header */}
                                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                         <span className="text-[10px] uppercase tracking-widest font-black text-[#FF4500] border border-[#FF4500]/25 px-1.5 py-0.5 bg-[#FF4500]/5 rounded-[1px]">
                                            REQUISITO: GEMINI 3.1 PRO (AI STUDIO)
                                         </span>
                                         {item.tags.map(t => (
                                           <span key={t} className="text-[10px] uppercase tracking-wider text-white/40 bg-white/5 px-1.5 py-0.5 rounded-[1px]">
                                              {t}
                                           </span>
                                         ))}
                                      </div>

                                      {/* The Main Expandable Card */}
                                      <div className="border border-[#FF4500]/25 rounded-[2px] bg-[#0A0A0A] overflow-clip shadow-[0_0_25px_rgba(255,69,0,0.08)]">
                                        {/* Card Header clickable to toggle expand */}
                                        <div 
                                          onClick={() => setIsWorkflowExpanded(!isWorkflowExpanded)}
                                          className="flex items-center justify-between p-4 bg-black/40 border-b border-[#FF4500]/10 cursor-pointer hover:bg-black/60 transition-all select-none"
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <div className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse"></div>
                                            <span className="font-mono text-[11px] sm:text-[12.5px] font-black tracking-widest text-[#FF4500] uppercase">
                                              {item.title}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-[7.5px] font-mono tracking-wider text-white/30 uppercase hidden sm:inline">
                                              {isWorkflowExpanded ? '[ CLIQUE PARA RECOLHER ]' : '[ CLIQUE PARA EXPANDIR ]'}
                                            </span>
                                            {isWorkflowExpanded ? <ChevronDown size={14} className="text-[#FF4500]" /> : <ChevronRight size={14} className="text-[#FF4500]" />}
                                          </div>
                                        </div>

                                        {/* Animated Content */}
                                        <AnimatePresence initial={false}>
                                          {isWorkflowExpanded && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.25, ease: "easeInOut" }}
                                              className="overflow-clip bg-[#0A0A0A]"
                                            >
                                              <div className="p-4 space-y-6 text-left border-t border-white/5 font-mono">
                                                
                                                {/* 1. BRIEFING DA MISSÃO */}
                                                <section className="space-y-2 border-l-2 border-[#FF4500]/60 pl-3">
                                                  <h4 className="text-[12.5px] font-black tracking-widest text-white uppercase mb-2">
                                                    1. BRIEFING DA MISSÃO
                                                  </h4>
                                                  <div className="space-y-1 text-[11.5px] sm:text-[12px] leading-relaxed text-white/80 uppercase">
                                                    <p><strong className="text-[#FF4500]">SISTEMA:</strong> CLONAGEM E REESTRUTURAÇÃO DE INTERFACES 3D DE ALTA FIDELIDADE EM SEGUNDOS.</p>
                                                    <p><strong className="text-[#FF4500]">OBJETIVO:</strong> TRANSFORMAR UM CÓDIGO BASE (REACT + THREE FIBER + FRAMER MOTION) EM MÚLTIPLAS IDENTIDADES VISUAIS DE LUXO, SEM PRECISAR REESCREVER O CÓDIGO DO ZERO.</p>
                                                  </div>
                                                </section>

                                                {/* 2. O PIPELINE OPERACIONAL */}
                                                <section className="space-y-4 border-l-2 border-[#FF4500]/60 pl-3">
                                                  <div>
                                                    <h4 className="text-[12.5px] font-black tracking-widest text-white uppercase mb-2">
                                                      2. O PIPELINE OPERACIONAL
                                                    </h4>
                                                    <div className="space-y-1.5 text-[11.5px] sm:text-[12px] leading-relaxed text-white/70 uppercase">
                                                      <p><strong className="text-white">- [ PASSO 01 ] GOOGLE IDX:</strong> GERE A BASE VISUAL DO SITE (WIREFRAME E ESTRUTURA DE SCROLL).</p>
                                                      <p><strong className="text-white">- [ PASSO 02 ] NANOBANANA 2 (FLOW):</strong> GERE AS IMAGENS/VÍDEOS DE ALTA FIDELIDADE (CINEMATIC LIGHTING, EXPLOSÕES 3D, HERO VIDEOS).</p>
                                                      <p><strong className="text-white">- [ PASSO 03 ] CLOUDINARY:</strong> FAÇA O UPLOAD DAS MÍDIAS GERADAS E COPIE OS LINKS DIRETOS (URLs).</p>
                                                      <p><strong className="text-white">- [ PASSO 04 ] GOOGLE AI STUDIO (GEMINI 3.1 PRO):</strong> COLE O CÓDIGO BASE GERADO NO PASSO 01, E EM SEGUIDA, INJETE UM DOS PROMPTS ABAIXO PARA APLICAR A NOVA IDENTIDADE.</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
                                                    <a href="https://idx.dev/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                      <ExternalLink size={10} />
                                                      Google IDX
                                                    </a>
                                                    <a href="https://tensor.art/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                      <ExternalLink size={10} />
                                                      Flow (Tensor.art)
                                                    </a>
                                                    <a href="https://cloudinary.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                      <ExternalLink size={10} />
                                                      Cloudinary
                                                    </a>
                                                    <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#FF4500]/10 border border-[#FF4500]/30 hover:bg-[#FF4500]/20 hover:border-[#FF4500]/50 text-[#FF4500] text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                      <ExternalLink size={10} />
                                                      Google AI Studio
                                                    </a>
                                                  </div>
                                                </section>

                                                {/* 3. PAYLOAD: PROMPTS DE INJEÇÃO [ COPIAR & COLAR ] */}
                                                <section className="space-y-5">
                                                  <h4 className="text-[11px] font-black tracking-widest text-[#FF4500] uppercase border-b border-white/5 pb-1">
                                                    3. PAYLOAD: PROMPTS DE INJEÇÃO [ COPIAR & COLAR ]
                                                  </h4>

                                                  {/* PACK 01 */}
                                                  <div className="space-y-2">
                                                    <div className="text-[10px] font-black tracking-wider text-white uppercase flex items-center justify-between">
                                                      <span>[ PACK 01: RICHTECH - SERVIÇOS GSM ]</span>
                                                    </div>
                                                    <div className="relative group">
                                                      <button
                                                        onClick={() => {
                                                          const promptText = `Using the current RichTech code I already generated, completely restructure the visual identity to match exactly the brand screenshot I will describe:\n- Logo: Blue circuit-style "R" + "RICHTECH" in bright blue (#00D4FF)\n- Background style: Dark navy to cyan gradient (like the poster)\n- Services to show: Samsung Remocao de conta, Google, Samsung Mdm, Samsung Frp by Imei, Tecno/Itel/Infinix Mdm, Activações de Tools, Renovações de Tool, Remoções de Mi-Account, Remoções de Honnor-ID, Instalações de Sistemas, Bypass de IPhones/Macbooks\n- Contact: +258 84 298 8759\n- Location: Zimpeto Parque\nMake the page modern, objective, clean and conversion-focused. Keep the scrollytelling structure with 3D laptop explosion but change all colors, fonts and text to match the brand identity. Strong WhatsApp CTA. Portuguese Mozambique tone (young and direct). Keep React + Three Fiber + Framer Motion.\nRewrite the full code with the new visual identity.`;
                                                          handleCopy(promptText, 'pack-01');
                                                        }}
                                                        className="absolute top-2 right-2 z-10 px-3 py-1.5 bg-black/95 border border-white/10 hover:border-[#FF4500] hover:text-[#FF4500] text-[10px] sm:text-[10.5px] font-mono font-bold text-white uppercase tracking-wider rounded-[1px] transition-all px-3 py-1.5"
                                                      >
                                                        {copiedId === 'pack-01' ? "[ COPIADO✓ ]" : "[ COPIAR PROMPT ]"}
                                                      </button>
                                                      <pre className="p-3 bg-black border border-white/5 rounded-[1px] text-[11.5px] sm:text-[12px] leading-relaxed text-[#00F0FF] overflow-x-auto overflow-y-auto max-h-64 select-text">
                                                        <code>
{`Using the current RichTech code I already generated, completely restructure the visual identity to match exactly the brand screenshot I will describe:
- Logo: Blue circuit-style "R" + "RICHTECH" in bright blue (#00D4FF)
- Background style: Dark navy to cyan gradient (like the poster)
- Services to show: Samsung Remocao de conta, Google, Samsung Mdm, Samsung Frp by Imei, Tecno/Itel/Infinix Mdm, Activações de Tools, Renovações de Tool, Remoções de Mi-Account, Remoções de Honnor-ID, Instalações de Sistemas, Bypass de IPhones/Macbooks
- Contact: +258 84 298 8759
- Location: Zimpeto Parque
Make the page modern, objective, clean and conversion-focused. Keep the scrollytelling structure with 3D laptop explosion but change all colors, fonts and text to match the brand identity. Strong WhatsApp CTA. Portuguese Mozambique tone (young and direct). Keep React + Three Fiber + Framer Motion.
Rewrite the full code with the new visual identity.`}
                                                        </code>
                                                      </pre>
                                                    </div>
                                                  </div>

                                                  {/* PACK 02 */}
                                                  <div className="space-y-2">
                                                    <div className="text-[10px] font-black tracking-wider text-white uppercase flex items-center justify-between">
                                                      <span>[ PACK 02: DEL GARDEN SERVICES (TDG) - MULTISERVIÇOS ]</span>
                                                    </div>
                                                    <div className="relative group">
                                                      <button
                                                        onClick={() => {
                                                          const promptText = `Using the current code I generated, restructure the entire visual identity to match exactly the Del Garden Services poster:\n- Logo: TDG (orange "T" + green "DG" with plant icon)\n- Main colors: Orange #FF8C00 + Green #00C853 + black/white\n- Services to highlight: Carpintaria, Serralharia, Estufaria, Construção, Jardinagem\n- Contact: 8790768008\n- Location: Bairro de Muhalaze\n- Slogan style: "Oferecemos soluções completas para o seu lar ou negócio"\nMake the page modern, objective and conversion-focused. Keep scrollytelling with 3D tool explosion (hammer, saw, plant etc. in sandwich style). Strong WhatsApp CTA button. Portuguese Mozambique tone. Clean and professional layout.\nRewrite the full code with the exact new visual identity from the poster.`;
                                                          handleCopy(promptText, 'pack-02');
                                                        }}
                                                        className="absolute top-2 right-2 z-10 px-3 py-1.5 bg-black/95 border border-white/10 hover:border-[#FF4500] hover:text-[#FF4500] text-[10px] sm:text-[10.5px] font-mono font-bold text-white uppercase tracking-wider rounded-[1px] transition-all px-3 py-1.5"
                                                      >
                                                        {copiedId === 'pack-02' ? "[ COPIADO✓ ]" : "[ COPIAR PROMPT ]"}
                                                      </button>
                                                      <pre className="p-3 bg-black border border-white/5 rounded-[1px] text-[11.5px] sm:text-[12px] leading-relaxed text-orange-500 overflow-x-auto overflow-y-auto max-h-64 select-text">
                                                        <code>
{`Using the current code I generated, restructure the entire visual identity to match exactly the Del Garden Services poster:
- Logo: TDG (orange "T" + green "DG" with plant icon)
- Main colors: Orange #FF8C00 + Green #00C853 + black/white
- Services to highlight: Carpintaria, Serralharia, Estufaria, Construção, Jardinagem
- Contact: 8790768008
- Location: Bairro de Muhalaze
- Slogan style: "Oferecemos soluções completas para o seu lar ou negócio"
Make the page modern, objective and conversion-focused. Keep scrollytelling with 3D tool explosion (hammer, saw, plant etc. in sandwich style). Strong WhatsApp CTA button. Portuguese Mozambique tone. Clean and professional layout.
Rewrite the full code with the exact new visual identity from the poster.`}
                                                        </code>
                                                      </pre>
                                                    </div>
                                                  </div>

                                                  {/* PACK 03 */}
                                                  <div className="space-y-2">
                                                    <div className="text-[10px] font-black tracking-wider text-white uppercase flex items-center justify-between">
                                                      <span>[ PACK 03: YOU TECH 4 SERVICE - ASSISTÊNCIA TÉCNICA ]</span>
                                                    </div>
                                                    <div className="relative group">
                                                      <button
                                                        onClick={() => {
                                                          const promptText = `Using the current code, restructure the visual identity to match exactly the "4YOU TECH & SERVICE" poster:\n- Logo: Circular "YOU TECH 4 SERVICE" in cyan/blue\n- Main title style: "4YOU TECH & SERVICE" in bright cyan\n- Services: Atualização de Software, Desbloqueio de Rede, Android/Apple (incluir logos), etc.\n- Colors: Dark purple/blue background + bright cyan and orange accents\n- Keep technical and modern feel\nMake the page clean, modern and highly conversion-focused. Keep scrollytelling 3D explosion (technical box with chips and tools). Strong WhatsApp CTA. Portuguese Mozambique tone.\nRewrite the full code with the exact new visual identity.`;
                                                          handleCopy(promptText, 'pack-03');
                                                        }}
                                                        className="absolute top-2 right-2 z-10 px-3 py-1.5 bg-black/95 border border-white/10 hover:border-[#FF4500] hover:text-[#FF4500] text-[10px] sm:text-[10.5px] font-mono font-bold text-white uppercase tracking-wider rounded-[1px] transition-all px-3 py-1.5"
                                                      >
                                                        {copiedId === 'pack-03' ? "[ COPIADO✓ ]" : "[ COPIAR PROMPT ]"}
                                                      </button>
                                                      <pre className="p-3 bg-black border border-white/5 rounded-[1px] text-[11.5px] sm:text-[12px] leading-relaxed text-cyan-400 overflow-x-auto overflow-y-auto max-h-64 select-text">
                                                        <code>
{`Using the current code, restructure the visual identity to match exactly the "4YOU TECH & SERVICE" poster:
- Logo: Circular "YOU TECH 4 SERVICE" in cyan/blue
- Main title style: "4YOU TECH & SERVICE" in bright cyan
- Services: Atualização de Software, Desbloqueio de Rede, Android/Apple (incluir logos), etc.
- Colors: Dark purple/blue background + bright cyan and orange accents
- Keep technical and modern feel
Make the page clean, modern and highly conversion-focused. Keep scrollytelling 3D explosion (technical box with chips and tools). Strong WhatsApp CTA. Portuguese Mozambique tone.
Rewrite the full code with the exact new visual identity.`}
                                                        </code>
                                                      </pre>
                                                    </div>
                                                  </div>

                                                  {/* PACK 04 */}
                                                  <div className="space-y-2">
                                                    <div className="text-[10px] font-black tracking-wider text-white uppercase flex items-center justify-between">
                                                      <span>[ PACK 04: MILLIONAIRE MOVE - IMPORTAÇÃO & LOGÍSTICA DE LUXO ]</span>
                                                    </div>
                                                    <div className="relative group">
                                                      <button
                                                        onClick={() => {
                                                          const promptText = `Using the current code, completely change the visual identity to match the Millionaire Move logo and style:\n- Logo: "MILLIONAIRE MOVE" in bold golden 3D style\n- Tagline: "Moving towards success"\n- Main colors: Black background + rich gold #FACC15 and orange accents\n- Visual: Globe with Chinese flag, airplane, shipping container, golden glow\nMake the page ultra-luxury, modern and conversion-focused. Keep scrollytelling with 3D explosion of logistics items (box, hair, clothes, phone, etc.). Strong WhatsApp VIP CTA. Portuguese Mozambique tone.\nRewrite the full code with the exact new visual identity.`;
                                                          handleCopy(promptText, 'pack-04');
                                                        }}
                                                        className="absolute top-2 right-2 z-10 px-3 py-1.5 bg-black/95 border border-white/10 hover:border-[#FF4500] hover:text-[#FF4500] text-[10px] sm:text-[10.5px] font-mono font-bold text-white uppercase tracking-wider rounded-[1px] transition-all px-3 py-1.5"
                                                      >
                                                        {copiedId === 'pack-04' ? "[ COPIADO✓ ]" : "[ COPIAR PROMPT ]"}
                                                      </button>
                                                      <pre className="p-3 bg-black border border-white/5 rounded-[1px] text-[11.5px] sm:text-[12px] leading-relaxed text-yellow-400 overflow-x-auto overflow-y-auto max-h-64 select-text">
                                                        <code>
{`Using the current code, completely change the visual identity to match the Millionaire Move logo and style:
- Logo: "MILLIONAIRE MOVE" in bold golden 3D style
- Tagline: "Moving towards success"
- Main colors: Black background + rich gold #FACC15 and orange accents
- Visual: Globe with Chinese flag, airplane, shipping container, golden glow
Make the page ultra-luxury, modern and conversion-focused. Keep scrollytelling with 3D explosion of logistics items (box, hair, clothes, phone, etc.). Strong WhatsApp VIP CTA. Portuguese Mozambique tone.
Rewrite the full code with the exact new visual identity.`}
                                                        </code>
                                                      </pre>
                                                    </div>
                                                  </div>

                                                  {/* PACK 05 */}
                                                  <div className="space-y-2">
                                                    <div className="text-[10px] font-black tracking-wider text-white uppercase flex items-center justify-between">
                                                      <span>[ PACK 05: MALATE GLOBAL IMPORTS (MGI) - IMPORTAÇÃO DIRETA ]</span>
                                                    </div>
                                                    <div className="relative group">
                                                      <button
                                                        onClick={() => {
                                                          const promptText = `Using the current code, restructure the visual identity to match exactly the MGI / Malate poster:\n- Logo: MGI with airplane and "IMPORTAÇÕES"\n- Main message: "ESTAMOS ABERTOS" in big orange box + "9H30 HÁ 18H"\n- Slogan: "SOMOS A PONTE PARA O OUTRO MUNDO"\n- Contact: 83 4030 346\n- Location: Av Olof Palm, n310\nMake the page modern, objective and conversion-focused. Keep scrollytelling with 3D drone/import items explosion. Strong WhatsApp CTA. Portuguese Mozambique tone.\nRewrite the full code with the exact new visual identity from the poster.`;
                                                          handleCopy(promptText, 'pack-05');
                                                        }}
                                                        className="absolute top-2 right-2 z-10 px-3 py-1.5 bg-black/95 border border-white/10 hover:border-[#FF4500] hover:text-[#FF4500] text-[10px] sm:text-[10.5px] font-mono font-bold text-white uppercase tracking-wider rounded-[1px] transition-all px-3 py-1.5"
                                                      >
                                                        {copiedId === 'pack-05' ? "[ COPIADO✓ ]" : "[ COPIAR PROMPT ]"}
                                                      </button>
                                                      <pre className="p-3 bg-black border border-white/5 rounded-[1px] text-[11.5px] sm:text-[12px] leading-relaxed text-orange-400 overflow-x-auto overflow-y-auto max-h-64 select-text">
                                                        <code>
{`Using the current code, restructure the visual identity to match exactly the MGI / Malate poster:
- Logo: MGI with airplane and "IMPORTAÇÕES"
- Main message: "ESTAMOS ABERTOS" in big orange box + "9H30 HÁ 18H"
- Slogan: "SOMOS A PONTE PARA O OUTRO MUNDO"
- Contact: 83 4030 346
- Location: Av Olof Palm, n310
Make the page modern, objective and conversion-focused. Keep scrollytelling with 3D drone/import items explosion. Strong WhatsApp CTA. Portuguese Mozambique tone.
Rewrite the full code with the exact new visual identity from the poster.`}
                                                        </code>
                                                      </pre>
                                                    </div>
                                                  </div>
                                                </section>

                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else if (item.id === 'workflow-vfx') {
                                return (
                                  <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
                                    <div className="flex flex-col gap-3 min-h-0 overflow-visible lg:overflow-y-auto custom-scroll flex-1 lg:pr-1 lg:pb-1">
                                      <button 
                                        className="lg:hidden text-[#FF4500] hover:text-white flex items-center justify-center gap-2 font-mono text-[12px] uppercase font-bold w-full bg-[#FF4500]/10 px-4 py-3 rounded-[2px] border border-[#FF4500]/30 active:scale-95 transition-all mb-4"
                                        onClick={() => { setMobileViewMode('list'); document.querySelector('.terminal-modal')?.scrollTo({top: 0, behavior: 'instant'}); }}
                                      >
                                        <ArrowLeft size={12} />
                                        <span>Voltar para Lista</span>
                                      </button>

                                      {/* Header */}
                                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                         <span className="text-[10px] uppercase tracking-widest font-black text-[#FF4500] border border-[#FF4500]/25 px-1.5 py-0.5 bg-[#FF4500]/5 rounded-[1px]">
                                            REQUISITO: NANOBANANA 2 (FLOW)
                                         </span>
                                         {item.tags.map(t => (
                                           <span key={t} className="text-[10px] uppercase tracking-wider text-white/40 bg-white/5 px-1.5 py-0.5 rounded-[1px]">
                                              {t}
                                           </span>
                                         ))}
                                      </div>

                                      {/* The Main Expandable Card */}
                                      <div className="border border-cyan-400/25 rounded-[2px] bg-[#0A0A0A] overflow-clip shadow-[0_0_25px_rgba(0,240,255,0.08)]">
                                        {/* Card Header clickable to toggle expand */}
                                        <div 
                                          onClick={() => setIsWorkflowExpanded(!isWorkflowExpanded)}
                                          className="flex items-center justify-between p-4 bg-black/40 border-b border-cyan-400/10 cursor-pointer hover:bg-black/60 transition-all select-none"
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                            <span className="font-mono text-[11px] sm:text-[12.5px] font-black tracking-widest text-cyan-400 uppercase">
                                              {item.title}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-[7.5px] font-mono tracking-wider text-white/30 uppercase hidden sm:inline">
                                              {isWorkflowExpanded ? '[ CLIQUE PARA RECOLHER ]' : '[ CLIQUE PARA EXPANDIR ]'}
                                            </span>
                                            {isWorkflowExpanded ? <ChevronDown size={14} className="text-cyan-400" /> : <ChevronRight size={14} className="text-cyan-400" />}
                                          </div>
                                        </div>

                                        {/* Animated Content */}
                                        <AnimatePresence initial={false}>
                                          {isWorkflowExpanded && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.25, ease: "easeInOut" }}
                                              className="overflow-clip bg-[#0A0A0A]"
                                            >
                                              <div className="p-4 space-y-6 text-left border-t border-white/5 font-mono">
                                                
                                                {/* 1. GUIA RÁPIDO */}
                                                <section className="space-y-4 border-l-2 border-cyan-400/60 pl-3">
                                                  <div>
                                                    <h4 className="text-[12.5px] font-black tracking-widest text-white uppercase mb-2">
                                                      1. GUIA RÁPIDO DE EXECUÇÃO (PASSO A PASSO)
                                                    </h4>
                                                    <div className="space-y-1.5 text-[11.5px] sm:text-[12px] leading-relaxed text-white/70">
                                                      <p><strong className="text-cyan-400">1. Seleção de Motor:</strong> Ative o modelo nanobanana 2.</p>
                                                      <p><strong className="text-cyan-400">2. Proporção (Aspect Ratio):</strong> Configure a saída estritamente para 3:4 (formato retrato padrão). Se ignorado, o mapeamento do rosto pode ser achatado.</p>
                                                      <p><strong className="text-cyan-400">3. Inserção de Links:</strong> Substitua as tags [LINK IMAGE PERSONAL] (rosto do cliente/modelo) e [LINK IMAGEM BASE] (cenário/pose desejada) por URLs limpas.</p>
                                                      <p><strong className="text-cyan-400">4. Volume de Geração:</strong> Configure o lote para 3 gerações (3x).</p>
                                                      <p><strong className="text-cyan-400">5. Seleção (Cherry-Picking):</strong> O sistema criará micro-variações. Salve apenas a imagem que capturou perfeitamente o formato dos olhos e as linhas de expressão da pessoa original.</p>
                                                    </div>
                                                  </div>
                                                  <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
                                                    <a href="https://tensor.art/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-cyan-400/10 border border-cyan-400/30 hover:bg-cyan-400/20 hover:border-cyan-400/50 text-cyan-400 text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                      <ExternalLink size={10} />
                                                      NanoBanana 2 (Tensor.art)
                                                    </a>
                                                    <a href="https://cloudinary.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                      <ExternalLink size={10} />
                                                      Cloudinary
                                                    </a>
                                                  </div>
                                                </section>

                                                {/* 2. PROMPTS UNIVERSAIS */}
                                                <section className="space-y-5">
                                                  <h4 className="text-[12.5px] font-black tracking-widest text-cyan-400 uppercase border-b border-white/5 pb-1">
                                                    2. PROMPTS UNIVERSAIS DE PRODUÇÃO
                                                  </h4>

                                                  {/* TEMPLATE 1 */}
                                                  <div className="space-y-2">
                                                    <div className="text-[10px] font-black tracking-wider text-white uppercase flex items-center justify-between">
                                                      <span>🟢 TEMPLATE 1: Uso Geral e Correção de Escala (Anti-Bobblehead)</span>
                                                    </div>
                                                    <p className="text-[9px] text-white/40 uppercase">Uso: Para 90% das cenas. Força a IA a reduzir o rosto da pessoa para caber perfeitamente no corpo da imagem base.</p>
                                                    
                                                    <div className="relative group">
                                                      <button
                                                        onClick={() => {
                                                          const promptText = `/imagine prompt: Award-winning high-fashion editorial photography, flawless VFX-grade digital composite. Transfer the EXACT SOURCE IDENTITY from [LINK IMAGE PERSONAL] onto the composition, pose, and proportions of the BASE IMAGE from [LINK IMAGEM BASE].\n\nSOURCE IDENTITY (ABSOLUTE LIKENESS LOCK): Clone the exact biometric likeness, specific skin tone, and unique facial features from the source photo. Do NOT generate a generic AI face. Preserve all natural smile lines, eye shapes, and anatomical asymmetry.\n\nCRITICAL VFX & ADAPTATION PROTOCOLS:\n1. Strict Anatomical Scaling: The new head MUST match the delicate scale of the base subject. Scale down facial features to fit flawlessly onto the neck of the base body. Do NOT enlarge the face (Anti-Bobblehead).\n2. Thermal Lighting Override: Apply the source's exact complexion, color-graded EXACTLY by the ambient lighting and temperature of the base scene. Specular highlights must reflect the environmental light physics.\n3. Dynamic Hair Replacement: Erase base hair entirely. Integrate the source identity's hair style and volume, scaled proportionally, obeying gravity and seamlessly interacting with the body pose. --ar 3:4`;
                                                          handleCopy(promptText, 'vfx-template-1');
                                                        }}
                                                        className="absolute top-2 right-2 z-10 px-3 py-1.5 bg-black/95 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-[10px] sm:text-[10.5px] font-mono font-bold text-white uppercase tracking-wider rounded-[1px] transition-all px-3 py-1.5"
                                                      >
                                                        {copiedId === 'vfx-template-1' ? "[ COPIADO✓ ]" : "[ COPIAR PROMPT ]"}
                                                      </button>
                                                      <pre className="p-3 bg-black border border-white/5 rounded-[1px] text-[11.5px] sm:text-[12px] leading-relaxed text-[#00F0FF] overflow-x-auto overflow-y-auto max-h-64 select-text">
                                                        <code>
{`/imagine prompt: Award-winning high-fashion editorial photography, flawless VFX-grade digital composite. Transfer the EXACT SOURCE IDENTITY from [LINK IMAGE PERSONAL] onto the composition, pose, and proportions of the BASE IMAGE from [LINK IMAGEM BASE].

SOURCE IDENTITY (ABSOLUTE LIKENESS LOCK): Clone the exact biometric likeness, specific skin tone, and unique facial features from the source photo. Do NOT generate a generic AI face. Preserve all natural smile lines, eye shapes, and anatomical asymmetry. 

CRITICAL VFX & ADAPTATION PROTOCOLS:
1. Strict Anatomical Scaling: The new head MUST match the delicate scale of the base subject. Scale down facial features to fit flawlessly onto the neck of the base body. Do NOT enlarge the face (Anti-Bobblehead).
2. Thermal Lighting Override: Apply the source's exact complexion, color-graded EXACTLY by the ambient lighting and temperature of the base scene. Specular highlights must reflect the environmental light physics.
3. Dynamic Hair Replacement: Erase base hair entirely. Integrate the source identity's hair style and volume, scaled proportionally, obeying gravity and seamlessly interacting with the body pose. --ar 3:4`}
                                                        </code>
                                                      </pre>
                                                    </div>
                                                  </div>

                                                  {/* TEMPLATE 2 */}
                                                  <div className="space-y-2 mt-4">
                                                    <div className="text-[10px] font-black tracking-wider text-white uppercase flex items-center justify-between">
                                                      <span>🔴 TEMPLATE 2: Mestre de Oclusão (Objetos no Primeiro Plano)</span>
                                                    </div>
                                                    <p className="text-[9px] text-white/40 uppercase">Uso: Apenas para cenas onde o rosto base está parcialmente coberto (óculos, mãos, texturas densas, golas, flores).</p>

                                                    <div className="relative group">
                                                      <button
                                                        onClick={() => {
                                                          const promptText = `/imagine prompt: Award-winning high-fashion editorial photography, flawless VFX-grade digital composite. Transfer the EXACT SOURCE IDENTITY from [LINK IMAGE PERSONAL] onto the composition of the BASE IMAGE from [LINK IMAGEM BASE].\n\nSOURCE IDENTITY (ABSOLUTE LIKENESS LOCK): Clone the exact biometric likeness, specific skin tone, and unique facial features from the source photo. Do NOT generate a generic AI face. Preserve natural anatomy.\n\nCRITICAL OCCLUSION & DEPTH PROTOCOLS:\n1. Extreme Depth Preservation: The BASE IMAGE features prominent foreground objects covering or framing the face. These elements MUST remain completely untouched and in their exact position. Render the source identity's features strictly BEHIND these objects. \n2. Reflection & Shadow Lock: Maintain all reflections, micro-shadows, and lens distortions cast by the foreground objects onto the new skin.\n3. Lighting Sync: Seamlessly integrate the source complexion with the environmental lighting of the base scene. \n4. Hair Integration: Integrate the source's hair naturally into the environment, falling behind any foreground obstacles as required by the physical space. --ar 3:4`;
                                                          handleCopy(promptText, 'vfx-template-2');
                                                        }}
                                                        className="absolute top-2 right-2 z-10 px-3 py-1.5 bg-black/95 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-[10px] sm:text-[10.5px] font-mono font-bold text-white uppercase tracking-wider rounded-[1px] transition-all px-3 py-1.5"
                                                      >
                                                        {copiedId === 'vfx-template-2' ? "[ COPIADO✓ ]" : "[ COPIAR PROMPT ]"}
                                                      </button>
                                                      <pre className="p-3 bg-black border border-white/5 rounded-[1px] text-[11.5px] sm:text-[12px] leading-relaxed text-red-400 overflow-x-auto overflow-y-auto max-h-64 select-text">
                                                        <code>
{`/imagine prompt: Award-winning high-fashion editorial photography, flawless VFX-grade digital composite. Transfer the EXACT SOURCE IDENTITY from [LINK IMAGE PERSONAL] onto the composition of the BASE IMAGE from [LINK IMAGEM BASE].

SOURCE IDENTITY (ABSOLUTE LIKENESS LOCK): Clone the exact biometric likeness, specific skin tone, and unique facial features from the source photo. Do NOT generate a generic AI face. Preserve natural anatomy.

CRITICAL OCCLUSION & DEPTH PROTOCOLS:
1. Extreme Depth Preservation: The BASE IMAGE features prominent foreground objects covering or framing the face. These elements MUST remain completely untouched and in their exact position. Render the source identity's features strictly BEHIND these objects. 
2. Reflection & Shadow Lock: Maintain all reflections, micro-shadows, and lens distortions cast by the foreground objects onto the new skin.
3. Lighting Sync: Seamlessly integrate the source complexion with the environmental lighting of the base scene. 
4. Hair Integration: Integrate the source's hair naturally into the environment, falling behind any foreground obstacles as required by the physical space. --ar 3:4`}
                                                        </code>
                                                      </pre>
                                                    </div>
                                                  </div>

                                                </section>
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else if (item.id === 'workflow-deploy') {
                                return (
                                  <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
                                    <div className="flex flex-col gap-3 min-h-0 overflow-visible lg:overflow-y-auto custom-scroll flex-1 lg:pr-1 lg:pb-1">
                                      <button 
                                        className="lg:hidden text-[#FF4500] hover:text-white flex items-center justify-center gap-2 font-mono text-[12px] uppercase font-bold w-full bg-[#FF4500]/10 px-4 py-3 rounded-[2px] border border-[#FF4500]/30 active:scale-95 transition-all mb-4"
                                        onClick={() => { setMobileViewMode('list'); document.querySelector('.terminal-modal')?.scrollTo({top: 0, behavior: 'instant'}); }}
                                      >
                                        <ArrowLeft size={12} />
                                        <span>Voltar para Lista</span>
                                      </button>

                                      {/* Header */}
                                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                         <span className="text-[10px] uppercase tracking-widest font-black text-purple-500 border border-purple-500/25 px-1.5 py-0.5 bg-purple-500/5 rounded-[1px]">
                                            REQUISITO: NAVEGADOR OU PC
                                         </span>
                                         {item.tags.map(t => (
                                           <span key={t} className="text-[10px] uppercase tracking-wider text-white/40 bg-white/5 px-1.5 py-0.5 rounded-[1px]">
                                              {t}
                                           </span>
                                         ))}
                                      </div>

                                      {/* The Main Expandable Card */}
                                      <div className="border border-purple-500/25 rounded-[2px] bg-[#0A0A0A] overflow-clip shadow-[0_0_25px_rgba(168,85,247,0.08)]">
                                        <div 
                                          onClick={() => setIsWorkflowExpanded(!isWorkflowExpanded)}
                                          className="flex items-center justify-between p-4 bg-black/40 border-b border-purple-500/10 cursor-pointer hover:bg-black/60 transition-all select-none"
                                        >
                                          <div className="flex items-center gap-2.5">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                            <span className="font-mono text-[11px] sm:text-[12.5px] font-black tracking-widest text-purple-500 uppercase">
                                              {item.title}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-[7.5px] font-mono tracking-wider text-white/30 uppercase hidden sm:inline">
                                              {isWorkflowExpanded ? '[ CLIQUE PARA RECOLHER ]' : '[ CLIQUE PARA EXPANDIR ]'}
                                            </span>
                                            {isWorkflowExpanded ? <ChevronDown size={14} className="text-purple-500" /> : <ChevronRight size={14} className="text-purple-500" />}
                                          </div>
                                        </div>

                                        {/* Animated Content */}
                                        <AnimatePresence initial={false}>
                                          {isWorkflowExpanded && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: "auto", opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.25, ease: "easeInOut" }}
                                              className="overflow-clip bg-[#0A0A0A]"
                                            >
                                              <div className="p-4 space-y-6 text-left border-t border-white/5 font-mono">
                                                
                                                {/* LINKS ÚTEIS */}
                                                <section className="space-y-4 border-l-2 border-purple-500/60 pl-3">
                                                  <div>
                                                    <h4 className="text-[12.5px] font-black tracking-widest text-white uppercase mb-2">
                                                      LINKS OFICIAIS DAS FERRAMENTAS & MODELOS
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2 pt-1">
                                                      <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#FF4500]/10 border border-[#FF4500]/30 hover:bg-[#FF4500]/20 text-[#FF4500] text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                        <ExternalLink size={10} /> Gemini (AI Studio)
                                                      </a>
                                                      <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-orange-400/10 border border-orange-400/30 hover:bg-orange-400/20 text-orange-400 text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                        <ExternalLink size={10} /> Claude (Anthropic)
                                                      </a>
                                                      <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-green-400/10 border border-green-400/30 hover:bg-green-400/20 text-green-400 text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                        <ExternalLink size={10} /> OpenAI (ChatGPT)
                                                      </a>
                                                      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/10 border border-white/30 hover:bg-white/20 text-white text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                        <ExternalLink size={10} /> GitHub
                                                      </a>
                                                      <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/10 border border-white/30 hover:bg-white/20 text-white text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                        <ExternalLink size={10} /> Vercel
                                                      </a>
                                                      <a href="https://idx.dev/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-400 text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2 gap-1.5 transition-all">
                                                        <ExternalLink size={10} /> Baixar Antigravity IDE (PC)
                                                      </a>
                                                    </div>
                                                  </div>
                                                </section>

                                                {/* FLUXO DE PUBLICAÇÃO */}
                                                <section className="space-y-4 border-l-2 border-purple-500/60 pl-3">
                                                  <div>
                                                    <h4 className="text-[12.5px] font-black tracking-widest text-purple-400 uppercase mb-2">
                                                      O PIPELINE DE PUBLICAÇÃO (DESKTOP & CELULAR)
                                                    </h4>
                                                    <div className="space-y-2 text-[11.5px] sm:text-[12px] leading-relaxed text-white/70 uppercase">
                                                      <p><strong className="text-white">1. Geração e Construção:</strong> Após montar toda interface no Google AI Studio / Antigravity, garanta que seu app construiu com sucesso.</p>
                                                      <p><strong className="text-white">2. Sincronização e Download:</strong> Você pode exportar seu projeto conectando diretamente a uma conta do GitHub ou baixando o arquivo ZIP.</p>
                                                      <p><strong className="text-white">3. (Opcional) Edição no Antigravity IDE:</strong> Se estiver no PC de desenvolvimento físico, descompacte o arquivo zipado ou clone de volta o github repo dentro da sua IDE Antigravity ou VS Code para manipulação fina, commits ou reínicio com outros modelos acoplados.</p>
                                                      <p><strong className="text-white">4. Push Final:</strong> Publique as últimas alterações para um Repositório GitHub pela interface web, IDE ou terminal.</p>
                                                      <p><strong className="text-white">5. Vercel Deploy:</strong> Em qualquer lugar (celular ou PC), conecte-se na Vercel e faça `Import GitHub Repository` do seu projeto. A Vercel auto-configura e publica seu Link com SSL. O deploy subirá imediatamente!</p>
                                                    </div>
                                                  </div>
                                                </section>

                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
                                  <div className="flex flex-col gap-3 min-h-0 overflow-visible lg:overflow-y-auto custom-scroll flex-1 lg:pr-1 lg:pb-1">
                                    <button 
                                      className="lg:hidden text-[#FF4500] hover:text-white flex items-center justify-center gap-2 font-mono text-[12px] uppercase font-bold w-full bg-[#FF4500]/10 px-4 py-3 rounded-[2px] border border-[#FF4500]/30 active:scale-95 transition-all mb-4"
                                      onClick={() => { setMobileViewMode('list'); document.querySelector('.terminal-modal')?.scrollTo({top: 0, behavior: 'instant'}); }}
                                    >
                                      <ArrowLeft size={12} />
                                      <span>Voltar para Lista</span>
                                    </button>

                                    {/* Dual View Render Frame of Prompt */}
                                    {renderPromptThumbnail(item.id)}
                                    
                                    <div>
                                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                         <span className="text-[10px] uppercase tracking-widest font-black text-[#FF4500] border border-[#FF4500]/25 px-1.5 py-0.5 bg-[#FF4500]/5 rounded-[1px]">
                                            MODELO IDEAL: {item.idealModel}
                                         </span>
                                         {item.tags.map(t => (
                                           <span key={t} className="text-[10px] uppercase tracking-wider text-white/40 bg-white/5 px-1.5 py-0.5 rounded-[1px]">
                                              {t}
                                           </span>
                                         ))}
                                      </div>
                                      <h3 className="text-[16px] sm:text-sm font-bold text-white uppercase tracking-wide leading-tight">{item.title}</h3>
                                      <p className="hidden sm:block text-[11.5px] text-white/50 leading-relaxed font-sans mt-1">
                                        {item.description}
                                      </p>
                                    </div>

                                    {/* Editable Prompt Box Container */}
                                    <div className="relative bg-black/60 border border-white/5 p-2.5 rounded-[1px] font-mono text-[12px] sm:text-[11px] leading-relaxed text-white/95 select-all max-h-56 sm:max-h-[110px] overflow-visible lg:overflow-y-auto custom-scroll break-words">
                                      {item.prompt}
                                    </div>
                                    
                                    {/* Action instructions how to use */}
                                    <div className="hidden sm:block text-[11px] text-white/40 leading-relaxed font-sans border-l border-[#FF4500]/40 pl-2">
                                      <strong className="text-[#FF4500] font-mono font-black text-[9px] block uppercase">// INSTRUÇÕES PRÁTICAS:</strong>
                                      {item.howToUse}
                                    </div>
                                  </div>

                                  <div className="flex flex-col gap-2 flex-shrink-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      <button
                                        onClick={() => handleCopy(item.prompt, item.id)}
                                        className={`cursor-target py-3 sm:py-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 ${
                                          isCopied 
                                            ? 'bg-[#FF4500] border-[#FF4500] text-white animate-pulse' 
                                            : 'bg-black/45 border-white/10 hover:border-[#FF4500]/50 hover:bg-[#FF4500]/5 text-white/80 hover:text-white'
                                        }`}
                                      >
                                        {isCopied ? <Check size={10} /> : <Copy size={10} />}
                                        <span>{isCopied ? "COPIADO!" : "COPIAR PROMPT"}</span>
                                      </button>

                                      <button
                                        onClick={() => triggerPromptTutorial(item.id)}
                                        className={`cursor-target py-3 sm:py-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 ${
                                          isTutorialActive
                                            ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-white'
                                            : 'bg-black/45 border-white/10 hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/5 text-cyan-400'
                                        }`}
                                      >
                                        <Play size={10} className="animate-pulse" />
                                        <span>DEMO GUIA</span>
                                      </button>
                                    </div>

                                    {/* Immersive simulated mini chat log */}
                                    <AnimatePresence>
                                      {isTutorialActive && (
                                        <motion.div 
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="overflow-clip border border-[#00F0FF]/30 bg-black/85 rounded-[1px] p-2.5 mt-1 text-[10px]"
                                        >
                                          <div className="flex justify-between items-center text-[7px] font-mono tracking-widest text-[#00F0FF] mb-1.5 border-b border-white/5 pb-1 select-none">
                                            <span>MOCKUP CONSOLE // IA RESPONDENDO PROMPT</span>
                                            <button onClick={() => setActivePromptTutorialId(null)} className="hover:text-white">
                                              <X size={8} />
                                            </button>
                                          </div>

                                          {tutorialIsRunning ? (
                                            <div className="py-2.5 flex flex-col items-center justify-center space-y-1.5 select-none">
                                              <span className="text-[8.5px] text-[#00F0FF] animate-pulse">PROCESSANDO COMANDO CIBERNÉTICO...</span>
                                              <div className="w-full h-1 bg-white/10 rounded overflow-clip">
                                                <div className="h-full bg-[#00F0FF]" style={{ width: `${tutorialProgress}%` }}></div>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="space-y-2">
                                              <div className="flex items-start gap-1.5 text-slate-350">
                                                <Bot size={12} className="text-[#00F0FF] shrink-0 mt-0.5" />
                                                <div className="bg-[#00F0FF]/5 ring-1 ring-[#00F0FF]/15 rounded p-1.5 text-[9.5px]">
                                                  <span className="text-[#00F0FF] font-bold block mb-0.5 uppercase">DIRETRIZ DE INSTALAÇÃO:</span>
                                                  Cole no local correto da I.A. Adicione proporções verticais <span className="text-[#00F0FF]">--ar 9:16</span> para wallpapers e displays móveis!
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>

                                </div>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}

                      {/* CATEGORY 2: GUIA DE MODELOS DE I.A. */}
                      {activeTab === 'models' && (
                        <motion.div 
                          key="models"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full min-h-0"
                        >
                          {/* Models Left selector list */}
                          <div className={`col-span-1 lg:col-span-4 flex-col border border-white/5 bg-[#0B1221]/50 p-2.5 rounded-[1px] h-auto lg:h-full lg:min-h-0 ${mobileViewMode === 'detail' ? 'hidden lg:flex' : 'flex mobile-slide-list'}`}>
                            <div className="text-[8.5px] text-white/40 tracking-widest uppercase mb-2 select-none border-b border-white/5 pb-1 flex justify-between flex-shrink-0">
                              <span>SELECIONE UM MODELO IA</span>
                              <span className="text-orange-500 font-bold">[{filteredModels.length}]</span>
                            </div>
                            <div className="flex-1 flex flex-col gap-1.5 overflow-visible lg:overflow-y-auto custom-scroll pr-1">
                              {filteredModels.map((model) => {
                                const isSelected = selectedModelId === model.id;
                                return (
                                  <button
                                    key={model.id}
                                    onClick={() => { runModelPlaygroundDemo(model.id, 'code_design'); setMobileViewMode('detail'); document.querySelector('.terminal-modal')?.scrollTo({top: 0, behavior: 'smooth'}); }}
                                    className={`relative p-3 sm:p-2 border text-left flex items-center gap-2 rounded-[2px] transition-all duration-150 active:scale-98 select-target ${
                                      isSelected
                                        ? 'border-[#FF4500] bg-gradient-to-r from-[#FF4500]/10 to-orange-500/5'
                                        : 'border-white/5 bg-black/35 hover:border-white/10 hover:bg-black/50 text-white/50'
                                    }`}
                                  >
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                                      isSelected ? 'border-[#FF4500] bg-[#FF4500]/10 text-[#FF4500]' : 'border-white/10 bg-white/5 text-white/40'
                                    }`}>
                                      {model.name.includes("Claude") ? "Cl" : model.name.includes("Gemini") ? "Ge" : model.name.includes("GPT") ? "GP" : model.name.includes("Flux") ? "Fl" : "IA"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-[10px] font-black uppercase text-white tracking-wider truncate block leading-none">{model.name}</span>
                                      <span className="text-[7.5px] text-white/30 tracking-wider truncate block mt-0.5 uppercase">Best: {model.bestFor.slice(0, 30)}...</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Model Details Right Card */}
                          <div className={`col-span-1 lg:col-span-8 border border-white/10 bg-[#070D18]/90 p-4 rounded-[1px] h-auto lg:h-full lg:min-h-0 overflow-clip flex-col justify-start lg:justify-between ${mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex mobile-slide-detail'}`}>
                            {(() => {
                              const activeModel = filteredModels.find(m => m.id === selectedModelId) || filteredModels[0] || ecosystemData.models[0];
                              if (!activeModel) return null;
                              const isCopied = copiedId === activeModel.id;
                              return (
                                <div className="flex-1 flex flex-col justify-between gap-3 min-h-0">
                                  <div className="flex flex-col gap-3 min-h-0 overflow-visible lg:overflow-y-auto custom-scroll flex-1 lg:pr-1 lg:pb-1">
                                    <button 
                                      className="lg:hidden text-[#FF4500] hover:text-white flex items-center justify-center gap-2 font-mono text-[12px] uppercase font-bold w-full bg-[#FF4500]/10 px-4 py-3 rounded-[2px] border border-[#FF4500]/30 active:scale-95 transition-all mb-4"
                                      onClick={() => { setMobileViewMode('list'); document.querySelector('.terminal-modal')?.scrollTo({top: 0, behavior: 'instant'}); }}
                                    >
                                      <ArrowLeft size={12} />
                                      <span>Voltar para Lista</span>
                                    </button>

                                    <div className="border-b border-white/5 pb-2">
                                      <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-[8px] font-bold uppercase tracking-widest bg-[#FF4500] px-1.5 py-0.5 rounded-[1px]">TEMPLATE ATIVO</span>
                                        <span className="text-[8px] text-white/35 font-mono">// CONEXÃO DIRETA</span>
                                      </div>
                                      <h4 className="text-[18px] sm:text-base font-bold text-white uppercase tracking-wide leading-tight">{activeModel.name}</h4>
                                      <p className="hidden sm:block text-[11px] text-slate-350 leading-relaxed font-sans mt-0.5">{activeModel.bestFor}</p>
                                    </div>

                                    {/* Pros & Cons list bullet structures */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px] sm:text-[10.5px]">
                                      <div className="bg-black/30 p-2.5 border border-white/5 rounded-[1px]">
                                        <span className="text-[8.5px] font-bold text-[#00F0FF] tracking-wider block mb-1.5 uppercase">// MELHOR PERFORMADO:</span>
                                        <ul className="space-y-1 text-white/70 font-sans">
                                          {activeModel.pros.map((p, idx) => (
                                            <li key={idx} className="flex gap-1.5 items-start leading-snug">
                                              <span className="text-[#00F0FF] font-bold">✓</span>
                                              <span>{p}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      <div className="bg-black/30 p-2.5 border border-white/5 rounded-[1px]">
                                        <span className="text-[8.5px] font-bold text-white/30 tracking-wider block mb-1.5 uppercase">// RESTRIÇÃO & FOCO:</span>
                                        <ul className="space-y-1 text-white/50 font-sans">
                                          {activeModel.cons.map((p, idx) => (
                                            <li key={idx} className="flex gap-1.5 items-start leading-snug">
                                              <span className="text-white/30 font-bold">×</span>
                                              <span>{p}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>

                                    {/* Interactive Simulation Sandbox CLI */}
                                    <div className="bg-[#020408] border border-[#00F0FF]/15 rounded p-2.5 text-[12px] sm:text-[10.5px] flex flex-col space-y-2">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-white/5 select-none font-mono">
                                        <span className="text-[9px] text-[#00F0FF] font-bold uppercase tracking-widest flex items-center gap-1">
                                          <MessageSquare size={10} />
                                          <span>SIMULADOR DE CHAT INTERATIVO</span>
                                        </span>
                                      </div>

                                      <div className="flex flex-wrap gap-1.5">
                                        <button 
                                          onClick={() => runModelPlaygroundDemo(activeModel.id, 'code_design')}
                                          className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider rounded border transition-all active:scale-95 ${
                                            playgroundInput === 'code_design' ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-white' : 'border-white/5 bg-white/5 text-white/40'
                                          }`}
                                        >
                                          &gt;_ CÓDIGO REACT
                                        </button>
                                        <button 
                                          onClick={() => runModelPlaygroundDemo(activeModel.id, 'copy')}
                                          className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider rounded border transition-all active:scale-95 ${
                                            playgroundInput === 'copy' ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-white' : 'border-white/5 bg-white/5 text-white/40'
                                          }`}
                                        >
                                          &gt;_ HUMANIZAR COPY
                                        </button>
                                        <button 
                                          onClick={() => runModelPlaygroundDemo(activeModel.id, 'context')}
                                          className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider rounded border transition-all active:scale-95 ${
                                            playgroundInput === 'context' ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-white' : 'border-white/5 bg-white/5 text-white/40'
                                          }`}
                                        >
                                          &gt;_ DIAGRAMAR LOGS
                                        </button>
                                      </div>

                                      <div className="bg-black/80 p-2.5 h-28 rounded border border-white/5 font-mono overflow-visible lg:overflow-y-auto custom-scroll relative">
                                        {isTypingPlayground && (
                                          <div className="absolute top-1 right-1 bg-[#FF4500]/10 border border-[#FF4500]/25 text-[#FF4500] text-[7.5px] py-0.5 px-1.5 rounded animate-pulse">
                                            PROCESSANDO...
                                          </div>
                                        )}
                                        <pre className="text-[10px] leading-relaxed text-slate-300 whitespace-pre-wrap select-all select-text break-all">
                                          <code>{playgroundOutputText}</code>
                                        </pre>
                                        {isTypingPlayground && <span className="inline-block w-1 h-3.5 bg-cyan-400 animate-[blink_0.8s_infinite]"></span>}
                                      </div>
                                    </div>

                                    {/* Meta Instruction code to copy */}
                                    <div className="bg-[#051121]/50 border border-[#00F0FF]/15 p-2.5 rounded-[1px]">
                                      <span className="text-[8.5px] text-[#FF4500] font-black block mb-1 uppercase font-mono">[ DIRECT DIRETIVA SISTEMA DE ELITE ]</span>
                                      <div className="text-[10px] leading-relaxed text-slate-300 font-mono bg-black/50 p-2 border border-white/5 rounded max-h-16 overflow-visible lg:overflow-y-auto custom-scroll selection:bg-[#FF4500]">
                                        {activeModel.metaPrompt}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-1 pt-1.5 border-t border-white/5">
                                    <button
                                      onClick={() => handleCopy(activeModel.metaPrompt, activeModel.id)}
                                      className={`cursor-target py-3 sm:py-2 px-3 font-mono text-[9.5px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 w-full sm:w-auto ${
                                        isCopied 
                                          ? 'bg-[#00F0FF] border-[#00F0FF] text-black animate-pulse' 
                                          : 'bg-black/60 border-white/10 hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/5 text-white/80 hover:text-white'
                                      }`}
                                    >
                                      {isCopied ? <Check size={10} /> : <Copy size={10} />}
                                      <span>{isCopied ? "INSTRIÇÃO COPIADA!" : "COPIAR INSTRUÇÕES DE SISTEMA"}</span>
                                    </button>
                                    <span className="text-[8px] text-white/20 uppercase font-mono text-right hidden sm:inline select-none">
                                      Copie para forçar respostas diretas e lógicas na I.A.
                                    </span>
                                  </div>

                                </div>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}

                      </AnimatePresence>
             </div>
          </div>
        </div>

        {/* HUD Frame Footer */}
        <footer className="mt-4 pt-3.5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[8.5px] tracking-widest text-white/20 uppercase font-mono flex-shrink-0">
          <span>INUX FORTY7 ECOSYSTEM // COPYRIGHT {new Date().getFullYear()}</span>
          <div className="flex gap-4 mt-2 sm:mt-0 select-none">
             <span>SECURE ENGINE SECURITY LEVEL: 0x99A</span>
             <span className="hidden sm:inline">|</span>
             <span>POWERED BY ANTIGRAVITY GEN-AI</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default TerminalPanel;
