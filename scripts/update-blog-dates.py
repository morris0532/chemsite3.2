import os
import re
from datetime import datetime

def update_dates():
    current_date = datetime.now().strftime("%Y-%m-%d")
    print(f"Updating blog dates to: {current_date}")
    
    # 1. 更新 Markdown 文件中的日期 (src/content/**/*.md)
    content_dir = "src/content"
    if os.path.exists(content_dir):
        for root, _, files in os.walk(content_dir):
            for file in files:
                if file.endswith(".md"):
                    path = os.path.join(root, file)
                    try:
                        with open(path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        # 匹配 yaml frontmatter 中的 date: "YYYY-MM-DD" 或 date: YYYY-MM-DD
                        new_content = re.sub(r'date:\s*["\']?\d{4}-\d{2}-\d{2}["\']?', f'date: "{current_date}"', content)
                        
                        if new_content != content:
                            with open(path, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                            print(f"Updated date in Markdown: {path}")
                    except Exception as e:
                        print(f"Error processing {path}: {e}")

    # 2. 更新 TypeScript 数据文件中的日期 (src/data/blogs*.ts)
    data_dir = "src/data"
    if os.path.exists(data_dir):
        for file in os.listdir(data_dir):
            if file.startswith("blogs") and file.endswith(".ts"):
                path = os.path.join(data_dir, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # 匹配 date: "YYYY-MM-DD"
                    new_content = re.sub(r'date:\s*["\']\d{4}-\d.0{2}-\d{2}["\']', f'date: "{current_date}"', content)
                    
                    if new_content != content:
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated dates in TypeScript: {path}")
                except Exception as e:
                    print(f"Error processing {path}: {e}")

if __name__ == "__main__":
    update_dates()
