const fs = require('fs');
const dir = './public';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const data = Buffer.from(b64, 'base64');
fs.writeFileSync('public/pwa-192x192.png', data);
fs.writeFileSync('public/pwa-512x512.png', data);
fs.writeFileSync('public/favicon.ico', data);
fs.writeFileSync('public/apple-touch-icon.png', data);
fs.writeFileSync('public/masked-icon.svg', "<svg viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg'></svg>");
