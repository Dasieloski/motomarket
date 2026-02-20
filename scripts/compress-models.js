// Optimización del modelo 3D: Script de compresión
// Ejecutar desde: node scripts/compress-models.js

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const modelPath = path.join(__dirname, '../public/models3d/moto.glb');
const compressedPath = path.join(__dirname, '../public/models3d/moto.glb.gz');

if (fs.existsSync(modelPath)) {
  const stats = fs.statSync(modelPath);
  const originalSize = stats.size;

  fs.createReadStream(modelPath)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(compressedPath))
    .on('finish', () => {
      const compressedStats = fs.statSync(compressedPath);
      const compressedSize = compressedStats.size;
      const ratio = ((compressedSize / originalSize) * 100).toFixed(2);
      
      console.log('✅ Modelo 3D comprimido exitosamente');
      console.log(`📦 Tamaño original: ${(originalSize / 1024).toFixed(2)} KiB`);
      console.log(`📦 Tamaño comprimido: ${(compressedSize / 1024).toFixed(2)} KiB`);
      console.log(`📊 Ratio: ${ratio}%`);
      console.log(`💾 Ahorro: ${((originalSize - compressedSize) / 1024).toFixed(2)} KiB`);
    })
    .on('error', (err) => {
      console.error('❌ Error comprimiendo modelo:', err);
    });
} else {
  console.error('❌ No se encontró moto.glb en public/models3d/');
}
