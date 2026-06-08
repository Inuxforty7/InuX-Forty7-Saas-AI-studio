import fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf8');

// For line 622:
content = content.replace(
  /h-full flex-col min-h-0 justify-between overflow-y-auto custom-scroll \$\{mobileViewMode/g,
  "h-full flex-col min-h-0 justify-between ${mobileViewMode"
);
// For the others which had overflow-y-auto custom-scroll in different places:
content = content.replace(
  /h-full flex-col min-h-0 overflow-y-auto custom-scroll justify-between \$\{mobileViewMode/g,
  "h-full flex-col min-h-0 justify-between ${mobileViewMode"
);

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
