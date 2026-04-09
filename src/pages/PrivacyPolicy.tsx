import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");

  const content = isRu ? {
    title: "Политика конфиденциальности",
    lastUpdated: "Последнее обновление: 4 апреля 2026 г.",
    sections: [
      {
        title: "1. Введение",
        content: "Sinopeakchem («мы», «наш» или «нас») уважает вашу конфиденциальность и обязуется защищать ваши персональные данные. Эта политика конфиденциальности проинформирует вас о том, как мы заботимся о ваших персональных данных, когда вы посещаете наш веб-сайт, и расскажет вам о ваших правах на конфиденциальность и о том, как закон защищает вас."
      },
      {
        title: "2. Данные, которые мы собираем",
        content: "Мы можем собирать, использовать, хранить и передавать различные виды персональных данных о вас, которые мы сгруппировали следующим образом:",
        list: [
          "Идентификационные данные: имя, фамилия, имя пользователя или аналогичный идентификатор.",
          "Контактные данные: адрес электронной почты и номера телефонов.",
          "Технические данные: адрес интернет-протокола (IP), тип и версия браузера, настройки часового пояса и местоположение.",
          "Данные об использовании: информация о том, как вы используете наш веб-сайт, продукты и услуги."
        ]
      },
      {
        title: "3. Как мы используем ваши данные",
        content: "Мы будем использовать ваши персональные данные только тогда, когда это разрешено законом. Чаще всего мы будем использовать ваши персональные данные в следующих обстоятельствах:",
        list: [
          "Для регистрации вас в качестве нового клиента.",
          "Для обработки и доставки вашего заказа.",
          "Для управления нашими отношениями с вами.",
          "Для улучшения нашего веб-сайта, продуктов/услуг, маркетинга или отношений с клиентами."
        ]
      },
      {
        title: "4. Безопасность данных",
        content: "Мы внедрили соответствующие меры безопасности, чтобы предотвратить случайную потерю, использование или несанкционированный доступ к вашим персональным данным, их изменение или раскрытие."
      },
      {
        title: "5. Свяжитесь с нами",
        content: "Если у вас есть какие-либо вопросы об этой политике конфиденциальности или нашей практике конфиденциальности, свяжитесь с нами по адресу: info@sinopeakchem.com"
      }
    ]
  } : (isFr ? {
    title: "Politique de Confidentialité",
    lastUpdated: "Dernière mise à jour : 4 avril 2026",
    sections: [
      {
        title: "1. Introduction",
        content: "Sinopeakchem (« nous », « notre » ou « nos ») respecte votre vie privée et s'engage à protéger vos données personnelles. Cette politique de confidentialité vous informera sur la manière dont nous traitons vos données personnelles lorsque vous visitez notre site web et vous informera sur vos droits en matière de confidentialité et sur la manière dont la loi vous protège."
      },
      {
        title: "2. Les données que nous collectons",
        content: "Nous pouvons collecter, utiliser, stocker et transférer différents types de données personnelles vous concernant, que nous avons regroupées comme suit :",
        list: [
          "Données d'identité : comprend le prénom, le nom, le nom d'utilisateur ou un identifiant similaire.",
          "Données de contact : comprend l'adresse e-mail et les numéros de téléphone.",
          "Données techniques : comprend l'adresse IP, le type et la version du navigateur, le réglage du fuseau horaire et l'emplacement.",
          "Données d'utilisation : comprend des informations sur la façon dont vous utilisez notre site web, nos produits et nos services."
        ]
      },
      {
        title: "3. Comment nous utilisons vos données",
        content: "Nous n'utiliserons vos données personnelles que lorsque la loi nous le permet. Le plus souvent, nous utiliserons vos données personnelles dans les circonstances suivantes :",
        list: [
          "Pour vous enregistrer en tant que nouveau client.",
          "Pour traiter et livrer votre commande.",
          "Pour gérer notre relation avec vous.",
          "Pour améliorer notre site web, nos produits/services, notre marketing ou nos relations clients."
        ]
      },
      {
        title: "4. Sécurité des données",
        content: "Nous avons mis en place des mesures de sécurité appropriées pour empêcher que vos données personnelles ne soient accidentellement perdues, utilisées ou consultées de manière non autorisée, modifiées ou divulguées."
      },
      {
        title: "5. Contactez-nous",
        content: "Si vous avez des questions sur cette politique de confidentialité ou sur nos pratiques en matière de confidentialité, veuillez nous contacter à : info@sinopeakchem.com"
      }
    ]
  } : (isEs ? {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: 4 de abril de 2026",
    sections: [
      {
        title: "1. Introducción",
        content: "Sinopeakchem (\"nosotros\", \"nuestro\" o \"nos\") respeta su privacidad y se compromete a proteger sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web y le informará sobre sus derechos de privacidad y cómo la ley le protege."
      },
      {
        title: "2. Los datos que recopilamos",
        content: "Podemos recopilar, utilizar, almacenar y transferir diferentes tipos de datos personales sobre usted, que hemos agrupado de la siguiente manera:",
        list: [
          "Datos de identidad: incluye nombre, apellido, nombre de usuario o identificador similar.",
          "Datos de contacto: incluye dirección de correo electrónico y números de teléfono.",
          "Datos técnicos: incluye la dirección del protocolo de Internet (IP), el tipo y la versión del navegador, la configuración de la zona horaria y la ubicación.",
          "Datos de uso: incluye información sobre cómo utiliza nuestro sitio web, productos y servicios."
        ]
      },
      {
        title: "3. Cómo utilizamos sus datos",
        content: "Solo utilizaremos sus datos personales cuando la ley nos lo permita. Con mayor frecuencia, utilizaremos sus datos personales en las siguientes circunstancias:",
        list: [
          "Para registrarlo como nuevo cliente.",
          "Para procesar y entregar su pedido.",
          "Para gestionar nuestra relación con usted.",
          "Para mejorar nuestro sitio web, productos/servicios, marketing o relaciones con los clientes."
        ]
      },
      {
        title: "4. Seguridad de los datos",
        content: "Hemos implementado medidas de seguridad adecuadas para evitar que sus datos personales se pierdan accidentalmente, se utilicen o se acceda a ellos de forma no autorizada, se alteren o se divulguen."
      },
      {
        title: "5. Contáctenos",
        content: "Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, contáctenos en: info@sinopeakchem.com"
      }
    ]
  } : {
    title: "Privacy Policy",
    lastUpdated: "Last updated: April 04, 2026",
    sections: [
      {
        title: "1. Introduction",
        content: "Sinopeakchem (\"we,\" \"our,\" or \"us\") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you."
      },
      {
        title: "2. The Data We Collect",
        content: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:",
        list: [
          "Identity Data: includes first name, last name, username or similar identifier.",
          "Contact Data: includes email address and telephone numbers.",
          "Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location.",
          "Usage Data: includes information about how you use our website, products and services."
        ]
      },
      {
        title: "3. How We Use Your Data",
        content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:",
        list: [
          "To register you as a new customer.",
          "To process and deliver your order.",
          "To manage our relationship with you.",
          "To improve our website, products/services, marketing or customer relationships."
        ]
      },
      {
        title: "4. Data Security",
        content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed."
      },
      {
        title: "5. Contact Us",
        content: "If you have any questions about this privacy policy or our privacy practices, please contact us at: info@sinopeakchem.com"
      }
    ]
  });

  return (
    <Layout title={content.title}>
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">{content.title}</h1>
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600 mb-6">{content.lastUpdated}</p>
          
          {content.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <p className="mb-4">{section.content}</p>
              {section.list && (
                <ul className="list-disc pl-6 mb-4">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
