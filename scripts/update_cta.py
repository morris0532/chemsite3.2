import os
import re

# CTA Templates for different languages
CTA_TEMPLATES = {
    'en': {
        'default': """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Innovate with SinoPeakChem: Your Partner for Sustainable {product} Solutions!

SinoPeakChem is at the forefront of providing high-quality {product}, produced with an emphasis on sustainability and efficiency. Partner with us for your advanced chemical needs.

[Discover Our Sustainable Production Practices →](/en/products/{slug}) [Contact Our Innovation Team →](/en/contact)

📧 Email: [sales@sinopeakchem.com](mailto:sales@sinopeakchem.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        'products': {
            'oxalic acid': 'Oxalic Acid',
            'sodium thiosulphate': 'Sodium Thiosulphate',
            'caustic soda': 'Caustic Soda',
            'aluminum sulfate': 'Aluminum Sulfate',
        }
    },
    'es': {
        'default': """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Innove con SinoPeakChem: ¡Su socio para soluciones sostenibles de {product}!

SinoPeakChem está a la vanguardia en el suministro de {product} de alta calidad, producidos con énfasis en la sostenibilidad y la eficiencia. Únase a nosotros para sus necesidades químicas avanzadas.

[Descubra nuestras prácticas de producción sostenible →](/es/products/{slug}) [Contacte a nuestro equipo de innovación →](/es/contact)

📧 Correo electrónico: [sales@sinopeakchem.com](mailto:sales@sinopeakchem.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        'products': {
            'oxalic acid': 'ácido oxálico',
            'sodium thiosulphate': 'tiosulfato de sodio',
            'caustic soda': 'soda cáustica',
            'aluminum sulfate': 'sulfato de aluminio',
        }
    },
    'fr': {
        'default': """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Innovez avec SinoPeakChem : Votre partenaire pour des solutions durables en {product} !

SinoPeakChem est à la pointe de la fourniture de {product} de haute qualité, produits en mettant l'accent sur la durabilité et l'efficacité. Devenez notre partenaire pour vos besoins chimiques avancés.

[Découvrez nos pratiques de production durable →](/fr/products/{slug}) [Contactez notre équipe d'innovation →](/fr/contact)

📧 E-mail : [sales@sinopeakchem.com](mailto:sales@sinopeakchem.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        'products': {
            'oxalic acid': 'acide oxalique',
            'sodium thiosulphate': 'thiosulfate de sodium',
            'caustic soda': 'soude caustique',
            'aluminum sulfate': 'sulfate d\'aluminium',
        }
    },
    'ru': {
        'default': """━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Инновации с SinoPeakChem: Ваш партнер в области устойчивых решений для {product}!

SinoPeakChem находится на передовой поставок высококачественного {product}, производимого с акцентом на устойчивость и эффективность. Станьте нашим партнером для решения ваших передовых химических задач.

[Узнайте о наших методах устойчивого производства →](/ru/products/{slug}) [Свяжитесь с нашей инновационной командой →](/ru/contact)

📧 Электронная почта: [sales@sinopeakchem.com](mailto:sales@sinopeakchem.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━""",
        'products': {
            'oxalic acid': 'щавелевой кислоты',
            'sodium thiosulphate': 'тиосульфата натрия',
            'caustic soda': 'каустической соды',
            'aluminum sulfate': 'сульфата алюминия',
        }
    }
}

def get_product_info(content, filename):
    content_lower = content.lower()
    filename_lower = filename.lower()
    
    if 'sodium thiosulphate' in content_lower or 'sodium-thiosulphate' in filename_lower:
        return 'sodium thiosulphate', 'sodium-thiosulphate'
    elif 'caustic soda' in content_lower or 'caustic-soda' in filename_lower:
        return 'caustic soda', 'caustic-soda'
    elif 'aluminum sulfate' in content_lower or 'aluminum-sulfate' in filename_lower:
        return 'aluminum sulfate', 'aluminum-sulfate'
    else:
        # Default to oxalic acid
        return 'oxalic acid', 'oxalic-acid'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine language from path
    lang = 'en'
    for l in ['es', 'fr', 'ru']:
        if f'/{l}/' in filepath:
            lang = l
            break

    # Determine product
    product_key, slug = get_product_info(content, os.path.basename(filepath))
    product_name = CTA_TEMPLATES[lang]['products'].get(product_key, product_key)
    
    cta_block = CTA_TEMPLATES[lang]['default'].format(product=product_name, slug=slug)

    # Clean up existing CTA if present (looking for the separator lines)
    # This regex looks for content between ━━━━━━━━ lines
    content = re.sub(r'━━━━━━━━+.*?━━━━━━━━+', '', content, flags=re.DOTALL)
    
    # Also clean up any loose remnants of old CTAs that might not have full separators
    # (e.g., if only one line was present)
    content = re.sub(r'💡 Innovate with SinoPeakChem:.*sales@sinopeakchem\.com', '', content, flags=re.DOTALL)

    # Find insertion point: between Conclusion and References
    # Look for Conclusion header
    conclusion_match = re.search(r'(?i)##\s*(Conclusion|Заключение|Conclusión)', content)
    reference_match = re.search(r'(?i)###?\s*(References|Ссылки|Referencias|Références)', content)

    if conclusion_match:
        # Find the end of the conclusion section (before references or end of file)
        start_pos = conclusion_match.end()
        if reference_match and reference_match.start() > start_pos:
            end_pos = reference_match.start()
            section_content = content[start_pos:end_pos].strip()
            
            # Insert CTA after the last paragraph of conclusion
            new_content = content[:start_pos] + "\n\n" + section_content + "\n\n" + cta_block + "\n\n" + content[end_pos:]
        else:
            # No references, insert before the end of the file or at the end of conclusion
            new_content = content.strip() + "\n\n" + cta_block + "\n"
    else:
        # No conclusion header found, append to end before references
        if reference_match:
            new_content = content[:reference_match.start()].strip() + "\n\n" + cta_block + "\n\n" + content[reference_match.start():]
        else:
            new_content = content.strip() + "\n\n" + cta_block + "\n"

    # Final cleanup of multiple newlines
    new_content = re.sub(r'\n{3,}', '\n\n', new_content)

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    base_dir = '/home/ubuntu/chemsite3.0/src/content'
    count = 0
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md') and 'blog' in root:
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    count += 1
                    print(f"Updated: {filepath}")
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    main()
