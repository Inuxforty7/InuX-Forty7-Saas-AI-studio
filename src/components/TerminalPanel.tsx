import React, { useEffect, useState, useMemo } from 'react';
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
  X,
  Plus,
  Play,
  ArrowRight
} from 'lucide-react';
import { ecosystemData, PromptItem, ModelComparison, CreationGuide, AutomationTool, ProductivityHack } from '../data/ecosystem';

const TerminalPanel = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'prompts' | 'models' | 'creations' | 'automations' | 'productivity'>('prompts');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string>('');

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
        // Fallback
        setCopiedId(id);
        setTimeout(() => setCopiedId(''), 2000);
      });
    } else {
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
    }
  };

  // Navigations categories
  const categories = [
    { id: 'prompts', label: 'PACK CINEMATOGRÁFICO', icon: <ImageIcon size={16} />, desc: 'Comandos visuais de elite' },
    { id: 'models', label: 'GUIA DA ELITE (I.A. MODELS)', icon: <Cpu size={16} />, desc: 'Curadoria de modelos líderes' },
    { id: 'creations', label: 'MÁQUINA DE CRIAÇÃO (3D/APP)', icon: <Globe size={16} />, desc: 'Blueprints de 3D, Mobile e Vídeo' },
    { id: 'automations', label: 'COFRE DE AUTOMOTORES', icon: <Scissors size={16} />, desc: 'Automações pragmáticas de cópia/cola' },
    { id: 'productivity', label: 'HACKS DE PRODUTIVIDADE', icon: <Zap size={16} />, desc: 'Flutuação operacional direta' },
  ];

  // Filtering based on active category & query
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

  return (
    <div className="fixed inset-0 z-[100] bg-[#03070D] font-mono text-white overflow-y-auto overflow-x-hidden selection:bg-[#FF4500] selection:text-white">
      {/* Background Matrix & Cosmic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.02)_0%,rgba(0,0,0,0.95)_100%)]"></div>
        {/* Futuristic Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-15" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255, 69, 0, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 69, 0, 0.15) 1px, transparent 1px)', 
            backgroundSize: '45px 45px' 
          }}
        ></div>
        {/* Scanning horizontal line effect */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF4500]/30 to-transparent animate-[scanMove_8s_infinite_linear]"></div>
      </div>

      <style>{`
        @keyframes scanMove {
          0% { transform: translateY(0vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Decorative corners */}
      <div className="fixed top-4 left-4 w-10 h-10 border-t border-l border-[#FF4500]/60 pointer-events-none z-50"></div>
      <div className="fixed top-4 right-4 w-10 h-10 border-t border-r border-[#FF4500]/60 pointer-events-none z-50"></div>
      <div className="fixed bottom-4 left-4 w-10 h-10 border-b border-l border-[#FF4500]/60 pointer-events-none z-50"></div>
      <div className="fixed bottom-4 right-4 w-10 h-10 border-b border-r border-[#FF4500]/60 pointer-events-none z-50"></div>

      {/* Vertical Status Bars */}
      <div className="hidden xl:flex fixed left-5 top-0 bottom-0 items-center justify-center pointer-events-none z-10">
         <span className="text-[9px] text-[#FF4500]/30 tracking-[0.4em] font-bold whitespace-nowrap rotate-180 uppercase" style={{ writingMode: 'vertical-rl' }}>
            INUX FORTY7 ECOSYSTEM // COPIE • COLE • FAÇA DINHEIRO
         </span>
      </div>
      <div className="hidden xl:flex fixed right-5 top-0 bottom-0 items-center justify-center pointer-events-none z-10">
         <span className="text-[9px] text-[#FF4500]/30 tracking-[0.4em] font-bold whitespace-nowrap uppercase" style={{ writingMode: 'vertical-rl' }}>
            INUX FORTY7 ECOSYSTEM // ATALHOS PRÁTICOS SEM CÓDIGO
         </span>
      </div>

      {/* Frame Container */}
      <div className="relative z-10 max-w-[1450px] mx-auto px-4 sm:px-8 lg:px-12 py-8 min-h-screen flex flex-col justify-between">
        
        {/* Top Header Controls */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 mt-2">
          
          {/* Logo Brand with holographic look */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-6 bg-[#FF4500] -skew-x-12 animate-pulse shadow-[0_0_12px_#FF4500]"></div>
            <div className="flex items-center gap-2">
               <span className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">INUX</span>
               <span className="text-xl sm:text-2xl font-black tracking-widest text-[#FF4500] drop-shadow-[0_0_15px_#FF4500] uppercase">FORTY7</span>
            </div>
            <span className="font-mono text-[9px] tracking-widest text-white/40 border border-white/10 px-2.5 py-0.5 ml-2 bg-white/5 uppercase select-none rounded-[2px]">
               ECOSYSTEM v3.0 // DESTRAVADO
            </span>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Elegant close session button */}
            <button 
              onClick={onClose}
              className="cursor-target relative group px-6 py-2 border border-[#FF4500]/30 bg-transparent hover:bg-[#FF4500]/10 text-white/80 hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(255,69,0,0.2)]"
            >
              <X size={14} className="text-[#FF4500]" />
              <span>[ FECHAR ACESSO ECOSSISTEMA ]</span>
            </button>
          </div>
        </header>

        {/* Global Stats / HUD Banner */}
        <div className="mb-8 border border-white/5 bg-[#080D18]/40 p-4 flex flex-wrap gap-y-4 gap-x-8 items-center justify-between text-xs tracking-wider text-white/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#FF4500]/60"></div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-ping"></div>
            <span>CONEXÃO: <strong className="text-white font-medium">ROOT_SECURE</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>PACKS DESBLOQUEADOS: <strong className="text-[#FF4500] font-black">[47 / 47]</strong></span>
          </div>
          <div className="flex items-center gap-2">
             <span>MELHOR PLATAFORMA: <strong className="text-white font-medium">SEM INSTALAÇÃO // 100% WEB</strong></span>
          </div>
          <div className="flex items-center gap-2">
             <span>MÉTODO: <strong className="text-[#FF4500] font-bold">COPIAR & COLAR EM 3 SEGUNDOS</strong></span>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Navigation Tabs Control Panel (4 Columns) */}
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
             <div className="border border-white/10 bg-[#0B1221]/90 backdrop-blur-md p-5 flex flex-col relative shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                
                {/* HUD Header Decoration */}
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-3">
                   <div className="flex items-center gap-2">
                     <Terminal size={14} className="text-[#FF4500]/80" />
                     <span className="text-[10px] tracking-widest uppercase font-black text-white/80">SISTEMA INVARIANT</span>
                   </div>
                   <div className="flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 bg-[#FF4500] rounded-sm"></span>
                     <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-sm"></span>
                   </div>
                </div>

                <p className="text-[11px] text-white/40 leading-relaxed uppercase mb-6 tracking-wide">
                  Escolha um protocolo para destravar os packs prontos. Todos os recursos são baseados no método prático de copiar e colar para aplicação imediata.
                </p>

                {/* Tabs Selectors Buttons */}
                <div className="flex flex-col gap-3">
                    {categories.map((cat, idx) => {
                      const isActive = activeTab === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveTab(cat.id as any);
                            setSearchQuery('');
                          }}
                          className={`cursor-target group relative w-full text-left p-3.5 border transition-all duration-300 flex items-center gap-3 rounded-[2px] ${
                            isActive 
                              ? 'border-[#FF4500] bg-[#FF4500]/10 text-white shadow-[0_0_15px_rgba(255,69,0,0.15)]' 
                              : 'border-white/5 bg-black/40 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5'
                          }`}
                        >
                          {/* Left Border indicator active */}
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF4500]"></div>
                          )}

                          <div className={`p-1 rounded-[2px] transition-colors ${isActive ? 'text-[#FF4500]' : 'text-white/40 group-hover:text-white'}`}>
                            {cat.icon}
                          </div>

                          <div className="flex flex-col min-w-0">
                            <span className="text-[11px] font-black tracking-widest uppercase leading-none mb-1">
                               [{String(idx+1).padStart(2, '0')}] {cat.label}
                            </span>
                            <span className="text-[8px] tracking-wide text-white/40 group-hover:text-white/60 transition-colors uppercase select-none truncate">
                               {cat.desc}
                            </span>
                          </div>

                          <ChevronRight size={12} className={`ml-auto opacity-30 transition-transform ${isActive ? 'translate-x-0.5 opacity-100 text-[#FF4500]' : ''}`} />
                        </button>
                      );
                    })}
                </div>

                {/* Telemetry Log Screen inside control panel */}
                <div className="mt-8 pt-5 border-t border-white/5 flex flex-col font-mono text-[9px] text-white/40 leading-5">
                   <div className="flex justify-between items-center text-[#FF4500] font-bold text-[10px] mb-2">
                      <span>&gt;_ LIVE_TELEMETRY</span>
                      <span className="animate-pulse">● READY</span>
                   </div>
                   <p>&gt; Core prompts parsed successfully.</p>
                   <p>&gt; Global memory buffer mapped.</p>
                   <p>&gt; Injecting cinematic parameters.</p>
                   <p className="text-[#00F0FF]">&gt; No plugins required. Copy-Paste ON.</p>
                </div>
             </div>
          </div>

          {/* Right Column: Dynamic Ecosystem Showcase Area (9 Columns) */}
          <div className="col-span-1 lg:col-span-9 flex flex-col gap-6">
             
             {/* Dynamic Search & Top Filter Bar */}
             <div className="border border-white/10 bg-[#0B1221]/75 backdrop-blur-md p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                
                {/* Search input with cyber border glow */}
                <div className="relative w-full sm:max-w-md">
                   <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                   <input 
                     type="text" 
                     placeholder={`Buscar recursos de IA e atalhos de ${categories.find(c=>c.id===activeTab)?.label}...`}
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-sm font-mono text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF4500] focus:shadow-[0_0_12px_rgba(255,69,0,0.2)] transition-all uppercase"
                   />
                   {searchQuery && (
                     <button 
                       onClick={() => setSearchQuery('')}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                     >
                       <X size={12} />
                     </button>
                   )}
                </div>

                <div className="text-[10px] text-white/40 uppercase tracking-widest text-right flex-shrink-0">
                  Mostrando <strong className="text-[#FF4500]">
                    {activeTab === 'prompts' && filteredPrompts.length}
                    {activeTab === 'models' && filteredModels.length}
                    {activeTab === 'creations' && filteredCreations.length}
                    {activeTab === 'automations' && filteredAutomations.length}
                    {activeTab === 'productivity' && filteredProductivity.length}
                  </strong> itens desbloqueados
                </div>
             </div>

             {/* Inner Tab Contents Renderer */}
             <div className="min-h-[50vh]">
                 <AnimatePresence mode="wait">
                     
                     {/* TAB 1: PROMPTS CINEMATOGRÁFICOS */}
                     {activeTab === 'prompts' && (
                       <motion.div 
                         key="prompts"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.25 }}
                         className="grid grid-cols-1 md:grid-cols-2 gap-6"
                       >
                         {filteredPrompts.length === 0 ? (
                           <div className="col-span-2 text-center py-16 border border-dashed border-white/10 text-white/30 text-xs">
                              NENHUM PROMPT CINEMATOGRÁFICO ENCONTRADO PARA "{searchQuery.toUpperCase()}"
                           </div>
                         ) : (
                           filteredPrompts.map((item) => {
                             const isCopied = copiedId === item.id;
                             return (
                               <div 
                                 key={item.id}
                                 className="border border-white/10 bg-[#0B1221]/70 p-5 pr-6 rounded-[2px] flex flex-col justify-between hover:border-[#FF4500]/50 hover:bg-[#0B1221]/90 transition-all duration-300 relative group"
                               >
                                 <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity flex justify-end items-start p-1.5">
                                   <ImageIcon size={14} className="text-[#FF4500]" />
                                 </div>

                                 <div>
                                   {/* Header Tags */}
                                   <div className="flex flex-wrap items-center gap-2 mb-3">
                                      <span className="text-[8px] uppercase tracking-widest font-black text-[#FF4500] border border-[#FF4500]/20 px-2 py-0.5 bg-[#FF4500]/5 rounded-[2px]">
                                         IDEAL: {item.idealModel}
                                      </span>
                                      {item.tags.map(t => (
                                        <span key={t} className="text-[8px] uppercase tracking-wider text-white/50 bg-white/5 px-2 py-0.5 rounded-[2px]">
                                           {t}
                                        </span>
                                      ))}
                                   </div>

                                   <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#FF4500] transition-colors leading-tight">
                                     {item.title}
                                   </h3>
                                   <p className="text-[11px] text-white/50 leading-relaxed mb-4 font-sans">
                                     {item.description}
                                   </p>

                                   {/* Interactive Command Prompt Box */}
                                   <div className="relative bg-black/60 border border-white/5 p-3.5 rounded-[2px] font-mono text-[10.5px] leading-relaxed text-white/90 select-all mb-4 max-h-[140px] overflow-y-auto break-words hover:border-[#FF4500]/15 scrollbar-thin">
                                      {item.prompt}
                                   </div>
                                 </div>

                                 <div>
                                   <div className="text-[10px] text-white/40 leading-relaxed font-sans mb-4 border-l-2 border-white/10 pl-2.5">
                                      <strong className="text-[#FF4500] font-mono font-bold text-[9px] block mb-0.5 uppercase">// APLICAÇÃO RÁPIDA:</strong>
                                      {item.howToUse}
                                   </div>

                                   {/* Copy action button */}
                                   <button
                                     onClick={() => handleCopy(item.prompt, item.id)}
                                     className={`cursor-target w-full py-2.5 px-4 font-mono text-[11px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 ${
                                       isCopied 
                                         ? 'bg-[#FF4500] border-[#FF4500] text-white font-bold animate-pulse' 
                                         : 'bg-black/40 border-white/10 hover:border-[#FF4500]/60 hover:bg-[#FF4500]/10 text-white/80 hover:text-white'
                                     }`}
                                   >
                                     {isCopied ? (
                                       <>
                                         <Check size={12} strokeWidth={2.5} />
                                         <span>COPIADO DESTRAVADO // COLAR AGORA</span>
                                       </>
                                     ) : (
                                       <>
                                         <Copy size={12} />
                                         <span>[ COPIAR PROMPT DE ELITE ]</span>
                                       </>
                                     )}
                                   </button>
                                 </div>
                               </div>
                             );
                           })
                         )}
                       </motion.div>
                     )}

                     {/* TAB 2: GUIA DE MODELOS */}
                     {activeTab === 'models' && (
                       <motion.div 
                         key="models"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.25 }}
                         className="flex flex-col gap-6"
                       >
                         {filteredModels.length === 0 ? (
                           <div className="text-center py-16 border border-dashed border-white/10 text-white/30 text-xs">
                              NENHUM MODELO ENCONTRADO PARA "{searchQuery.toUpperCase()}"
                           </div>
                         ) : (
                           filteredModels.map((model) => {
                             const isCopied = copiedId === model.id;
                             return (
                               <div 
                                 key={model.id}
                                 className="border border-white/10 bg-[#0B1221]/70 p-6 rounded-[2px] grid grid-cols-1 md:grid-cols-12 gap-6 hover:border-[#FF4500]/30 transition-all duration-300"
                               >
                                 {/* Model ID / Stats Column (5 Columns) */}
                                 <div className="md:col-span-5 flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                       <div className="w-1.5 h-6 bg-[#FF4500]"></div>
                                       <h3 className="text-lg font-black uppercase text-white tracking-widest">{model.name}</h3>
                                    </div>
                                    
                                    <div className="text-[11px] leading-relaxed text-white/80 font-sans border-l-2 border-white/15 pl-3 py-1 bg-white/[0.02]">
                                       <strong className="text-[#FF4500] font-mono text-[10px] uppercase block mb-1">MOMENTO IDEAL DE USO:</strong>
                                       {model.bestFor}
                                    </div>

                                    {/* Skill Indicators Bars */}
                                    <div className="flex flex-col gap-2 mt-2">
                                       <div className="flex justify-between text-[9px] text-white/50 tracking-wider">
                                          <span>CÓDIGO / PROGRAMAÇÃO</span>
                                          <span className="text-white font-bold">{model.rating.code}%</span>
                                       </div>
                                       <div className="h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                                          <div className="h-full bg-gradient-to-r from-[#FF4500] to-orange-500 rounded-full" style={{ width: `${model.rating.code}%` }}></div>
                                       </div>

                                       <div className="flex justify-between text-[9px] text-white/50 tracking-wider mt-1">
                                          <span>DESIGN WEB / ADESÃO TAILWIND</span>
                                          <span className="text-white font-bold">{model.rating.design}%</span>
                                       </div>
                                       <div className="h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                                          <div className="h-full bg-gradient-to-r from-teal-400 to-[#00F0FF] rounded-full" style={{ width: `${model.rating.design}%` }}></div>
                                       </div>

                                       <div className="flex justify-between text-[9px] text-white/50 tracking-wider mt-1">
                                          <span>COPYWRITING / HUMANIZAÇÃO</span>
                                          <span className="text-white font-bold">{model.rating.text}%</span>
                                       </div>
                                       <div className="h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                                          <div className="h-full bg-gradient-to-r from-pink-500 to-[#FF0055] rounded-full" style={{ width: `${model.rating.text}%` }}></div>
                                       </div>

                                       <div className="flex justify-between text-[9px] text-white/50 tracking-wider mt-1">
                                          <span>LIMITE DE MEMÓRIA E CONTEXTO</span>
                                          <span className="text-white font-bold">{model.rating.context}%</span>
                                       </div>
                                       <div className="h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                                          <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: `${model.rating.context}%` }}></div>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Pros, Cons & Training Prompts (7 Columns) */}
                                 <div className="md:col-span-7 flex flex-col justify-between">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 font-sans text-[11px]">
                                       {/* Pros */}
                                       <div className="bg-black/30 p-3 border border-white/5">
                                          <strong className="text-[#00F0FF] font-mono text-[9px] tracking-wider block mb-1 uppercase">&#43; PONTOS DE FORÇA:</strong>
                                          <ul className="list-none space-y-1.5 text-white/70">
                                            {model.pros.map((p,i)=> <li key={i} className="flex gap-1.5 items-start">
                                              <span className="text-[#00F0FF] font-black font-mono">✓</span>
                                              <span>{p}</span>
                                            </li>)}
                                          </ul>
                                       </div>
                                       {/* Cons */}
                                       <div className="bg-black/30 p-3 border border-white/5">
                                          <strong className="text-white/40 font-mono text-[9px] tracking-wider block mb-1 uppercase">&#45; DESVANTAGENS:</strong>
                                          <ul className="list-none space-y-1.5 text-white/50">
                                            {model.cons.map((p,i)=> <li key={i} className="flex gap-1.5 items-start">
                                              <span className="text-white/30 font-black font-mono">×</span>
                                              <span>{p}</span>
                                            </li>)}
                                          </ul>
                                       </div>
                                    </div>

                                    {/* Training prompt to direct copy */}
                                    <div className="bg-[#050D19] border border-white/5 p-3 rounded-[2px] mb-4">
                                       <div className="flex justify-between items-center text-[8px] tracking-widest text-[#FF4500] font-bold mb-1 uppercase">
                                          <span>[ PROMPT DE CONFIGURAÇÃO DE MODELO ]</span>
                                          <span className="text-white/30">COPIE E ALIMENTE O SYSTEM CHAT</span>
                                       </div>
                                       <div className="text-[10px] leading-relaxed text-white/50 line-clamp-2 select-all font-mono">
                                          {model.metaPrompt}
                                       </div>
                                    </div>

                                    {/* Button Copy */}
                                    <button
                                     onClick={() => handleCopy(model.metaPrompt, model.id)}
                                     className={`cursor-target w-full py-2.5 px-4 font-mono text-[10px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 ${
                                       isCopied 
                                         ? 'bg-[#00F0FF] border-[#00F0FF] text-black font-bold animate-pulse' 
                                         : 'bg-black/50 border-white/10 hover:border-[#00F0FF]/60 hover:bg-[#00F0FF]/10 text-white/80 hover:text-white'
                                     }`}
                                    >
                                     {isCopied ? (
                                       <>
                                         <Check size={11} strokeWidth={2.5} />
                                         <span>INSTRUÇÕES COPIADAS PARA O SISTEMA</span>
                                       </>
                                     ) : (
                                       <>
                                         <Copy size={11} />
                                         <span>[ COPIAR PROMPT DE INSTALAÇÃO DO MODELO ]</span>
                                       </>
                                     )}
                                    </button>

                                 </div>
                               </div>
                             );
                           })
                         )}
                       </motion.div>
                     )}

                     {/* TAB 3: MÁQUINA DE CRIAÇÃO (3D, MOBILE, VÍDEO, ETC) */}
                     {activeTab === 'creations' && (
                       <motion.div 
                         key="creations"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.25 }}
                         className="flex flex-col gap-6"
                       >
                         {filteredCreations.length === 0 ? (
                           <div className="text-center py-16 border border-dashed border-white/10 text-white/30 text-xs">
                              NENHUM PROTOCOLO DE CRIAÇÃO ECONTRADO PARA "{searchQuery.toUpperCase()}"
                           </div>
                         ) : (
                           filteredCreations.map((item) => {
                             const isCopied = copiedId === item.id;
                             return (
                               <div 
                                 key={item.id}
                                 className="border border-white/10 bg-[#0B1221]/70 p-6 rounded-[2px] hover:border-[#FF4500]/40 transition-all duration-300 flex flex-col justify-between"
                               >
                                 <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                   <div>
                                      <div className="flex items-center gap-2 mb-2">
                                         <span className="text-[8px] uppercase tracking-widest font-bold text-[#FF4500] border border-[#FF4500]/30 px-2 py-0.5 rounded-[2px] bg-[#FF4500]/5">
                                            CATEGORIA: {item.type.toUpperCase()}
                                         </span>
                                      </div>
                                      <h3 className="text-base font-black uppercase tracking-wider text-white">{item.title}</h3>
                                      <p className="text-[11px] text-white/50 leading-relaxed font-sans max-w-4xl mt-1">
                                        {item.description}
                                      </p>
                                   </div>
                                 </div>

                                 {/* How to run list */}
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                                    <div className="p-4 bg-black/40 border border-white/5">
                                       <strong className="text-[#FF4500] font-mono text-[10px] uppercase block mb-1.5">// COMO EXECUTAR SEM CONHECIMENTO TÉCNICO:</strong>
                                       <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                                          {item.howToExecute}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-black/40 border border-white/5">
                                       <strong className="text-[#00F0FF] font-mono text-[10px] uppercase block mb-1.5">// TRABALHO DE PRODUÇÃO RECOMENDADO:</strong>
                                       <p className="text-[11px] text-white/75 leading-relaxed font-sans">
                                          {item.recommendedWorkflow}
                                        </p>
                                    </div>
                                 </div>

                                 {/* Blueprints prompts to copy */}
                                 <div className="bg-[#050D18] border border-white/5 p-4 rounded-[2px] mb-5 relative group">
                                    <div className="text-[8px] text-[#FF4500]/70 font-bold mb-2 uppercase select-none tracking-widest">
                                       [ PROMPT DE INJEÇÃO ULTRA-VELOCIDADE ]
                                    </div>
                                    <div className="text-[11px] leading-relaxed text-white/90 font-mono break-words whitespace-pre-wrap select-all max-h-44 overflow-y-auto pr-2 scrollbar-thin">
                                       {item.promptToCopy}
                                    </div>
                                 </div>

                                 <button
                                     onClick={() => handleCopy(item.promptToCopy, item.id)}
                                     className={`cursor-target w-full py-3 px-4 font-mono text-[11px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 ${
                                       isCopied 
                                         ? 'bg-[#FF4500] border-[#FF4500] text-white font-bold animate-pulse' 
                                         : 'bg-black/55 border-white/10 hover:border-[#FF4500]/60 hover:bg-[#FF4500]/10 text-white/80 hover:text-white'
                                     }`}
                                 >
                                   {isCopied ? (
                                     <>
                                       <Check size={12} strokeWidth={2.5} />
                                       <span>PROMPT COPIADO COM SUCESSO // COLE NA I.A.</span>
                                     </>
                                   ) : (
                                     <>
                                       <Copy size={12} />
                                       <span>[ COPIAR PROMPT DE CONSTRUÇÃO DE ATALHO COMPLETO ]</span>
                                     </>
                                   )}
                                 </button>
                               </div>
                             );
                           })
                         )}
                       </motion.div>
                     )}

                     {/* TAB 4: COFRE DE AUTOMOTORES (AUTOMAÇÕES DE COPIAR E COLAR) */}
                     {activeTab === 'automations' && (
                       <motion.div 
                         key="automations"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.25 }}
                         className="flex flex-col gap-6"
                       >
                         {filteredAutomations.length === 0 ? (
                           <div className="text-center py-16 border border-dashed border-white/10 text-white/30 text-xs">
                              NENHUM SCRIPT DE AUTOMAÇÃO ECONTRADO PARA "{searchQuery.toUpperCase()}"
                           </div>
                         ) : (
                           filteredAutomations.map((item) => {
                             const isCopied = copiedId === item.id;
                             return (
                               <div 
                                 key={item.id}
                                 className="border border-white/10 bg-[#0B1221]/70 p-6 rounded-[2px] hover:border-[#FF0055]/40 transition-all duration-300"
                               >
                                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-4 border-b border-white/5">
                                    <div>
                                       <div className="flex items-center gap-2 mb-1.5">
                                          <span className="text-[8px] font-bold uppercase tracking-widest text-black bg-[#00F0FF] px-2 py-0.5 rounded-[2px]">
                                             EXECUÇÃO: {item.whereToRun}
                                          </span>
                                       </div>
                                       <h3 className="text-base font-black uppercase text-white tracking-wide">{item.title}</h3>
                                       <p className="text-[11px] text-white/50 leading-relaxed font-sans max-w-4xl mt-0.5">
                                          {item.description}
                                       </p>
                                    </div>
                                 </div>

                                 {/* Installation & Executing list instructions */}
                                 <div className="mb-6">
                                    <strong className="text-[#FF4500] font-mono text-[9px] tracking-widest uppercase block mb-3">// PASSO A PASSO TÁTICO DE EXECUÇÃO:</strong>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                       {item.steps.map((step, idx) => (
                                         <div key={idx} className="bg-black/30 p-3 border border-white/5 relative rounded-[2px]">
                                            <div className="absolute top-2 right-2 text-[10px] font-bold text-white/20">
                                               {idx + 1}
                                            </div>
                                            <span className="text-[10px] font-sans text-white/80 leading-relaxed block pr-4">
                                               {step}
                                            </span>
                                         </div>
                                       ))}
                                    </div>
                                 </div>

                                 {/* Elegant Scrollable Shell/Editor of Code */}
                                 <div className="bg-[#02050A] border border-white/10 p-4 rounded-[2px] mb-5 relative group">
                                    <div className="absolute top-3 right-3 text-[8px] text-white/30 font-bold uppercase tracking-widest font-mono">
                                       SCRIPT CODE WINDOW
                                    </div>
                                    <pre className="font-mono text-[10.5px] leading-relaxed text-slate-300/95 overflow-x-auto select-all max-h-56 pr-2 scrollbar-thin">
                                       <code>{item.codeToCopy}</code>
                                    </pre>
                                 </div>

                                 {/* Output Metadata information */}
                                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="text-[10px] text-white/40 font-sans">
                                       <strong className="text-[#00F0FF] font-mono block text-[9px] uppercase">// RETORNO ESPERADO DO COMPILADOR:</strong>
                                       {item.outputFormat}
                                    </div>

                                    <button
                                       onClick={() => handleCopy(item.codeToCopy, item.id)}
                                       className={`cursor-target px-8 py-3 font-mono text-[11px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto ${
                                         isCopied 
                                           ? 'bg-[#00F0FF] border-[#00F0FF] text-black font-bold animate-pulse' 
                                           : 'bg-black/60 border-white/10 hover:border-[#00F0FF]/60 hover:bg-[#00F0FF]/10 text-white/80 hover:text-white'
                                       }`}
                                    >
                                      {isCopied ? (
                                        <>
                                          <Check size={12} strokeWidth={2.5} />
                                          <span>PROJETO COPIADO! EXECUTE DIRETAMENTE</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy size={12} />
                                          <span>[ COPIAR SCRIPT DE EXECUÇÃO DIRETA ]</span>
                                        </>
                                      )}
                                    </button>
                                 </div>
                               </div>
                             );
                           })
                         )}
                       </motion.div>
                     )}

                     {/* TAB 5: HACKS DE PRODUTIVIDADE */}
                     {activeTab === 'productivity' && (
                       <motion.div 
                         key="productivity"
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.25 }}
                         className="flex flex-col gap-6"
                       >
                         {filteredProductivity.length === 0 ? (
                           <div className="text-center py-16 border border-dashed border-white/10 text-white/30 text-xs">
                              NENHUM HACK DE PRODUTIVIDADE ENCONTRADO PARA "{searchQuery.toUpperCase()}"
                           </div>
                         ) : (
                           filteredProductivity.map((item) => {
                             const isCopied = copiedId === item.id;
                             return (
                               <div 
                                 key={item.id}
                                 className="border border-white/10 bg-[#0B1221]/70 p-6 rounded-[2px] hover:border-[#FF4500]/40 transition-all duration-300"
                               >
                                 <div className="flex flex-col justify-between mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                       <span className="text-[8px] font-bold uppercase tracking-widest text-[#FF4500] border border-[#FF4500]/20 px-2 py-0.5 rounded-[2px] bg-[#FF4500]/5">
                                          METODOLOGIA: {item.framework}
                                       </span>
                                    </div>
                                    <h3 className="text-base font-black uppercase text-white tracking-wide">{item.title}</h3>
                                 </div>

                                 {/* Scenario & Result Details */}
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 font-sans text-[11px] leading-relaxed">
                                    <div className="p-3 bg-black/40 border border-white/5 rounded-[2px]">
                                       <strong className="text-[#FF4500] font-mono text-[9px] tracking-wider block mb-1 uppercase">// CENÁRIO OPERACIONAL:</strong>
                                       <span className="text-white/70">{item.scenario}</span>
                                    </div>
                                    <div className="p-3 bg-black/40 border border-white/5 rounded-[2px]">
                                       <strong className="text-[#00F0FF] font-mono text-[9px] tracking-wider block mb-1 uppercase">// ENTREGÁVEL DA I.A.:</strong>
                                       <span className="text-white/70">{item.expectedResult}</span>
                                    </div>
                                 </div>

                                 {/* Copy Prompt block */}
                                 <div className="bg-[#03060C] border border-white/10 p-4 rounded-[2px] mb-4">
                                    <div className="text-[8px] text-white/40 font-bold uppercase tracking-widest mb-2 font-mono">
                                       STRUCTURED COPILOT INSTRUCTIONS
                                    </div>
                                    <div className="text-[11px] leading-relaxed text-slate-300 font-mono select-all break-words max-h-40 overflow-y-auto pr-2 scrollbar-thin">
                                       {item.promptToCopy}
                                    </div>
                                 </div>

                                 <button
                                     onClick={() => handleCopy(item.promptToCopy, item.id)}
                                     className={`cursor-target w-full py-3 px-4 font-mono text-[11px] font-black uppercase tracking-widest border rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 ${
                                       isCopied 
                                         ? 'bg-[#FF4500] border-[#FF4500] text-white font-bold animate-pulse' 
                                         : 'bg-black/55 border-white/10 hover:border-[#FF4500]/60 hover:bg-[#FF4500]/10 text-white/80 hover:text-white'
                                     }`}
                                 >
                                   {isCopied ? (
                                     <>
                                       <Check size={12} strokeWidth={2.5} />
                                       <span>DETALHAMENTO COPIADO! COLOQUE NA I.A. AGORA</span>
                                     </>
                                   ) : (
                                     <>
                                       <Copy size={12} />
                                       <span>[ COPIAR PROMPT DE ACELERAÇÃO OPERACIONAL ]</span>
                                     </>
                                   )}
                                 </button>
                               </div>
                             );
                           })
                         )}
                       </motion.div>
                     )}
                 </AnimatePresence>
             </div>
          </div>
        </div>

        {/* HUD Frame Footer */}
        <footer className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[9px] tracking-widest text-white/30 uppercase font-mono">
          <span>INUX FORTY7 ECOSYSTEM // COPYRIGHT 2026</span>
          <div className="flex gap-4 mt-3 sm:mt-0">
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
