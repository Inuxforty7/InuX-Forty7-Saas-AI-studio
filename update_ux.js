import fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf8');

// General Typography & Spacing Optimizations for Mobile

// 1. Descriptions: Make them hidden on mobile or very small, so focus is on action.
content = content.replace(/className="text-\[11\.5px\] text-white\/50 leading-relaxed font-sans mt-1"/g, 'className="hidden sm:block text-[11.5px] text-white/50 leading-relaxed font-sans mt-1"');
content = content.replace(/className="text-\[11px\] text-white\/40 leading-relaxed font-sans border-l border-\[\#FF4500\]\/40 pl-2"/g, 'className="hidden sm:block text-[11px] text-white/40 leading-relaxed font-sans border-l border-[#FF4500]/40 pl-2"');

// Focus on Buttons: Make action buttons taller on mobile for better touch target
// Let's identify the button replacements safely.
content = content.replace(/cursor-target py-2 px-3 /g, "cursor-target py-3 sm:py-2 px-3 ");

// Thumbnails: reduce height on mobile, or just hide them. Let's hide thumbnails on mobile.
content = content.replace(/className="relative w-full h-24 rounded/g, 'className="relative w-full h-24 rounded hidden sm:flex');

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
