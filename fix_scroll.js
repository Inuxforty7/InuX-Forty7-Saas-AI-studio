import fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf8');

// Container
content = content.replace(
  /h-full flex-col min-h-0 overflow-y-auto custom-scroll justify-between \$\{mobileViewMode === 'list' \? 'hidden lg:flex' : 'flex mobile-slide-detail'\}/g,
  "h-full flex-col min-h-0 justify-between ${mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex mobile-slide-detail'}"
);

// Inner flex setup
content = content.replace(
  /<div className="flex-1 flex flex-col justify-between gap-([34]) h-full min-h-0">\s*<div className="flex flex-col gap-3 min-h-0">/g,
  `<div className="flex-1 flex flex-col justify-between gap-$1 min-h-0">\n                                  <div className="flex flex-col gap-3 min-h-0 overflow-y-auto custom-scroll flex-1 pr-1 pb-1">`
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
