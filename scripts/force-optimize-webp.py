import os
import sys
from PIL import Image

def force_optimize_webp(directory):
    """
    Forcefully re-saves large WebP files with high compression 
    and smaller dimensions to ensure significant file size reduction.
    """
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return

    # Standard width for blog hero images
    TARGET_WIDTH = 1000

    for filename in os.listdir(directory):
        if filename.lower().endswith('.webp'):
            file_path = os.path.join(directory, filename)
            
            # Get original size
            original_size = os.path.getsize(file_path)
            
            # Skip already small files (< 250KB)
            if original_size < 250 * 1024:
                continue

            try:
                with Image.open(file_path) as img:
                    # Convert to RGB if needed
                    if img.mode in ('RGBA', 'P'):
                        img = img.convert('RGB')
                    
                    # Resize significantly
                    new_height = int(img.height * (TARGET_WIDTH / img.width))
                    img = img.resize((TARGET_WIDTH, new_height), Image.Resampling.LANCZOS)
                    
                    # Save with aggressive compression
                    img.save(file_path, 'WEBP', quality=65, method=6)
                    new_size = os.path.getsize(file_path)
                    print(f"Force Optimized: {filename} ({original_size//1024}KB -> {new_size//1024}KB)")

            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "public/images/blog"
    force_optimize_webp(target_dir)
