import re
import os

# 1. 解析关键词
keywords_map = {}
with open('chemsite3.0/SEO_PLAN/06 sodium thiosulfate.md', 'r') as f:
    content = f.read()
    # 匹配表格中的关键词行: | 1 | sodium thiosulphate | ...
    matches = re.findall(r'\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|', content)
    for num, kw in matches:
        keywords_map[num] = kw.strip()

# 2. 替换计划文件中的编号
def replace_keywords(match):
    nums = re.findall(r'#(\d+)', match.group(0))
    replaced = [keywords_map.get(n, f"#{n}") for n in nums]
    return "覆盖关键词: " + ", ".join(replaced)

new_content = re.sub(r'覆盖关键词:.*', replace_keywords, content)

with open('chemsite3.0/SEO_PLAN/06 sodium thiosulfate.md', 'w') as f:
    f.write(new_content)

# 3. 清理冗余文章
# 计划中定义的合法文章列表（基于文件名模式）
valid_patterns = [
    "ultimate-guide", "pentahydrate-vs-anhydrous", "uses-applications-guide",
    "market-trends-forecast", "supply-chain-logistics", "regional-market-analysis",
    "competitive-landscape", "production-process", "water-treatment-dechlorination",
    "gold-mining", "photography", "textile-industry", "leather-tanning",
    "aquariums-swimming-pools", "analytical-chemistry", "medical-uses-pharmaceutical-grade",
    "msds-safety-handling-guide", "regulations-compliance-reach-fda", "antidote-medical-applications-guide",
    "chemical-reactions-equations", "price-analysis-guide", "market-analysis-guide",
    "vs-sodium-sulfite", "vs-sodium-metabisulfite", "vs-ascorbic-acid", # 计划中的对比
    "environmental-impact-sustainability", "emerging-applications-r-d-trends",
    "faq-comprehensive-guide"
]

# 实际上，用户提到对比文章只有5篇，我需要更精确地清理
# 计划中明确的对比文章有：
# Post #32: vs sodium sulfite
# Post #33: vs sodium metabisulfite vs sodium bisulfite
# Post #34: vs ascorbic acid vs calcium thiosulfate
# Post #2: pentahydrate vs anhydrous
# Post #7: Brand Comparison (in competitive landscape)

target_dir = 'chemsite3.0/SEO_操作手册/大苏打'
files = os.listdir(target_dir)
deleted_files = []

for file in files:
    if not file.endswith('.md'): continue
    
    # 如果文件名包含 "vs" 且不在计划允许的范围内，则删除
    is_vs = 'vs' in file.lower()
    is_planned_vs = any(p in file.lower() for p in ["pentahydrate-vs-anhydrous", "vs-sodium-sulfite", "vs-sodium-metabisulfite", "vs-ascorbic-acid", "vs-sodium-bisulfite"])
    
    # 特别处理：Manus 生成了大量 vs-sodium-metabisulfite-xxx 的细分文章，这些都是冗余的
    # 计划中只有一篇总的 vs-sodium-metabisulfite
    is_redundant_vs_detail = 'vs-sodium-metabisulfite-' in file.lower()
    
    # 还有一些不在计划内的 vs 文章
    is_unplanned_vs = is_vs and not is_planned_vs
    
    if is_redundant_vs_detail or is_unplanned_vs:
        os.remove(os.path.join(target_dir, file))
        deleted_files.append(file)

print(f"Deleted {len(deleted_files)} redundant files: {deleted_files}")
