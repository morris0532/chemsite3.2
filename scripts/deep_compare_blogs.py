import os

def get_blogs(lang):
    blog_path = os.path.join('/home/ubuntu/chemsite3.0/src/content', lang, 'blog')
    if not os.path.exists(blog_path):
        return {}
    blogs = {}
    for f in os.listdir(blog_path):
        if f.endswith('.md'):
            blogs[f] = os.path.getsize(os.path.join(blog_path, f))
    return blogs

def main():
    langs = ['en', 'es', 'fr', 'ru']
    blog_data = {lang: get_blogs(lang) for lang in langs}
    all_slugs = sorted(list(set().union(*blog_data.values())))
    
    print(f"{'Blog Filename':<65} | {'EN':<3} | {'ES':<3} | {'FR':<3} | {'RU':<3}")
    print("-" * 85)
    
    for slug in all_slugs:
        status = []
        is_missing = False
        for lang in langs:
            if slug in blog_data[lang]:
                status.append("✅")
            else:
                status.append("❌")
                is_missing = True
        
        if is_missing:
            print(f"{slug:<65} | {status[0]:<3} | {status[1]:<3} | {status[2]:<3} | {status[3]:<3}")

if __name__ == "__main__":
    main()
