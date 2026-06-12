import fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf8');

// List items on mobile: make them taller/better touch targets
content = content.replace(/text-left p-2 border transition-all/g, 'text-left p-3 sm:p-2 border transition-all');
content = content.replace(/relative p-2 border text-left/g, 'relative p-3 sm:p-2 border text-left');

// Model "grid grid-cols-1 sm:grid-cols-2 gap-2.5" is fine.
// Ensure code blocks font on mobile is a bit more readable
content = content.replace(/text-\[11px\] leading-relaxed text-white\/95/g, 'text-[12px] sm:text-[11px] leading-relaxed text-white/95');

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
