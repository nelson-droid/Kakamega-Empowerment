import { imageManager } from '../client/src/lib/imageUtils';
import path from 'path';

async function cleanupImages() {
  const assetsDir = path.resolve(process.cwd(), 'client/src/assets');
  const maxAgeInDays = 30; // Keep images for 30 days

  try {
    console.log('Starting image cleanup...');
    await imageManager.cleanupOldImages(assetsDir, maxAgeInDays);
    console.log('Image cleanup complete!');
  } catch (error) {
    console.error('Error cleaning up images:', error);
    process.exit(1);
  }
}

cleanupImages(); 