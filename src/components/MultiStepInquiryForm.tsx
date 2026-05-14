import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MultiStepInquiryFormProps {
  productName: string;
  isRu?: boolean;
  isFr?: boolean;
  isEs?: boolean;
  isAr?: boolean;
  onClose?: () => void;
}

interface FormData {
  industry: string;
  quantity: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  subscribe: boolean;
}

const INDUSTRY_OPTIONS = {
  en: [
    { value: "manufacturing", label: "Chemical Manufacturing" },
    { value: "distribution", label: "Distribution & Trading" },
    { value: "research", label: "Research & Development" },
    { value: "agriculture", label: "Agriculture & Fertilizers" },
    { value: "construction", label: "Construction & Building" },
    { value: "textile", label: "Textile & Dyeing" },
    { value: "food", label: "Food & Beverage" },
    { value: "pharmaceutical", label: "Pharmaceutical" },
    { value: "other", label: "Other" },
  ],
  ru: [
    { value: "manufacturing", label: "Химическое производство" },
    { value: "distribution", label: "Распределение и торговля" },
    { value: "research", label: "Исследования и разработки" },
    { value: "agriculture", label: "Сельское хозяйство и удобрения" },
    { value: "construction", label: "Строительство и строительные материалы" },
    { value: "textile", label: "Текстиль и окрашивание" },
    { value: "food", label: "Пищевая и напиточная промышленность" },
    { value: "pharmaceutical", label: "Фармацевтика" },
    { value: "other", label: "Другое" },
  ],
  fr: [
    { value: "manufacturing", label: "Fabrication Chimique" },
    { value: "distribution", label: "Distribution et Commerce" },
    { value: "research", label: "Recherche et Développement" },
    { value: "agriculture", label: "Agriculture et Engrais" },
    { value: "construction", label: "Construction et Bâtiment" },
    { value: "textile", label: "Textile et Teinture" },
    { value: "food", label: "Alimentation et Boissons" },
    { value: "pharmaceutical", label: "Pharmaceutique" },
    { value: "other", label: "Autre" },
  ],
  es: [
    { value: "manufacturing", label: "Fabricación Química" },
    { value: "distribution", label: "Distribución y Comercio" },
    { value: "research", label: "Investigación y Desarrollo" },
    { value: "agriculture", label: "Agricultura y Fertilizantes" },
    { value: "construction", label: "Construcción y Edificación" },
    { value: "textile", label: "Textil y Teñido" },
    { value: "food", label: "Alimentos y Bebidas" },
    { value: "pharmaceutical", label: "Farmacéutico" },
    { value: "other", label: "Otro" },
  ],
  ar: [
    { value: "manufacturing", label: "التصنيع الكيميائي" },
    { value: "distribution", label: "التوزيع والتجارة" },
    { value: "research", label: "البحث والتطوير" },
    { value: "agriculture", label: "الزراعة والأسمدة" },
    { value: "construction", label: "البناء والعمارة" },
    { value: "textile", label: "النسيج والصباغة" },
    { value: "food", label: "الغذاء والمشروبات" },
    { value: "pharmaceutical", label: "الأدوية" },
    { value: "other", label: "أخرى" },
  ],
};

const QUANTITY_OPTIONS = {
  en: [
    { value: "small", label: "< 5 MT" },
    { value: "medium", label: "5 - 25 MT" },
    { value: "large", label: "25 - 100 MT" },
    { value: "xlarge", label: "> 100 MT" },
  ],
  ru: [
    { value: "small", label: "< 5 тонн" },
    { value: "medium", label: "5 - 25 тонн" },
    { value: "large", label: "25 - 100 тонн" },
    { value: "xlarge", label: "> 100 тонн" },
  ],
  fr: [
    { value: "small", label: "< 5 MT" },
    { value: "medium", label: "5 - 25 MT" },
    { value: "large", label: "25 - 100 MT" },
    { value: "xlarge", label: "> 100 MT" },
  ],
  es: [
    { value: "small", label: "< 5 MT" },
    { value: "medium", label: "5 - 25 MT" },
    { value: "large", label: "25 - 100 MT" },
    { value: "xlarge", label: "> 100 MT" },
  ],
  ar: [
    { value: "small", label: "< 5 طن" },
    { value: "medium", label: "5 - 25 طن" },
    { value: "large", label: "25 - 100 طن" },
    { value: "xlarge", label: "> 100 طن" },
  ],
};

