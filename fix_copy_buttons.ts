import * as fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

// Copy Buttons Size
content = content.replace(
  /text-\[8px\] font-mono font-bold text-white uppercase tracking-wider rounded-\[1px\] transition-all/g,
  'text-[10px] sm:text-[10.5px] font-mono font-bold text-white uppercase tracking-wider rounded-[1px] transition-all px-3 py-1.5'
);
content = content.replace(
  /px-2 py-1/g,
  'px-3 py-1.5'
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
console.log('Fixed Copy Buttons Typography in TerminalPanel.tsx');
