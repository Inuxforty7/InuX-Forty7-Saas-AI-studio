import * as fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

// Update labels
content = content.replace(
  /label: 'WORKFLOWS & AGENTS'/g,
  "label: 'TUTORIAIS & WORKFLOWS'"
);
content = content.replace(
  /label: 'AI MODELS'/g,
  "label: 'MODELOS DE INTELIGÊNCIA ARTIFICIAL'"
);

content = content.replace(
  /desc: 'Build worlds, images and robust agents'/g,
  "desc: 'Passo a passo para gerar seu site ou imagens'"
);
content = content.replace(
  /desc: 'Curadoria de modelos líderes'/g,
  "desc: 'Veja e compare as inteligências artificiais'"
);

content = content.replace(
  /SELECIONE O MODELO/g,
  "1. SELECIONE UM WORKFLOW"
);
content = content.replace(
  /SELECIONE O SISTEMA CHIP/g,
  "SELECIONE UM MODELO IA"
);

// Top tabs font size
content = content.replace(
  /text-\[11\.5px\] font-bold tracking-wider uppercase leading-none/g,
  'text-[13px] font-bold tracking-wider uppercase leading-none'
);
content = content.replace(
  /text-\[7\.5px\] tracking-wide text-white\/30/g,
  'text-[9px] tracking-wide text-white/40' // Description below tab
);

// Make lists items larger
content = content.replace(
  /text-\[11\.5px\] font-black tracking-wide uppercase truncate block/g,
  'text-[14px] font-black tracking-wide uppercase truncate block'
);

content = content.replace(
  /text-\[9\.5px\] text-white\/40 uppercase mt-1 tracking-wider/g,
  'text-[11px] text-white/50 uppercase mt-1.5 tracking-wider'
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
console.log('Mobile layout tweaks applied');
