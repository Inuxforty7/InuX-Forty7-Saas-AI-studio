import fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf8');

// General Typography & Spacing Optimizations for Mobile

// Hide or shrink descriptive non-action texts on mobile.
// For descriptions in Prompts and other tabs
content = content.replace(/className="text-\[11\.5px\] text-white\/50 leading-relaxed font-sans mt-1"/g, 'className="hidden sm:block text-[11.5px] text-white/50 leading-relaxed font-sans mt-1"');
content = content.replace(/className="text-\[11px\] text-white\/40 leading-relaxed font-sans border-l border-\[\#FF4500\]\/40 pl-2"/g, 'className="hidden sm:block text-[11px] text-white/40 leading-relaxed font-sans border-l border-[#FF4500]/40 pl-2"');

// For models descriptions
content = content.replace(/className="text-\[11px\] text-slate-350 leading-relaxed font-sans mt-0\.5"/g, 'className="hidden sm:block text-[11px] text-slate-350 leading-relaxed font-sans mt-0.5"');

// For other descriptions in Creations, Automations, Productivity
content = content.replace(/className="text-\[11px\] text-slate-350 leading-relaxed font-sans mt-1\.5 mb-3"/g, 'className="hidden sm:block text-[11px] text-slate-350 leading-relaxed font-sans mt-1.5 mb-3"');
content = content.replace(/className="text-\[11px\] text-slate-350 leading-relaxed font-sans"/g, 'className="hidden sm:block text-[11px] text-slate-350 leading-relaxed font-sans"');

// Make action buttons taller on mobile for better touch targets
content = content.replace(/cursor-target py-2 px-3 font-mono/g, "cursor-target py-3 sm:py-2 px-3 font-mono");

// Hide thumbnails on mobile to bring focus straight to the prompt
content = content.replace(/className="relative w-full h-24 rounded/g, 'className="relative w-full h-24 rounded hidden sm:flex');

// Ensure that "back to list" button is prominent enough on mobile
content = content.replace(/className="lg:hidden text-\[\#FF4500\] hover:text-white flex items-center gap-1\.5 font-mono text-\[10px\] uppercase font-bold self-start bg-white\/5 px-2 py-1\.5 rounded-\[1px\] border/g, 'className="lg:hidden text-[#FF4500] hover:text-white flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold self-start bg-white/5 px-3 py-2.5 rounded-[1px] border');

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
