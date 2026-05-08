import os
import re
import frontmatter
import sys

def check_seo():
    content_dir = "src/content"
    locales = ['en', 'ru', 'fr', 'es', 'ar']
    types = ['products', 'blog']
    
    errors = []
    warnings = []
    
    print("🚀 Starting SEO Audit based on SOP (2024-2026)...")
    
    for locale in locales:
        for c_type in types:
            dir_path = os.path.join(content_dir, locale, c_type)
            if not os.path.exists(dir_path):
                continue
                
            for file in os.listdir(dir_path):
                if not file.endswith(".md"):
                    continue
                    
                file_path = os.path.join(dir_path, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        post = frontmatter.load(f)
                        data = post.metadata
                        content = post.content
                        
                    rel_path = os.path.relpath(file_path)
                    
                    # --- 1. Meta Description Check (SOP 3.2.2) ---
                    desc = data.get('excerpt') or data.get('description') or data.get('shortDescription')
                    if not desc:
                        errors.append(f"[{rel_path}] Missing Meta Description (excerpt/description)")
                    elif len(desc) < 50:
                        warnings.append(f"[{rel_path}] Meta Description too short ({len(desc)} chars)")
                    elif len(desc) > 160:
                        warnings.append(f"[{rel_path}] Meta Description too long ({len(desc)} chars, SOP recommends 150-160)")
                        
                    # --- 2. Title Check (SOP 3.2.2) ---
                    title = data.get('title') or data.get('name')
                    if not title:
                        errors.append(f"[{rel_path}] Missing Title")
                    elif len(title) < 10:
                        warnings.append(f"[{rel_path}] Title too short ({len(title)} chars)")
                        
                    # --- 3. Keywords Check (SOP 3.2.4) ---
                    keywords = data.get('keywords') or data.get('tags')
                    if not keywords:
                        errors.append(f"[{rel_path}] Missing Keywords/Tags")
                        
                    # --- 4. Image Check (SOP 3.3.1) ---
                    image = data.get('image')
                    if not image:
                        errors.append(f"[{rel_path}] Missing OG Image")
                    elif not image.startswith('/images/'):
                        warnings.append(f"[{rel_path}] Image path should start with /images/")
                        
                    # --- 5. Content Structure Check (SOP 3.2.3) ---
                    if len(content.strip()) < 200:
                        warnings.append(f"[{rel_path}] Content too thin ({len(content.strip())} chars)")
                    
                    # Check for H2 headers (SOP 3.2.3)
                    if c_type == 'blog' and not re.search(r'^##\s+', content, re.MULTILINE):
                        warnings.append(f"[{rel_path}] Missing H2 headers for structure")
                        
                    # --- 6. Product Specific: CAS Check ---
                    if c_type == 'products':
                        if not data.get('cas'):
                            errors.append(f"[{rel_path}] Missing CAS number (Critical for Chem SEO)")

                except Exception as e:
                    errors.append(f"Error processing {file_path}: {e}")

    # --- Summary ---
    print("\n" + "="*50)
    print(f"📊 Audit Summary: {len(errors)} Errors, {len(warnings)} Warnings")
    print("="*50)
    
    if errors:
        print("\n❌ ERRORS (Must Fix):")
        for err in errors:
            print(f"  - {err}")
            
    if warnings:
        print("\n⚠️ WARNINGS (Recommended Fix):")
        for warn in warnings:
            print(f"  - {warn}")
            
    if not errors and not warnings:
        print("\n✅ All content follows SEO SOP standards!")
        
    if errors:
        sys.exit(1)

if __name__ == "__main__":
    check_seo()
