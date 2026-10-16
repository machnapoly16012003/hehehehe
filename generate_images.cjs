// Generate aesthetic monochrome memory visuals
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Minimalist cinematic SVG artworks in monochrome
const images = [
  {
    filename: 'memory-01.svg',
    title: 'THE BEGINNING',
    sub: '35mm · Kyoto, 07:42 PM',
    art: `
      <!-- Street lamp glow / silhouettes -->
      <circle cx="400" cy="180" r="140" fill="#222" opacity="0.6"/>
      <circle cx="400" cy="180" r="90" fill="#333" opacity="0.4"/>
      <circle cx="400" cy="180" r="40" fill="#eee" opacity="0.8"/>
      <line x1="400" y1="180" x2="400" y2="460" stroke="#555" stroke-width="3"/>
      <!-- Soft bench silhouette -->
      <path d="M260 440 L540 440 L520 460 L280 460 Z" fill="#444"/>
      <line x1="300" y1="460" x2="300" y2="520" stroke="#444" stroke-width="4"/>
      <line x1="500" y1="460" x2="500" y2="520" stroke="#444" stroke-width="4"/>
      <text x="400" y="550" fill="#666" font-family="'Cormorant Garamond', serif" font-size="20" letter-spacing="4" text-anchor="middle">WHERE OUR PATHS CROSSED</text>
    `
  },
  {
    filename: 'memory-02.svg',
    title: 'HER SMILE',
    sub: 'A moment stolen from time',
    art: `
      <!-- Coffee cups and gentle shadows -->
      <ellipse cx="360" cy="320" rx="90" ry="40" fill="#181818" stroke="#333" stroke-width="2"/>
      <ellipse cx="360" cy="315" rx="75" ry="32" fill="#0d0d0d"/>
      <ellipse cx="450" cy="280" rx="70" ry="30" fill="#1f1f1f" stroke="#333" stroke-width="2"/>
      <ellipse cx="450" cy="275" rx="55" ry="22" fill="#0a0a0a"/>
      <!-- Steam curves -->
      <path d="M350 280 Q340 240 360 210 Q380 180 370 140" stroke="#555" stroke-width="1.5" fill="none" opacity="0.5"/>
      <path d="M440 250 Q430 220 450 190 Q470 160 460 130" stroke="#555" stroke-width="1.5" fill="none" opacity="0.4"/>
      <text x="400" y="480" fill="#666" font-family="'Cormorant Garamond', serif" font-size="20" letter-spacing="4" text-anchor="middle">LAUGHING OVER COFFEE</text>
    `
  },
  {
    filename: 'memory-03.svg',
    title: 'STARRY WALK',
    sub: 'Under the quiet midnight sky',
    art: `
      <!-- Moon crescent and stars -->
      <path d="M420 180 A70 70 0 1 0 490 250 A85 85 0 1 1 420 180 Z" fill="#eaeaea" opacity="0.85"/>
      <!-- Soft stars -->
      <circle cx="250" cy="140" r="1.5" fill="#fff" opacity="0.8"/>
      <circle cx="310" cy="220" r="1.2" fill="#fff" opacity="0.6"/>
      <circle cx="560" cy="160" r="2.0" fill="#fff" opacity="0.9"/>
      <circle cx="620" cy="240" r="1.5" fill="#fff" opacity="0.7"/>
      <circle cx="200" cy="280" r="1.0" fill="#fff" opacity="0.5"/>
      <circle cx="490" cy="110" r="1.8" fill="#fff" opacity="0.75"/>
      <!-- Distant horizon hills -->
      <path d="M100 480 Q250 420 450 450 T800 440 L800 600 L100 600 Z" fill="#141414"/>
      <text x="400" y="540" fill="#666" font-family="'Cormorant Garamond', serif" font-size="20" letter-spacing="4" text-anchor="middle">MIDNIGHT TALKS</text>
    `
  },
  {
    filename: 'memory-04.svg',
    title: 'OUR WORLD',
    sub: 'In between seconds and silence',
    art: `
      <!-- Intertwined geometric rings / vinyl grooves -->
      <circle cx="400" cy="300" r="160" fill="none" stroke="#222" stroke-width="1"/>
      <circle cx="400" cy="300" r="130" fill="none" stroke="#2a2a2a" stroke-width="1" stroke-dasharray="4,6"/>
      <circle cx="400" cy="300" r="100" fill="none" stroke="#333" stroke-width="1.5"/>
      <circle cx="400" cy="300" r="60" fill="#111" stroke="#444" stroke-width="1"/>
      <circle cx="400" cy="300" r="20" fill="#fff" opacity="0.9"/>
      <circle cx="400" cy="300" r="6" fill="#000"/>
      <text x="400" y="520" fill="#666" font-family="'Cormorant Garamond', serif" font-size="20" letter-spacing="4" text-anchor="middle">JUST YOU AND ME</text>
    `
  }
];

images.forEach((item, index) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#181818" />
      <stop offset="60%" stop-color="#0c0c0c" />
      <stop offset="100%" stop-color="#020202" />
    </radialGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0.15 0" />
      <feComposite in2="SourceGraphic" in="gl" operator="over" />
    </filter>
  </defs>
  <rect width="800" height="600" fill="url(#vignette)"/>
  
  <!-- Subtle border / film frame -->
  <rect x="30" y="30" width="740" height="540" fill="none" stroke="#222" stroke-width="1" opacity="0.6"/>
  <rect x="40" y="40" width="720" height="520" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>
  
  <!-- Film Roll Markers -->
  <text x="50" y="55" fill="#444" font-family="monospace" font-size="11" letter-spacing="2">KODAK TRI-X 400</text>
  <text x="750" y="55" fill="#444" font-family="monospace" font-size="11" letter-spacing="2" text-anchor="end">FRAME #0${index + 1}</text>
  
  ${item.art}
</svg>`;

  fs.writeFileSync(path.join(outDir, item.filename), svg);
  // Also create a reference for memory-01.jpg etc
  fs.writeFileSync(path.join(outDir, `memory-0${index + 1}.jpg`), svg);
});

console.log('Sample memory images created in public/images/');
