import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace import
content = content.replace(
  /import TerminalPanel from "\.\/components\/TerminalPanel";/,
  'import { lazy, Suspense } from "react";\nconst TerminalPanel = lazy(() => import("./components/TerminalPanel"));'
);

// Add Suspense fallback if not already there around <TerminalPanel
// Let's find exactly where TerminalPanel is used.
content = content.replace(
  /\{showTerminal && <TerminalPanel onClose=\{closeTerminal\} \/>\}/,
  '{showTerminal && <Suspense fallback={<div className="fixed inset-0 z-[100] bg-[#03070D] flex items-center justify-center text-white font-mono text-[10px]">INICIALIZANDO TERMINAL OMNI...</div>}><TerminalPanel onClose={closeTerminal} /></Suspense>}'
);

fs.writeFileSync('src/App.tsx', content);
