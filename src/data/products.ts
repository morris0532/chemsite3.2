export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  nameCn: string;
  cas: string;
  hsCode: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  specs: ProductSpec[];
  applications: string[];
  faqs: ProductFAQ[];
  ports: string;
  loading: string;
  packaging: string;
  category: string;
  featured?: boolean;
}

const DEFAULT_IMAGE = "https://mgx-backend-cdn.metadl.com/generate/images/1044526/2026-03-20/eb1c2135-5209-41f4-9875-561825e0cc52.png";

export const products: Product[] = [
  {
    id: "1",
    name: "Sodium Thiosulphate",
    nameCn: "大苏打",
    cas: "7772-98-7",
    hsCode: "2832300000",
    slug: "sodium-thiosulphate",
    shortDescription: "High-purity sodium thiosulphate (sodium hyposulfite) for industrial, photographic, and water treatment applications.",
    description: `[Sodium Thiosulphate (Na₂S₂O₃), commonly known as Sodium Hyposulfite or "Hypo," is a versatile inorganic compound that serves as a cornerstone in numerous industrial and chemical processes. Our high-purity Sodium Thiosulphate is manufactured using advanced crystallization techniques, ensuring a product that meets the most stringent international quality standards. 

In the realm of **water treatment**, Sodium Thiosulphate is indispensable for its rapid and effective dechlorination capabilities. It is widely used in municipal water treatment plants, industrial wastewater facilities, and aquaculture to neutralize residual chlorine and chloramines, protecting aquatic life and ensuring water safety for discharge. Its reaction with chlorine is instantaneous, making it a preferred choice for emergency dechlorination and routine maintenance.

The **photographic industry** has long relied on Sodium Thiosulphate as a primary fixing agent. It works by dissolving unexposed silver halide from film and photographic paper, "fixing" the image and making it permanent and light-insensitive. Despite the rise of digital photography, it remains essential for traditional film processing and specialized medical imaging applications.

In **mining and metallurgy**, particularly in gold and silver extraction, Sodium Thiosulphate is gaining prominence as a more environmentally friendly alternative to traditional cyanide leaching. It forms stable complexes with precious metals, allowing for efficient recovery from certain types of ores where cyanide may be less effective or environmentally restricted.

The **textile and leather industries** utilize Sodium Thiosulphate as an antichlor to remove excess chlorine after bleaching processes. It also serves as a reducing agent in chrome tanning and as a mordant in dyeing processes, ensuring consistent color quality and material integrity. Furthermore, it finds applications in the pharmaceutical industry as an antidote for cyanide poisoning and in the production of various chemical intermediates.

Our Sodium Thiosulphate is available in various grades, including industrial and high-purity crystalline forms. We offer flexible packaging solutions, such as 25KG moisture-proof woven bags and 1000KG jumbo bags, to accommodate different handling and storage requirements. With strategic shipping from major Chinese ports like Qingdao, Tianjin, and Dalian, we ensure reliable global delivery and competitive logistics costs. Every shipment is accompanied by a comprehensive Certificate of Analysis (COA) and Material Safety Data Sheet (MSDS) to guarantee transparency and safety compliance.

As a leading supplier, we ensure our Sodium Thiosulphate (CAS: 7772-98-7) meets the highest industry standards for applications ranging from photographic fixing to gold leaching. Classified under HS Code 2832300000, our product is a reliable choice for buyers seeking high-purity (≥99%) sodium hyposulfite for their supply chain.`,
    image: "/images/products/sodium-thiosulphate-7772-98-7.jpg",
    specs: [
      { label: "Chemical Formula", value: "Na₂S₂O₃·5H₂O" },
      { label: "CAS Number", value: "7772-98-7" },
      { label: "HS Code", value: "2832300000" },
      { label: "Purity", value: "≥99%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "27-28MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin / Dalian" },
    ],
    applications: [
      "Water treatment and dechlorination",
      "Photographic fixing agent",
      "Gold and silver ore extraction",
      "Textile industry bleaching",
      "Leather processing",
      "Pharmaceutical intermediates",
      "Aquaculture water purification",
    ],
    faqs: [
      { question: "What is the minimum order quantity for Sodium Thiosulphate?", answer: "For optimal cost efficiency, we recommend ordering a full 20-foot container (20GP), which holds approximately 27-28 metric tons. We do not set a fixed MOQ, but a full container load ensures the best pricing and shipping economics." },
      { question: "What purity grades are available?", answer: "We offer industrial grade (≥98%) and high-purity grade (≥99%). Both grades are suitable for water treatment, photography, and other industrial applications. Custom specifications can be discussed based on your requirements." },
      { question: "How is Sodium Thiosulphate packaged for export?", answer: "Standard packaging includes 25KG woven bags with PE inner liners, or 1000KG (1MT) jumbo bags. Custom packaging can be arranged upon request. All packaging is designed to protect against moisture during ocean transport." },
      { question: "What are the shipping ports available?", answer: "We can ship from Qingdao, Tianjin, or Dalian ports in China. The choice of port depends on your destination and shipping route preferences. We work with major shipping lines to ensure competitive freight rates." },
      { question: "Can you provide MSDS and COA documents?", answer: "Yes, we provide complete documentation including Material Safety Data Sheet (MSDS) and Certificate of Analysis (COA) for every shipment. You can request these documents through our website by submitting your email address." },
      { question: "What is the typical lead time for orders?", answer: "Standard lead time is 7-15 days after order confirmation, depending on the quantity and current stock levels. For large orders or special specifications, please contact us for an accurate delivery schedule." },
    ],
    ports: "Qingdao / Tianjin / Dalian",
    loading: "27-28MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Sulfur Compounds",
    featured: true,
  },
  {
    id: "2",
    name: "Caustic Soda",
    nameCn: "片碱",
    cas: "1310-73-2",
    hsCode: "2815110000",
    slug: "caustic-soda",
    shortDescription: "Premium caustic soda flakes and pearls for chemical processing, water treatment, and manufacturing industries.",
    description: `Caustic Soda, chemically known as Sodium Hydroxide (NaOH), is one of the most fundamental and widely used industrial chemicals in the world. Often referred to as "the workhorse of the chemical industry," it is a strong base with exceptional reactivity, making it essential for a vast array of manufacturing and processing applications. We supply premium-grade Caustic Soda in both flake and pearl (prill) forms, characterized by high purity, low impurity levels, and excellent solubility.

In the **pulp and paper industry**, Caustic Soda is a critical component of the Kraft process used for pulping wood. It helps break down the lignin that binds cellulose fibers together, enabling the production of high-quality paper products. Additionally, it is used in the bleaching process to achieve the desired whiteness and brightness of the final paper.

The **soap and detergent industry** relies heavily on Caustic Soda for the saponification process. It reacts with fats and oils to produce soap, and is a key ingredient in the manufacturing of various cleaning agents, surfactants, and industrial degreasers. Its ability to dissolve grease and organic deposits makes it an ideal choice for heavy-duty cleaning applications.

In **water treatment**, Sodium Hydroxide is used for pH adjustment and neutralization of acidic wastewater. It is also employed in the regeneration of ion exchange resins used in water softening and demineralization processes. Its high alkalinity makes it effective for precipitating heavy metals from industrial effluents, helping facilities meet environmental discharge standards.

The **textile industry** utilizes Caustic Soda for mercerization, a treatment that improves the strength, luster, and dye affinity of cotton fibers. It is also used in the scouring process to remove impurities from raw fibers before dyeing and finishing. In the **petroleum and natural gas industry**, it is used to remove acidic contaminants (such as hydrogen sulfide and carbon dioxide) from hydrocarbons, a process known as "sweetening."

Furthermore, Caustic Soda is essential in **aluminum production** (Bayer process) to extract alumina from bauxite ore. It also finds applications in food processing (for peeling fruits and vegetables, and processing cocoa), pharmaceutical manufacturing, and as a chemical intermediate for hundreds of other products.

Our Caustic Soda is produced using modern membrane cell technology, ensuring high purity (typically 96% or 99%) and minimal environmental impact. We provide robust packaging in 25KG PP/PE bags and jumbo bags, designed to withstand the hygroscopic nature of the product during international transit. Shipping from major hubs like Qingdao and Tianjin ensures efficient logistics and timely delivery to our global clientele.

Our Sodium Hydroxide (CAS: 1310-73-2), classified under HS Code 2815110000, is a benchmark for quality in the chlor-alkali industry. Whether you require 99% purity for alumina refining or 96% for pulp and paper manufacturing, our membrane-grade caustic soda provides unmatched performance and value.`,
    image: "/images/products/caustic-soda-1310-73-2.jpg",
    specs: [
      { label: "Chemical Formula", value: "NaOH" },
      { label: "CAS Number", value: "1310-73-2" },
      { label: "HS Code", value: "2815110000" },
      { label: "Purity", value: "≥96% / ≥99%" },
      { label: "Appearance", value: "White flakes / pearls" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Soap and detergent manufacturing",
      "Paper and pulp industry",
      "Water treatment",
      "Textile processing",
      "Petroleum refining",
      "Aluminum production",
      "Food processing (food grade)",
    ],
    faqs: [
      { question: "What forms of Caustic Soda do you offer?", answer: "We supply Caustic Soda in both flakes and pearls (prills) form. Flakes are the most common form for industrial use, while pearls offer easier handling and dissolving properties." },
      { question: "What is the minimum order quantity?", answer: "For cost optimization, we recommend ordering a full 20-foot container (20GP) which holds approximately 25 metric tons. Full container loads provide the best unit pricing and shipping efficiency." },
      { question: "How should Caustic Soda be stored?", answer: "Caustic Soda should be stored in a cool, dry, well-ventilated area away from moisture and acids. Keep containers tightly sealed. It is highly hygroscopic and will absorb moisture from the air if exposed." },
      { question: "What purity levels are available?", answer: "We offer 96% purity (standard industrial grade) and 99% purity (high-purity grade). The choice depends on your specific application requirements." },
      { question: "Can you provide technical documentation?", answer: "Yes, we provide MSDS, COA, and other technical documents for all shipments. Request documents through our website or contact our sales team directly." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "25MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Alkali Products",
    featured: true,
  },
  {
    id: "3",
    name: "Oxalic Acid",
    nameCn: "草酸",
    cas: "6153-56-6",
    hsCode: "2917111000",
    slug: "oxalic-acid",
    shortDescription: "High-quality oxalic acid for cleaning, bleaching, rust removal, and industrial chemical processes.",
    description: `Oxalic Acid (C₂H₂O₄), the simplest dicarboxylic acid, is a powerful organic acid with a wide range of industrial applications. Known for its exceptional reducing and chelating properties, it is a vital chemical in cleaning, bleaching, and specialized chemical synthesis. Our Oxalic Acid is produced to a high purity standard (≥99.6%), appearing as white crystalline granules that are easily soluble in water and ethanol.

One of the most prominent uses of Oxalic Acid is in **rust removal and metal cleaning**. It effectively reacts with iron oxides to form water-soluble complexes, making it an ideal agent for removing rust stains from metal surfaces, concrete, and stone. It is widely used in the automotive, maritime, and construction industries for surface preparation and restoration.

In the **textile and leather industries**, Oxalic Acid serves as a highly effective bleaching agent. It is used to remove iron stains from fabrics and to bleach wood pulp, straw, and leather. Its gentle yet effective action makes it suitable for brightening natural fibers without causing significant damage to the material structure. In leather tanning, it acts as a pH regulator and helps in the fixation of dyes.

The **stone and marble industry** utilizes Oxalic Acid for polishing and maintenance. It is a key ingredient in polishing powders used to restore the shine and remove stains from marble, granite, and other natural stones. Its ability to react with calcium carbonate on the stone surface helps create a smooth, reflective finish.

In **chemical synthesis and pharmaceuticals**, Oxalic Acid is a valuable intermediate. It is used in the production of various oxalates, antibiotics (such as oxytetracycline), and Vitamin C. It also plays a crucial role in the **extraction of rare earth elements**, where it is used as a precipitating agent to separate rare earths from other minerals, ensuring high-purity final products.

Furthermore, Oxalic Acid finds applications in **wastewater treatment** for the removal of heavy metals and as a reducing agent in various chemical processes. It is also used in wood restoration to remove "graying" caused by weather exposure, bringing back the natural color of the wood.

Due to its acidic and toxic nature, our Oxalic Acid is packaged in secure, labeled 25KG bags or jumbo bags that comply with international hazardous material shipping regulations (UN 3261, Class 8). We provide comprehensive documentation, including COA and MSDS, to ensure safe handling and regulatory compliance. With efficient shipping from Qingdao and Tianjin, we provide a reliable supply chain for this essential organic acid.`,
    image: "/images/products/oxalic-acid-144-62-7.jpg",
    specs: [
      { label: "Chemical Formula", value: "C₂H₂O₄·2H₂O" },
      { label: "CAS Number", value: "6153-56-6" },
      { label: "HS Code", value: "2917111000" },
      { label: "Purity", value: "≥99.6%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "22-27MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Rust removal and metal cleaning",
      "Textile and leather bleaching",
      "Marble and stone polishing",
      "Pharmaceutical synthesis",
      "Rare earth element extraction",
      "Wood bleaching and restoration",
      "Wastewater treatment",
    ],
    faqs: [
      { question: "What is the minimum order quantity for Oxalic Acid?", answer: "We recommend ordering a full 20-foot container (20GP) for optimal cost efficiency, which holds 22-27 metric tons depending on packaging. This ensures the best pricing and logistics arrangement." },
      { question: "What purity grades do you offer?", answer: "Our standard grade is ≥99.6% purity, suitable for most industrial applications. We also offer refined grades for pharmaceutical and specialty applications upon request." },
      { question: "Is Oxalic Acid classified as dangerous goods for shipping?", answer: "Yes, Oxalic Acid is classified as a hazardous material (UN 3261, Class 8). We handle all necessary documentation and packaging requirements for safe international shipping." },
      { question: "What industries commonly use Oxalic Acid?", answer: "Major industries include textile (bleaching), metal finishing (rust removal), marble/stone processing (polishing), pharmaceuticals, rare earth extraction, and cleaning products manufacturing." },
      { question: "How should Oxalic Acid be stored?", answer: "Store in a cool, dry, well-ventilated area away from heat sources and incompatible materials. Keep containers tightly closed. Avoid contact with strong oxidizing agents and bases." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "22-27MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Organic Acids",
    featured: true,
  },
  {
    id: "4",
    name: "Calcium Chloride",
    nameCn: "氯化钙",
    cas: "10043-52-4",
    hsCode: "2827200000",
    slug: "calcium-chloride",
    shortDescription: "Industrial-grade calcium chloride for de-icing, dust control, oil drilling, and desiccant applications.",
    description: `Calcium Chloride (CaCl₂) is a highly versatile inorganic salt known for its exceptional hygroscopic properties and its ability to significantly lower the freezing point of water. Available in anhydrous (94%) and dihydrate (74% or 77%) forms, it is an essential chemical for infrastructure maintenance, industrial processing, and resource extraction. Our Calcium Chloride is produced to meet rigorous quality standards, ensuring consistent performance across all applications.

In **road maintenance and safety**, Calcium Chloride is a premier agent for **de-icing and snow melting**. It is more effective than traditional rock salt at lower temperatures, remaining active down to -32°C (-25°F). Its exothermic properties allow it to release heat as it dissolves, accelerating the melting process. Additionally, it is widely used for **dust control** on unpaved roads, construction sites, and mining areas. Its hygroscopic nature allows it to absorb moisture from the air, keeping the surface damp and binding dust particles together, which improves air quality and reduces road maintenance costs.

The **oil and gas industry** relies heavily on Calcium Chloride for drilling and completion fluids. It is used to increase the density of clear brines, providing the necessary hydrostatic pressure to control wellbore stability and prevent blowouts. It also helps inhibit shale swelling and acts as a key component in "packer fluids" and workover operations.

In the **construction industry**, Calcium Chloride serves as a potent **concrete accelerator**. When added to concrete mixes, it speeds up the setting time and increases early strength development, which is particularly beneficial for cold-weather concreting and projects requiring rapid turnaround.

As a **desiccant and moisture absorber**, Calcium Chloride is used in industrial drying processes and in consumer products like moisture-absorbing bags for closets and basements. It is also employed in **wastewater treatment** to remove fluorides and to break oil-water emulsions. In the **food industry** (food grade), it is used as a firming agent in canned vegetables, a source of electrolytes in sports drinks, and in cheesemaking to ensure consistent curd formation.

Our Calcium Chloride is available in various physical forms, including flakes, pellets, and powder, to suit different application methods. We offer robust packaging in 25KG bags and 1000KG jumbo bags, ensuring the product remains dry and free-flowing during transport. With strategic shipping from ports like Qingdao, Nanjing, and Ningbo, we provide efficient global distribution and competitive pricing.`,
    image: "/images/products/calcium-chloride-10043-52-4.jpg",
    specs: [
      { label: "Chemical Formula", value: "CaCl₂" },
      { label: "CAS Number", value: "10043-52-4" },
      { label: "HS Code", value: "2827200000" },
      { label: "Purity", value: "74% / 77% / 94%" },
      { label: "Appearance", value: "White flakes / pellets / powder" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "25-27MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Nanjing / Ningbo-Zhoushan" },
    ],
    applications: [
      "Road de-icing and snow melting",
      "Dust control on unpaved roads",
      "Oil and gas drilling fluids",
      "Desiccant and moisture absorber",
      "Concrete accelerator",
      "Food processing (food grade)",
      "Refrigeration brine",
    ],
    faqs: [
      { question: "What forms of Calcium Chloride are available?", answer: "We offer Calcium Chloride in flakes (74-77%), pellets/prills (94-97%), and powder forms. The choice depends on your specific application and handling preferences." },
      { question: "What is the recommended order quantity?", answer: "For best cost efficiency, we recommend ordering a full 20-foot container (20GP), which holds 25-27 metric tons. Full container loads offer the most competitive pricing." },
      { question: "Can Calcium Chloride be used for food applications?", answer: "Yes, we offer food-grade Calcium Chloride that meets food safety standards. It is commonly used in cheese making, beer brewing, and as a firming agent in canned vegetables." },
      { question: "What shipping ports are available?", answer: "We ship from Qingdao, Nanjing, and Ningbo-Zhoushan ports. Port selection depends on your destination and preferred shipping route." },
      { question: "How should Calcium Chloride be stored?", answer: "Store in a dry, cool area in tightly sealed containers. Calcium Chloride is highly hygroscopic and will absorb moisture from the air, which can cause caking." },
    ],
    ports: "Qingdao / Nanjing / Ningbo-Zhoushan",
    loading: "25-27MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Chloride Compounds",
    featured: true,
  },
  {
    id: "5",
    name: "Sodium Tripolyphosphate (STPP)",
    nameCn: "三聚磷酸钠",
    cas: "7758-29-4",
    hsCode: "2835319000",
    slug: "sodium-tripolyphosphate",
    shortDescription: "High-quality STPP for detergent manufacturing, ceramics, and water treatment applications.",
    description: `Sodium Tripolyphosphate (STPP, Na₅P₃O₁₀) is a high-performance polyphosphate widely recognized for its exceptional sequestering, buffering, and dispersing capabilities. It is a vital ingredient in the production of cleaning agents, food products, and various industrial materials. Our STPP is manufactured to high standards of purity and consistency, ensuring optimal performance in both industrial and food-grade applications.

In the **detergent and cleaning industry**, STPP is a primary "builder." It works by sequestering (binding) calcium and magnesium ions present in hard water, preventing them from interfering with the action of surfactants. This ensures that detergents can work effectively even in challenging water conditions, preventing soil redeposition and enhancing the overall cleaning power. It is a key component in laundry detergents, automatic dishwashing powders, and industrial surface cleaners.

The **food industry** utilizes food-grade STPP as a versatile additive (E451). It is widely used in the processing of meat, poultry, and seafood to improve water retention, enhance texture, and prevent spoilage. By increasing the water-holding capacity of proteins, it ensures that products remain juicy and tender during cooking and storage. It also acts as an emulsifier in processed cheeses and as a stabilizer in dairy products.

In **industrial applications**, STPP serves as a powerful dispersing agent. In the **ceramic and tile industry**, it is used to reduce the viscosity of ceramic slips, allowing for easier processing and higher solid content. In **oil drilling**, it acts as a deflocculant in drilling muds, helping to maintain the desired flow properties and stability of the fluid. It is also used in **paper manufacturing** as an oil-resistant agent and in **textile processing** as a sequestering agent for metal ions.

Furthermore, STPP finds applications in **water treatment** as a scale inhibitor and in the production of flame retardants, anti-corrosion pigments, and various chemical intermediates. Its ability to maintain a stable pH (buffering) makes it valuable in numerous chemical processes.

Our STPP is available in different bulk densities (light and dense) and particle sizes to meet specific formulation requirements. We provide high-quality packaging in 25KG bags and jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin and Qingdao, we offer a consistent and cost-effective supply of STPP to our global partners. Comprehensive technical documentation, including COA and MSDS, is provided with every shipment to ensure safety and quality assurance.`,
    image: "/images/products/sodium-tripolyphosphate-7758-29-4.jpg",
    specs: [
      { label: "Chemical Formula", value: "Na₅P₃O₁₀" },
      { label: "CAS Number", value: "7758-29-4" },
      { label: "HS Code", value: "2835319000" },
      { label: "Purity", value: "≥94%" },
      { label: "Appearance", value: "White powder" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin / Huangpu" },
    ],
    applications: [
      "Detergent and cleaning product manufacturing",
      "Ceramic and tile production",
      "Water treatment",
      "Food processing (food grade)",
      "Textile processing",
      "Paper manufacturing",
    ],
    faqs: [
      { question: "What is the minimum order quantity for STPP?", answer: "We recommend a full 20-foot container (20GP) holding approximately 25 metric tons for the best pricing. This ensures cost-effective shipping and competitive unit pricing." },
      { question: "Do you offer both industrial and food grade STPP?", answer: "Yes, we supply both industrial grade and food grade STPP. Food grade STPP is used as a preservative and quality improver in seafood, meat, and other food products." },
      { question: "What is the Phase I to Phase II ratio?", answer: "Our STPP typically has a Phase I content of 60-70% and Phase II content of 30-40%. Custom ratios can be produced based on specific application requirements." },
      { question: "How does STPP improve detergent performance?", answer: "STPP acts as a builder in detergents by sequestering calcium and magnesium ions (water softening), providing alkalinity for cleaning, and helping to suspend soil particles to prevent redeposition." },
      { question: "What documentation do you provide?", answer: "We provide complete documentation including COA, MSDS, and other certificates as required. Documents can be requested through our website." },
    ],
    ports: "Qingdao / Tianjin / Huangpu",
    loading: "25MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Phosphate Compounds",
    featured: true,
  },
  {
    id: "6",
    name: "Sodium Sulfate Anhydrous (SSA)",
    nameCn: "元明粉",
    cas: "7757-82-6",
    hsCode: "2833110000",
    slug: "sodium-sulfate-anhydrous",
    shortDescription: "Premium sodium sulfate anhydrous for detergent, glass, textile, and paper industries.",
    description: `Sodium Sulfate Anhydrous (Na₂SO₄), also known as Thenardite or Glauber's Salt (in its decahydrate form), is a versatile and cost-effective inorganic salt with a wide range of industrial applications. It is a stable, non-toxic, and highly soluble compound that serves as a vital component in the manufacturing of detergents, glass, textiles, and various chemical products. Our Sodium Sulfate Anhydrous is produced to high purity standards (typically ≥99%), appearing as a white crystalline powder or granules with excellent flowability.

In the **detergent and cleaning industry**, Sodium Sulfate Anhydrous is a primary "filler" or "bulking agent." It is used in the production of powdered laundry detergents and dishwashing powders to provide the necessary bulk and ensure that the product remains free-flowing and easy to dose. Its high solubility and neutral pH make it an ideal choice for these applications, as it does not interfere with the action of surfactants or other active ingredients.

The **glass industry** utilizes Sodium Sulfate Anhydrous as a "fining agent" or "flux." It is added to the glass batch to help remove small air bubbles and impurities during the melting process, ensuring the clarity and quality of the final glass products. It also helps lower the melting temperature of the glass, reducing energy consumption and improving production efficiency. It is essential in the manufacturing of flat glass, container glass, and fiberglass.

In the **textile industry**, Sodium Sulfate Anhydrous is used as a "leveling agent" or "dyeing assistant." It is added to the dye bath to help promote the even distribution of dyes on the fabric, ensuring consistent color quality and preventing streaks or spots. It is particularly effective in the dyeing of cotton and other natural fibers with direct and reactive dyes. It also helps improve the "exhaustion" of the dye, reducing the amount of dye that remains in the wastewater.

The **pulp and paper industry** employs Sodium Sulfate Anhydrous in the Kraft process for pulping wood. It is used in the recovery of chemicals from the spent pulping liquor, helping to maintain the balance of the chemical system and improve the efficiency of the process. It also finds applications in the **chemical industry** as a raw material for the production of various sodium salts, such as sodium sulfide and sodium silicate.

Furthermore, Sodium Sulfate Anhydrous is used in **leather tanning** as a neutral salt to help regulate the swelling of the hides and in **pharmaceuticals** as a mild laxative and as a component in various medications. It is also used in **animal feed** as a source of sodium and sulfur and in **thermal energy storage** as a phase change material.

Our Sodium Sulfate Anhydrous is available in various particle sizes and grades to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Sodium Sulfate Anhydrous to our global partners.`,
    image: "/images/products/sodium-sulfate-anhydrous-7757-82-6.jpg",
    specs: [
      { label: "Chemical Formula", value: "Na₂SO₄" },
      { label: "CAS Number", value: "7757-82-6" },
      { label: "HS Code", value: "2833110000" },
      { label: "Purity", value: "≥99%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "50KG bags / Jumbo bags" },
      { label: "Loading", value: "27-28MT per 20GP container" },
      { label: "Available Ports", value: "Yangzhou / Zhenjiang / Chongqing / Luzhou" },
    ],
    applications: [
      "Detergent powder filler",
      "Glass manufacturing",
      "Textile dyeing",
      "Paper and pulp industry",
      "Chemical synthesis",
      "Starch manufacturing",
    ],
    faqs: [
      { question: "What is the recommended order quantity?", answer: "A full 20-foot container (20GP) holds 27-28 metric tons and provides the best cost efficiency for international shipping." },
      { question: "What purity levels are available?", answer: "We offer SSA with purity ≥99%, suitable for detergent, glass, and textile applications. Higher purity grades are available for specialty applications." },
      { question: "What are the main shipping ports?", answer: "We ship from Yangzhou, Zhenjiang, Chongqing, and Luzhou ports, providing flexible logistics options for different destinations." },
      { question: "How is SSA used in detergent manufacturing?", answer: "SSA serves as a filler and flow agent in detergent powders. It helps control powder density, improves flowability, and reduces production costs while maintaining cleaning performance." },
    ],
    ports: "Yangzhou / Zhenjiang / Chongqing / Luzhou",
    loading: "27-28MT/20GP",
    packaging: "50KG/Jumbo bags",
    category: "Sulfate Compounds",
  },
  {
    id: "7",
    name: "Soda Ash (Sodium Carbonate)",
    nameCn: "纯碱",
    cas: "497-19-8",
    hsCode: "2836200000",
    slug: "soda-ash",
    shortDescription: "Dense and light soda ash for glass, detergent, and chemical manufacturing industries.",
    description: `Soda Ash, chemically known as Sodium Carbonate (Na₂CO₃), is one of the most important and widely used industrial chemicals in the world. It is a strong alkali with exceptional reactivity, making it essential for a vast array of manufacturing and processing applications. We supply premium-grade Soda Ash in both "Light" and "Dense" forms, characterized by high purity (typically ≥99.2%) and consistent quality.

The **glass industry** is the largest consumer of Soda Ash, accounting for more than half of its global production. It is used as a "flux" to lower the melting temperature of the silica sand used in glassmaking, which significantly reduces energy consumption and improves production efficiency. Soda Ash is essential in the manufacturing of flat glass (for windows and automotive use), container glass (for bottles and jars), and fiberglass.

In the **detergent and cleaning industry**, Soda Ash is a vital "builder" and "alkalinity source." It is used in the production of powdered laundry detergents, dishwashing powders, and industrial cleaners to help soften hard water by precipitating calcium and magnesium ions. It also provides the necessary alkalinity to help remove grease and organic soils from surfaces. Its ability to maintain a stable pH (buffering) makes it valuable in numerous cleaning formulations.

The **chemical industry** utilizes Soda Ash as a raw material for the production of hundreds of other sodium-based chemicals, such as sodium silicate, sodium bicarbonate, sodium tripolyphosphate (STPP), and sodium dichromate. It is also used in the **pulp and paper industry** for the production of wood pulp and in the **textile industry** as a pH regulator and dyeing assistant.

In **water treatment**, Soda Ash is used for pH adjustment and neutralization of acidic water. It is also employed in the "lime-soda" process for water softening, where it reacts with calcium and magnesium salts to form insoluble precipitates that can be easily removed. Its high alkalinity makes it effective for precipitating heavy metals from industrial effluents, helping facilities meet environmental discharge standards.

Furthermore, Soda Ash is essential in **metallurgy** for the refining of various metals, such as aluminum, lead, and zinc. It is also used in **food processing** (as a pH regulator and leavening agent) and in **pharmaceuticals** as an antacid and as a component in various medications.

Our Soda Ash is produced using modern Solvay or natural soda ash processes, ensuring high purity and minimal environmental impact. We provide robust packaging in 25KG, 40KG, 50KG, and 1000KG jumbo bags, designed to withstand the hygroscopic nature of the product during international transit. Shipping from major hubs like Tianjin, Qingdao, and Lianyungang ensures efficient logistics and timely delivery to our global clientele.`,
    image: "/images/products/soda-ash-497-19-8.jpg",
    specs: [
      { label: "Chemical Formula", value: "Na₂CO₃" },
      { label: "CAS Number", value: "497-19-8" },
      { label: "HS Code", value: "2836200000" },
      { label: "Purity", value: "≥99.2%" },
      { label: "Appearance", value: "White powder (dense/light)" },
      { label: "Packaging", value: "40KG bags / Jumbo bags" },
      { label: "Loading", value: "27-28MT/20GP (dense) / 22-23MT/20GP (light)" },
      { label: "Available Ports", value: "Lianyungang / Qingdao" },
    ],
    applications: [
      "Glass and flat glass manufacturing",
      "Detergent and soap production",
      "Water treatment",
      "Metallurgy and smelting",
      "Paper manufacturing",
      "Chemical synthesis",
    ],
    faqs: [
      { question: "What is the difference between dense and light soda ash?", answer: "Dense soda ash has a higher bulk density (approximately 1000 kg/m³) and is preferred for glass manufacturing. Light soda ash has a lower bulk density (approximately 500 kg/m³) and is commonly used in detergent production and chemical synthesis." },
      { question: "What is the minimum order quantity?", answer: "We recommend a full 20-foot container for best pricing. Dense soda ash loads 27-28MT per 20GP, while light soda ash loads 22-23MT per 20GP." },
      { question: "Which shipping ports do you use?", answer: "We primarily ship from Lianyungang and Qingdao ports, both offering excellent connectivity to global destinations." },
      { question: "Can you provide samples before ordering?", answer: "Yes, we can provide samples for quality testing. Please contact our sales team with your requirements and shipping address." },
    ],
    ports: "Lianyungang / Qingdao",
    loading: "27-28MT/20GP (dense) / 22-23MT/20GP (light)",
    packaging: "40KG/Jumbo bags",
    category: "Alkali Products",
  },
  {
    id: "8",
    name: "Citric Acid Anhydrous",
    nameCn: "无水柠檬酸",
    cas: "77-92-9",
    hsCode: "2918140000",
    slug: "citric-acid-anhydrous",
    shortDescription: "Food and industrial grade citric acid anhydrous for food, beverage, and pharmaceutical applications.",
    description: `Citric Acid Anhydrous (C₆H₈O₇) is a high-purity, organic acid widely recognized for its exceptional acidifying, flavoring, and chelating properties. It is a vital ingredient in the production of food, beverages, pharmaceuticals, and various industrial materials. Our Citric Acid Anhydrous is manufactured through the fermentation of natural carbohydrates (such as corn or molasses) using advanced biotechnology, ensuring a product that meets the most stringent international quality standards (BP/USP/FCC/E330).

In the **food and beverage industry**, Citric Acid Anhydrous is the most widely used acidulant. It provides a pleasant, tart flavor to a vast array of products, including soft drinks, juices, candies, jams, and jellies. Its high solubility and clean taste make it an ideal choice for these applications. It also acts as a natural preservative by lowering the pH of the product, which inhibits the growth of bacteria and molds. Furthermore, it enhances the activity of antioxidants and helps stabilize the color and flavor of processed foods.

The **pharmaceutical and personal care industry** utilizes Citric Acid Anhydrous as a pH regulator, buffering agent, and effervescent agent. It is a key component in effervescent tablets and powders, where it reacts with bicarbonates to produce carbon dioxide, facilitating the rapid dissolution and absorption of active ingredients. In personal care products, such as shampoos, soaps, and creams, it is used to adjust the pH to match the natural acidity of the skin and hair, improving product stability and performance.

In **industrial applications**, Citric Acid Anhydrous serves as a powerful chelating agent. It is used in **cleaning and descaling products** to remove calcium and magnesium scale from pipes, boilers, and household appliances. Its ability to bind with metal ions makes it effective for removing rust and other metallic stains. In **water treatment**, it is used as a sequestering agent to prevent the formation of scale and to improve the efficiency of filtration processes.

The **chemical industry** employs Citric Acid Anhydrous as a raw material for the production of various citrates, such as sodium citrate, potassium citrate, and calcium citrate. It is also used in **textile processing** as a pH regulator and in **construction** as a concrete retarder to slow down the setting time of concrete.

Furthermore, Citric Acid Anhydrous is used in **animal feed** as an acidifier to improve digestion and in **agriculture** as a chelating agent for micronutrients. Its biodegradable and non-toxic nature makes it an environmentally friendly choice for many applications.

Our Citric Acid Anhydrous is available in various particle sizes (fine, medium, and coarse) to meet specific formulation requirements. We provide high-quality packaging in 25KG moisture-proof bags and jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Qingdao, Tianjin, and Shanghai, we offer a consistent and cost-effective supply of Citric Acid Anhydrous to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "C₆H₈O₇" },
      { label: "CAS Number", value: "77-92-9" },
      { label: "HS Code", value: "2918140000" },
      { label: "Purity", value: "≥99.5%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Food and beverage acidulant",
      "Pharmaceutical excipient",
      "Cosmetics and personal care",
      "Cleaning products",
      "Water treatment",
      "Metal cleaning",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "We recommend a full 20-foot container (25MT) for optimal cost efficiency. This ensures the best unit pricing and shipping economics." },
      { question: "Do you offer food grade citric acid?", answer: "Yes, our citric acid anhydrous meets food grade standards (BP/USP/FCC) and is suitable for food, beverage, and pharmaceutical applications." },
      { question: "What is the difference between anhydrous and monohydrate?", answer: "Anhydrous citric acid contains no water of crystallization, while monohydrate contains one molecule of water. Anhydrous is preferred when moisture content needs to be minimized." },
      { question: "How should citric acid be stored?", answer: "Store in a cool, dry place in sealed containers. Keep away from moisture and direct sunlight. Shelf life is typically 2-3 years when properly stored." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "25MT/20GP",
    packaging: "25KG bags",
    category: "Organic Acids",
  },
  {
    id: "9",
    name: "Citric Acid Monohydrate",
    nameCn: "一水柠檬酸",
    cas: "5949-29-1",
    hsCode: "2918140000",
    slug: "citric-acid-monohydrate",
    shortDescription: "High-purity citric acid monohydrate for food processing, beverages, and cleaning applications.",
    description: `Citric Acid Monohydrate (C₆H₈O₇·H₂O) is a high-purity, organic acid that contains one molecule of water of crystallization. It is widely recognized for its exceptional acidifying, flavoring, and chelating properties, similar to its anhydrous counterpart. Our Citric Acid Monohydrate is manufactured through the fermentation of natural carbohydrates using advanced biotechnology, ensuring a product that meets the most stringent international quality standards (BP/USP/FCC/E330).

In the **food and beverage industry**, Citric Acid Monohydrate is a primary acidulant and flavoring agent. It provides a sharp, refreshing tartness to products such as soft drinks, fruit juices, candies, and desserts. Its ability to lower the pH of food products makes it an effective natural preservative, extending the shelf life by inhibiting microbial growth. It also enhances the flavor profile of various processed foods and acts as a stabilizer for colors and vitamins.

The **pharmaceutical and personal care industry** utilizes Citric Acid Monohydrate as a pH regulator and buffering agent. It is commonly used in the formulation of syrups, tablets, and topical creams to ensure the stability and efficacy of active ingredients. In personal care products like shampoos and bath salts, it helps adjust the pH to a skin-friendly level and acts as a mild exfoliant. Its chelating properties also help improve the performance of surfactants in soaps and detergents.

In **industrial applications**, Citric Acid Monohydrate serves as a powerful chelating and cleaning agent. It is widely used in **industrial cleaning and descaling** to remove mineral deposits and rust from boilers, heat exchangers, and piping systems. Its ability to form stable complexes with metal ions makes it effective for metal surface treatment and electroplating. In **water treatment**, it is used as a sequestering agent to prevent scale formation and to improve the clarity of the water.

The **chemical industry** employs Citric Acid Monohydrate as a raw material for the production of various citrates and as a building block for other organic chemicals. It is also used in **textile processing** as a pH regulator and in **construction** as a concrete retarder, allowing for better control over the setting time of concrete in large-scale projects.

Furthermore, Citric Acid Monohydrate is used in **animal feed** as an acidifier to promote gut health and in **agriculture** to improve the availability of nutrients in the soil. Its biodegradable and non-toxic nature makes it a preferred choice for environmentally conscious manufacturers.

Our Citric Acid Monohydrate is available in various particle sizes to meet specific application needs. We provide high-quality packaging in 25KG moisture-proof bags and jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Qingdao, Tianjin, and Shanghai, we offer a consistent and cost-effective supply of Citric Acid Monohydrate to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "C₆H₈O₇·H₂O" },
      { label: "CAS Number", value: "5949-29-1" },
      { label: "HS Code", value: "2918140000" },
      { label: "Purity", value: "≥99.5%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Food and beverage flavoring",
      "Confectionery production",
      "Pharmaceutical formulations",
      "Cleaning and descaling agents",
      "Cosmetics ingredient",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "A full 20-foot container (25MT) is recommended for the best pricing and shipping efficiency." },
      { question: "Is your citric acid monohydrate food grade?", answer: "Yes, our product meets BP/USP/FCC food grade standards and is suitable for food, beverage, and pharmaceutical use." },
      { question: "What certifications do you provide?", answer: "We provide COA, MSDS, Halal, Kosher, and ISO certifications as required." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "25MT/20GP",
    packaging: "25KG bags",
    category: "Organic Acids",
  },
  {
    id: "10",
    name: "Tri-Sodium Citrate",
    nameCn: "柠檬酸钠",
    cas: "68-04-2",
    hsCode: "2918150000",
    slug: "tri-sodium-citrate",
    shortDescription: "Food and pharmaceutical grade tri-sodium citrate for buffering, emulsifying, and flavoring applications.",
    description: `Tri-sodium Citrate (Na₃C₆H₅O₇), also known as Sodium Citrate, is a high-purity sodium salt of citric acid. It is widely recognized for its exceptional buffering, sequestering, and flavoring properties. Our Tri-sodium Citrate is manufactured through the neutralization of citric acid with high-purity sodium hydroxide or sodium carbonate, ensuring a product that meets the most stringent international quality standards (BP/USP/FCC/E331).

In the **food and beverage industry**, Tri-sodium Citrate is a versatile additive (E331). It is primarily used as a **buffering agent** to control the pH of various products, such as soft drinks, energy drinks, and gelatin desserts. It provides a mild, salty-tart flavor and enhances the overall taste profile. As a **sequestering agent**, it binds with calcium ions in milk and dairy products, preventing the coagulation of proteins and ensuring a smooth, consistent texture in processed cheeses, evaporated milk, and ice cream. It also acts as an emulsifier and stabilizer in various processed foods.

The **pharmaceutical and medical industry** utilizes Tri-sodium Citrate as an **anticoagulant** and buffering agent. It is widely used in blood collection tubes and during blood transfusions to prevent the clotting of blood by chelating calcium ions. It is also a key component in oral rehydration salts (ORS) and as an antacid to relieve symptoms of indigestion and heartburn. Its ability to regulate the pH of urine makes it valuable in the treatment of certain urinary tract conditions.

In **personal care and cosmetics**, Tri-sodium Citrate is used as a pH regulator and buffering agent in shampoos, soaps, and skin creams. It helps maintain the stability and performance of the product while ensuring it is gentle on the skin and hair. Its chelating properties also help improve the effectiveness of preservatives and surfactants in these formulations.

In **industrial applications**, Tri-sodium Citrate serves as a powerful chelating and cleaning agent. It is used in **detergents and cleaning products** to soften hard water and to improve the removal of stains and mineral deposits. Its ability to bind with metal ions makes it effective for metal surface treatment, electroplating, and as a component in various industrial chemical processes. In **water treatment**, it is used as a scale inhibitor and to prevent the precipitation of metal salts.

Furthermore, Tri-sodium Citrate is used in **textile processing** as a pH regulator and in **construction** as a concrete retarder to slow down the setting time of concrete. Its biodegradable and non-toxic nature makes it an environmentally friendly choice for many applications.

Our Tri-sodium Citrate is available in various particle sizes (fine and granular) to meet specific formulation requirements. We provide high-quality packaging in 25KG moisture-proof bags and jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Qingdao, Tianjin, and Shanghai, we offer a consistent and cost-effective supply of Tri-sodium Citrate to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "Na₃C₆H₅O₇·2H₂O" },
      { label: "CAS Number", value: "68-04-2" },
      { label: "HS Code", value: "2918150000" },
      { label: "Purity", value: "≥99%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Food additive (buffering agent)",
      "Beverage industry",
      "Pharmaceutical anticoagulant",
      "Detergent formulations",
      "Electroplating industry",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "We recommend a full 20-foot container (25MT) for cost-effective ordering." },
      { question: "Is this product food grade?", answer: "Yes, our tri-sodium citrate meets food grade standards (BP/USP/FCC) and is suitable for food, beverage, and pharmaceutical applications." },
      { question: "What is the shelf life?", answer: "When stored properly in a cool, dry place in sealed containers, the shelf life is typically 2 years." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "25MT/20GP",
    packaging: "25KG bags",
    category: "Citrate Compounds",
  },
  {
    id: "11",
    name: "Trisodium Phosphate",
    nameCn: "磷酸三钠",
    cas: "7601-54-9",
    hsCode: "2835291000",
    slug: "trisodium-phosphate",
    shortDescription: "Industrial trisodium phosphate for cleaning, water treatment, and food processing applications.",
    description: `Trisodium Phosphate (TSP, Na₃PO₄), also known as Sodium Phosphate Tribasic, is a high-performance inorganic salt widely recognized for its exceptional cleaning, degreasing, and buffering capabilities. It is a vital ingredient in the production of heavy-duty cleaning agents, industrial degreasers, and various chemical products. Our TSP is manufactured to high standards of purity and consistency, ensuring optimal performance in both industrial and food-grade applications.

In the **cleaning and degreasing industry**, TSP is a primary "heavy-duty cleaner." It is highly effective at removing grease, oil, wax, and other organic deposits from a wide range of surfaces, including metal, concrete, and wood. Its high alkalinity (pH 12 in a 1% solution) makes it an ideal choice for cleaning industrial equipment, floors, and walls. It is also used as a "paint stripper" or "surface preparer" before painting, as it helps to etch the surface and improve paint adhesion.

The **food industry** utilizes food-grade TSP as a versatile additive (E339). It is primarily used as a **buffering agent** to control the pH of various products, such as processed cheeses, evaporated milk, and cereals. It also acts as an **emulsifier** and **stabilizer** in these products, ensuring a smooth, consistent texture and preventing the separation of fats and water. In meat and poultry processing, it is used to improve water retention and enhance the tenderness of the final products.

In **industrial applications**, TSP serves as a powerful **water softener** and **scale inhibitor**. It reacts with calcium and magnesium ions in hard water to form insoluble precipitates that can be easily removed, preventing the formation of scale in pipes, boilers, and heat exchangers. It is also used in **textile processing** as a scouring agent and in **paper manufacturing** as a bleaching assistant.

The **chemical industry** employs TSP as a raw material for the production of various other phosphates and as a building block for other inorganic chemicals. It is also used in **metallurgy** for the refining of various metals and in **construction** as a concrete retarder to slow down the setting time of concrete.

Furthermore, TSP finds applications in **wastewater treatment** for the removal of heavy metals and as a nutrient source for biological treatment processes. Its ability to maintain a stable pH (buffering) makes it valuable in numerous chemical processes.

Our TSP is available in various forms, including anhydrous and dodecahydrate (Na₃PO₄·12H₂O), to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of TSP to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "Na₃PO₄·12H₂O" },
      { label: "CAS Number", value: "7601-54-9" },
      { label: "HS Code", value: "2835291000" },
      { label: "Purity", value: "≥98%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "27MT per 20GP container" },
      { label: "Available Ports", value: "Tianjin / Qingdao" },
    ],
    applications: [
      "Industrial cleaning and degreasing",
      "Water treatment",
      "Food additive (emulsifier)",
      "Boiler water treatment",
      "Paint stripping",
      "Ceramic manufacturing",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "A full 20-foot container (27MT) is recommended for the most cost-effective ordering." },
      { question: "Is TSP safe for food use?", answer: "Food grade TSP is available and approved as a food additive in many countries. It is used as an emulsifier and acidity regulator." },
      { question: "What are the main applications?", answer: "TSP is primarily used for industrial cleaning, degreasing, water treatment, and as a food additive. It is also used in paint stripping and ceramic manufacturing." },
    ],
    ports: "Tianjin / Qingdao",
    loading: "27MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Phosphate Compounds",
  },
  {
    id: "12",
    name: "Ammonium Sulphate",
    nameCn: "硫酸铵",
    cas: "7783-20-2",
    hsCode: "3102210000",
    slug: "ammonium-sulphate",
    shortDescription: "Agricultural and industrial grade ammonium sulphate fertilizer and chemical intermediate.",
    description: `Ammonium Sulphate ((NH₄)₂SO₄) is a high-performance inorganic salt widely recognized for its exceptional nitrogen and sulfur content. It is a vital ingredient in the production of fertilizers, industrial chemicals, and various other products. Our Ammonium Sulphate is manufactured to high standards of purity and consistency, ensuring optimal performance in both agricultural and industrial applications.

In the **agricultural industry**, Ammonium Sulphate is a primary "nitrogen-sulfur fertilizer." It provides a readily available source of nitrogen (21%) and sulfur (24%) to crops, promoting healthy growth and increasing yields. Its high sulfur content makes it particularly effective for sulfur-deficient soils and for crops that require high levels of sulfur, such as oilseeds, legumes, and vegetables. Its acidic nature also helps to lower the pH of alkaline soils, improving the availability of other nutrients.

The **industrial sector** utilizes Ammonium Sulphate as a versatile chemical intermediate. It is used in the production of various other ammonium salts, such as ammonium persulfate and ammonium chloride. It is also employed in the **textile industry** as a flame retardant and in the **pulp and paper industry** as a bleaching assistant. In **water treatment**, it is used as a nutrient source for biological treatment processes and as a component in various water treatment formulations.

In **food processing**, food-grade Ammonium Sulphate is used as a **dough conditioner** and **yeast nutrient** in the baking industry. It helps to improve the texture and volume of bread and other baked goods. It also acts as a **pH regulator** and **stabilizer** in various processed foods.

The **pharmaceutical industry** employs Ammonium Sulphate as a **precipitating agent** for proteins and as a component in various medications. It is also used in **biotechnology** for the purification of enzymes and other biological molecules.

Furthermore, Ammonium Sulphate finds applications in **metallurgy** for the refining of various metals and in **construction** as a concrete retarder to slow down the setting time of concrete. Its high solubility and stable nature make it an ideal choice for many applications.

Our Ammonium Sulphate is available in various grades, including agricultural grade (caprolactam grade, steel grade) and industrial grade, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Ammonium Sulphate to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "(NH₄)₂SO₄" },
      { label: "CAS Number", value: "7783-20-2" },
      { label: "HS Code", value: "3102210000" },
      { label: "Nitrogen Content", value: "≥21%" },
      { label: "Appearance", value: "White crystalline powder/granular" },
      { label: "Packaging", value: "25/50KG bags / Jumbo bags" },
      { label: "Loading", value: "27MT per 20GP container" },
      { label: "Available Ports", value: "Tianjin / Qingdao" },
    ],
    applications: [
      "Agricultural fertilizer",
      "Flame retardant additive",
      "Water treatment",
      "Food additive (yeast nutrient)",
      "Textile industry",
      "Pharmaceutical manufacturing",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "We recommend a full 20-foot container (27MT) for the best pricing and shipping economics." },
      { question: "What grades are available?", answer: "We offer agricultural grade (caprolactam grade, steel grade) and industrial grade ammonium sulphate, each suited for different applications." },
      { question: "Is ammonium sulphate a good fertilizer?", answer: "Yes, it provides both nitrogen (21%) and sulfur (24%) nutrients, making it excellent for sulfur-deficient soils and crops that require sulfur nutrition." },
    ],
    ports: "Tianjin / Qingdao",
    loading: "27MT/20GP",
    packaging: "25/50KG/Jumbo bags",
    category: "Sulfate Compounds",
  },
  {
    id: "13",
    name: "Sodium Hexametaphosphate",
    nameCn: "六偏磷酸钠",
    cas: "10124-56-8",
    hsCode: "2835399000",
    slug: "sodium-hexametaphosphate",
    shortDescription: "High-quality sodium hexametaphosphate for water treatment, food processing, and industrial applications.",
    description: `Sodium Hexametaphosphate (SHMP, (NaPO₃)₆) is a high-performance polyphosphate widely recognized for its exceptional sequestering, buffering, and dispersing capabilities. It is a vital ingredient in the production of cleaning agents, food products, and various industrial materials. Our SHMP is manufactured to high standards of purity and consistency, ensuring optimal performance in both industrial and food-grade applications.

In the **water treatment industry**, SHMP is a primary "sequestrant" and "scale inhibitor." It works by binding with calcium and magnesium ions in hard water, preventing them from forming insoluble scale in pipes, boilers, and heat exchangers. This helps to improve the efficiency of water systems and reduce maintenance costs. It is also used as a **dispersing agent** to prevent the settling of solids in water treatment processes.

The **food industry** utilizes food-grade SHMP as a versatile additive (E452i). It is primarily used as a **sequestrant**, **emulsifier**, and **texturizer** in various products, such as processed meats, seafood, and dairy products. It helps to improve water retention, enhance texture, and prevent spoilage. In the beverage industry, it is used to stabilize colors and flavors and to prevent the formation of precipitates.

In **industrial applications**, SHMP serves as a powerful **dispersing agent** and **deflocculant**. In the **ceramic and tile industry**, it is used to reduce the viscosity of ceramic slips, allowing for easier processing and higher solid content. In **oil drilling**, it acts as a deflocculant in drilling muds, helping to maintain the desired flow properties and stability of the fluid. It is also used in **paper manufacturing** as an oil-resistant agent and in **textile processing** as a sequestering agent for metal ions.

The **chemical industry** employs SHMP as a raw material for the production of various other phosphates and as a building block for other inorganic chemicals. It is also used in **metallurgy** for the refining of various metals and in **construction** as a concrete retarder to slow down the setting time of concrete.

Furthermore, SHMP finds applications in **personal care products**, such as toothpastes and mouthwashes, where it acts as a tartar control agent. Its ability to maintain a stable pH (buffering) makes it valuable in numerous chemical processes.

Our SHMP is available in various forms, including powder and glassy flakes, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of SHMP to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "(NaPO₃)₆" },
      { label: "CAS Number", value: "10124-56-8" },
      { label: "HS Code", value: "2835399000 / 2835299000" },
      { label: "Purity", value: "≥68% (as P₂O₅)" },
      { label: "Appearance", value: "White powder / glassy flakes" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "27MT per 20GP container" },
      { label: "Available Ports", value: "Chongqing / Wuhan / Qingdao" },
    ],
    applications: [
      "Water treatment and softening",
      "Food additive (preservative)",
      "Detergent manufacturing",
      "Ceramic and tile production",
      "Oil drilling fluids",
      "Paper manufacturing",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "A full 20-foot container (27MT) provides the best cost efficiency for international orders." },
      { question: "Do you offer food grade SHMP?", answer: "Yes, we supply both food grade and industrial grade SHMP. Food grade is used as a preservative, emulsifier, and texture modifier in food products." },
      { question: "What is the main function in water treatment?", answer: "SHMP acts as a sequestrant and scale inhibitor in water treatment, preventing the formation of calcium and magnesium scale in pipes and equipment." },
    ],
    ports: "Chongqing / Wuhan / Qingdao",
    loading: "27MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Phosphate Compounds",
  },
  {
    id: "14",
    name: "Sodium Metabisulphite",
    nameCn: "焦亚硫酸钠",
    cas: "7681-57-4",
    hsCode: "2832100000",
    slug: "sodium-metabisulphite",
    shortDescription: "Food and industrial grade sodium metabisulphite for preservation, bleaching, and water treatment.",
    description: `Sodium Metabisulphite (Na₂S₂O₅) is a high-performance inorganic salt widely recognized for its exceptional antioxidant, preservative, and reducing capabilities. It is a vital ingredient in the production of food products, industrial chemicals, and various other materials. Our Sodium Metabisulphite is manufactured to high standards of purity and consistency, ensuring optimal performance in both food-grade and industrial applications.

In the **food industry**, Sodium Metabisulphite is a primary "preservative" and "antioxidant" (E223). It works by releasing sulfur dioxide (SO₂), which inhibits the growth of bacteria, yeasts, and molds, extending the shelf life of various products. It is widely used in the preservation of dried fruits, vegetables, fruit juices, and wines. It also helps to prevent the browning of fruits and vegetables by inhibiting the action of enzymes.

The **industrial sector** utilizes Sodium Metabisulphite as a versatile **reducing agent**. It is used in the **textile industry** for bleaching wool and other natural fibers and for removing excess chlorine after bleaching processes. In the **pulp and paper industry**, it is used as a bleaching assistant and for the production of wood pulp. In **water treatment**, it is used as a dechlorination agent to remove residual chlorine from treated water.

In **mining and metallurgy**, Sodium Metabisulphite is used as a **flotation agent** for the separation of various minerals and for the recovery of precious metals. It is also employed in the **chemical industry** as a raw material for the production of various other sulfur-based chemicals, such as sodium thiosulphate and sodium sulfite.

The **pharmaceutical industry** employs Sodium Metabisulphite as an **antioxidant** and **stabilizer** in various medications and as a component in various pharmaceutical formulations. It is also used in **photography** as a component in developing and fixing solutions.

Furthermore, Sodium Metabisulphite finds applications in **leather tanning** as a reducing agent and in **construction** as a concrete retarder to slow down the setting time of concrete. Its high solubility and stable nature make it an ideal choice for many applications.

Our Sodium Metabisulphite is available in various grades, including food grade and industrial grade, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Sodium Metabisulphite to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "Na₂S₂O₅" },
      { label: "CAS Number", value: "7681-57-4" },
      { label: "HS Code", value: "2832100000" },
      { label: "Purity", value: "≥97%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "27MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Food preservative and antioxidant",
      "Water treatment (dechlorination)",
      "Textile bleaching",
      "Photography chemicals",
      "Mining and ore processing",
      "Leather tanning",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "We recommend a full 20-foot container (27MT) for the best pricing." },
      { question: "Is this product food grade?", answer: "Yes, we offer food grade sodium metabisulphite suitable for use as a preservative in food and beverage products." },
      { question: "How does it work as a preservative?", answer: "Sodium metabisulphite releases sulfur dioxide (SO₂) which acts as an antimicrobial and antioxidant agent, preventing spoilage and browning in food products." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "27MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Sulfur Compounds",
  },
  {
    id: "15",
    name: "Sodium Sulfite",
    nameCn: "亚硫酸钠",
    cas: "7757-83-7",
    hsCode: "2832100000",
    slug: "sodium-sulfite",
    shortDescription: "Industrial sodium sulfite for water treatment, pulp and paper, and chemical processing.",
    description: `Sodium Sulfite (Na₂SO₃) is a high-performance inorganic salt widely recognized for its exceptional reducing, antioxidant, and oxygen-scavenging capabilities. It is a vital ingredient in the production of industrial chemicals, food products, and various other materials. Our Sodium Sulfite is manufactured to high standards of purity and consistency, ensuring optimal performance in both industrial and food-grade applications.

In the **water treatment industry**, Sodium Sulfite is a primary "oxygen scavenger." It works by reacting with dissolved oxygen in water to form sodium sulfate, preventing the corrosion of pipes, boilers, and heat exchangers. This is particularly important in high-pressure boiler systems, where even small amounts of dissolved oxygen can cause significant damage. It is also used as a **dechlorination agent** to remove residual chlorine from treated water.

The **pulp and paper industry** utilizes Sodium Sulfite as a **bleaching assistant** and for the production of wood pulp. It helps to improve the brightness and quality of the final paper products. In the **textile industry**, it is used as a bleaching agent for wool and other natural fibers and for removing excess chlorine after bleaching processes.

In **food processing**, food-grade Sodium Sulfite is used as a **preservative** and **antioxidant** (E221). It helps to prevent the spoilage and browning of various products, such as dried fruits, vegetables, and fruit juices. It also acts as a **stabilizer** for colors and flavors in these products.

The **chemical industry** employs Sodium Sulfite as a raw material for the production of various other sulfur-based chemicals, such as sodium thiosulphate and sodium metabisulphite. It is also used in **photography** as a component in developing and fixing solutions and in **metallurgy** for the refining of various metals.

Furthermore, Sodium Sulfite finds applications in **leather tanning** as a reducing agent and in **construction** as a concrete retarder to slow down the setting time of concrete. Its high solubility and stable nature make it an ideal choice for many applications.

Our Sodium Sulfite is available in various grades, including industrial grade and food grade, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Sodium Sulfite to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "Na₂SO₃" },
      { label: "CAS Number", value: "7757-83-7" },
      { label: "HS Code", value: "2832100000" },
      { label: "Purity", value: "≥96%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "27MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Water treatment (oxygen scavenger)",
      "Pulp and paper bleaching",
      "Textile industry",
      "Photography chemicals",
      "Food preservative",
      "Chemical synthesis",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "A full 20-foot container (27MT) is recommended for cost-effective international shipping." },
      { question: "What is the main use in water treatment?", answer: "Sodium sulfite is used as an oxygen scavenger in boiler water treatment to prevent corrosion caused by dissolved oxygen." },
      { question: "How should it be stored?", answer: "Store in a cool, dry, well-ventilated area in tightly sealed containers. Sodium sulfite can oxidize to sodium sulfate when exposed to air." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "27MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Sulfur Compounds",
  },
  {
    id: "16",
    name: "Sodium Bicarbonate (Baking Soda)",
    nameCn: "小苏打",
    cas: "144-55-8",
    hsCode: "2836300000",
    slug: "sodium-bicarbonate",
    shortDescription: "Food and industrial grade sodium bicarbonate for baking, cleaning, and pharmaceutical applications.",
    description: `Sodium Bicarbonate (NaHCO₃), commonly known as Baking Soda, is a high-performance inorganic salt widely recognized for its exceptional leavening, buffering, and cleaning capabilities. It is a vital ingredient in the production of food products, pharmaceuticals, and various industrial materials. Our Sodium Bicarbonate is manufactured to high standards of purity and consistency, ensuring optimal performance in both food-grade and industrial applications.

In the **food industry**, Sodium Bicarbonate is a primary "leavening agent" (E500ii). It works by reacting with acidic ingredients to produce carbon dioxide gas, which causes dough and batter to rise, resulting in a light and airy texture in baked goods such as bread, cakes, and cookies. It is also used as a **pH regulator** and **buffering agent** in various processed foods and beverages.

The **pharmaceutical industry** utilizes Sodium Bicarbonate as an **antacid** to relieve symptoms of indigestion and heartburn. It works by neutralizing excess stomach acid. It is also used as a **buffering agent** in various medications and as a component in oral rehydration salts (ORS). In medical treatments, it is used to treat metabolic acidosis and as a component in various intravenous solutions.

In **industrial applications**, Sodium Bicarbonate serves as a powerful **cleaning and deodorizing agent**. It is used in the production of household and industrial cleaners to help remove stains and odors from various surfaces. Its mild abrasive nature makes it effective for cleaning delicate surfaces without causing damage. It is also used in **flue gas treatment** to remove acidic gases, such as sulfur dioxide and hydrogen chloride, from industrial emissions.

The **animal feed industry** employs Sodium Bicarbonate as a **buffering agent** to maintain the proper pH in the digestive systems of livestock, particularly ruminants. This helps to improve digestion and overall animal health. It is also used in **fire extinguishers** as a dry chemical agent to suppress fires.

Furthermore, Sodium Bicarbonate finds applications in **personal care products**, such as toothpastes and mouthwashes, where it acts as a mild abrasive and deodorizing agent. Its ability to maintain a stable pH (buffering) makes it valuable in numerous chemical processes.

Our Sodium Bicarbonate is available in various grades, including food grade (FCC/USP), industrial grade, and feed grade, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Sodium Bicarbonate to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "NaHCO₃" },
      { label: "CAS Number", value: "144-55-8" },
      { label: "HS Code", value: "2836300000" },
      { label: "Purity", value: "≥99%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin / Wuhan" },
    ],
    applications: [
      "Food industry (baking, leavening)",
      "Pharmaceutical (antacid)",
      "Animal feed additive",
      "Flue gas treatment",
      "Cleaning and deodorizing",
      "Fire extinguisher agent",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "We recommend a full 20-foot container (25MT) for the best pricing and shipping efficiency." },
      { question: "Do you offer food grade baking soda?", answer: "Yes, we supply both food grade (FCC/USP) and industrial grade sodium bicarbonate." },
      { question: "What particle sizes are available?", answer: "We offer various particle sizes including fine powder and granular forms to suit different applications." },
    ],
    ports: "Qingdao / Tianjin / Wuhan",
    loading: "25MT/20GP",
    packaging: "25KG bags",
    category: "Alkali Products",
  },
  {
    id: "17",
    name: "Sodium Acetate Anhydrous",
    nameCn: "无水醋酸钠",
    cas: "127-09-3",
    hsCode: "2915291000",
    slug: "sodium-acetate-anhydrous",
    shortDescription: "High-purity sodium acetate anhydrous for textile dyeing, food, and chemical synthesis.",
    description: `Sodium Acetate Anhydrous (CH₃COONa) is a high-purity, inorganic salt widely recognized for its exceptional buffering, seasoning, and chemical intermediate capabilities. It is a vital ingredient in the production of food products, industrial chemicals, and various other materials. Our Sodium Acetate Anhydrous is manufactured to high standards of purity and consistency, ensuring optimal performance in both food-grade and industrial applications.

In the **food industry**, Sodium Acetate Anhydrous is a primary "seasoning" and "preservative" (E262i). It provides a mild, salty-tart flavor to various products, such as potato chips, snacks, and seasonings. It also acts as a **buffering agent** to control the pH of various processed foods and beverages, ensuring a consistent taste and texture. Its antimicrobial properties help to extend the shelf life of these products by inhibiting the growth of bacteria and molds.

The **industrial sector** utilizes Sodium Acetate Anhydrous as a versatile **buffering agent** and **chemical intermediate**. It is used in the **textile industry** as a mordant in dyeing processes and for neutralizing acidic wastewater. In the **leather industry**, it is used as a pickling agent and for the production of high-quality leather products. In **chemical synthesis**, it is used as a raw material for the production of various other acetates and as a building block for other organic chemicals.

In **construction**, Sodium Acetate Anhydrous is used as a **concrete sealant** and **waterproofing agent**. It reacts with the calcium hydroxide in concrete to form a stable, water-insoluble precipitate that fills the pores and capillaries, reducing water penetration and improving the durability of the concrete. It is also used as a **de-icing agent** for airport runways and bridges, as it is less corrosive than traditional salts.

The **pharmaceutical industry** employs Sodium Acetate Anhydrous as a **buffering agent** in various medications and as a component in intravenous solutions. It is also used in **biotechnology** for the purification of proteins and other biological molecules. In medical treatments, it is used to treat metabolic acidosis and as a component in various dialysis solutions.

Furthermore, Sodium Acetate Anhydrous finds applications in **heating pads** and **hand warmers**, where it acts as a phase change material. Its high solubility and stable nature make it an ideal choice for many applications.

Our Sodium Acetate Anhydrous is available in various grades, including food grade and industrial grade, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Sodium Acetate Anhydrous to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "CH₃COONa" },
      { label: "CAS Number", value: "127-09-3" },
      { label: "HS Code", value: "2915291000" },
      { label: "Purity", value: "≥99%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Textile dyeing mordant",
      "Food additive (seasoning/preservative)",
      "Concrete sealant",
      "Buffer solution preparation",
      "Pharmaceutical manufacturing",
      "Heating pad ingredient",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "A full 20-foot container (25MT) is recommended for cost-effective ordering." },
      { question: "Is food grade available?", answer: "Yes, we offer both food grade and industrial grade sodium acetate anhydrous." },
      { question: "What is the difference between anhydrous and trihydrate?", answer: "Anhydrous form contains no water of crystallization and has a higher active content. Trihydrate contains three molecules of water and is typically less expensive." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "25MT/20GP",
    packaging: "25KG bags",
    category: "Acetate Compounds",
  },
  {
    id: "18",
    name: "Ammonium Chloride",
    nameCn: "氯化铵",
    cas: "12125-02-9",
    hsCode: "2827101000",
    slug: "ammonium-chloride",
    shortDescription: "Industrial and agricultural grade ammonium chloride for fertilizer, electroplating, and flux applications.",
    description: `Ammonium Chloride (NH₄Cl) is a high-performance inorganic salt widely recognized for its exceptional nitrogen content and its ability to act as a flux and chemical intermediate. It is a vital ingredient in the production of fertilizers, industrial chemicals, and various other products. Our Ammonium Chloride is manufactured to high standards of purity and consistency, ensuring optimal performance in both agricultural and industrial applications.

In the **agricultural industry**, Ammonium Chloride is a primary "nitrogen fertilizer." It provides a readily available source of nitrogen (25%) to crops, promoting healthy growth and increasing yields. It is particularly effective for crops that are tolerant of chloride, such as rice, wheat, and corn. Its acidic nature also helps to lower the pH of alkaline soils, improving the availability of other nutrients.

The **industrial sector** utilizes Ammonium Chloride as a versatile **flux** and **chemical intermediate**. It is used in the **metalworking industry** as a flux for galvanizing, tinning, and soldering. It helps to remove oxides from the surface of the metal, ensuring a clean and strong bond. In the **textile industry**, it is used as a dyeing assistant and for the production of various textile chemicals. In **dry cell batteries**, it is used as an electrolyte to facilitate the flow of electricity.

In **food processing**, food-grade Ammonium Chloride is used as a **yeast nutrient** and **dough conditioner** in the baking industry. It helps to improve the texture and volume of bread and other baked goods. It is also used as a **flavoring agent** in certain types of licorice and other confectionery products.

The **pharmaceutical industry** employs Ammonium Chloride as an **expectorant** in cough medicines and as a component in various medications. It is also used in **biotechnology** for the purification of proteins and other biological molecules. In medical treatments, it is used to treat metabolic alkalosis and as a component in various intravenous solutions.

Furthermore, Ammonium Chloride finds applications in **leather tanning** as a deliming agent and in **construction** as a concrete retarder to slow down the setting time of concrete. Its high solubility and stable nature make it an ideal choice for many applications.

Our Ammonium Chloride is available in various grades, including agricultural grade and industrial grade, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Ammonium Chloride to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "NH₄Cl" },
      { label: "CAS Number", value: "12125-02-9" },
      { label: "HS Code", value: "2827101000" },
      { label: "Purity", value: "≥99.5%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "50KG bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Nitrogen fertilizer",
      "Soldering and galvanizing flux",
      "Dry cell battery manufacturing",
      "Textile printing and dyeing",
      "Pharmaceutical (expectorant)",
      "Food additive (yeast nutrient)",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "We recommend a full 20-foot container (25MT) for the best pricing." },
      { question: "What grades are available?", answer: "We offer industrial grade, agricultural grade, and food grade ammonium chloride." },
      { question: "Is ammonium chloride hazardous?", answer: "Ammonium chloride is generally considered non-hazardous for transport, but proper handling procedures should be followed as per the MSDS." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "25MT/20GP",
    packaging: "50KG bags",
    category: "Chloride Compounds",
  },
  {
    id: "19",
    name: "Polyaluminum Chloride (PAC)",
    nameCn: "聚合氯化铝",
    cas: "1327-41-9",
    hsCode: "2827320000",
    slug: "polyaluminum-chloride",
    shortDescription: "Effective polyaluminum chloride coagulant for water treatment and wastewater purification.",
    description: `Polyaluminum Chloride (PAC, [Al₂(OH)nCl₆-n]m) is a high-performance inorganic polymer coagulant widely recognized for its exceptional water purification and wastewater treatment capabilities. It is a vital ingredient in the production of drinking water, industrial process water, and various other water treatment applications. Our PAC is manufactured to high standards of purity and consistency, ensuring optimal performance in both municipal and industrial water treatment.

In the **water treatment industry**, PAC is a primary "coagulant." It works by neutralizing the electrical charges on suspended particles in water, causing them to clump together into larger flocs that can be easily removed by sedimentation and filtration. It is highly effective at removing turbidity, color, and organic matter from a wide range of water sources. Its high efficiency and low dosage requirements make it a cost-effective choice for large-scale water treatment plants.

The **industrial sector** utilizes PAC for the treatment of various types of wastewater, including those from the **pulp and paper industry**, **textile industry**, and **chemical industry**. It helps to remove suspended solids, dyes, and other contaminants from industrial effluents, ensuring compliance with environmental discharge standards. In the **pulp and paper industry**, it is also used as a sizing agent and for the recovery of chemicals from the spent pulping liquor.

In **municipal water treatment**, PAC is used for the production of high-quality drinking water. It is effective at removing pathogens, such as bacteria and viruses, and for reducing the levels of heavy metals and other harmful substances in the water. Its ability to work over a wide pH range and in cold water makes it a versatile choice for water treatment facilities in various climates.

The **chemical industry** employs PAC as a raw material for the production of various other aluminum-based chemicals and as a building block for other inorganic polymers. It is also used in **metallurgy** for the refining of various metals and in **construction** as a concrete accelerator to speed up the setting time of concrete.

Furthermore, PAC finds applications in **oil drilling** as a component in drilling muds and in **personal care products**, such as antiperspirants, where it acts as an astringent. Its high solubility and stable nature make it an ideal choice for many applications.

Our PAC is available in various grades, including drinking water grade and industrial grade, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of PAC to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "Al₂(OH)ₙCl₆₋ₙ" },
      { label: "CAS Number", value: "1327-41-9" },
      { label: "HS Code", value: "2827320000" },
      { label: "Al₂O₃ Content", value: "28-30%" },
      { label: "Appearance", value: "Yellow powder / liquid" },
      { label: "Packaging", value: "25KG bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Drinking water purification",
      "Industrial wastewater treatment",
      "Paper manufacturing",
      "Textile wastewater treatment",
      "Oil-water separation",
      "Swimming pool water treatment",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "A full 20-foot container (25MT) is recommended for cost-effective international shipping." },
      { question: "What Al₂O₃ content levels are available?", answer: "We offer PAC with 28%, 29%, and 30% Al₂O₃ content. Higher content provides better coagulation performance." },
      { question: "How does PAC compare to aluminum sulfate?", answer: "PAC offers faster floc formation, lower dosage requirements, wider pH range effectiveness, and less sludge production compared to traditional aluminum sulfate." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "25MT/20GP",
    packaging: "25KG bags",
    category: "Water Treatment",
  },
  {
    id: "20",
    name: "Sodium Bisulfite",
    nameCn: "亚硫酸氢钠",
    cas: "7631-90-5",
    hsCode: "2832100000",
    slug: "sodium-bisulfite",
    shortDescription: "Industrial sodium bisulfite for water treatment, food preservation, and chemical processing.",
    description: `Sodium Bisulfite (NaHSO₃) is a high-performance inorganic salt widely recognized for its exceptional reducing, antioxidant, and preservative capabilities. It is a vital ingredient in the production of food products, industrial chemicals, and various other materials. Our Sodium Bisulfite is manufactured to high standards of purity and consistency, ensuring optimal performance in both food-grade and industrial applications.

In the **food industry**, Sodium Bisulfite is a primary "preservative" and "antioxidant" (E222). It works by releasing sulfur dioxide (SO₂), which inhibits the growth of bacteria, yeasts, and molds, extending the shelf life of various products. It is widely used in the preservation of dried fruits, vegetables, fruit juices, and wines. It also helps to prevent the browning of fruits and vegetables by inhibiting the action of enzymes.

The **industrial sector** utilizes Sodium Bisulfite as a versatile **reducing agent**. It is used in the **textile industry** for bleaching wool and other natural fibers and for removing excess chlorine after bleaching processes. In the **pulp and paper industry**, it is used as a bleaching assistant and for the production of wood pulp. In **water treatment**, it is used as a dechlorination agent to remove residual chlorine from treated water.

In **mining and metallurgy**, Sodium Bisulfite is used as a **flotation agent** for the separation of various minerals and for the recovery of precious metals. It is also employed in the **chemical industry** as a raw material for the production of various other sulfur-based chemicals, such as sodium thiosulphate and sodium sulfite.

The **pharmaceutical industry** employs Sodium Bisulfite as an **antioxidant** and **stabilizer** in various medications and as a component in various pharmaceutical formulations. It is also used in **photography** as a component in developing and fixing solutions.

Furthermore, Sodium Bisulfite finds applications in **leather tanning** as a reducing agent and in **construction** as a concrete retarder to slow down the setting time of concrete. Its high solubility and stable nature make it an ideal choice for many applications.

Our Sodium Bisulfite is available in various grades, including food grade and industrial grade, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Sodium Bisulfite to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "NaHSO₃" },
      { label: "CAS Number", value: "7631-90-5" },
      { label: "HS Code", value: "2832100000" },
      { label: "Purity", value: "≥98.5%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags" },
      { label: "Loading", value: "27MT per 20GP container" },
      { label: "Available Ports", value: "Qingdao / Tianjin" },
    ],
    applications: [
      "Water treatment (dechlorination)",
      "Food preservative",
      "Textile bleaching",
      "Pulp and paper industry",
      "Chemical synthesis",
      "Photography chemicals",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "We recommend a full 20-foot container (27MT) for the best pricing and logistics efficiency." },
      { question: "What is the difference between sodium bisulfite and sodium metabisulfite?", answer: "Sodium bisulfite (NaHSO₃) and sodium metabisulfite (Na₂S₂O₅) are closely related. In practice, commercial sodium bisulfite often contains sodium metabisulfite. Both serve similar functions as reducing agents and preservatives." },
      { question: "Is it safe for food use?", answer: "Food grade sodium bisulfite is available and approved for use as a preservative in many food products, subject to regulatory limits." },
    ],
    ports: "Qingdao / Tianjin",
    loading: "27MT/20GP",
    packaging: "25KG bags",
    category: "Sulfur Compounds",
  },
  {
    id: "21",
    name: "Borax",
    nameCn: "硼砂",
    cas: "1303-96-4",
    hsCode: "2840190000",
    slug: "borax",
    shortDescription: "Industrial borax for glass manufacturing, ceramics, detergents, and metallurgical applications.",
    description: `Borax (Na₂B₄O₇·10H₂O), also known as Sodium Borate, is a high-performance inorganic salt widely recognized for its exceptional cleaning, buffering, and fluxing capabilities. It is a vital ingredient in the production of cleaning agents, industrial chemicals, and various other products. Our Borax is manufactured to high standards of purity and consistency, ensuring optimal performance in both industrial and household applications.

In the **cleaning and detergent industry**, Borax is a primary "cleaning booster" and "water softener." It works by sequestering calcium and magnesium ions in hard water, preventing them from interfering with the action of surfactants. This ensures that detergents can work effectively even in challenging water conditions, improving the overall cleaning power. It is also used as a **buffering agent** to control the pH of various cleaning formulations and as a **deodorizing agent** to remove odors from various surfaces.

The **industrial sector** utilizes Borax as a versatile **flux** and **chemical intermediate**. It is used in the **metallurgy industry** as a flux for soldering, brazing, and welding. It helps to remove oxides from the surface of the metal, ensuring a clean and strong bond. In the **glass and ceramic industry**, it is used as a flux to lower the melting temperature of the glass and to improve the durability and clarity of the final products.

In **agriculture**, Borax is used as a **boron fertilizer** to provide a readily available source of boron to crops. Boron is an essential micronutrient for plant growth and development, particularly for the formation of cell walls and for the transport of sugars. Its application helps to improve crop yields and quality, particularly in boron-deficient soils.

The **chemical industry** employs Borax as a raw material for the production of various other borates and as a building block for other inorganic chemicals. It is also used in the **textile industry** as a flame retardant and in the **pulp and paper industry** as a bleaching assistant.

Furthermore, Borax finds applications in **personal care products**, such as soaps and lotions, where it acts as an emulsifier and buffering agent. Its ability to maintain a stable pH (buffering) makes it valuable in numerous chemical processes.

Our Borax is available in various forms, including decahydrate and pentahydrate, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Borax to our global partners.`,
    image: "/images/products/borax-1303-96-4.jpg",
    specs: [
      { label: "Chemical Formula", value: "Na₂B₄O₇·10H₂O" },
      { label: "CAS Number", value: "1303-96-4" },
      { label: "HS Code", value: "2840190000" },
      { label: "B₂O₃ Content", value: "≥36%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG / 50KG bags" },
      { label: "Loading", value: "27MT per 20GP container" },
      { label: "Available Ports", value: "Dalian" },
    ],
    applications: [
      "Glass and fiberglass manufacturing",
      "Ceramic and enamel production",
      "Detergent and cleaning products",
      "Metallurgical flux",
      "Insecticide and herbicide",
      "Flame retardant",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "A full 20-foot container (27MT) is recommended for cost-effective ordering." },
      { question: "What forms of borax do you offer?", answer: "We offer borax in both decahydrate (10-mol) and pentahydrate (5-mol) forms, as well as anhydrous borax for specific applications." },
      { question: "Which port is used for borax shipments?", answer: "Borax is primarily shipped from Dalian port." },
    ],
    ports: "Dalian",
    loading: "27MT/20GP",
    packaging: "25KG/50KG bags",
    category: "Boron Compounds",
  },
  {
    id: "22",
    name: "Sulfamic Acid",
    nameCn: "氨基磺酸",
    cas: "5329-14-6",
    hsCode: "2811199090",
    slug: "sulfamic-acid",
    shortDescription: "High-purity sulfamic acid for descaling, cleaning, and electroplating applications.",
    description: `Sulfamic Acid (H₃NSO₃) is a high-performance inorganic acid widely recognized for its exceptional cleaning, descaling, and chemical intermediate capabilities. It is a vital ingredient in the production of cleaning agents, industrial chemicals, and various other products. Our Sulfamic Acid is manufactured to high standards of purity and consistency, ensuring optimal performance in both industrial and household applications.

In the **cleaning and descaling industry**, Sulfamic Acid is a primary "descaling agent." It is highly effective at removing calcium and magnesium scale, rust, and other mineral deposits from a wide range of surfaces, including boilers, heat exchangers, and piping systems. Its high acidity (pH 1.2 in a 1% solution) and low corrosivity compared to other strong acids make it an ideal choice for cleaning industrial equipment and household appliances. It is also used as a **cleaning agent** for ceramic tiles and grout.

The **industrial sector** utilizes Sulfamic Acid as a versatile **chemical intermediate**. It is used in the production of various other sulfamates and as a building block for other organic chemicals. It is also employed in the **textile industry** as a flame retardant and in the **pulp and paper industry** as a bleaching assistant. In **water treatment**, it is used as a scale inhibitor and for the removal of residual chlorine from treated water.

In **agriculture**, Sulfamic Acid is used as a **herbicide** and **desiccant** for certain types of crops. It helps to control the growth of weeds and to facilitate the harvesting of crops. Its acidic nature also helps to lower the pH of alkaline soils, improving the availability of other nutrients.

The **chemical industry** employs Sulfamic Acid as a raw material for the production of various other sulfur-based chemicals and as a building block for other inorganic chemicals. It is also used in **metallurgy** for the refining of various metals and in **construction** as a concrete retarder to slow down the setting time of concrete.

Furthermore, Sulfamic Acid finds applications in **personal care products**, such as hair dyes and perms, where it acts as a pH regulator and stabilizer. Its high solubility and stable nature make it an ideal choice for many applications.

Our Sulfamic Acid is available in various grades, including industrial grade and high-purity grade, to meet specific application requirements. We provide high-quality packaging in 25KG, 50KG, and 1000KG jumbo bags, ensuring product integrity during international shipping. With reliable logistics from major Chinese ports like Tianjin, Qingdao, and Lianyungang, we offer a consistent and cost-effective supply of Sulfamic Acid to our global partners.`,
    image: DEFAULT_IMAGE,
    specs: [
      { label: "Chemical Formula", value: "NH₂SO₃H" },
      { label: "CAS Number", value: "5329-14-6" },
      { label: "HS Code", value: "2811199090" },
      { label: "Purity", value: "≥99.5%" },
      { label: "Appearance", value: "White crystalline powder" },
      { label: "Packaging", value: "25KG bags / Jumbo bags" },
      { label: "Loading", value: "25MT per 20GP container" },
      { label: "Available Ports", value: "Tianjin" },
    ],
    applications: [
      "Industrial descaling and cleaning",
      "Electroplating industry",
      "Paper and pulp bleaching",
      "Herbicide manufacturing",
      "Flame retardant synthesis",
      "Concrete admixture",
    ],
    faqs: [
      { question: "What is the minimum order quantity?", answer: "We recommend a full 20-foot container (25MT) for the best pricing and shipping efficiency." },
      { question: "Is sulfamic acid safer than hydrochloric acid for descaling?", answer: "Yes, sulfamic acid is generally considered safer than hydrochloric acid for descaling applications. It is less corrosive to metals, produces no harmful fumes, and is easier to handle and store." },
      { question: "What industries use sulfamic acid?", answer: "Major industries include cleaning and maintenance, electroplating, paper manufacturing, agriculture (herbicides), and construction (concrete admixtures)." },
    ],
    ports: "Tianjin",
    loading: "25MT/20GP",
    packaging: "25KG/Jumbo bags",
    category: "Specialty Acids",
  },
];

export const productCategories = [
  "All Products",
  "Sulfur Compounds",
  "Alkali Products",
  "Organic Acids",
  "Chloride Compounds",
  "Phosphate Compounds",
  "Sulfate Compounds",
  "Citrate Compounds",
  "Acetate Compounds",
  "Water Treatment",
  "Boron Compounds",
  "Specialty Acids",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(currentSlug: string, limit = 4): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .concat(products.filter((p) => p.slug !== currentSlug && p.category !== current.category))
    .slice(0, limit);
}