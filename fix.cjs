const fs = require('fs');
let file = fs.readFileSync('src/components/TerminalPanel.tsx', 'utf8');

file = file.replace(/col-span-1 lg:col-span-4(.*?)\? 'hidden lg:flex' : 'flex'\}/g, "col-span-1 lg:col-span-4$1? 'hidden lg:flex' : 'flex mobile-slide-list'}");

file = file.replace(/col-span-1 lg:col-span-8(.*?)\? 'hidden lg:flex' : 'flex'\}/g, "col-span-1 lg:col-span-8$1? 'hidden lg:flex' : 'flex mobile-slide-detail'}");

fs.writeFileSync('src/components/TerminalPanel.tsx', file);
