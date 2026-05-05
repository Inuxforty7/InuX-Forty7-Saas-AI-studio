const https = require('https');
https.get('https://res.cloudinary.com/dwlfwnbt0/image/upload/v1773580247/lg-nux47_dzcmb8.svg', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data));
});
