"use client";
import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { ShieldCheck, Eye, Lock, Database, Share2 } from "lucide-react";

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState("en");

  const content = {
    en: {
      title: "Privacy Policy",
      brand: "Mother Abaya",
      intro: "Thank you for visiting Mother Abaya. We are committed to safeguarding your privacy and ensuring your personal information remains secure.",
      sections: [
        {
          title: "Information We Collect",
          icon: <Database className="text-[#B3589D]" />,
          items: [
            "Personal Data: Name, email address, shipping address, billing info, and contact number.",
            "Non-Personal Data: IP address, browser type, operating system, and browsing preferences.",
            "Cookies: We use cookies to track your preferences and customize your website experience."
          ]
        },
        {
          title: "How We Use Your Info",
          icon: <Eye className="text-[#B3589D]" />,
          items: [
            "Order Processing: To fulfill your orders and handle shipping and handling.",
            "Customer Support: To provide assistance and resolve any queries or issues.",
            "Personalization: To customize your experience on our website.",
            "Marketing: To communicate promotions and newsletters with your consent."
          ]
        },
        {
          title: "Data Sharing & Security",
          icon: <Lock className="text-[#B3589D]" />,
          items: [
            "No Third-Party Sales: We do not sell, trade, or rent your personal data to third parties.",
            "Service Partners: Data may be shared with trusted partners who assist in operating our website.",
            "Security Measures: We use standard security protocols to protect against unauthorized access.",
            "Third-Party Links: We are not responsible for the privacy practices of external websites linked on our site."
          ]
        }
      ],
      footer: "By using our website, you agree to the practices described in this Privacy Policy."
    },
    bn: {
      title: "গোপনীয়তা নীতি",
      brand: "মাদার আবায়া",
      intro: "মাদার আবায়া ভিজিট করার জন্য ধন্যবাদ। আমরা আপনার গোপনীয়তা রক্ষা করতে এবং আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে প্রতিশ্রুতিবদ্ধ।",
      sections: [
        {
          title: "তথ্য যা আমরা সংগ্রহ করি",
          icon: <Database className="text-[#B3589D]" />,
          items: [
            "ব্যক্তিগত তথ্য: নাম, ইমেল ঠিকানা, শিপিং ঠিকানা, বিলিং তথ্য এবং যোগাযোগ নম্বর।",
            "অব্যক্তিগত তথ্য: আইপি ঠিকানা, ব্রাউজার টাইপ, অপারেটিং সিস্টেম এবং ব্রাউজিং পছন্দসমূহ।",
            "কুকিজ: আপনার পছন্দগুলি ট্র্যাক করতে এবং ওয়েবসাইটের অভিজ্ঞতা কাস্টমাইজ করতে আমরা কুকিজ ব্যবহার করি।"
          ]
        },
        {
          title: "আমরা কিভাবে তথ্য ব্যবহার করি",
          icon: <Eye className="text-[#B3589D]" />,
          items: [
            "অর্ডার প্রক্রিয়া: আপনার অর্ডারগুলি সম্পন্ন করতে এবং শিপিং পরিচালনা করতে।",
            "গ্রাহক সহায়তা: সহায়তা প্রদান এবং যেকোনো প্রশ্ন বা সমস্যার সমাধান করতে।",
            "ব্যক্তিগতকরণ: আমাদের ওয়েবসাইটে আপনার অভিজ্ঞতা কাস্টমাইজ করতে।",
            "মার্কেটিং: আপনার সম্মতিতে প্রমোশন এবং নিউজলেটার পাঠাতে।"
          ]
        },
        {
          title: "তথ্য শেয়ারিং এবং সুরক্ষা",
          icon: <Lock className="text-[#B3589D]" />,
          items: [
            "তৃতীয় পক্ষকে তথ্য প্রদান নয়: আমরা আপনার ব্যক্তিগত তথ্য বিক্রি বা ভাড়া দেই না।",
            "সেবা প্রদানকারী পার্টনার: আমাদের ওয়েবসাইট পরিচালনায় সহায়তাকারী বিশ্বস্ত পার্টনারদের সাথে তথ্য শেয়ার করা হতে পারে।",
            "নিরাপত্তা ব্যবস্থা: অননুমোদিত অ্যাক্সেস থেকে রক্ষা করতে আমরা স্ট্যান্ডার্ড নিরাপত্তা প্রোটোকল ব্যবহার করি।",
            "তৃতীয় পক্ষের লিঙ্ক: আমাদের সাইটে লিঙ্ক করা বাহ্যিক ওয়েবসাইটগুলির গোপনীয়তা নীতির জন্য আমরা দায়ী নই।"
          ]
        }
      ],
      footer: "আমাদের ওয়েবসাইট ব্যবহার করার মাধ্যমে, আপনি এই গোপনীয়তা নীতিতে বর্ণিত অনুশীলনের সাথে সম্মত হন।"
    },
    ar: {
      title: "سياسة الخصوصية",
      brand: "مذر عباية",
      intro: "شكرًا لزيارتكم مذر عباية. نحن ملتزمون بحماية خصوصيتكم وضمان بقاء معلوماتكم الشخصية آمنة.",
      sections: [
        {
          title: "المعلومات التي نجمعها",
          icon: <Database className="text-[#B3589D]" />,
          items: [
            "البيانات الشخصية: الاسم، البريد الإلكتروني، عنوان الشحن، معلومات الفواتير ورقم الاتصال.",
            "بيانات غير شخصية: عنوان IP، نوع المتصفح، نظام التشغيل وتفضيلات التصفح.",
            "ملفات تعريف الارتباط: نستخدمها لتتبع تفضيلاتك وتخصيص تجربتك على الموقع."
          ]
        },
        {
          title: "كيف نستخدم معلوماتك",
          icon: <Eye className="text-[#B3589D]" />,
          items: [
            "معالجة الطلبات: لتنفيذ طلباتك والتعامل مع الشحن والتوصيل.",
            "دعم العملاء: لتقديم المساعدة وحل أي استفسارات أو مشكلات.",
            "التخصيص: لتخصيص تجربتك على موقعنا الإلكتروني.",
            "التسويق: للتواصل بشأن العروض الترويجية والنشرات الإخبارية بموافقتك."
          ]
        },
        {
          title: "مشاركة البيانات والأمن",
          icon: <Lock className="text-[#B3589D]" />,
          items: [
            "عدم البيع لأطراف ثالثة: نحن لا نبيع أو نؤجر بياناتك الشخصية لأطراف ثالثة.",
            "شركاء الخدمة: قد تتم مشاركة البيانات مع شركاء موثوقين يساعدون في تشغيل موقعنا.",
            "تدابير الأمن: نستخدم بروتوكولات أمنية قياسية للحماية من الوصول غير المصرح به.",
            "روابط الطرف الثالث: نحن لسنا مسؤولين عن ممارسات الخصوصية للمواقع الخارجية المرتبطة بموقعنا."
          ]
        }
      ],
      footer: "باستخدام موقعنا، فإنك توافق على الممارسات الموضحة في سياسة الخصوصية هذه."
    }
  };

  return (
    <main className="min-h-screen bg-[#FDF7FB] pb-24">
      <PageHero title={content[activeTab as keyof typeof content].title} />

      <div className="container mx-auto px-4 -mt-12">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-pink-100/50 overflow-hidden border border-white">
          
          {/* Language Switcher */}
          <div className="flex bg-gray-50/80 p-3 gap-3 border-b border-gray-100">
            {["en", "bn", "ar"].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                  activeTab === lang ? "bg-[#B3589D] text-white shadow-lg" : "text-gray-400 hover:bg-white"
                }`}
              >
                {lang === "en" ? "🇺🇸 English" : lang === "bn" ? "🇧🇩 বাংলা" : "🇸🇦 العربية"}
              </button>
            ))}
          </div>

          {/* Policy Content */}
          <div 
            className={`p-8 md:p-16 ${activeTab === 'ar' ? 'text-right' : 'text-left'}`} 
            dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
          >
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-12 border-l-4 border-[#B3589D] pl-6 py-2 bg-pink-50/30 rounded-r-xl">
              {content[activeTab as keyof typeof content].intro}
            </p>

            <div className="space-y-12">
              {content[activeTab as keyof typeof content].sections.map((section, idx) => (
                <div key={idx} className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100">
                  <div className={`flex items-center gap-4 mb-6 ${activeTab === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-4">
                    {section.items.map((item, i) => (
                      <li key={i} className={`flex gap-4 text-gray-600 text-lg leading-relaxed ${activeTab === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#B3589D]" />
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-dashed text-center">
               <div className="text-[#B3589D] font-black text-2xl mb-2 italic">
                 {content[activeTab as keyof typeof content].brand}
               </div>
               <p className="text-gray-400 text-sm max-w-lg mx-auto italic leading-relaxed">
                 {content[activeTab as keyof typeof content].footer}
               </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;