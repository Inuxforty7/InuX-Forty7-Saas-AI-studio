import * as fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

content = content.replace(/h-\[calc\(100dvh-180px\)\]/g, 'flex-1 h-[70vh] lg:h-full max-h-full');

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