const CONTENT = {
  en: {
    step1Title: "What industry are you in?",
    step1Desc: "Help us understand your business",
    step2Title: "What's your expected purchase quantity?",
    step2Desc: "Tell us your volume requirements",
    step3Title: "Contact Information",
    step3Desc: "Let's get in touch",
    name: "Full Name *",
    email: "Email Address *",
    company: "Company Name",
    phone: "Phone Number *",
    message: "Additional Requirements",
    messagePlaceholder: "Tell us about your specific needs...",
    subscribe: "Subscribe to our newsletter for product updates and industry news",
    next: "Next",
    previous: "Previous",
    submit: "Submit Inquiry",
    success: "Inquiry Sent Successfully!",
    successDesc: "We've sent a confirmation to your email. Our team will contact you shortly.",
    stepOf: "Step {current} of {total}",
  },
  ru: {
    step1Title: "В какой отрасли вы работаете?",
    step1Desc: "Помогите нам понять ваш бизнес",
    step2Title: "Какой объем закупок вам нужен?",
    step2Desc: "Расскажите нам о ваших потребностях",
    step3Title: "Контактная информация",
    step3Desc: "Давайте свяжемся",
    name: "Полное имя *",
    email: "Электронная почта *",
    company: "Название компании",
    phone: "Номер телефона *",
    message: "Дополнительные требования",
    messagePlaceholder: "Расскажите нам о ваших потребностях...",
    subscribe: "Подпишитесь на нашу рассылку для получения обновлений о продуктах и новостей отрасли",
    next: "Далее",
    previous: "Назад",
    submit: "Отправить запрос",
    success: "Запрос успешно отправлен!",
    successDesc: "Мы отправили подтверждение на вашу почту. Наша команда скоро свяжется с вами.",
    stepOf: "Шаг {current} из {total}",
  },
  fr: {
    step1Title: "Dans quel secteur travaillez-vous?",
    step1Desc: "Aidez-nous à comprendre votre entreprise",
    step2Title: "Quel est votre volume d'achat prévu?",
    step2Desc: "Dites-nous vos besoins en volume",
    step3Title: "Informations de Contact",
    step3Desc: "Mettons-nous en contact",
    name: "Nom Complet *",
    email: "Adresse E-mail *",
    company: "Nom de l'Entreprise",
    phone: "Numéro de Téléphone *",
    message: "Exigences Supplémentaires",
    messagePlaceholder: "Parlez-nous de vos besoins spécifiques...",
    subscribe: "Abonnez-vous à notre newsletter pour les mises à jour sur les produits et les actualités du secteur",
    next: "Suivant",
    previous: "Précédent",
    submit: "Envoyer la Demande",
    success: "Demande Envoyée avec Succès!",
    successDesc: "Nous avons envoyé une confirmation à votre adresse e-mail. Notre équipe vous contactera sous peu.",
    stepOf: "Étape {current} sur {total}",
  },
  es: {
    step1Title: "¿En qué industria trabaja?",
    step1Desc: "Ayúdenos a entender su negocio",
    step2Title: "¿Cuál es su volumen de compra esperado?",
    step2Desc: "Cuéntenos sus requisitos de volumen",
    step3Title: "Información de Contacto",
    step3Desc: "Pongámonos en contacto",
    name: "Nombre Completo *",
    email: "Correo Electrónico *",
    company: "Nombre de la Empresa",
    phone: "Número de Teléfono *",
    message: "Requisitos Adicionales",
    messagePlaceholder: "Cuéntenos sobre sus necesidades específicas...",
    subscribe: "Suscríbase a nuestro boletín para recibir actualizaciones de productos e información del sector",
    next: "Siguiente",
    previous: "Anterior",
    submit: "Enviar Solicitud",
    success: "¡Solicitud Enviada con Éxito!",
    successDesc: "Hemos enviado una confirmación a su correo electrónico. Nuestro equipo se pondrá en contacto con usted en breve.",
    stepOf: "Paso {current} de {total}",
  },
  ar: {
    step1Title: "ما هي الصناعة التي تعمل فيها؟",
    step1Desc: "ساعدنا على فهم عملك",
    step2Title: "ما هو حجم الشراء المتوقع لديك؟",
    step2Desc: "أخبرنا عن احتياجاتك من حيث الحجم",
    step3Title: "معلومات الاتصال",
    step3Desc: "دعونا نتواصل",
    name: "الاسم الكامل *",
    email: "البريد الإلكتروني *",
    company: "اسم الشركة",
    phone: "رقم الهاتف *",
    message: "متطلبات إضافية",
    messagePlaceholder: "أخبرنا عن احتياجاتك المحددة...",
    subscribe: "اشترك في نشرتنا الإخبارية للحصول على تحديثات المنتجات وأخبار الصناعة",
    next: "التالي",
    previous: "السابق",
    submit: "إرسال الطلب",
    success: "تم إرسال الطلب بنجاح!",
    successDesc: "لقد أرسلنا تأكيداً إلى بريدك الإلكتروني. سيتصل بك فريقنا قريباً.",
    stepOf: "الخطوة {current} من {total}",
  },
};

