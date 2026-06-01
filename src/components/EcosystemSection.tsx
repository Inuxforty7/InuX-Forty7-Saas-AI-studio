import React from 'react';
import { Bot, Cpu, MonitorSmartphone, Workflow, Paintbrush, CloudLightning } from 'lucide-react';
import ShinyText from './ShinyText';

export default function EcosystemSection() {
  return (
    <section className="relative w-full bg-[#050106] text-white py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden font-sans border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(255,69,0,0.15)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto flex flex-col gap-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <ShinyText 
            text="ECOSSISTEMA COMPLETO" 
            className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.4em] mb-6 inline-block"
            color="#FF450099"
            shineColor="#FF4500"
            spread={80}
            speed={3}
          />
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter mb-8 leading-[1.1]">
            Ferramentas Conectadas.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Você no Controle.</span>
          </h2>
          <p className="text-white/70 font-secondary text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl">
            Tudo em um só lugar. Integrado, responsivo e projetado para escalas avançadas. Use a I.A. a seu favor sem pular de aba em aba. Do celular ao workstation.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[auto]">
          
          {/* Card 1: Central Tooling */}
          <div className="md:col-span-2 group relative flex flex-col bg-[#0f0111] border border-white/10 rounded-2xl md:rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden hover:border-[#FF4500]/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                 <Cpu className="text-[#FF4500] w-6 h-6" />
               </div>
               <h3 className="font-display font-bold text-2xl uppercase tracking-wider">Criação & Design IA</h3>
            </div>
            <p className="text-white/60 font-secondary text-base lg:text-lg mb-8 max-w-lg leading-relaxed">
              Google AI Studio para códigos, Google Stitch para web design, Flow para imagens e painel inteligente de Prompts via Chat. Tudo nativamente integrado na mesma interface de acesso.
            </p>
            
            {/* Visual Rep */}
            <div className="mt-auto pt-6 flex flex-wrap gap-3">
              {['AI Studio', 'Stitch', 'Flow', 'Prompts Pro'].map((tag) => (
                <div key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-black/40 font-mono text-xs uppercase tracking-widest text-white/80">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Responsiveness */}
          <div className="md:col-span-1 group relative flex flex-col bg-[#0f0111] border border-white/10 rounded-2xl md:rounded-3xl p-8 sm:p-10 overflow-hidden hover:border-[#FF4500]/50 transition-colors duration-500">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                 <MonitorSmartphone className="text-[#FF4500] w-6 h-6" />
               </div>
               <h3 className="font-display font-bold text-xl uppercase tracking-wider">Do Mobile ao PRO</h3>
            </div>
            <p className="text-white/60 font-secondary leading-relaxed mt-2">
              Seja pelo celular enviando referências rápidas ou pelo desktop montando automações pesadas: nossa interface molda-se ao seu nível de habilidade e hardware.
            </p>
          </div>

          {/* Card 3: Workflows */}
          <div className="md:col-span-1 group relative flex flex-col bg-[#0f0111] border border-white/10 rounded-2xl md:rounded-3xl p-8 sm:p-10 overflow-hidden hover:border-[#FF4500]/50 transition-colors duration-500">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                 <Workflow className="text-[#FF4500] w-6 h-6" />
               </div>
               <h3 className="font-display font-bold text-xl uppercase tracking-wider">Migração Fluida</h3>
            </div>
            <p className="text-white/60 font-secondary leading-relaxed mt-2">
              Envie projetos do Stitch para o AI Studio, ou migre do AI Studio para nossa build Antigravity. Links fluidos entre as ferramentas oficiais externas e o seu cofre local.
            </p>
          </div>

          {/* Card 4: Photoshop & Cinematics */}
          <div className="md:col-span-1 group relative flex flex-col bg-[#0f0111] border border-white/10 rounded-2xl md:rounded-3xl p-8 sm:p-10 overflow-hidden hover:border-[#FF4500]/50 transition-colors duration-500">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                 <Paintbrush className="text-[#FF4500] w-6 h-6" />
               </div>
               <h3 className="font-display font-bold text-xl uppercase tracking-wider">Edição Estratégica</h3>
            </div>
            <p className="text-white/60 font-secondary leading-relaxed mt-2">
              Gere imagens cinematográficas extremas do zero e direcione diretamente ao fluxo de edição robusto, refinando via Photoshop ou Flow com precisão cirúrgica.
            </p>
          </div>

          {/* Card 5: Deploy & Automação */}
          <div className="md:col-span-1 group relative flex flex-col bg-[#0f0111] border border-white/10 rounded-2xl md:rounded-3xl p-8 sm:p-10 overflow-hidden hover:border-[#FF4500]/50 transition-colors duration-500">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                 <Bot className="text-[#FF4500] w-6 h-6" />
               </div>
               <h3 className="font-display font-bold text-xl uppercase tracking-wider">Agents & Deploy</h3>
            </div>
            <p className="text-white/60 font-secondary leading-relaxed mt-2">
              Lance sua UI imediatamente conectada ao Vercel e ative Agentes de I.A. voltados para automação massiva de suas redes sociais em um clique.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
