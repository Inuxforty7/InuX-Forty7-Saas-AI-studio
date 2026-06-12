import * as fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

// The Voltar para lista button classes
content = content.replace(
  /className="lg:hidden text-\[#FF4500\] hover:text-white flex items-center gap-1\.5 font-mono text-\[10px\] uppercase font-bold self-start bg-white\/5 px-3 py-2\.5 rounded-\[1px\] border border-white\/5 active:scale-95 transition-all( mb-2| w-fit mb-1)?"/g,
  'className="lg:hidden text-[#FF4500] hover:text-white flex items-center justify-center gap-2 font-mono text-[12px] uppercase font-bold w-full bg-[#FF4500]/10 px-4 py-3 rounded-[2px] border border-[#FF4500]/30 active:scale-95 transition-all mb-4"'
);

// Mobile Tabs
content = content.replace(
  /className={`snap-center shrink-0 flex items-center gap-1\.5 px-3 py-2 border rounded-\[2px\] font-mono text-\[10px\] font-black uppercase tracking-wider transition-all duration-200 active:scale-95 \${/g,
  'className={`snap-center shrink-0 flex items-center gap-2 px-4 py-3 border rounded-[2px] font-mono text-[11.5px] font-black uppercase tracking-wider transition-all duration-200 active:scale-95 ${'
);

// Desktop Tabs
content = content.replace(
  /className={`cursor-target group relative w-full text-left p-2\.5 border transition-all duration-200 flex items-center gap-2 rounded-\[2px\] active:scale-95`}/g,
  'className={`cursor-target group relative w-full text-left p-3.5 border transition-all duration-200 flex items-center gap-3 rounded-[2px] active:scale-95`}'
);
content = content.replace(
  /<span className="text-\[10px\] font-bold tracking-wider uppercase leading-none mb-1">/g,
  '<span className="text-[11.5px] font-bold tracking-wider uppercase leading-none mb-1">'
);

// Prompts Left Sidebar items
content = content.replace(
  /className={`text-left p-3 sm:p-2 border transition-all duration-150 flex flex-col rounded-\[2px\] active:scale-98 select-target \${/g,
  'className={`text-left p-4 sm:p-3 border transition-all duration-150 flex flex-col rounded-[2px] active:scale-98 select-target ${'
);
content = content.replace(
  /<span className="text-\[10px\] font-black tracking-wide uppercase truncate block leading-tight">\{item.title\}<\/span>/g,
  '<span className="text-[11.5px] font-black tracking-wide uppercase truncate block leading-tight">{item.title}</span>'
);
content = content.replace(
  /<span className="text-\[8px\] text-white\/35 uppercase mt-0\.5 tracking-wider truncate">\{item.idealModel\}<\/span>/g,
  '<span className="text-[9.5px] text-white/40 uppercase mt-1 tracking-wider truncate">{item.idealModel}</span>'
);
content = content.replace(
  /<span className="text-\[10px\] font-black tracking-wide uppercase truncate block leading-tight">\{model.name\}<\/span>/g,
  '<span className="text-[11.5px] font-black tracking-wide uppercase truncate block leading-tight">{model.name}</span>'
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
console.log('Fixed UI in TerminalPanel.tsx');
