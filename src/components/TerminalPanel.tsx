import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Box, Triangle, Scissors, Image as ImageIcon, Code2 } from 'lucide-react';

const TerminalPanel = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050B14] font-mono text-white overflow-y-auto overflow-x-hidden selection:bg-[#00F0FF] selection:text-black">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_0%,rgba(0,0,0,0.8)_100%)]"></div>
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0,240,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Decorative corners */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00F0FF]/40 pointer-events-none z-50"></div>
      <div className="fixed top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00F0FF]/40 pointer-events-none z-50"></div>
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00F0FF]/40 pointer-events-none z-50"></div>
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00F0FF]/40 pointer-events-none z-50"></div>

      {/* Vertical Side Texts */}
      <div className="hidden lg:flex fixed left-4 top-0 bottom-0 items-center justify-center pointer-events-none z-10">
         <span className="text-[10px] text-white/20 tracking-[0.3em] font-medium whitespace-nowrap rotate-180" style={{ writingMode: 'vertical-rl' }}>
            47x MAIS RÁPIDO. COPIE. COLE. DOMINE.
         </span>
      </div>
      <div className="hidden lg:flex fixed right-4 top-0 bottom-0 items-center justify-center pointer-events-none z-10">
         <span className="text-[10px] text-white/20 tracking-[0.3em] font-medium whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
            47x MAIS RÁPIDO. COPIE. COLE. DOMINE.
         </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10 min-h-screen flex flex-col">
        
        {/* Helper close button just in case */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-8 text-white/50 hover:text-white transition-colors z-50 text-xs tracking-widest uppercase border border-white/10 px-3 py-1 bg-black/50"
        >
          [ FECHAR SESSÃO ]
        </button>

        {/* Header */}
        <header className="flex flex-col items-center mb-12 mt-4 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-1.5 text-[#00F0FF]/60 blur-[0.5px]">
               <div className="w-[3px] h-4 bg-current -skew-x-12"></div>
               <div className="w-[3px] h-4 bg-current -skew-x-12"></div>
               <div className="w-[3px] h-4 bg-current -skew-x-12"></div>
            </div>
            <div className="flex items-center gap-2 border-l-2 border-[#00F0FF] pl-3">
              <span className="text-xl md:text-2xl font-black tracking-widest text-[#00F0FF] drop-shadow-[0_0_8px_#00F0FF]">INUX</span>
              <span className="text-xl md:text-2xl font-black tracking-widest text-[#FF0055] drop-shadow-[0_0_8px_#FF0055]">FORTY7</span>
            </div>
            <div className="flex gap-1.5 text-[#00F0FF]/60 blur-[0.5px]">
               <div className="w-[3px] h-4 bg-current -skew-x-12"></div>
               <div className="w-[3px] h-4 bg-current -skew-x-12"></div>
               <div className="w-[3px] h-4 bg-current -skew-x-12"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.2em] text-white/60 mb-6 w-full max-w-3xl">
             <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#00F0FF]/30"></div>
             <span className="px-2">OPERATIONAL TERMINAL - COFRE DESTRAVADO</span>
             <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#00F0FF]/30"></div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[72px] font-black tracking-tight text-center leading-[0.9] text-[#F4F4F5] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] max-w-5xl">
            COFRE DESTRAVADO.<br />ACESSO ROOT ATIVO.
          </h1>
        </header>

        {/* Main Content Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Left Column: Operator Terminal */}
          <div className="col-span-1 lg:col-span-4 flex flex-col">
             <div className="border border-white/10 bg-[#0B1221]/80 backdrop-blur-md flex flex-col mb-4 overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                {/* Top Bar */}
                <div className="bg-[#151E2E] border-b border-white/10 px-3 py-2 flex items-center justify-between">
                   <span className="text-[10px] tracking-widest uppercase font-bold text-white/70">COMIC</span>
                   <div className="flex items-center gap-2">
                     <div className="w-2.5 h-[2px] bg-white/40"></div>
                     <div className="w-2 h-2 border border-white/40"></div>
                     <div className="text-white/40 text-[10px] leading-none">X</div>
                   </div>
                </div>
                {/* Image Area */}
                <div className="relative aspect-[4/5] w-full bg-black/40 overflow-hidden group">
                   <div className="absolute inset-0 bg-[#00F0FF]/5 mix-blend-overlay z-10 pointer-events-none"></div>
                   {/* Fallback image if asset is missing */}
                   <div className="absolute inset-0 flex items-center justify-center bg-[#1e0524] z-0">
                     <ImageIcon className="text-[#FF0055]/20 w-32 h-32" />
                   </div>
                   <img 
                     src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1000&auto=format&fit=crop" 
                     alt="Operador" 
                     className="absolute inset-0 w-full h-full object-cover object-center relative z-0 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                   />
                   {/* Scanline overlay */}
                   <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,240,255,0.05)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
                </div>
                {/* Status Bar */}
                <div className="px-3 py-2.5 bg-[#080D18] border-t border-white/10 flex items-center gap-2">
                   <span className="text-[10px] uppercase text-white/50 tracking-widest">STATUS.</span>
                   <span className="text-[10px] uppercase text-[#00F0FF] font-bold tracking-widest drop-shadow-[0_0_5px_#00F0FF]">OPERADOR INVISÍVEL - ATIVO</span>
                </div>
             </div>

             {/* Code Logs */}
             <div className="flex-1 border border-white/10 bg-[#080D18]/80 backdrop-blur-sm p-4 relative overflow-hidden hidden sm:block">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#00F0FF] via-[#FF0055]/50 to-transparent"></div>
                <div className="text-[8px] md:text-[9px] text-[#00F0FF]/60 font-mono leading-[1.7] opacity-70">
                   <p>&gt; Initializing protocol [INUX-47]...</p>
                   <p>&gt; Establishing secure connection...</p>
                   <p>&gt; Connection established. Latency: 12ms</p>
                   <p>&gt; Decrypting visual assets...</p>
                   <p>&gt; [SUCCESS] 47 core prompts unlocked.</p>
                   <p>&gt; Bypassing standard limitations...</p>
                   <p className="text-[#FF0055]">&gt; WARNING: High voltage creative output detected.</p>
                   <p>&gt; Routing power to rendering engine...</p>
                   <p>&gt; System status: OPTIMAL.</p>
                   <p className="animate-pulse">&gt; _</p>
                </div>
             </div>
          </div>

          {/* Right Column: Modules Grid */}
          <div className="col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            
            {/* Card 1 */}
            <div className="cursor-target relative border border-white/10 bg-[#0B1221]/60 backdrop-blur-sm p-6 group flex flex-col overflow-hidden hover:bg-[#0B1221]/90 hover:border-[#FF0055]/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F0FF] to-[#FF0055] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {/* Cracked glass subtle bg */}
              <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M100 100 L50 20 M100 100 L180 50 M100 100 L150 180 M100 100 L20 150 M100 100 L90 10 M100 100 L190 110\' stroke=\'%23ffffff\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")', backgroundSize: '150% 150%', backgroundPosition: 'center' }}></div>
              
              <div className="flex gap-4 mb-6 relative z-10">
                <div className="w-12 h-10 border border-[#FF0055]/30 bg-black flex justify-center items-center rounded-sm">
                  <Terminal size={20} className="text-[#FF0055]" />
                </div>
                <div className="w-12 h-10 border border-[#FF0055]/30 bg-black flex justify-center items-center rounded-sm" style={{ transform: 'perspective(100px) rotateY(15deg) rotateX(10deg)' }}>
                  <Box size={24} className="text-[#FF0055] stroke-[1.5px]" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white mb-3 relative z-10 drop-shadow-md">
                O CÓDIGO VISUAL
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 flex-1 relative z-10">
                Os 47 comandos testados que geram visuais de alto padrão. Seus concorrentes parecerão amadores.
              </p>
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-[10px] w-fit font-bold uppercase tracking-widest text-[#FF0055] border border-[#FF0055]/30 px-2 py-1 bg-[#FF0055]/5">Engenharia Visual Direta</span>
                <span className="text-[10px] w-fit font-bold uppercase tracking-widest text-[#FFF] border border-white/20 px-2 py-1 bg-white/5 opacity-80">[cite: EXECUÇÃO: CELULAR & PC]</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="cursor-target relative border border-white/10 bg-[#0B1221]/60 backdrop-blur-sm p-6 group flex flex-col overflow-hidden hover:bg-[#0B1221]/90 hover:border-[#00F0FF]/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0055] to-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 50 L150 150 M150 50 L50 150 M100 0 L100 200 M0 100 L200 100\' stroke=\'%23ffffff\' stroke-width=\'0.2\' fill=\'none\'/%3E%3C/svg%3E")', backgroundSize: '100% 100%' }}></div>
              
              <div className="flex gap-4 mb-6 relative z-10">
                <div className="w-12 h-10 border border-white/30 bg-black flex justify-center items-center rounded-xl">
                  <Scissors size={20} className="text-white" />
                </div>
                <div className="w-12 h-10 border border-[#00F0FF]/30 bg-[#0B203B] flex justify-center items-center rounded-sm">
                  <span className="text-[#00F0FF] font-black tracking-tighter text-lg">Ps</span>
                </div>
                <div className="w-12 h-10 border border-white/30 bg-black flex justify-center items-center rounded-sm">
                  <Triangle size={18} fill="white" className="text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white mb-3 relative z-10 drop-shadow-md">
                PÓS-PRODUÇÃO TÁTICA
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 flex-1 relative z-10">
                Estruturas prontas para aplicar. Prenda a atenção nos primeiros 3 segundos de vídeo.
              </p>
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-[10px] w-fit font-bold uppercase tracking-widest text-[#FF0055] border border-[#FF0055]/30 px-2 py-1 bg-[#FF0055]/5">Engenharia Visual Direta</span>
                <span className="text-[10px] w-fit font-bold uppercase tracking-widest text-[#FFF] border border-white/20 px-2 py-1 bg-white/5 opacity-80">[cite: EXECUÇÃO: Edição Mobile/PC]</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="cursor-target relative border border-white/10 bg-[#0B1221]/60 backdrop-blur-sm p-6 group flex flex-col overflow-hidden hover:bg-[#0B1221]/90 hover:border-[#FF0055]/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF0055] to-[#FF4500] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex gap-4 mb-6 relative z-10 items-end">
                <div className="w-12 h-10 border border-white/30 bg-black flex justify-center items-center rounded-xl">
                  <Scissors size={20} className="text-white" />
                </div>
                <div className="w-12 h-16 border border-[#FF0055]/40 bg-black flex justify-center items-center flex-col relative">
                   <Triangle size={20} className="text-[#FF0055] -mt-4 absolute" />
                   <Box size={24} className="text-[#FF0055] absolute bottom-2" />
                </div>
                <div className="w-12 h-10 border border-[#00F0FF]/30 bg-[#0B203B] flex justify-center items-center rounded-sm">
                  <span className="text-[#00F0FF] font-black tracking-tighter text-lg">Ps</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white mb-3 relative z-10 drop-shadow-md">
                O FILTRO DE CLIENTES
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 flex-1 relative z-10">
                A arquitetura secreta para separar curiosos de quem paga bem. Feche projetos caros sem implorar.
              </p>
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-[10px] w-fit font-bold uppercase tracking-widest text-[#FF0055] border border-[#FF0055]/30 px-2 py-1 bg-[#FF0055]/5">Engenharia Visual Direta</span>
                <span className="text-[10px] w-fit font-bold uppercase tracking-widest text-[#FFF] border border-white/20 px-2 py-1 bg-white/5 opacity-80">[cite: ESTAÇÃO DE COMANDO]</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="cursor-target relative border border-white/10 bg-[#0B1221]/60 backdrop-blur-sm p-6 group flex flex-col overflow-hidden hover:bg-[#0B1221]/90 hover:border-white/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex gap-4 mb-6 relative z-10 items-center justify-center p-3 bg-black/40 border border-white/5 w-fit rounded-lg">
                <Triangle size={16} fill="white" className="text-white" />
                <span className="text-white font-bold tracking-tight">Code</span>
                <Triangle size={16} fill="white" className="text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white mb-3 relative z-10 drop-shadow-md">
                A MÁQUINA FANTASMA
              </h3>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 flex-1 relative z-10">
                Domine a automação oculta. Deixe os sistemas fazerem o trabalho pesado enquanto você foca em ganhar dinheiro.
              </p>
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-[10px] w-fit font-bold uppercase tracking-widest text-[#FF0055] border border-[#FF0055]/30 px-2 py-1 bg-[#FF0055]/5">Engenharia Visual Direta</span>
                <span className="text-[10px] w-fit font-bold uppercase tracking-widest text-[#FFF] border border-white/20 px-2 py-1 bg-white/5 opacity-80">[cite: EXECUÇÃO: CELULAR & PC]</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TerminalPanel;
