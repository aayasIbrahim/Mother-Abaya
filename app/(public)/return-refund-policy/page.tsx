"use client";
import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { RefreshCcw, ShieldAlert,  CreditCard } from "lucide-react";

const ReturnRefundPage = () => {
  const [activeTab, setActiveTab] = useState("en");

  const content = {
    en: {
      title: "Return & Refund Policy",
      brand: "Mother Abaya",
      intro: "We value our customers and strive to provide the best shopping experience. Our policy ensures a smooth process for any issues with your purchase.",
      sections: [
        {
          title: "Return Policy",
          icon: <RefreshCcw className="text-[#B3589D]" />,
          items: [
            "If there is any issue with the product from our end, we arrange for an exchange.",
            "Products can only be returned if there is a valid issue verified during delivery.",
            "If the customer orders the wrong size, they must bear delivery charges for both return and reshipment.",
            "All returns must be initiated in front of the delivery person.",
            "Products returned must be unused, undamaged, and in original packaging."
          ]
        },
        {
          title: "Refund Policy",
          icon: <CreditCard className="text-[#B3589D]" />,
          items: [
            "If an exchange is not possible, the purchase amount will be refunded within 5-10 days.",
            "Refunds can only be processed after the product is returned in its original condition.",
            "Please inspect the product in front of the delivery person and report issues immediately.",
            "Refund requests will not be accepted after the delivery person has left.",
            "Refunds are processed via the original payment method unless otherwise specified."
          ]
        }
      ],
      footer: "Feel free to contact us via the numbers provided on your invoice or our Facebook page."
    },
    bn: {
      title: "রিটার্ন এবং রিফান্ড পলিসি",
      brand: "মাদার আবায়া",
      intro: "আমরা আমাদের গ্রাহকদের মূল্যায়ন করি এবং সেরা কেনাকাটার অভিজ্ঞতা দেওয়ার চেষ্টা করি।",
      sections: [
        {
          title: "রিটার্ন পলিসি",
          icon: <RefreshCcw className="text-[#B3589D]" />,
          items: [
            "আমাদের পক্ষ থেকে পণ্যে কোনো সমস্যা থাকলে আমরা এক্সচেঞ্জ করার ব্যবস্থা করি।",
            "ডেলিভারির সময় কোনো সমস্যা প্রমাণিত হলেই কেবল পণ্য ফেরত নেওয়া সম্ভব।",
            "গ্রাহক ভুল সাইজ অর্ডার করলে রিটার্ন এবং পুনরায় পাঠানোর ডেলিভারি চার্জ গ্রাহককে বহন করতে হবে।",
            "সমস্ত রিটার্ন ডেলিভারি ম্যানের সামনেই শুরু করতে হবে।",
            "ফেরত দেওয়া পণ্য অব্যবহৃত, অক্ষত এবং আসল প্যাকেজিংয়ে থাকতে হবে।"
          ]
        },
        {
          title: "রিফান্ড পলিসি",
          icon: <CreditCard className="text-[#B3589D]" />,
          items: [
            "এক্সচেঞ্জ সম্ভব না হলে ৫-১০ দিনের মধ্যে ক্রয়কৃত অর্থ ফেরত দেওয়া হবে।",
            "পণ্যটি আসল অবস্থায় ফেরত পাওয়ার পরেই রিফান্ড প্রসেস করা সম্ভব।",
            "দয়া করে ডেলিভারি ম্যানের সামনে পণ্যটি পরীক্ষা করুন এবং তাৎক্ষণিকভাবে সমস্যা জানান।",
            "ডেলিভারি ম্যান চলে যাওয়ার পর রিফান্ড অনুরোধ গ্রহণ করা হবে না।",
            "অন্যথা উল্লেখ না থাকলে রিফান্ড মূল পেমেন্ট পদ্ধতির মাধ্যমেই করা হবে।"
          ]
        }
      ],
      footer: "আপনার ইনভয়েসে দেওয়া নাম্বারে বা আমাদের ফেসবুক পেজের মাধ্যমে যোগাযোগ করুন।"
    },
    ar: {
      title: "سياسة الإرجاع والاسترداد",
      brand: "مذر عباية",
      intro: "نحن نقدر عملائنا ونسعى لتقديم أفضل تجربة تسوق. تضمن سياستنا عملية سلسة لأي مشاكل في مشترياتك.",
      sections: [
        {
          title: "سياسة الإرجاع",
          icon: <RefreshCcw className="text-[#B3589D]" />,
          items: [
            "في حال وجود أي مشكلة في المنتج من جانبنا، نقوم بترتيب الاستبدال.",
            "لا يمكن إرجاع المنتجات إلا إذا كانت هناك مشكلة صحيحة تم التحقق منها أثناء التسليم.",
            "إذا طلب العميل مقاسًا خاطئًا، يجب عليه تحمل رسوم التوصيل للإرجاع وإعادة الشحن.",
            "يجب بدء جميع المرتجعات أمام موظف التوصيل.",
            "يجب أن تكون المنتجات المرتجعة غير مستخدمة وغير تالفة وفي عبوتها الأصلية."
          ]
        },
        {
          title: "سياسة الاسترداد",
          icon: <CreditCard className="text-[#B3589D]" />,
          items: [
            "إذا لم يكن الاستبدال ممكنًا، فسيتم استرداد مبلغ الشراء في غضون ٥-١٠ أيام.",
            "لا يمكن معالجة المبالغ المستردة إلا بعد إرجاع المنتج في حالته الأصلية.",
            "يرجى فحص المنتج أمام موظف التوصيل والإبلاغ عن أي مشاكل على الفور.",
            "لن يتم قبول طلبات الاسترداد بعد مغادرة موظف التوصيل.",
            "يتم معالجة المبالغ المستردة عبر طريقة الدفع الأصلية ما لم يذكر خلاف ذلك."
          ]
        }
      ],
      footer: "لا تتردد في الاتصال بنا عبر الأرقام الموضحة في فاتورتك أو صفحتنا على الفيسبوك."
    }
  };

  return (
    <main className="min-h-screen bg-[#FDF7FB] pb-24">
      <PageHero title={content[activeTab as keyof typeof content].title} />

      <div className="container mx-auto px-4 -mt-12">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-pink-100/50 overflow-hidden border border-white">
          
          {/* Language Tabs */}
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
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">{section.title}</h2>
                  </div>
                  <ul className="space-y-4">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex gap-4 text-gray-600 text-lg leading-relaxed">
                        <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#B3589D]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-dashed text-center">
               <div className="text-[#B3589D] font-black text-2xl mb-2">{content[activeTab as keyof typeof content].brand}</div>
               <p className="text-gray-400 text-sm max-w-lg mx-auto italic">{content[activeTab as keyof typeof content].footer}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReturnRefundPage;