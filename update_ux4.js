import fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf8');

// Prompt box should be taller on mobile for better viewing
content = content.replace(/max-h-\[110px\]/g, 'max-h-56 sm:max-h-[110px]');

// Hide "INSTRUÇÕES PRÁTICAS" entirely on mobile since it's just secondary text
content = content.replace(/className="text-\[11px\] text-white\/40 leading-relaxed font-sans border-l/g, 'className="hidden sm:block text-[11px] text-white/40 leading-relaxed font-sans border-l');
content = content.replace(/className="hidden sm:block hidden sm:block/g, 'className="hidden sm:block');

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
