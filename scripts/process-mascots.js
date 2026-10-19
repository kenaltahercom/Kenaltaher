const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/DELL/Downloads/portofolio-kenaltaher/mascote';
const outDir = 'c:/Users/DELL/Downloads/portofolio-kenaltaher/kenaltaher-portfolio/public/mascot';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// True mapping of source files to canonical mascot poses
const mascotDefs = [
  { key: 'intro', file: 'intro.png', outName: 'keno-intro' },
  { key: 'happy', file: 'happy.png', outName: 'keno-happy' },
  { key: 'excited', file: 'excited.png', outName: 'keno-excited' },
  { key: 'curious', file: 'serius.png', outName: 'keno-curious' },
  { key: 'playful', file: 'playful.png', outName: 'keno-playful' },
  { key: 'thinking', file: 'thingking.png', outName: 'keno-thinking' },
  { key: 'loading', file: 'loading.png', outName: 'keno-loading' },
  { key: 'shoulder', file: 'navbar.png', outName: 'keno-shoulder' }, // navbar.png is keno-shoulder.png
  { key: 'navbar', file: 'pundak.png', outName: 'keno-navbar' },     // pundak.png is keno-navbar.png
];

function findCardBounds(data, w, h) {
  let topCardY = 0;
  let bottomCardY = h - 45;
  let leftCardX = 0;
  let rightCardX = w - 1;

  // Find topCardY
  for (let y = 0; y < 35; y++) {
    let brightCount = 0;
    for (let x = 20; x < w - 20; x++) {
      const idx = (y * w + x) * 4;
      if (data[idx] > 180 && data[idx+1] > 180 && data[idx+2] > 180) brightCount++;
    }
    if (brightCount > w * 0.35) {
      topCardY = y;
      break;
    }
  }

  // Find bottomCardY
  for (let y = h - 1; y >= 0; y--) {
    let brightCount = 0;
    for (let x = 20; x < w - 20; x++) {
      const idx = (y * w + x) * 4;
      if (data[idx] > 180 && data[idx+1] > 180 && data[idx+2] > 180) brightCount++;
    }
    if (brightCount > w * 0.35) {
      bottomCardY = y;
      break;
    }
  }

  // Find leftCardX
  for (let x = 0; x < 25; x++) {
    let brightCount = 0;
    for (let y = topCardY + 10; y < bottomCardY - 10; y++) {
      const idx = (y * w + x) * 4;
      if (data[idx] > 180 && data[idx+1] > 180 && data[idx+2] > 180) brightCount++;
    }
    if (brightCount > (bottomCardY - topCardY) * 0.35) {
      leftCardX = x;
      break;
    }
  }

  // Find rightCardX
  for (let x = w - 1; x >= w - 25; x--) {
    let brightCount = 0;
    for (let y = topCardY + 10; y < bottomCardY - 10; y++) {
      const idx = (y * w + x) * 4;
      if (data[idx] > 180 && data[idx+1] > 180 && data[idx+2] > 180) brightCount++;
    }
    if (brightCount > (bottomCardY - topCardY) * 0.35) {
      rightCardX = x;
      break;
    }
  }

  return { topCardY, bottomCardY, leftCardX, rightCardX };
}

