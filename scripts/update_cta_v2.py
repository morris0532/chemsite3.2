import os
import re

# Comprehensive product and service mapping
PRODUCT_MAPPING = {
    'oxalic acid': {
        'en': 'Oxalic Acid',
        'es': 'ácido oxálico',
        'fr': 'acide oxalique',
        'ru': 'щавелевой кислоты',
        'slug': 'oxalic-acid'
    },
    'sodium thiosulphate': {
        'en': 'Sodium Thiosulphate',
        'es': 'tiosulfato de sodio',
        'fr': 'thiosulfate de sodium',
        'ru': 'тиосульфата натрия',
        'slug': 'sodium-thiosulphate'
    },
    'caustic soda': {
        'en': 'Caustic Soda',
        'es': 'soda cáustica',
        'fr': 'soude caustique',
        'ru': 'каустической соды',
        'slug': 'caustic-soda'
    },
    'aluminum sulfate': {
        'en': 'Aluminum Sulfate',
        'es': 'sulfato de aluminio',
        'fr': 'sulfate d\'aluminium',
        'ru': 'сульфата алюминия',
        'slug': 'aluminum-sulfate'
    },
    'chemical supply chain': {
        'en': 'Chemical Supply Chain',
        'es': 'cadena de suministro química',
        'fr': 'chaîne d\'approvisionnement chimique',
        'ru': 'химической цепочки поставок',
        'slug': ''  # General service link to contact or home
    }
}

CTA_TEMPLATES = {
    'en': """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Innovate with SinoPeakChem: Your Partner for Sustainable {product} Solutions!

SinoPeakChem is at the forefront of providing high-quality chemical solutions, including {product}, produced with an emphasis on sustainability and efficiency. Partner with us for your advanced chemical needs.

{buttons}

📧 Email: [sales@sinopeakchem.com](mailto:sales@sinopeakchem.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
    'es': """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Innove con SinoPeakChem: ¡Su socio para soluciones sostenibles de {product}!

SinoPeakChem está a la vanguardia en el suministro de soluciones químicas de alta calidad, incluyendo {product}, producidos con énfasis en la sostenibilidad y la eficiencia. Únase a nosotros para sus necesidades químicas avanzadas.

{buttons}

📧 Correo electrónico: [sales@sinopeakchem.com](mailto:sales@sinopeakchem.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
    'fr': """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Innovez avec SinoPeakChem : Votre partenaire pour des solutions durables en {product} !

SinoPeakChem est à la pointe de la fourniture de solutions chimiques de haute qualité, y compris {product}, produits en mettant l'accent sur la durabilité et l'efficacité. Devenez notre partenaire pour vos besoins chimiques avancés.

{buttons}

📧 E-mail : [sales@sinopeakchem.com](mailto:sales@sinopeakchem.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
    'ru': """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Инновации с SinoPeakChem: Ваш партнер в области устойчивых решений для {product}!

SinoPeakChem находится на передовой поставок высококачественных химических решений, включая {product}, производимых с акцентом на устойчивость и эффективность. Станьте нашим партнером для решения ваших передовых химических задач.

{buttons}

📧 Электронная почта: [sales@sinopeakchem.com](mailto:sales@sinopeakchem.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"""
}

BUTTON_TEMPLATES = {
    'en': "[Discover Our Sustainable Production Practices →]({link}) [Contact Our Innovation Team →](/en/contact)",
    'es': "[Descubra nuestras prácticas de producción sostenible →]({link}) [Contacte a nuestro equipo de innovación →](/es/contact)",
    'fr': "[Découvrez nos pratiques de production durable →]({link}) [Contactez notre équipe d'innovation →](/fr/contact)",
    'ru': "[Узнайте о наших методах устойчивого производства →]({link}) [Свяжитесь с нашей инновационной командой →](/ru/contact)"
}

def identify_topic(content, filename):
    content_lower = content.lower()
    filename_lower = filename.lower()
    
    # Priority 1: Check for specific chemical products
    if 'sodium thiosulphate' in content_lower or 'sodium-thiosulphate' in filename_lower:
        return 'sodium thiosulphate'
    elif 'caustic soda' in content_lower or 'caustic-soda' in filename_lower:
        return 'caustic soda'
    elif 'aluminum sulfate' in content_lower or 'aluminum-sulfate' in filename_lower:
        return 'aluminum sulfate'
    
    # Priority 2: Check if it's a general service/logistics/procurement guide
    service_keywords = ['shipping', 'logistics', 'procurement', 'supplier', 'import', 'export', 'supply chain']
    if any(kw in filename_lower for kw in service_keywords) or any(kw in content_lower[:1000] for kw in service_keywords):
        # If it also mentions oxalic acid frequently, keep it as oxalic acid, else use chemical supply chain
        if content_lower.count('oxalic acid') < 3:
            return 'chemical supply chain'
            
    # Default: Oxalic Acid
    return 'oxalic acid'

def get_cta_block(lang, topic):
    topic_info = PRODUCT_MAPPING.get(topic, PRODUCT_MAPPING['oxalic acid'])
    product_name = topic_info.get(lang, topic_info['en'])
    slug = topic_info.get('slug', '')
    
    if slug:
        link = f"/{lang}/products/{slug}"
    else:
        link = f"/{lang}/contact" # Default link for services
        
    buttons = BUTTON_TEMPLATES[lang].format(link=link)
    return CTA_TEMPLATES[lang].format(product=product_name, buttons=buttons)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine language from path
    lang = 'en'
    for l in ['es', 'fr', 'ru']:
        if f'/{l}/' in filepath:
            lang = l
            break

    # Identify topic
    topic = identify_topic(content, os.path.basename(filepath))
    cta_block = get_cta_block(lang, topic)

    # Remove existing CTA (look for the separator lines)
    content = re.sub(r'━━━━━━━━+.*?━━━━━━━━+', '', content, flags=re.DOTALL)
    
    # Find insertion point: between Conclusion and References
    conclusion_match = re.search(r'(?i)##\s*(Conclusion|Заключение|Conclusión|Résumé)', content)
    reference_match = re.search(r'(?i)###?\s*(References|Ссылки|Referencias|Références)', content)

    if conclusion_match:
        start_pos = conclusion_match.end()
        if reference_match and reference_match.start() > start_pos:
            end_pos = reference_match.start()
            section_content = content[start_pos:end_pos].strip()
            new_content = content[:start_pos] + "\n\n" + section_content + "\n\n" + cta_block + "\n\n" + content[end_pos:]
        else:
            new_content = content.strip() + "\n\n" + cta_block + "\n"
    else:
        if reference_match:
            new_content = content[:reference_match.start()].strip() + "\n\n" + cta_block + "\n\n" + content[reference_match.start():]
        else:
            new_content = content.strip() + "\n\n" + cta_block + "\n"

    new_content = re.sub(r'\n{3,}', '\n\n', new_content)

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True, topic
    return False, None

def main():
    base_dir = '/home/ubuntu/chemsite3.0/src/content'
    stats = {}
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md') and 'blog' in root:
                filepath = os.path.join(root, file)
                updated, topic = process_file(filepath)
                if updated:
                    stats[topic] = stats.get(topic, 0) + 1
                    # print(f"Updated [{topic}]: {filepath}")
    
    print("Update Summary:")
    for topic, count in stats.items():
        print(f"- {topic}: {count} files")

if __name__ == "__main__":
    main()
