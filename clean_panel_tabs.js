import fs from 'fs';

let content = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf8');

const startIndex = content.indexOf('{/* CATEGORY 3: MÁQUINA DE CRIAÇÃO */}');
const endIndex = content.indexOf('</AnimatePresence>', startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    content = content.slice(0, startIndex) + content.slice(endIndex);
}

// Remove the state variables related to those tabs
content = content.replace(/const \[selectedCreationId[\s\S]*?'pro-01'\);/g, '');
content = content.replace(/const \[activeCreationDemoId[\s\S]*?false\);/g, '');

// Also remove from the mobile labels map
content = content.replace(/creations: "CRIAR 3D",[\s\S]*?productivity: "HACKS",/g, '');

fs.writeFileSync('src/components/TerminalPanel.tsx', content);
