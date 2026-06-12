import * as fs from 'fs';

let code = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf-8');

code = code.replace(/100dvh/g, '100vh'); // Safer for old browsers
code = code.replace(/touch-action-none/g, ''); // Ensure no touch block
code = code.replace(/overflow-hidden/g, 'overflow-clip'); // better perf in some cases, but wait I will just remove overflow-hidden from the main wrappers

fs.writeFileSync('src/components/TerminalPanel.tsx', code);
