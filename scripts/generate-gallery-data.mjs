#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '../public/images/packaging-gallery');
const OUTPUT_FILE = path.join(__dirname, '../src/data/packaging-gallery.json');

// Supported image extensions
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

/**
 * Generate a slug from filename
 * Example: "Oxalic-Acid-Packaging.jpg" -> "oxalic-acid-packaging"
 */
function generateSlug(filename) {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a readable name from filename
 * Example: "Oxalic-Acid-Packaging.jpg" -> "Oxalic Acid Packaging"
 */
function generateName(filename) {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize each word
    .trim();
}

/**
 * Main function to scan gallery directory and generate JSON
 */
function generateGalleryData() {
  try {
    // Check if directory exists
    if (!fs.existsSync(GALLERY_DIR)) {
      console.warn(`⚠️  Gallery directory not found: ${GALLERY_DIR}`);
      console.warn('Creating empty gallery data file...');
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ items: [] }, null, 2));
      return;
    }

    // Read all files in the gallery directory
    const files = fs.readdirSync(GALLERY_DIR).filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTENSIONS.includes(ext) && !file.startsWith('.');
    });

    if (files.length === 0) {
      console.warn('⚠️  No images found in packaging gallery directory');
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ items: [] }, null, 2));
      return;
    }

    // Generate gallery items
    const items = files.map((file, index) => ({
      id: `packaging-${index + 1}`,
      slug: generateSlug(file),
      name: generateName(file),
      image: `/images/packaging-gallery/${file}`,
      category: 'Product Packaging',
      cas: '', // Can be manually added if needed
      shortDescription: `Professional packaging image for ${generateName(file)}`,
      order: index + 1,
    }));

    // Create gallery data object
    const galleryData = {
      items,
      lastUpdated: new Date().toISOString(),
      totalItems: items.length,
    };

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(galleryData, null, 2));

    console.log(`✅ Gallery data generated successfully!`);
    console.log(`📁 Source: ${GALLERY_DIR}`);
    console.log(`📄 Output: ${OUTPUT_FILE}`);
    console.log(`📸 Total images found: ${items.length}`);
    console.log('\nGenerated items:');
    items.forEach((item) => {
      console.log(`  - ${item.name} (${path.basename(item.image)})`);
    });
  } catch (error) {
    console.error('❌ Error generating gallery data:', error.message);
    process.exit(1);
  }
}

// Run the script
generateGalleryData();
