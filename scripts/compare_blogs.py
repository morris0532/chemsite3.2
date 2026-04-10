import os

def get_blog_slugs(lang_dir):
    blog_path = os.path.join('/home/ubuntu/chemsite3.0/src/content', lang_dir, 'blog')
    if not os.path.exists(blog_path):
        return set()
    return {f for f in os.listdir(blog_path) if f.endswith('.md')}

def main():
    langs = ['en', 'es', 'fr', 'ru']
    blog_data = {lang: get_blog_slugs(lang) for lang in langs}
    
    # All unique blog filenames across all languages
    all_slugs = sorted(list(set().union(*blog_data.values())))
    
    print(f"Total unique blog filenames: {len(all_slugs)}")
    print("-" * 50)
    
    # Count how many languages each blog exists in
    missing_count = 0
    
    # Detailed report header
    header = f"{'Blog Filename':<60} | {'EN':<3} | {'ES':<3} | {'FR':<3} | {'RU':<3}"
    print(header)
    print("-" * len(header))
    
    for slug in all_slugs:
        status = []
        is_missing_any = False
        for lang in langs:
            exists = "✅" if slug in blog_data[lang] else "❌"
            if slug not in blog_data[lang]:
                is_missing_any = True
            status.append(exists)
        
        if is_missing_any:
            missing_count += 1
            print(f"{slug:<60} | {status[0]:<3} | {status[1]:<3} | {status[2]:<3} | {status[3]:<3}")
            
    print("-" * len(header))
    print(f"Found {missing_count} blogs with missing language versions.")

if __name__ == "__main__":
    main()
