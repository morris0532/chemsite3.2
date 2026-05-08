import os
import sys
from PIL import Image

def optimize_images(directory):
    """
    Scans the directory for PNG/JPG files and converts them to WebP 
    with a consistent 4:3 aspect ratio and optimized sizing.
    """
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return

    # Target size for product images
    TARGET_WIDTH = 1200
    TARGET_HEIGHT = 900 # 4:3 Ratio

    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            file_path = os.path.join(directory, filename)
            output_filename = os.path.splitext(filename)[0] + '.webp'
            output_path = os.path.join(directory, output_filename)

            try:
                with Image.open(file_path) as img:
                    # Convert to RGB if necessary (e.g., for PNG with transparency)
                    if img.mode in ('RGBA', 'P'):
                        img = img.convert('RGB')

                    # 1. Calculate aspect ratio and resize/crop to 4:3
                    img_ratio = img.width / img.height
                    target_ratio = TARGET_WIDTH / TARGET_HEIGHT

                    if img_ratio > target_ratio:
                        # Image is wider than target - crop sides
                        new_width = int(target_ratio * img.height)
                        offset = (img.width - new_width) // 2
                        img = img.crop((offset, 0, offset + new_width, img.height))
                    else:
                        # Image is taller than target - crop top/bottom
                        new_height = int(img.width / target_ratio)
                        offset = (img.height - new_height) // 2
                        img = img.crop((0, offset, img.width, offset + new_height))

                    # 2. Resize to standard target size
                    img = img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)

                    # 3. Save as WebP
                    img.save(output_path, 'WEBP', quality=85)
                    print(f"Optimized: {filename} -> {output_filename}")

                    # Optional: Remove original if different from output
                    # os.remove(file_path)

            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "public/products"
    optimize_images(target_dir)
