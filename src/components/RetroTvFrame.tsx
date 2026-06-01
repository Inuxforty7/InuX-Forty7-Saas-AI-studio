import React from 'react';

export default function RetroTvFrame() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[43] select-none">
      
      {/* 0. CRT Phosphor Mesh overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '3px 3px' }}
      ></div>

      {/* 1. Curved Glass Screen Tube Glare Reflection */}
      <div 
        className="absolute pointer-events-none z-20 opacity-30 sm:rounded-[20px] md:rounded-[40px] overflow-hidden"
        style={{
          top: 'calc(max(18px, 3vh) + env(safe-area-inset-top, 0px))',
          bottom: 'calc(max(18px, 3vh) + env(safe-area-inset-bottom, 0px))',
          left: 'max(18px, 4vw)',
          right: 'max(18px, 4vw)',
          borderRadius: '24px',
          background: 'radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.9), inset 3px 3px 15px rgba(255,255,255,0.05)'
        }}
      />

      {/* 2. Main Outer Chassis (Responsive Frame) */}
      {/* On mobile: the frame has thick dark side panels resembling the vintage 20k2 television bezel. */}
      {/* On desktop: standard high-tech arcade bezel layout. */}
      <div className="absolute inset-0 flex p-0">
        
        {/* LEFT LATERAL BEZEL (Borda Lateral Esquerda) */}
        <div 
          className="w-[18px] sm:w-[22px] md:w-[4vw] lg:w-[6vw] xl:w-[8vw] h-full flex flex-col justify-between items-center py-10 md:py-8 relative z-30"
          style={{
            background: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
              linear-gradient(90deg, #09030b 0%, #170521 10%, #100318 80%, #0a010d 95%, #020003 100%)
            `,
            boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.8), inset 1px 0 1px rgba(255,255,255,0.05)'
          }}
        >
          {/* Vertical calibration lines & ticks representing 20k2 retro TV scale */}
          <div className="flex flex-col gap-1 items-center opacity-40 mt-12">
            <span className="font-mono text-[6px] sm:text-[7px] text-[#FF4500] tracking-widest uppercase mb-4 whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>// V-GRID</span>
            <div className="w-1 md:w-1.5 h-0.5 bg-white/50"></div>
            <div className="w-0.5 h-0.5 bg-white/30"></div>
            <div className="w-0.5 h-0.5 bg-white/30"></div>
            <div className="w-1 md:w-1.5 h-0.5 bg-[#FF4500]/80"></div>
            <div className="w-0.5 h-0.5 bg-white/30"></div>
            <div className="w-0.5 h-0.5 bg-white/30"></div>
            <div className="w-1 h-0.5 bg-white/50"></div>
          </div>
          
          {/* Middle vertical grille dots */}
          <div className="flex flex-col gap-2 opacity-15">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-[3px] h-[3px] rounded-full bg-white"></div>
            ))}
          </div>

          {/* Bottom vertical coordinate calibration */}
          <div className="font-mono text-[6px] sm:text-[7px] text-white/30 uppercase tracking-widest mt-auto mb-12 select-none whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Y-CALB .20K2
          </div>
        </div>

        {/* SCREEN CENTRAL VIEWPORT BOUNDARY MASK */}
        <div className="flex-1 h-full flex flex-col justify-between relative">
          
          {/* TOP BEZEL */}
          <div 
            className="w-full flex justify-between items-center px-8 sm:px-10 relative z-30"
            style={{
              minHeight: 'calc(22px + env(safe-area-inset-top, 0px))',
              paddingTop: 'env(safe-area-inset-top, 0px)',
              background: `
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
                linear-gradient(180deg, #120317 0%, #170521 10%, #100318 80%, #0a010d 95%, #020003 100%)
              `,
              boxShadow: 'inset 0 -2px 10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.05)'
            }}
          >
            <div className="font-mono text-[6px] sm:text-[7px] text-white/40 tracking-widest uppercase md:text-[10px]">
              CRT_20K2_SYS
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#00F0FF] animate-pulse"></span>
              <span className="font-mono text-[6px] text-[#00F0FF]/80 scale-90">SIGNAL: PROT-47</span>
            </div>
          </div>

          {/* CENTER VIEWPORT INNER CURVED GLASS SHADOW */}
          {/* This applies massive depth to the glass overlay so it feels like you're looking into a volumetric old bulb TV */}
          <div 
            className="flex-1 w-full relative z-10 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] md:shadow-[inset_0_0_150px_rgba(0,0,0,1),inset_0_0_80px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(255,69,0,0.1)] border-transparent md:border-[#000000cc] border-0 md:border-[2px] rounded-[24px]" 
            style={{
              background: 'radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0.4) 100%)'
            }}
          >
            {/* Dark inner rubber/plastic lip around the CRT tube */}
            <div className="absolute inset-0 border-0 md:border-[6px] border-[#0a020d] rounded-[24px] pointer-events-none shadow-[inset_0_0_5px_rgba(0,0,0,0.5)] md:shadow-[inset_0_0_25px_rgba(0,0,0,0.95),0_0_5px_rgba(0,0,0,0.8)] z-20"></div>

          </div>

          {/* BOTTOM BEZEL */}
          <div 
            className="w-full flex justify-between items-center px-8 sm:px-10 relative z-30"
            style={{
              minHeight: 'calc(22px + env(safe-area-inset-bottom, 0px))',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              background: `
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
                linear-gradient(0deg, #09030b 0%, #170521 10%, #100318 80%, #0a010d 95%, #020003 100%)
              `,
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.8), inset 0 -1px 1px rgba(255,255,255,0.05)'
            }}
          >
            <span className="font-mono text-[6px] sm:text-[7px] md:text-[9px] text-white/30">© INUX FORTY7 VTR</span>
            <div className="font-mono text-[6px] sm:text-[7px] text-[#FF4500]/70 animate-pulse">
              SYNC_READY // SCROLL ENGINE
            </div>
          </div>

        </div>

        {/* RIGHT LATERAL BEZEL (Borda Lateral Direita) */}
        {/* On mobile and desktop, this holds the retro hardware physical console aesthetic: speaker grills, dials, model tag, glowing neon LED */}
        <div 
          className="w-[18px] sm:w-[22px] md:w-[4vw] lg:w-[6vw] xl:w-[8vw] h-full flex flex-col justify-between items-center py-10 md:py-8 relative z-30"
          style={{
            background: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
              linear-gradient(270deg, #09030b 0%, #170521 10%, #100318 80%, #0a010d 95%, #020003 100%)
            `,
            boxShadow: 'inset 2px 0 10px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.05)'
          }}
        >
          
          {/* Model Tag - Rotated block resembling vintage monitor plaques */}
          <div className="flex flex-col items-center gap-1 mt-6">
            <span className="font-mono text-[6px] md:text-[8px] text-[#FF4500] font-black tracking-wider my-3 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
              MODEL 20K2
            </span>
          </div>

          {/* Vent Grille Slots */}
          <div className="flex flex-col gap-1 sm:gap-1.5 opacity-25">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-1 sm:w-1.5 h-[1.5px] bg-white rounded-full"></div>
            ))}
          </div>

          {/* Symmetrical rotary calibration dials (vintage television knobs) */}
          <div className="flex flex-col gap-4 my-2 relative z-20 opacity-60">
            {/* Top Mini-dial */}
            <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border border-white/30 bg-[#0f0a14] relative flex items-center justify-center">
              <div className="w-0.5 h-1.5 bg-[#FF4500] absolute top-0 rounded-full origin-bottom rotate-45"></div>
            </div>
            {/* Bottom Mini-dial */}
            <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border border-white/30 bg-[#0f0a14] relative flex items-center justify-center">
              <div className="w-0.5 h-1.5 bg-white/60 absolute top-0 rounded-full origin-bottom -rotate-30"></div>
            </div>
          </div>

          {/* Retro Power neon indicator light that glows amber/orange (Neon bulb look) */}
          <div className="flex flex-col items-center gap-1.5 mb-6">
            <div className="relative">
              {/* Outer Amber Radial Glow Ring */}
              <div className="absolute -inset-1.5 rounded-full bg-[#FF4500] opacity-40 blur-[5px] animate-pulse"></div>
              {/* Core Hot bulb */}
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF7F50] border border-[#FF4500] relative z-10 box-shadow-[0_0_10px_#FF4500]"></div>
            </div>
            <span className="font-mono text-[5px] sm:text-[6px] text-white/40 tracking-widest uppercase mt-4 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>POWER</span>
          </div>

        </div>

      </div>

    </div>
  );
}
