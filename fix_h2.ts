import * as fs from 'fs';

let code = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

code = code.replace(/h-auto lg:h-full lg:h-full /g, 'h-auto lg:h-full ');
code = code.replace(/overflow-hidden \${mobileViewMode/g, '${mobileViewMode'); // Remove overflow-hidden from lists to let them expand fully without risk of crop on mobile

fs.writeFileSync('src/components/TerminalPanel.tsx', code);
