import * as fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

content = content.replace(
  />SYSTEM DATA /g,
  '>INSTRUÇÕES E DADOS '
);

content = content.replace(
  /> SYSTEM: OMNI /g,
  '> SISTEMA: FLUXO DE PUBLICAÇÃO OMNI '
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
console.log('Fixed Header / Navigation texts');
