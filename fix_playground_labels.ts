import * as fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

// The Title of the rightmost playground in Desktop or at the bottom in mobile
content = content.replace(
  /\[ LIVE PLAYGROUND \/ MODEL SIMULATOR \]/g,
  '[ TESTE INSTANTÂNEO DE MODELO ]'
);
content = content.replace(
  /MODEL OUTPUT LOG/g,
  'RESULTADO DA INTELIGÊNCIA ARTIFICIAL'
);
content = content.replace(
  /CODE & DESIGN/g,
  'GERAÇÃO DE CÓDIGO E DESIGN'
);
content = content.replace(
  /COPYWRITING/g,
  'ESCRITA E TEXTO'
);
content = content.replace(
  /CONTEXT & LOGIC/g,
  'LÓGICA E CONTEXTO'
);
content = content.replace(
  /<span className="text-\[8\.5px\] uppercase tracking-wide text-white\/40 mt-1 truncate">/g,
  '<span className="text-[10px] uppercase tracking-wide text-white/50 mt-1 truncate">'
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
console.log('Fixed Playground labels');
