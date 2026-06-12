import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// For the main video
content = content.replace(
  /<video\n\s*ref=\{videoRef\}/,
  '<video\n              ref={videoRef}\n              poster="https://res.cloudinary.com/dwlfwnbt0/video/upload/so_0,f_jpg/v1777566643/v2_hero_jiik6p.jpg"'
);

// For the cards
content = content.replace(
  /<video\n\s*src=\{card\.videoSrc\}/g,
  '<video\n                            src={card.videoSrc}\n                            poster={card.videoSrc.replace("/video/upload/", "/video/upload/so_0,f_jpg/").replace(".mp4", ".jpg")}'
);

fs.writeFileSync('src/App.tsx', content);
