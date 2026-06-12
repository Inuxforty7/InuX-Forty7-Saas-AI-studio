import * as fs from 'fs';

let code = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

code = code.replace(/backdrop-blur-md/g, '');
code = code.replace(/backdrop-blur/g, '');

fs.writeFileSync('src/components/TerminalPanel.tsx', code);
