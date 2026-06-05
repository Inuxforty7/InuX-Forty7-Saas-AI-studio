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
  ArrowLeft,
  MessageSquare,
  Smartphone,
  Eye,
  Bot
} from 'lucide-react';
import { ecosystemData, PromptItem, ModelComparison, CreationGuide, AutomationTool, ProductivityHack } from '../data/ecosystem';

const TerminalPanel = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'prompts' | 'models' | 'creations' | 'automations' | 'productivity'>('prompts');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string>('');
  
  // Immersive Split Selection states
  const [selectedPromptId, setSelectedPromptId] = useState<string>('img-01');
  const [selectedModelId, setSelectedModelId] = useState<string>('mod-01');
  const [selectedCreationId, setSelectedCreationId] = useState<string>('cre-01');
  const [selectedAutomationId, setSelectedAutomationId] = useState<string>('aut-01');
  const [selectedProductivityId, setSelectedProductivityId] = useState<string>('pro-01');
  
  // Mobile responsive layout mode: show list or details
  const [mobileViewMode, setMobileViewMode] = useState<'list' | 'detail'>('list');
  
  // Interactive UI states for simulators
  const [activePromptTutorialId, setActivePromptTutorialId] = useState<string | null>(null);
  const [tutorialProgress, setTutorialProgress] = useState<number>(0);
  const [tutorialIsRunning, setTutorialIsRunning] = useState<boolean>(false);
  
  // Live Playground Model simulator states
  const [selectedPlaygroundModel, setSelectedPlaygroundModel] = useState<string>('mod-01');
  const [playgroundInput, setPlaygroundInput] = useState<string>('code_design');
  const [playgroundOutputText, setPlaygroundOutputText] = useState<string>('');
  const [isTypingPlayground, setIsTypingPlayground] = useState<boolean>(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Live Creations states
  const [activeCreationDemoId, setActiveCreationDemoId] = useState<string | null>(null);
  const [threeJsSpeed, setThreeJsSpeed] = useState<number>(1);
  const [clicksCount, setClicksCount] = useState<number>(0);
  
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
    { id: 'prompts', label: 'PACK CINEMATOGRÁFICO', icon: <ImageIcon size={14} />, desc: 'Comandos visuais de elite' },
    { id: 'models', label: 'GUIA DA ELITE (I.A. MODELS)', icon: <Cpu size={14} />, desc: 'Curadoria de modelos líderes' },
    { id: 'creations', label: 'MÁQUINA DE CRIAÇÃO (3D/APP)', icon: <Globe size={14} />, desc: 'Blueprints de 3D, Mobile e Vídeo' },
    { id: 'automations', label: 'COFRE DE AUTOMOTORES', icon: <Scissors size={14} />, desc: 'Automações pragmáticas copy-paste' },
    { id: 'productivity', label: 'HACKS DE PRODUTIVIDADE', icon: <Zap size={14} />, desc: 'Flutuação operacional direta' },
  ];

  // Search Filters
  const filteredPrompts = useMemo(() => {
    return ecosystemData.prompts.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const filteredModels = useMemo(() => {
    return ecosystemData.models.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.bestFor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredCreations = useMemo(() => {
    return ecosystemData.creations.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.promptToCopy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredAutomations = useMemo(() => {
    return ecosystemData.automations.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.codeToCopy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredProductivity = useMemo(() => {
    return ecosystemData.productivity.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.scenario.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.promptToCopy.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // If tab changes, let's auto-select first of search query
  useEffect(() => {
    setMobileViewMode('list');
    if (activeTab === 'prompts' && filteredPrompts.length > 0) {
      if (!filteredPrompts.some(p => p.id === selectedPromptId)) {
        setSelectedPromptId(filteredPrompts[0].id);
      }
    } else if (activeTab === 'models' && filteredModels.length > 0) {
      if (!filteredModels.some(m => m.id === selectedModelId)) {
        setSelectedModelId(filteredModels[0].id);
        setSelectedPlaygroundModel(filteredModels[0].id);
      }
    } else if (activeTab === 'creations' && filteredCreations.length > 0) {
      if (!filteredCreations.some(c => c.id === selectedCreationId)) {
        setSelectedCreationId(filteredCreations[0].id);
      }
    } else if (activeTab === 'automations' && filteredAutomations.length > 0) {
      if (!filteredAutomations.some(a => a.id === selectedAutomationId)) {
        setSelectedAutomationId(filteredAutomations[0].id);
      }
    } else if (activeTab === 'productivity' && filteredProductivity.length > 0) {
      if (!filteredProductivity.some(p => p.id === selectedProductivityId)) {
        setSelectedProductivityId(filteredProductivity[0].id);
      }
    }
  }, [activeTab, searchQuery]);

  // Prompt CSS visual thumbnails generator
  const renderPromptThumbnail = (id: string) => {
    switch (id) {
      case 'img-01': // Cyber-Noir High Fashion
        return (
          <div className="relative w-full h-24 rounded bg-[#030107] border border-white/5 overflow-hidden flex flex-col justify-between p-2 flex-shrink-0">
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
          <div className="relative w-full h-24 rounded bg-[#07070a] border border-white/5 overflow-hidden flex flex-col justify-between p-2 flex-shrink-0">
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
          <div className="relative w-full h-24 rounded bg-[#040810] border border-white/5 overflow-hidden flex flex-col justify-between p-2 flex-shrink-0">
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
          <div className="relative w-full h-24 rounded bg-[#080d16] border border-white/5 overflow-hidden flex flex-col justify-between p-2 flex-shrink-0">
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
      generatedAnswer = `--- MENSAGEM DO DIRETO DE CONVERSÃO // ${modelName} ---\n\n🚨 Pare de queimar dinheiro em tráfego com landing pages de 2012.\n\nSabe por que seu cliente clica no link e foge em 3 segundos?\nPelo cansaço visual. \n\nCopie nosso framework e assuma o controle da conversão agora.`;
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
    <div className="fixed inset-0 z-[100] bg-[#03070D] font-mono text-white flex flex-col overflow-hidden selection:bg-[#FF4500] selection:text-white terminal-modal">
      
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
      <div className="relative z-10 w-full max-w-[1500px] h-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col min-h-0 justify-between">
        
        {/* Top Header Controls with HUD branding */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-5 bg-[#FF4500] -skew-x-12 animate-pulse shadow-[0_0_10px_#FF4500]"></div>
            <div className="flex items-center gap-1.5">
               <span className="text-lg sm:text-xl font-bold tracking-widest text-white uppercase">INUX</span>
               <span className="text-lg sm:text-xl font-bold tracking-widest text-[#FF4500] drop-shadow-[0_0_10px_#FF4500] uppercase">FORTY7</span>
            </div>
            <span className="font-mono text-[8.5px] tracking-widest text-white/40 border border-white/5 px-2 py-0.5 ml-2 bg-white/5 uppercase rounded-[1px]">
               ECOSYSTEM v3.0 // ATIVO
            </span>
          </div>

          <button 
            onClick={onClose}
            className="cursor-target relative group px-5 py-2 border border-[#FF4500]/30 bg-transparent hover:bg-[#FF4500]/10 text-white/80 hover:text-white font-mono text-[11px] font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_12px_rgba(255,69,0,0.2)] active:scale-95"
          >
            <X size={12} className="text-[#FF4500]" />
            <span>[ FECHAR ACESSO ECOSSISTEMA ]</span>
          </button>
        </header>

        {/* Global HUD Stats Ribbon */}
        <div className="mb-4 border border-white/5 bg-[#080D18]/45 p-3 flex flex-wrap gap-y-2 gap-x-6 items-center justify-between text-[10.5px] tracking-wider text-white/40 relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF4500]/60"></div>
          <div className="flex items-center gap-2">
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
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-0 relative">
          
          {/* Mobile Category select tabs (horizontal slide) */}
          <div className="lg:hidden w-full flex overflow-x-auto gap-1.5 pb-2 pt-0.5 mb-1 flex-shrink-0 snap-x scrollbar-none scroll-smooth">
            {categories.map((cat, idx) => {
              const isActive = activeTab === cat.id;
              const mobileLabels: Record<string, string> = {
                prompts: "CINEMA 8K",
                models: "I.A. MODELS",
                creations: "CRIAR 3D",
                automations: "AUTO COFRE",
                productivity: "HACKS",
              };
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id as any);
                    setSearchQuery('');
                  }}
                  className={`snap-center shrink-0 flex items-center gap-1.5 px-3 py-2 border rounded-[2px] font-mono text-[10px] font-black uppercase tracking-wider transition-all duration-200 active:scale-95 ${
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

          {/* Left Sidebar Layout Navigation (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col min-h-0 h-full border border-white/10 bg-[#0B1221]/90 backdrop-blur-md p-4 relative shadow-2xl overflow-hidden justify-between">
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
                <div className="flex flex-col gap-2 overflow-y-auto custom-scroll pr-1 flex-1">
                    {categories.map((cat, idx) => {
                      const isActive = activeTab === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveTab(cat.id as any);
                            setSearchQuery('');
                          }}
                          className={`cursor-target group relative w-full text-left p-2.5 border transition-all duration-200 flex items-center gap-2 rounded-[2px] active:scale-95`}
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
                            <span className="text-[10px] font-bold tracking-wider uppercase leading-none mb-1">
                              {cat.label}
                            </span>
                            <span className="text-[7.5px] tracking-wide text-white/30 group-hover:text-white/50 transition-colors uppercase truncate select-none">
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
             <div className="border border-white/10 bg-[#0B1221]/80 backdrop-blur-md p-3 flex flex-col sm:flex-row gap-3 items-center justify-between flex-shrink-0 rounded-[1px]">
                <div className="relative w-full sm:max-w-md">
                   <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                   <input 
                     type="text" 
                     placeholder={`Pesquisar na guia ${categories.find(c=>c.id===activeTab)?.label}...`}
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-8 pr-8 py-2 bg-black/60 border border-white/5 rounded-[1px] font-mono text-[11px] text-white placeholder-white/35 focus:outline-none focus:border-[#FF4500] focus:shadow-[0_0_8px_rgba(255,69,0,0.15)] transition-all uppercase"
                   />
                   {searchQuery && (
                     <button 
                       onClick={() => setSearchQuery('')}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                     >
                       <X size={10} />
                     </button>
                   )}
                </div>

                <div className="text-[9.5px] text-white/30 uppercase tracking-widest text-right flex-shrink-0 font-medium">
                   Análise: <span className="text-[#FF4500] font-bold">
                    {activeTab === 'prompts' && filteredPrompts.length}
                    {activeTab === 'models' && filteredModels.length}
                    {activeTab === 'creations' && filteredCreations.length}
                    {activeTab === 'automations' && filteredAutomations.length}
                    {activeTab === 'productivity' && filteredProductivity.length}
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
                          <div className={`col-span-1 lg:col-span-4 flex-col border border-white/5 bg-[#0B1221]/50 p-2.5 rounded-[1px] h-full min-h-0 overflow-hidden ${mobileViewMode === 'detail' ? 'hidden lg:flex' : 'flex'}`}>
                            <div className="text-[8.5px] text-white/40 tracking-widest uppercase mb-2 select-none border-b border-white/5 pb-1 flex justify-between flex-shrink-0">
                              <span>SELECIONE O MODELO</span>
                              <span className="text-orange-500 font-bold">[{filteredPrompts.length}]</span>
                            </div>
                            <div className="flex-grow flex flex-col gap-1.5 overflow-y-auto custom-scroll pr-1">
                              {filteredPrompts.length === 0 ? (
                                <div className="text-center py-6 text-white/20 text-xs">Nenhum prompt encontrado</div>
                              ) : (
                                filteredPrompts.map((item) => {
                                  const isSelected = selectedPromptId === item.id;
                                  return (
                                    <button
                                      key={item.id}
                                      onClick={() => {
                                        setSelectedPromptId(item.id);
                                        setMobileViewMode('detail');
                                      }}
                                      className={`text-left p-2 border transition-all duration-150 flex flex-col rounded-[2px] active:scale-98 select-target ${
                                        isSelected 
                                          ? "border-[#FF4500] bg-[#FF4500]/10 text-white" 
                                          : "border-white/5 bg-black/35 text-white/50 hover:text-white"
                                      }`}
                                    >
                                      <span className="text-[10px] font-black tracking-wide uppercase truncate block leading-tight">{item.title}</span>
                                      <span className="text-[8px] text-white/35 uppercase mt-0.5 tracking-wider truncate">{item.idealModel}</span>
                                    </button>
                                  );
                                })
                              )}
                            </div>
                          </div>

                          {/* Inner Detail Card (Right side of split grid, taking 8 spans) */}
                          <div className={`col-span-1 lg:col-span-8 border border-white/10 bg-[#0B1221]/90 p-4 rounded-[1px] h-full flex-col min-h-0 justify-between overflow-y-auto custom-scroll ${mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex'}`}>
                            {(() => {
                              const item = filteredPrompts.find(p => p.id === selectedPromptId) || filteredPrompts[0] || ecosystemData.prompts[0];
                              if (!item) return <div className="text-center py-6 text-white/20 text-xs">Selecione um prompt analítico.</div>;
                              const isCopied = copiedId === item.id;
                              const isTutorialActive = activePromptTutorialId === item.id;
                              return (
                                <div className="flex-1 flex flex-col justify-between gap-4 h-full min-h-0">
                                  
                                  <div className="flex flex-col gap-3 min-h-0">
                                    <button 
                                      className="lg:hidden text-[#FF4500] hover:text-white flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold self-start bg-white/5 px-2 py-1.5 rounded-[1px] border border-white/5 active:scale-95 transition-all"
                                      onClick={() => setMobileViewMode('list')}
                                    >
                                      <ArrowLeft size={12} />
                                      <span>Voltar para Lista</span>
                                    </button>

                                    {/* Dual View Render Frame of Prompt */}
                                    {renderPromptThumbnail(item.id)}
                                    
                                    <div>
                                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                         <span className="text-[8.5px] uppercase tracking-widest font-black text-[#FF4500] border border-[#FF4500]/25 px-1.5 py-0.5 bg-[#FF4500]/5 rounded-[1px]">
                                            MODELO IDEAL: {item.idealModel}
                                         </span>
                                         {item.tags.map(t => (
                                           <span key={t} className="text-[8.5px] uppercase tracking-wider text-white/40 bg-white/5 px-1.5 py-0.5 rounded-[1px]">
                                              {t}
                                           </span>
                                         ))}
                                      </div>
                                      <h3 className="text-sm font-bold text-white uppercase tracking-wide leading-tight">{item.title}</h3>
                                      <p className="text-[11.5px] text-white/50 leading-relaxed font-sans mt-1">
                                        {item.description}
                                      </p>
                                    </div>

                                    {/* Editable Prompt Box Container */}
                                    <div className="relative bg-black/60 border border-white/5 p-2.5 rounded-[1px] font-mono text-[11px] leading-relaxed text-white/95 select-all max-h-[110px] overflow-y-auto custom-scroll break-words">
                                      {item.prompt}
                                    </div>
                                    
                                    {/* Action instructions how to use */}
                                    <div className="text-[11px] text-white/40 leading-relaxed font-sans border-l border-[#FF4500]/40 pl-2">
                                      <strong className="text-[#FF4500] font-mono font-black text-[9px] block uppercase">// INSTRUÇÕES PRÁTICAS:</strong>
                                      {item.howToUse}
                                    </div>
                                  </div>

                                  <div className="flex flex-col gap-2 flex-shrink-0">
                                    <div className="grid grid-cols-2 gap-2">
                                      <button
                                        onClick={() => handleCopy(item.prompt, item.id)}
                                        className={`cursor-target py-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 ${
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
                                        className={`cursor-target py-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 ${
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
                                          className="overflow-hidden border border-[#00F0FF]/30 bg-black/85 rounded-[1px] p-2.5 mt-1 text-[10px]"
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
                                              <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
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
                          <div className={`col-span-1 lg:col-span-4 flex-col border border-white/5 bg-[#0B1221]/50 p-2.5 rounded-[1px] h-full min-h-0 overflow-hidden ${mobileViewMode === 'detail' ? 'hidden lg:flex' : 'flex'}`}>
                            <div className="text-[8.5px] text-white/40 tracking-widest uppercase mb-2 select-none border-b border-white/5 pb-1 flex justify-between flex-shrink-0">
                              <span>SELECIONE O SISTEMA CHIP</span>
                              <span className="text-orange-500 font-bold">[{filteredModels.length}]</span>
                            </div>
                            <div className="flex-grow flex flex-col gap-1.5 overflow-y-auto custom-scroll pr-1">
                              {filteredModels.map((model) => {
                                const isSelected = selectedModelId === model.id;
                                return (
                                  <button
                                    key={model.id}
                                    onClick={() => {
                                      runModelPlaygroundDemo(model.id, 'code_design');
                                      setMobileViewMode('detail');
                                    }}
                                    className={`relative p-2 border text-left flex items-center gap-2 rounded-[2px] transition-all duration-150 active:scale-98 select-target ${
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
                          <div className={`col-span-1 lg:col-span-8 border border-white/10 bg-[#070D18]/90 p-4 rounded-[1px] h-full flex-col min-h-0 overflow-y-auto custom-scroll justify-between ${mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex'}`}>
                            {(() => {
                              const activeModel = filteredModels.find(m => m.id === selectedModelId) || filteredModels[0] || ecosystemData.models[0];
                              if (!activeModel) return null;
                              const isCopied = copiedId === activeModel.id;
                              return (
                                <div className="flex-1 flex flex-col justify-between gap-3 h-full min-h-0">
                                  
                                  <div className="flex flex-col gap-3 min-h-0">
                                    <button 
                                      className="lg:hidden text-[#FF4500] hover:text-white flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold self-start bg-white/5 px-2 py-1.5 rounded-[1px] border border-white/5 active:scale-95 transition-all w-fit mb-1"
                                      onClick={() => setMobileViewMode('list')}
                                    >
                                      <ArrowLeft size={12} />
                                      <span>Voltar para Lista</span>
                                    </button>

                                    <div className="border-b border-white/5 pb-2">
                                      <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-[8px] font-bold uppercase tracking-widest bg-[#FF4500] px-1.5 py-0.5 rounded-[1px]">TEMPLATE ATIVO</span>
                                        <span className="text-[8px] text-white/35 font-mono">// CONEXÃO DIRETA</span>
                                      </div>
                                      <h4 className="text-base font-bold text-white uppercase tracking-wide leading-tight">{activeModel.name}</h4>
                                      <p className="text-[11px] text-slate-350 leading-relaxed font-sans mt-0.5">{activeModel.bestFor}</p>
                                    </div>

                                    {/* Pros & Cons list bullet structures */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10.5px]">
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
                                    <div className="bg-[#020408] border border-[#00F0FF]/15 rounded p-2.5 text-[10.5px] flex flex-col space-y-2">
                                      <div className="flex justify-between items-center pb-1.5 border-b border-white/5 select-none font-mono">
                                        <span className="text-[9px] text-[#00F0FF] font-bold uppercase tracking-widest flex items-center gap-1">
                                          <MessageSquare size={10} />
                                          <span>SIMULADOR DE CHAT INTERATIVO</span>
                                        </span>
                                      </div>

                                      <div className="flex flex-wrap gap-1.5">
                                        <button 
                                          onClick={() => runModelPlaygroundDemo(activeModel.id, 'code_design')}
                                          className={`px-2 py-1 font-mono text-[9px] uppercase tracking-wider rounded border transition-all active:scale-95 ${
                                            playgroundInput === 'code_design' ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-white' : 'border-white/5 bg-white/5 text-white/40'
                                          }`}
                                        >
                                          &gt;_ CÓDIGO REACT
                                        </button>
                                        <button 
                                          onClick={() => runModelPlaygroundDemo(activeModel.id, 'copy')}
                                          className={`px-2 py-1 font-mono text-[9px] uppercase tracking-wider rounded border transition-all active:scale-95 ${
                                            playgroundInput === 'copy' ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-white' : 'border-white/5 bg-white/5 text-white/40'
                                          }`}
                                        >
                                          &gt;_ HUMANIZAR COPY
                                        </button>
                                        <button 
                                          onClick={() => runModelPlaygroundDemo(activeModel.id, 'context')}
                                          className={`px-2 py-1 font-mono text-[9px] uppercase tracking-wider rounded border transition-all active:scale-95 ${
                                            playgroundInput === 'context' ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-white' : 'border-white/5 bg-white/5 text-white/40'
                                          }`}
                                        >
                                          &gt;_ DIAGRAMAR LOGS
                                        </button>
                                      </div>

                                      <div className="bg-black/80 p-2.5 h-28 rounded border border-white/5 font-mono overflow-y-auto custom-scroll relative">
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
                                      <div className="text-[10px] leading-relaxed text-slate-300 font-mono bg-black/50 p-2 border border-white/5 rounded max-h-16 overflow-y-auto custom-scroll selection:bg-[#FF4500]">
                                        {activeModel.metaPrompt}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-1 pt-1.5 border-t border-white/5">
                                    <button
                                      onClick={() => handleCopy(activeModel.metaPrompt, activeModel.id)}
                                      className={`cursor-target py-2 px-3 font-mono text-[9.5px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 w-full sm:w-auto ${
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

                      {/* CATEGORY 3: MÁQUINA DE CRIAÇÃO */}
                      {activeTab === 'creations' && (
                        <motion.div 
                          key="creations"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full min-h-0"
                        >
                          {/* Creations Left List */}
                          <div className={`col-span-1 lg:col-span-4 flex-col border border-white/5 bg-[#0B1221]/50 p-2.5 rounded-[1px] h-full min-h-0 overflow-hidden ${mobileViewMode === 'detail' ? 'hidden lg:flex' : 'flex'}`}>
                            <div className="text-[8.5px] text-white/40 tracking-widest uppercase mb-2 select-none border-b border-white/5 pb-1 flex justify-between flex-shrink-0">
                              <span>SELECIONE BLUEPRINT</span>
                              <span className="text-orange-500 font-bold">[{filteredCreations.length}]</span>
                            </div>
                            <div className="flex-grow flex flex-col gap-1.5 overflow-y-auto custom-scroll pr-1">
                              {filteredCreations.map((item) => {
                                const isSelected = selectedCreationId === item.id;
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setSelectedCreationId(item.id);
                                      setActiveCreationDemoId(null);
                                      setMobileViewMode('detail');
                                    }}
                                    className={`text-left p-2 border transition-all duration-150 flex flex-col rounded-[2px] active:scale-98 select-target ${
                                      isSelected 
                                        ? "border-[#FF4500] bg-[#FF4500]/10 text-white" 
                                        : "border-white/5 bg-black/35 text-white/50 hover:text-white"
                                    }`}
                                  >
                                    <span className="text-[10px] font-black tracking-wide uppercase truncate block leading-tight">{item.title}</span>
                                    <span className="text-[7.5px] text-white/30 tracking-wider truncate block mt-0.5 uppercase">TIPO: {item.type.toUpperCase()}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Creations Right Details Card */}
                          <div className={`col-span-1 lg:col-span-8 border border-white/10 bg-[#0B1221]/90 p-4 rounded-[1px] h-full flex-col min-h-0 overflow-y-auto custom-scroll justify-between ${mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex'}`}>
                            {(() => {
                              const item = filteredCreations.find(c => c.id === selectedCreationId) || filteredCreations[0] || ecosystemData.creations[0];
                              if (!item) return null;
                              const isCopied = copiedId === item.id;
                              const isDemoActive = activeCreationDemoId === item.id;
                              return (
                                <div className="flex-1 flex flex-col justify-between gap-3 h-full min-h-0">
                                  
                                  <div className="flex flex-col gap-3 min-h-0">
                                    <button 
                                      className="lg:hidden text-[#FF4500] hover:text-white flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold self-start bg-white/5 px-2 py-1.5 rounded-[1px] border border-white/5 active:scale-95 transition-all w-fit"
                                      onClick={() => setMobileViewMode('list')}
                                    >
                                      <ArrowLeft size={12} />
                                      <span>Voltar para Lista</span>
                                    </button>

                                    <div className="flex items-center gap-1.5 mb-0.5 mt-1">
                                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#FF4500] border border-[#FF4500]/35 px-1.5 py-0.5 rounded-[1px] bg-[#FF4500]/5 leading-none">
                                         CATEGORIA: {item.type.toUpperCase()}
                                      </span>
                                    </div>
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-white leading-tight">{item.title}</h3>
                                    <p className="text-[11.5px] text-white/60 leading-relaxed font-sans">
                                      {item.description}
                                    </p>

                                    {/* Action Workflow Columns */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                                       <div className="p-2.5 bg-black/35 border border-white/5 rounded-[1px]">
                                          <strong className="text-[#FF4500] font-mono text-[8.5px] uppercase block mb-1 font-bold">// EXECUÇÃO CONCEITUAL:</strong>
                                          <p className="text-[10.5px] text-white/70 font-sans leading-normal">
                                             {item.howToExecute}
                                           </p>
                                       </div>
                                       <div className="p-2.5 bg-black/35 border border-white/5 rounded-[1px]">
                                          <strong className="text-[#00F0FF] font-mono text-[8.5px] uppercase block mb-1 font-bold">// FLUXO COMPLETO:</strong>
                                          <p className="text-[10.5px] text-white/70 font-sans leading-normal">
                                             {item.recommendedWorkflow}
                                           </p>
                                       </div>
                                    </div>

                                    {/* Simulated Interactive Execution Frame */}
                                    <div className="border border-white/5 bg-black/55 p-3 rounded-[1px] relative overflow-hidden min-h-[140px] flex flex-col justify-between">
                                      <div className="flex justify-between items-center text-[7.5px] font-mono text-white/30 select-none pb-1 border-b border-white/5">
                                        <span>[ RENDERIZADOR BLUEPRINT GRAPHIC FRAME ]</span>
                                        <span className="text-[#FF4500]">GPU_COCONECT</span>
                                      </div>

                                      {!isDemoActive ? (
                                        <div className="flex-grow flex flex-col justify-center items-center py-4 select-none">
                                          <Smartphone size={18} className="text-white/20 mb-1.5 animate-pulse" />
                                          <button 
                                            onClick={() => {
                                              setActiveCreationDemoId(item.id);
                                              setClicksCount(0);
                                            }}
                                            className="px-3 py-1 font-mono text-[9px] border border-[#00F0FF] text-[#00F0FF] bg-[#00F0FF]/5 hover:bg-[#00F0FF]/15 uppercase tracking-widest rounded transition-all active:scale-95 cursor-target"
                                          >
                                            [ SIMULAR COMPILADOR DEMO ]
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="flex-grow flex flex-col justify-between bg-[#02050A] p-2 rounded border border-white/10 relative mt-2 text-[10px]">
                                          <button 
                                            onClick={() => setActiveCreationDemoId(null)}
                                            className="absolute top-1 right-1 text-white/40 hover:text-white"
                                          >
                                            <X size={10} />
                                          </button>

                                          {item.type === '3d' && (
                                            <div className="flex flex-col items-center justify-center py-2 select-none">
                                              <span className="text-[7.5px] text-[#00F0FF] mb-1.5 tracking-wider">[SIMULANDO ROTAÇÃO CANVAS WEBGL]</span>
                                              <div className="w-14 h-14 rounded-full border border-dashed border-[#00F0FF]/40 flex items-center justify-center relative animate-spin [animation-duration:10s]">
                                                <div className="w-9 h-9 border border-dashed border-[#00F0FF]/60 rounded-full flex items-center justify-center animate-spin [animation-direction:reverse] [animation-duration:5s]">
                                                  <div className="w-2.5 h-2.5 bg-[#FF4500] rounded-full"></div>
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {item.type === 'mobile' && (
                                            <div className="flex flex-col items-center justify-center select-none py-1 h-full">
                                              <div className="w-[100px] h-[90px] bg-[#0E1528] rounded-lg border border-white/25 p-1.5 relative flex flex-col justify-between shadow-md">
                                                <div className="w-8 h-1.5 bg-black rounded-b mx-auto absolute top-0 left-1/2 -translate-x-1/2"></div>
                                                <div className="flex flex-col items-center mt-1">
                                                  <span className="text-[8px] text-[#00F0FF] font-mono leading-none">Cliques: [ {clicksCount} ]</span>
                                                  <button 
                                                    onClick={() => setClicksCount(c => c + 1)}
                                                    className="px-2 py-0.5 bg-[#FF4500] text-white text-[8px] uppercase tracking-widest font-black rounded-sm active:scale-90 duration-75 cursor-target border-none mt-1 font-mono"
                                                  >
                                                    Clicar
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {item.type === 'video' && (
                                            <div className="flex flex-col items-center justify-center select-none py-1.5">
                                              <span className="text-[7.5px] text-[#00F0FF] block mb-1">[PROMO_VIDEO_CAM_PLAYBACK.MP4]</span>
                                              <div className="w-full h-11 bg-gradient-to-r from-[#02050C] to-zinc-950 border border-white/5 relative flex items-center justify-center rounded">
                                                <div className="flex items-center gap-1">
                                                  <Play size={10} className="text-[#FF4500] animate-bounce" />
                                                  <span className="text-[8px] font-mono text-white/40 uppercase">Sincronizando Drone 8K</span>
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {item.type === 'animation' && (
                                            <div className="flex flex-col items-center justify-center select-none py-2">
                                              <span className="text-[7.5px] text-[#00F0FF] block mb-1">[CARROSSEL MARQUEE INFINITO]</span>
                                              <div className="w-full bg-[#050B14] p-1 border border-white/5 rounded relative overflow-hidden">
                                                <div className="flex gap-2 uppercase text-[7px] text-[#FF4500]/70 font-mono tracking-widest animate-pulse">
                                                  <span>[COORD] // INUX47 • COPIAR_PASTE_READY</span>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>

                                    {/* Blueprint inject prompt */}
                                    <div className="bg-[#050D18] border border-[#00F0FF]/15 p-2.5 rounded-[1.5px]">
                                       <span className="text-[8.5px] text-[#FF4500] font-bold block mb-1 font-mono tracking-widest">[ PROMPT DE INJEÇÃO ULTRA-VELOCIDADE ]</span>
                                       <div className="text-[10.5px] leading-relaxed text-white/95 font-mono break-all max-h-20 overflow-y-auto custom-scroll selection:bg-[#FF4500]">
                                          {item.promptToCopy}
                                       </div>
                                    </div>
                                  </div>

                                  <button
                                      onClick={() => handleCopy(item.promptToCopy, item.id)}
                                      className={`cursor-target w-full py-2 px-3 font-mono text-[10px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 flex-shrink-0 mt-1 ${
                                        isCopied 
                                          ? 'bg-[#FF4500] border-[#FF4500] text-white animate-pulse' 
                                          : 'bg-black/55 border-white/10 hover:border-[#FF4500]/50 hover:bg-[#FF4500]/5 text-white/80 hover:text-white'
                                      }`}
                                  >
                                    {isCopied ? <Check size={11} /> : <Copy size={11} />}
                                    <span>{isCopied ? "PROMPT COPIADO COM SUCESSO!" : "COPIAR PROMPT DE CONSTRUÇÃO"}</span>
                                  </button>

                                </div>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}

                      {/* CATEGORY 4: COFRE DE AUTOMOTORES */}
                      {activeTab === 'automations' && (
                        <motion.div 
                          key="automations"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full min-h-0"
                        >
                          {/* Automations Left List */}
                          <div className={`col-span-1 lg:col-span-4 flex-col border border-white/5 bg-[#0B1221]/50 p-2.5 rounded-[1px] h-full min-h-0 overflow-hidden ${mobileViewMode === 'detail' ? 'hidden lg:flex' : 'flex'}`}>
                            <div className="text-[8.5px] text-white/40 tracking-widest uppercase mb-2 select-none border-b border-white/5 pb-1 flex justify-between flex-shrink-0">
                              <span>SELECIONE AUTOMOTO</span>
                              <span className="text-orange-500 font-bold">[{filteredAutomations.length}]</span>
                            </div>
                            <div className="flex-grow flex flex-col gap-1.5 overflow-y-auto custom-scroll pr-1">
                              {filteredAutomations.map((item) => {
                                const isSelected = selectedAutomationId === item.id;
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setSelectedAutomationId(item.id);
                                      setRunningAutomationId(null);
                                      setMobileViewMode('detail');
                                    }}
                                    className={`text-left p-2 border transition-all duration-150 flex flex-col rounded-[2px] active:scale-98 select-target ${
                                      isSelected 
                                        ? "border-[#FF4500] bg-[#FF4500]/10 text-white" 
                                        : "border-white/5 bg-black/35 text-white/50 hover:text-white"
                                    }`}
                                  >
                                    <span className="text-[10px] font-black tracking-wide uppercase truncate block leading-tight">{item.title}</span>
                                    <span className="text-[7.5px] text-white/30 tracking-wider truncate block mt-0.5 uppercase">RODAR EM: {item.whereToRun.slice(0, 20)}...</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Automations Right Details Card */}
                          <div className={`col-span-1 lg:col-span-8 border border-white/10 bg-[#0B1221]/90 p-4 rounded-[1px] h-full flex-col min-h-0 overflow-y-auto custom-scroll justify-between ${mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex'}`}>
                            {(() => {
                              const item = filteredAutomations.find(a => a.id === selectedAutomationId) || filteredAutomations[0] || ecosystemData.automations[0];
                              if (!item) return null;
                              const isCopied = copiedId === item.id;
                              const isThisRunning = runningAutomationId === item.id;
                              return (
                                <div className="flex-1 flex flex-col justify-between gap-3 h-full min-h-0">
                                  
                                  <div className="flex flex-col gap-3 min-h-0">
                                    <button 
                                      className="lg:hidden text-[#FF4500] hover:text-white flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold self-start bg-white/5 px-2 py-1.5 rounded-[1px] border border-white/5 active:scale-95 transition-all w-fit mb-1"
                                      onClick={() => setMobileViewMode('list')}
                                    >
                                      <ArrowLeft size={12} />
                                      <span>Voltar para Lista</span>
                                    </button>

                                    <div className="flex justify-between items-start border-b border-white/15 pb-1">
                                       <div>
                                          <div className="flex items-center gap-1.5 mb-1">
                                             <span className="text-[8px] font-bold font-mono uppercase tracking-widest text-black bg-[#00F0FF] px-1.5 py-0.5 rounded-[1px] leading-none">
                                                LOCAL: {item.whereToRun}
                                             </span>
                                          </div>
                                          <h3 className="text-sm font-bold uppercase text-white tracking-wide leading-tight">{item.title}</h3>
                                          <p className="text-[11.5px] text-white/60 leading-relaxed font-sans mt-0.5">
                                             {item.description}
                                          </p>
                                       </div>
                                    </div>

                                    {/* Action instructions steps */}
                                    <div className="mb-1">
                                       <strong className="text-[#FF4500] font-mono text-[8.5px] tracking-widest uppercase block mb-1 font-black">// PASSO A PASSO TÁTICO DE EXECUÇÃO:</strong>
                                       <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                                          {item.steps.map((step, idx) => (
                                            <div key={idx} className="bg-black/35 p-2 border border-white/5 relative rounded-[1px] min-h-[44px]">
                                               <div className="absolute top-1 right-1 text-[8px] font-bold text-white/15">{idx + 1}</div>
                                               <span className="text-[9.5px] font-sans text-white/70 leading-snug block pr-2">{step}</span>
                                            </div>
                                          ))}
                                       </div>
                                    </div>

                                    {/* Code Block & Terminal Console Grid split inside */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 min-h-0">
                                      {/* Code visual */}
                                      <div className="sm:col-span-7 bg-[#02050A] border border-white/5 p-2 rounded-[1.5px] relative">
                                         <span className="text-[7.5px] text-white/30 font-bold uppercase tracking-widest font-mono block mb-1">CONSOLE_CORE_CODE</span>
                                         <pre className="font-mono text-[10.5px] leading-relaxed text-slate-350 overflow-x-auto max-h-24 custom-scroll select-all">
                                            <code>{item.codeToCopy}</code>
                                         </pre>
                                      </div>

                                      {/* Interactive execution logs output terminal */}
                                      <div className="sm:col-span-5 bg-[#030107] border border-[#FF4500]/25 rounded p-2 flex flex-col justify-between h-28 font-mono text-[9px]">
                                        <div className="flex justify-between items-center text-[7.5px] text-[#FF4500] border-b border-white/5 pb-1 select-none">
                                          <span>INTELLIGENT SHELL</span>
                                          <span className="animate-pulse">ONLINE</span>
                                        </div>

                                        {!isThisRunning || automationLogs.length === 0 ? (
                                          <div className="flex-grow flex flex-col items-center justify-center text-center">
                                            <button 
                                              onClick={() => runAutomationScript(item.id, item.codeToCopy)}
                                              className="px-2 py-0.5 bg-[#FF4500]/10 border border-[#FF4500] text-[#FF4500] hover:bg-[#FF4500]/20 rounded text-[9px] uppercase font-black tracking-widest cursor-target flex items-center gap-1"
                                            >
                                              <Terminal size={10} />
                                              <span>AUTO RODAR</span>
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="flex-grow text-[8px] text-emerald-400 leading-normal py-1 select-text max-h-20 overflow-y-auto custom-scroll">
                                            {automationLogs.map((log, index) => (
                                              <div key={index} className="truncate">
                                                {log}
                                              </div>
                                            ))}
                                            {isAutomationActive && <span className="inline-block w-1.5 h-2.5 bg-cyan-400 animate-[blink_0.8s_infinite] ml-0.5"></span>}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Output info & Copy */}
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-white/5 flex-shrink-0">
                                     <div className="text-[10px] text-white/30 font-sans">
                                        <strong className="text-[#00F0FF] font-mono block text-[8px] uppercase">// RETORNO ESPERADO:</strong>
                                        {item.outputFormat}
                                     </div>

                                     <button
                                        onClick={() => handleCopy(item.codeToCopy, item.id)}
                                        className={`cursor-target px-5 py-2 font-mono text-[10px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-1.5 transition-all duration-150 w-full sm:w-auto active:scale-95 ${
                                          isCopied 
                                            ? 'bg-[#00F0FF] border-[#00F0FF] text-black animate-pulse' 
                                            : 'bg-black/60 border-white/10 hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/5 text-white/80 hover:text-white'
                                        }`}
                                     >
                                       {isCopied ? <Check size={11} /> : <Copy size={11} />}
                                       <span>{isCopied ? "COPIADO!" : "COPIAR SCRIPT"}</span>
                                     </button>
                                  </div>

                                </div>
                              );
                            })()}
                          </div>
                        </motion.div>
                      )}

                      {/* CATEGORY 5: HACKS DE PRODUTIVIDADE */}
                      {activeTab === 'productivity' && (
                        <motion.div 
                          key="productivity"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full min-h-0"
                        >
                          {/* Productivity Left List */}
                          <div className={`col-span-1 lg:col-span-4 flex-col border border-white/5 bg-[#0B1221]/50 p-2.5 rounded-[1px] h-full min-h-0 overflow-hidden ${mobileViewMode === 'detail' ? 'hidden lg:flex' : 'flex'}`}>
                            <div className="text-[8.5px] text-white/40 tracking-widest uppercase mb-2 select-none border-b border-white/5 pb-1 flex justify-between flex-shrink-0">
                              <span>SELECIONE O HACK</span>
                              <span className="text-orange-500 font-bold">[{filteredProductivity.length}]</span>
                            </div>
                            <div className="flex-grow flex flex-col gap-1.5 overflow-y-auto custom-scroll pr-1">
                              {filteredProductivity.map((item) => {
                                const isSelected = selectedProductivityId === item.id;
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setSelectedProductivityId(item.id);
                                      setMobileViewMode('detail');
                                    }}
                                    className={`text-left p-2 border transition-all duration-150 flex flex-col rounded-[2px] active:scale-98 select-target ${
                                      isSelected 
                                        ? "border-[#FF4500] bg-[#FF4500]/10 text-white" 
                                        : "border-white/5 bg-black/35 text-white/50 hover:text-white"
                                    }`}
                                  >
                                    <span className="text-[10px] font-black tracking-wide uppercase truncate block leading-tight">{item.title}</span>
                                    <span className="text-[7.5px] text-white/30 tracking-wider truncate block mt-0.5 uppercase">MÉTODO: {item.framework}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Productivity Right Details Card */}
                          <div className={`col-span-1 lg:col-span-8 border border-white/10 bg-[#0B1221]/90 p-4 rounded-[1px] h-full flex-col min-h-0 overflow-y-auto custom-scroll justify-between ${mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex'}`}>
                            {(() => {
                              const item = filteredProductivity.find(p => p.id === selectedProductivityId) || filteredProductivity[0] || ecosystemData.productivity[0];
                              if (!item) return null;
                              const isCopied = copiedId === item.id;
                              return (
                                <div className="flex-1 flex flex-col justify-between gap-3 h-full min-h-0">
                                  
                                  <div className="flex flex-col gap-3 min-h-0">
                                    <button 
                                      className="lg:hidden text-[#FF4500] hover:text-white flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold self-start bg-white/5 px-2 py-1.5 rounded-[1px] border border-white/5 active:scale-95 transition-all w-fit mb-1"
                                      onClick={() => setMobileViewMode('list')}
                                    >
                                      <ArrowLeft size={12} />
                                      <span>Voltar para Lista</span>
                                    </button>

                                    <div className="flex flex-col justify-between mb-1.5">
                                       <div className="flex items-center gap-1.5 mb-1.5">
                                          <span className="text-[8px] font-bold uppercase tracking-widest text-[#FF4500] border border-[#FF4500]/20 px-1.5 py-0.5 rounded-[1px] bg-[#FF4500]/5 leading-none">
                                             METODOLOGIA: {item.framework}
                                          </span>
                                       </div>
                                       <h3 className="text-sm font-bold uppercase text-white tracking-wide leading-tight">{item.title}</h3>
                                    </div>

                                    {/* Operational Before vs After Comparators */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-[11px] leading-relaxed">
                                       <div className="p-2.5 bg-black/35 border border-white/5 rounded-[1px]">
                                          <strong className="text-[#FF4500] font-mono text-[8px] tracking-wider block mb-1 uppercase select-none">// ANTIGO GARGALO OPERACIONAL:</strong>
                                          <span className="text-white/65 text-[10px] leading-normal">{item.scenario}</span>
                                       </div>
                                       <div className="p-2.5 bg-[#00F0FF]/5 border border-[#00F0FF]/15 rounded-[1px]">
                                          <strong className="text-[#00F0FF] font-mono text-[8px] tracking-wider block mb-1 uppercase select-none">// RESULTADO DA I.A. ENTREGUE:</strong>
                                          <span className="text-white/75 text-[10px] leading-normal">{item.expectedResult}</span>
                                       </div>
                                    </div>

                                    {/* Copy prompt code container */}
                                    <div className="bg-[#03060C] border border-white/5 p-3 rounded-[1px]">
                                       <span className="text-[8.5px] text-white/30 font-bold uppercase tracking-widest mb-1.5 font-mono block select-none">
                                          PROMPT COPILOT DE ALTA ACELERAÇÃO
                                       </span>
                                       <div className="text-[10.5px] leading-relaxed text-slate-350 font-mono select-all break-words max-h-32 overflow-y-auto custom-scroll selection:bg-[#FF4500]">
                                          {item.promptToCopy}
                                       </div>
                                    </div>
                                  </div>

                                  <button
                                      onClick={() => handleCopy(item.promptToCopy, item.id)}
                                      className={`cursor-target w-full py-2 px-3 font-mono text-[10px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 flex-shrink-0 mt-1 ${
                                        isCopied 
                                          ? 'bg-[#FF4500] border-[#FF4500] text-white font-bold animate-pulse' 
                                          : 'bg-black/55 border-white/10 hover:border-[#FF4500]/50 hover:bg-[#FF4500]/5 text-white/80 hover:text-white'
                                      }`}
                                  >
                                    {isCopied ? <Check size={11} /> : <Copy size={11} />}
                                    <span>{isCopied ? "PROMPT COPIADO COM SUCESSO!" : "COPIAR PROMPT DE ACELERAÇÃO"}</span>
                                  </button>

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
