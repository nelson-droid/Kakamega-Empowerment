import path from 'path';
import fs from 'fs/promises';

interface ImageOptimizationOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export class ImageManager {
  private static instance: ImageManager;
  private readonly defaultOptions: ImageOptimizationOptions = {
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080,
    format: 'webp'
  };

  private constructor() {}

  static getInstance(): ImageManager {
    if (!ImageManager.instance) {
      ImageManager.instance = new ImageManager();
    }
    return ImageManager.instance;
  }

  async optimizeImage(
    sourcePath: string,
    destinationPath: string,
    options: ImageOptimizationOptions = {}
  ): Promise<string> {
    // Since we're not using Sharp, we'll just copy the file
    // In a real implementation, you would use a browser-based image optimization
    // or a service like Cloudinary, Imgix, or similar
    
    try {
      // Create destination directory if it doesn't exist
      await fs.mkdir(path.dirname(destinationPath), { recursive: true });
      
      // Copy the file
      await fs.copyFile(sourcePath, destinationPath);
      
      console.log(`Copied image from ${sourcePath} to ${destinationPath}`);
      return destinationPath;
    } catch (error) {
      console.error('Error copying image:', error);
      throw new Error('Failed to copy image');
    }
  }

  async cleanupOldImages(directory: string, maxAgeInDays: number = 30): Promise<void> {
    try {
      const files = await fs.readdir(directory);
      const now = Date.now();

      for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = await fs.stat(filePath);
        const ageInDays = (now - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);

        if (ageInDays > maxAgeInDays) {
          await fs.unlink(filePath);
          console.log(`Deleted old image: ${file}`);
        }
      }
    } catch (error) {
      console.error('Error cleaning up old images:', error);
      throw new Error('Failed to cleanup old images');
    }
  }
}

export const imageManager = ImageManager.getInstance(); 