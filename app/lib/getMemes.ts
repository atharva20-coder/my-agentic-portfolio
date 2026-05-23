import fs from 'fs';
import path from 'path';

export function getMemes() {
  try {
    const memesDirectory = path.join(process.cwd(), 'public/memes');
    const fileNames = fs.readdirSync(memesDirectory);

    return fileNames
      .filter(fileName => {
        const ext = fileName.toLowerCase();
        return ext.endsWith('.jpg') || 
               ext.endsWith('.jpeg') || 
               ext.endsWith('.png') || 
               ext.endsWith('.gif') ||
               ext.endsWith('.webp');
      })
      .map(fileName => ({
        src: `/memes/${fileName}`,
        alt: fileName.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '').replace(/-/g, ' ')
      }));
  } catch (error) {
    console.error('Error reading memes directory:', error);
    return [];
  }
}