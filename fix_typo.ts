import * as fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

// Header search bar text size
content = content.replace(
  /className="w-full pl-8 pr-8 py-2 bg-black\/60 border border-white\/5 rounded-\[1px\] font-mono text-\[11px\] text-white/g,
  'className="w-full pl-9 pr-9 py-2.5 bg-black/60 border border-white/5 rounded-[1px] font-mono text-[12.5px] text-white'
);

// Search bar placeholder size and container
content = content.replace(
  /<Search size=\{12\} className="absolute left-3/g,
  '<Search size={14} className="absolute left-3'
);

// Close button in search
content = content.replace(
  /<X size=\{10\} \/>/g,
  '<X size={12} />'
);

// Tags
content = content.replace(
  /text-\[8\.5px\] uppercase tracking-widest font-black/g,
  'text-[10px] uppercase tracking-widest font-black'
);
content = content.replace(
  /text-\[8\.5px\] uppercase tracking-wider text-white\/40/g,
  'text-[10px] uppercase tracking-wider text-white/40'
);

// Category content font sizes
content = content.replace(
  /text-\[11px\] font-black tracking-widest text-[#FF4500] uppercase mb-2/g,
  'text-[12.5px] font-black tracking-widest text-[#FF4500] uppercase mb-2'
);
content = content.replace(
  /text-\[11px\] font-black tracking-widest text-cyan-400 uppercase border-b/g,
  'text-[12.5px] font-black tracking-widest text-cyan-400 uppercase border-b'
);
content = content.replace(
  /text-\[11px\] font-black tracking-widest text-white uppercase mb-2/g,
  'text-[12.5px] font-black tracking-widest text-white uppercase mb-2'
);
content = content.replace(
  /text-\[11px\] font-black tracking-widest text-purple-400 uppercase mb-2/g,
  'text-[12.5px] font-black tracking-widest text-purple-400 uppercase mb-2'
);

// Body text sizes
content = content.replace(
  /text-\[10px\] sm:text-\[10\.5px\] leading-relaxed/g,
  'text-[11.5px] sm:text-[12px] leading-relaxed'
);

// Link Buttons inside texts
content = content.replace(
  /text-\[9px\] font-bold uppercase rounded-\[1px\] flex items-center/g,
  'text-[10.5px] font-bold uppercase rounded-[1px] flex items-center px-4 py-2'
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
console.log('Fixed Typography in TerminalPanel.tsx');
