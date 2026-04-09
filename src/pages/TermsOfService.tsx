import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";

const TermsOfService = () => {
  const location = useLocation();
  const isRu = location.pathname.startsWith("/ru");
  const isFr = location.pathname.startsWith("/fr");
  const isEs = location.pathname.startsWith("/es");

  const content = isRu ? {
    title: "Условия использования",
    lastUpdated: "Последнее обновление: 4 апреля 2026 г.",
    sections: [
      {
        title: "1. Условия",
        content: "Заходя на веб-сайт sinopeakchem.com, вы соглашаетесь соблюдать настоящие условия обслуживания, все применимые законы и правила и соглашаетесь с тем, что вы несете ответственность за соблюдение любых применимых местных законов. Если вы не согласны с любым из этих условий, вам запрещено использовать этот сайт или заходить на него."
      },
      {
        title: "2. Лицензия на использование",
        content: "Разрешается временная загрузка одной копии материалов (информации или программного обеспечения) на веб-сайте Sinopeakchem только для личного, некоммерческого временного просмотра. Это предоставление лицензии, а не передача права собственности, и по этой лицензии вы не можете:",
        list: [
          "изменять или копировать материалы;",
          "использовать материалы в любых коммерческих целях или для любого публичного показа (коммерческого или некоммерческого);",
          "пытаться декомпилировать или реконструировать любое программное обеспечение, содержащееся на веб-сайте Sinopeakchem;",
          "удалять любые пометки об авторских правах или других правах собственности из материалов; или",
          "передавать материалы другому лицу или «зеркалировать» материалы на любом другом сервере."
        ]
      },
      {
        title: "3. Отказ от ответственности",
        content: "Материалы на веб-сайте Sinopeakchem предоставляются на условиях «как есть». Sinopeakchem не дает никаких гарантий, явных или подразумеваемых, и настоящим отказывается от всех других гарантий, включая, помимо прочего, подразумеваемые гарантии или условия товарной пригодности, пригодности для определенной цели или ненарушения прав интеллектуальной собственности или других нарушений прав."
      },
      {
        title: "4. Ограничения",
        content: "Ни при каких обстоятельствах Sinopeakchem или ее поставщики не несут ответственности за любые убытки (включая, помимо прочего, убытки в связи с потерей данных или прибыли или из-за перерыва в деятельности), возникающие в результате использования или невозможности использования материалов на веб-сайте Sinopeakchem, даже если Sinopeakchem или уполномоченный представитель Sinopeakchem был уведомлен устно или письменно о возможности такого ущерба."
      },
      {
        title: "5. Применимое право",
        content: "Настоящие положения и условия регулируются и толкуются в соответствии с законодательством Китая, и вы безоговорочно подчиняетесь исключительной юрисдикции судов в этом государстве или месте."
      }
    ]
  } : (isFr ? {
    title: "Conditions d'Utilisation",
    lastUpdated: "Dernière mise à jour : 4 avril 2026",
    sections: [
      {
        title: "1. Conditions",
        content: "En accédant au site web sinopeakchem.com, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect de toutes les lois locales applicables. Si vous n'êtes pas d'accord avec l'une de ces conditions, il vous est interdit d'utiliser ou d'accéder à ce site."
      },
      {
        title: "2. Licence d'utilisation",
        content: "La permission est accordée de télécharger temporairement une copie du matériel (information ou logiciel) sur le site web de Sinopeakchem pour un visionnage transitoire personnel et non commercial uniquement. Il s'agit de l'octroi d'une licence, et non d'un transfert de titre, et sous cette licence, vous ne pouvez pas :",
        list: [
          "modifier ou copier le matériel ;",
          "utiliser le matériel à des fins commerciales ou pour tout affichage public (commercial ou non commercial) ;",
          "tenter de décompiler ou de rétro-concevoir tout logiciel contenu sur le site web de Sinopeakchem ;",
          "supprimer toute mention de droit d'auteur ou autre mention de propriété du matériel ; ou",
          "transférer le matériel à une autre personne ou « refléter » le matériel sur tout autre serveur."
        ]
      },
      {
        title: "3. Clause de non-responsabilité",
        content: "Le matériel sur le site web de Sinopeakchem est fourni « tel quel ». Sinopeakchem ne donne aucune garantie, expresse ou implicite, et décline et annule par la présente toutes les autres garanties, y compris, sans s'y limiter, les garanties ou conditions implicites de qualité marchande, d'adéquation à un usage particulier ou de non-violation de la propriété intellectuelle ou autre violation des droits."
      },
      {
        title: "4. Limitations",
        content: "En aucun cas Sinopeakchem ou ses fournisseurs ne pourront être tenus responsables de tout dommage (y compris, sans s'y limiter, les dommages pour perte de données ou de profit, ou dus à une interruption d'activité) découlant de l'utilisation ou de l'incapacité d'utiliser le matériel sur le site web de Sinopeakchem, même si Sinopeakchem ou un représentant autorisé de Sinopeakchem a été informé oralement ou par écrit de la possibilité de tels dommages."
      },
      {
        title: "5. Droit applicable",
        content: "Ces termes et conditions sont régis et interprétés conformément aux lois de la Chine et vous vous soumettez irrévocablement à la juridiction exclusive des tribunaux de cet État ou de cet emplacement."
      }
    ]
  } : (isEs ? {
    title: "Condiciones de Servicio",
    lastUpdated: "Última actualización: 4 de abril de 2026",
    sections: [
      {
        title: "1. Términos",
        content: "Al acceder al sitio web sinopeakchem.com, usted acepta estar sujeto a estas condiciones de servicio, a todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de cualquier ley local aplicable. Si no está de acuerdo con alguno de estos términos, se le prohíbe utilizar o acceder a este sitio."
      },
      {
        title: "2. Licencia de uso",
        content: "Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de Sinopeakchem únicamente para visualización transitoria personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia usted no puede:",
        list: [
          "modificar o copiar los materiales;",
          "utilizar los materiales para cualquier propósito comercial, o para cualquier exhibición pública (comercial o no comercial);",
          "intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web de Sinopeakchem;",
          "eliminar cualquier derecho de autor u otras notaciones de propiedad de los materiales; o",
          "transferir los materiales a otra persona o \"reflejar\" los materiales en cualquier otro servidor."
        ]
      },
      {
        title: "3. Descargo de responsabilidad",
        content: "Los materiales en el sitio web de Sinopeakchem se proporcionan 'tal cual'. Sinopeakchem no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluidas, sin limitación, las garantías o condiciones implícitas de comerciabilidad, idoneidad para un propósito particular o no infracción de la propiedad intelectual u otra violación de derechos."
      },
      {
        title: "4. Limitaciones",
        content: "En ningún caso Sinopeakchem o sus proveedores serán responsables de ningún daño (incluidos, sin limitación, daños por pérdida de datos o beneficios, o debido a la interrupción del negocio) que surja del uso o la imposibilidad de usar los materiales en el sitio web de Sinopeakchem, incluso si Sinopeakchem o un representante autorizado de Sinopeakchem ha sido notificado verbalmente o por escrito de la posibilidad de tales daños."
      },
      {
        title: "5. Ley aplicable",
        content: "Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de China y usted se somete irrevocablemente a la jurisdicción exclusiva de los tribunales en ese Estado o ubicación."
      }
    ]
  } : {
    title: "Terms of Service",
    lastUpdated: "Last updated: April 04, 2026",
    sections: [
      {
        title: "1. Terms",
        content: "By accessing the website at sinopeakchem.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
      },
      {
        title: "2. Use License",
        content: "Permission is granted to temporarily download one copy of the materials (information or software) on Sinopeakchem's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
        list: [
          "modify or copy the materials;",
          "use the materials for any commercial purpose, or for any public display (commercial or non-commercial);",
          "attempt to decompile or reverse engineer any software contained on Sinopeakchem's website;",
          "remove any copyright or other proprietary notations from the materials; or",
          "transfer the materials to another person or \"mirror\" the materials on any other server."
        ]
      },
      {
        title: "3. Disclaimer",
        content: "The materials on Sinopeakchem's website are provided on an 'as is' basis. Sinopeakchem makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
      },
      {
        title: "4. Limitations",
        content: "In no event shall Sinopeakchem or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Sinopeakchem's website, even if Sinopeakchem or a Sinopeakchem authorized representative has been notified orally or in writing of the possibility of such damage."
      },
      {
        title: "5. Governing Law",
        content: "These terms and conditions are governed by and construed in accordance with the laws of China and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location."
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

export default TermsOfService;
