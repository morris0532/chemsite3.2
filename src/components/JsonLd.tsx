import React from 'react';

interface JsonLdProps {
  data: any;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export const generateProductSchema = (product: any, locale: string) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image],
    "description": product.shortDescription,
    "sku": product.cas,
    "mpn": product.hsCode,
    "brand": {
      "@type": "Brand",
      "name": "Sinopeakchem"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.sinopeakchem.com/${locale}/products/${product.slug}`,
      "availability": "https://schema.org/InStock",
      "hasReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "CN",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/ReturnFeesCustomerPays"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "USD"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 15,
            "maxValue": 30,
            "unitCode": "d"
          }
        }
      },
      "seller": {
        "@type": "Organization",
        "name": "Sinopeakchem"
      }
    }
  };
};

export const generateBlogSchema = (post: any, locale: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": [{
        "@type": "Person",
        "name": post.author,
        "url": `https://www.sinopeakchem.com/${locale}/about`
      }]
  };
};
