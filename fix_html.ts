import * as fs from 'fs';

let content = fs.readFileSync('index.html', 'utf-8');

content = content.replace(
  /<title>/,
  '<meta name="theme-color" content="#03070D" />\n    <link rel="apple-touch-icon" href="/pwa-192x192.png" />\n    <title>'
);

fs.writeFileSync('index.html', content);
