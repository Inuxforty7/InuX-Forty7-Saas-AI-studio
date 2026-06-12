import * as fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

// Use simple string replacement
content = content.replace(
  'h-[calc(100dvh-180px)] lg:h-full lg:min-h-0 overflow-hidden flex-col justify-start lg:justify-between',
  'h-auto lg:h-full lg:min-h-0 overflow-visible flex-col justify-start lg:justify-between'
);

content = content.split('flex-1 h-[70vh] lg:h-full max-h-full').join('h-auto lg:h-full flex-col lg:min-h-0 justify-start lg:justify-between');
content = content.split('h-[calc(100dvh-180px)]').join('h-auto lg:h-full');

content = content.replace(
  /overflow-y-auto custom-scroll/g,
  'overflow-visible lg:overflow-y-auto custom-scroll'
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