async function processMascot(def) {
  const filePath = path.join(srcDir, def.file);
  const img = sharp(filePath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  const { topCardY, bottomCardY, leftCardX, rightCardX } = findCardBounds(data, w, h);
  console.log(`Processing ${def.key} (${def.file}) - size: ${w}x${h}, top: ${topCardY}, bottom: ${bottomCardY}, left: ${leftCardX}, right: ${rightCardX}`);

  const visited = new Uint8Array(w * h);
  const queue = [];

  // 1. Outside card is 100% background
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (y < topCardY || y >= bottomCardY || x < leftCardX || x >= rightCardX) {
        visited[y * w + x] = 1;
      }
    }
  }

  // 2. Inside card corners guaranteed to be checkerboard
  const innerSeeds = [
    [leftCardX + 5, topCardY + 5],
    [rightCardX - 5, topCardY + 5],
    [leftCardX + 5, bottomCardY - 8],
    [rightCardX - 5, bottomCardY - 8]
  ];

  // For loading pose, also seed the interior hologram ring area
  if (def.key === 'loading') {
    innerSeeds.push([100, 165], [85, 165], [115, 165], [100, 172]);
  }

  for (const [ix, iy] of innerSeeds) {
    if (ix >= leftCardX && ix < rightCardX && iy >= topCardY && iy < bottomCardY) {
      if (!visited[iy * w + ix]) {
        visited[iy * w + ix] = 1;
        queue.push(ix, iy);
      }
    }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const neighbors = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];

    for (const [nx, ny] of neighbors) {
      if (nx >= leftCardX && nx < rightCardX && ny >= topCardY && ny < bottomCardY) {
        const nIdx = ny * w + nx;
        if (!visited[nIdx]) {
          const pIdx = nIdx * 4;
          const r = data[pIdx], g = data[pIdx+1], b = data[pIdx+2];

          // Checkerboard pattern (pure white and light grey, or slightly blue-tinted near glow)
          const isCheck = (
            (r >= 195 && g >= 195 && b >= 195 && Math.abs(r-g) <= 18 && Math.abs(g-b) <= 18) ||
            (r >= 170 && g >= 185 && b >= 205 && r < 235 && b > r + 10 && b < 255) // blue tint in hologram ring
          );

          if (isCheck) {
            visited[nIdx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  const outData = Buffer.from(data);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const pIdx = idx * 4;
      if (visited[idx]) {
        outData[pIdx + 3] = 0;
      }
    }
  }

  // De-fringe border pixels
  for (let y = topCardY; y < bottomCardY; y++) {
    for (let x = leftCardX; x < rightCardX; x++) {
      const idx = y * w + x;
      const pIdx = idx * 4;
      if (outData[pIdx + 3] > 0) {
        const hasTranspNeighbor = (
          outData[((y-1)*w + x)*4 + 3] === 0 ||
          outData[((y+1)*w + x)*4 + 3] === 0 ||
          outData[(y*w + (x-1))*4 + 3] === 0 ||
          outData[(y*w + (x+1))*4 + 3] === 0
        );
        if (hasTranspNeighbor) {
          const r = outData[pIdx], g = outData[pIdx+1], b = outData[pIdx+2];
          // Light checkerboard fringe
          if (r > 190 && g > 190 && b > 190 && Math.abs(r-g) < 18 && Math.abs(g-b) < 18) {
            outData[pIdx + 3] = 0;
          }
        }
      }
    }
  }

  // Remove small detached island specks (e.g. corner artifacts < 60px)
  const compVisited = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (outData[idx * 4 + 3] > 0 && !compVisited[idx]) {
        // Collect component
        const comp = [];
        const cQueue = [x, y];
        compVisited[idx] = 1;
        let cHead = 0;
        let touchesBorder = false;

        while (cHead < cQueue.length) {
          const cx = cQueue[cHead++];
          const cy = cQueue[cHead++];
          comp.push(cy * w + cx);
          if (cx <= 1 || cx >= w - 2 || cy <= 1 || cy >= h - 2) touchesBorder = true;

          for (const [nx, ny] of [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1], [cx+1, cy+1], [cx-1, cy-1], [cx+1, cy-1], [cx-1, cy+1]]) {
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              const nIdx = ny * w + nx;
              if (outData[nIdx * 4 + 3] > 0 && !compVisited[nIdx]) {
                compVisited[nIdx] = 1;
                cQueue.push(nx, ny);
              }
            }
          }
        }

        // If component is a small detached island (< 80px) or small border speck (< 200px and touches outer frame), erase it
        if (comp.length < 80 || (touchesBorder && comp.length < 250)) {
          for (const p of comp) {
            outData[p * 4 + 3] = 0;
          }
        }
      }
    }
  }

  // Save 512px HD PNG & WebP
  const pngPath = path.join(outDir, `${def.outName}.png`);
  const webpPath = path.join(outDir, `${def.outName}.webp`);

  await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .trim()
    .resize({ width: 512, height: 512, fit: 'inside', kernel: 'lanczos3' })
    .sharpen({ sigma: 1.0, m1: 1.2, m2: 0.8 })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(pngPath);

  await sharp(pngPath)
    .webp({ lossless: true, quality: 100 })
    .toFile(webpPath);

  console.log(`Saved ${pngPath} and ${webpPath}`);
}

async function run() {
  for (const def of mascotDefs) {
    await processMascot(def);
  }
  console.log('All 9 mascots processed successfully!');
}

run().catch(console.error);
