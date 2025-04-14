import { imageManager } from '../client/src/lib/imageUtils';
import path from 'path';
import fs from 'fs/promises';

async function optimizeImages() {
  const sourceDir = path.resolve(process.cwd(), 'attached_assets');
  const destDir = path.resolve(process.cwd(), 'client/src/assets');

  try {
    // Create destination directory if it doesn't exist
    await fs.mkdir(destDir, { recursive: true });

    // Get all image files
    const files = await fs.readdir(sourceDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to optimize`);

    // Process each image
    for (const file of imageFiles) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file.replace(/\.[^/.]+$/, '.webp'));

      console.log(`Optimizing ${file}...`);
      await imageManager.optimizeImage(sourcePath, destPath);
      console.log(`Optimized ${file} -> ${path.basename(destPath)}`);
    }

    // Cleanup old images
    await imageManager.cleanupOldImages(destDir);
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages(); 