export default function MultiStepInquiryForm({
  productName,
  isRu = false,
  isFr = false,
  isEs = false,
  isAr = false,
  onClose,
}: MultiStepInquiryFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const lang = isRu ? "ru" : isFr ? "fr" : isEs ? "es" : isAr ? "ar" : "en";
  const content = CONTENT[lang as keyof typeof CONTENT];
  const industryOptions = INDUSTRY_OPTIONS[lang as keyof typeof INDUSTRY_OPTIONS];
  const quantityOptions = QUANTITY_OPTIONS[lang as keyof typeof QUANTITY_OPTIONS];

  const [formData, setFormData] = useState<FormData>({
    industry: "",
    quantity: "",
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    subscribe: true,
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.industry !== "";
      case 2:
        return formData.quantity !== "";
      case 3:
        return (
          formData.name.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phone.trim() !== ""
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateStep(3)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setSubmitting(true);

    try {
      console.log("📤 Submitting form with data:", formData);
      
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          quantity: formData.quantity,
          industry: formData.industry,
          message: formData.message,
          type: "product_inquiry",
          product: productName,
          subscribe: formData.subscribe,
        }),
      });

      console.log("📥 Response status:", response.status);

      if (response.ok) {
        console.log("✅ Form submitted successfully");
        setSubmitted(true);
        toast({
          title: content.success,
          description: content.successDesc,
        });
        setTimeout(() => {
          setSubmitted(false);
          onClose?.();
        }, 3000);
      } else {
        console.error("❌ Server returned error:", response.status);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send inquiry. Please try again.",
        });
      }
    } catch (error) {
      console.error("❌ Error submitting inquiry:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {content.success}
        </h3>
        <p className="text-slate-500">{content.successDesc}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-black text-slate-900">
            {currentStep === 1
              ? content.step1Title
              : currentStep === 2
              ? content.step2Title
              : content.step3Title}
          </h2>
        </div>
        <p className="text-slate-500 mb-4">
          {currentStep === 1
            ? content.step1Desc
            : currentStep === 2
            ? content.step2Desc
            : content.step3Desc}
        </p>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step <= currentStep
                    ? "bg-[#0066B3] text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-8 h-1 mx-1 transition-all ${
                    step < currentStep ? "bg-[#0066B3]" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
          <span className="text-sm text-slate-500 ml-4">
            {content.stepOf
              .replace("{current}", currentStep.toString())
              .replace("{total}", "3")}
          </span>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Industry Selection */}
        {currentStep === 1 && (
          <div className="space-y-4">
            {industryOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-[#0066B3] hover:bg-blue-50 transition-all"
              >
                <input
                  type="radio"
                  name="industry"
                  value={option.value}
                  checked={formData.industry === option.value}
                  onChange={(e) =>
                    handleInputChange("industry", e.target.value)
                  }
                  className="w-5 h-5 text-[#0066B3] cursor-pointer"
                />
                <span className="ml-3 font-medium text-slate-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Step 2: Quantity Selection */}
        {currentStep === 2 && (
          <div className="space-y-4">
            {quantityOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-[#0066B3] hover:bg-blue-50 transition-all"
              >
                <input
                  type="radio"
                  name="quantity"
                  value={option.value}
                  checked={formData.quantity === option.value}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                  className="w-5 h-5 text-[#0066B3] cursor-pointer"
                />
                <span className="ml-3 font-medium text-slate-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {content.name}
              </Label>
              <Input
                required
                placeholder="John Doe"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {content.email}
              </Label>
              <Input
                required
                type="email"
                placeholder="john@company.com"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {content.phone}
              </Label>
              <Input
                required
                type="tel"
                placeholder="+1 234 567 890"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {content.company}
              </Label>
              <Input
                placeholder="Optional"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {content.message}
              </Label>
              <Textarea
                placeholder={content.messagePlaceholder}
                className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50 focus:bg-white transition-all"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 py-2">
              <Checkbox
                id="inquiry-subscribe"
                checked={formData.subscribe}
                onCheckedChange={(checked) =>
                  handleInputChange("subscribe", checked === true)
                }
              />
              <Label
                htmlFor="inquiry-subscribe"
                className="text-xs text-slate-500 font-medium cursor-pointer"
              >
                {content.subscribe}
              </Label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className="flex-1 h-12 rounded-xl border-slate-200 font-bold"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {content.previous}
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1 h-12 bg-[#0066B3] hover:bg-[#004a82] text-white rounded-xl font-bold"
            >
              {content.next}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={(e) => handleSubmit(e)}
              className="flex-1 h-12 bg-[#0066B3] hover:bg-[#004a82] disabled:bg-slate-300 text-white rounded-xl font-bold transition-all"
            >
              {submitting ? "Submitting..." : content.submit}
            </button>
          )
        </div>
      </form>
    </div>
  );
}
