import * as fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

// Prompt List Items
content = content.replace(
  /<span className="text-\[14px\] font-black tracking-wide uppercase truncate block leading-tight">\{item\.title\}<\/span>\s*<span className="text-\[11px\] text-white\/50 uppercase mt-1\.5 tracking-wider truncate">\{item\.idealModel\}<\/span>/g,
  '<div className="flex justify-between items-center w-full"><div className="flex flex-col overflow-hidden"><span className="text-[14px] font-black tracking-wide uppercase truncate block leading-tight">{item.title}</span><span className="text-[11px] text-white/50 uppercase mt-1.5 tracking-wider truncate">{item.idealModel}</span></div><ChevronRight size={16} className="text-white/20 flex-shrink-0" /></div>'
);

// Models List Items
content = content.replace(
  /<span className="text-\[14px\] font-black tracking-wide uppercase truncate block leading-tight">\{model\.name\}<\/span>\s*<span className="text-\[11px\] text-white\/50 uppercase mt-1\.5 tracking-wider truncate">\{model\.bestFor\}<\/span>/g,
  '<div className="flex justify-between items-center w-full"><div className="flex flex-col overflow-hidden"><span className="text-[14px] font-black tracking-wide uppercase truncate block leading-tight">{model.name}</span><span className="text-[11px] text-white/50 uppercase mt-1.5 tracking-wider truncate">{model.bestFor}</span></div><ChevronRight size={16} className="text-white/20 flex-shrink-0" /></div>'
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
console.log('Added chevrons to lists');
