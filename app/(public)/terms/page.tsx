"use client";
import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { ShieldCheck, Globe, CheckCircle2 } from "lucide-react";

const TermsPage = () => {

  const [activeTab, setActiveTab] = useState("en");

  const content = {
    en: {
      title: "Terms & Conditions",
      brand: "Mother Abaya",
      intro: "Welcome to Mother Abaya! Please review our policies carefully to ensure a smooth shopping experience.",
      items: [
        { t: "1. Delivery Timeline", d: "In-stock items are delivered within 5-7 days. Pre-order items may take 10-20 days." },
        { t: "2. Refund Policy", d: "We offer exchanges for issues. If unavailable, refunds are processed within 5-10 days." },
        { t: "3. Return Policy", d: "Please inspect products upon delivery. Complaints are not accepted once the courier leaves." },
        { t: "4. Data Privacy", d: "Your personal information is secure. We never share your data with third parties." },
      ],
      footer: "Thank you for choosing Mother Abaya!"
    },
    bn: {
      title: "শর্তাবলী",
      brand: "মাদার আবায়া",
      intro: "মাদার আবায়াতে স্বাগতম! আমাদের পরিষেবাগুলো সম্পর্কে বিস্তারিত জানতে নিচের শর্তাবলী পড়ুন।",
      items: [
        { t: "১. ডেলিভারি সময়সীমা", d: "স্টকে থাকা পণ্য ৫-৭ দিন। প্রি-অর্ডার পণ্য ডেলিভারিতে ১০-২০ দিন সময় লাগতে পারে।" },
        { t: "২. রিফান্ড পলিসি", d: "পণ্য এক্সচেঞ্জ সুবিধা রয়েছে। এক্সচেঞ্জ সম্ভব না হলে ৫-১০ দিনে রিফান্ড করা হয়।" },
        { t: "৩. রিটার্ন পলিসি", d: "ডেলিভারি ম্যানের সামনে পণ্য চেক করুন। ডেলিভারি সম্পন্ন হওয়ার পর কোনো অভিযোগ গ্রহণযোগ্য নয়।" },
        { t: "৪. তথ্য সুরক্ষা", d: "আপনার সকল ব্যক্তিগত তথ্য আমাদের কাছে নিরাপদ। আমরা কোনো তথ্য তৃতীয় পক্ষের কাছে শেয়ার করি না।" },
      ],
      footer: "আমাদের সাথে কেনাকাটা করার জন্য ধন্যবাদ!"
    },
    ar: {
      title: "الشروط والأحكام",
      brand: "مذر عباية",
      intro: "مرحباً بكم في مذر عباية! يرجى مراجعة سياساتنا بعناية لضمان تجربة تسوق سلسة.",
      items: [
        { t: "١. جدول التسليم", d: "يتم تسليم المنتجات المتوفرة خلال ٥-٧ أيام. قد تستغرق الطلبات المسبقة ١٠-٢٠ يوماً." },
        { t: "٢. سياسة الاسترداد", d: "نحن نقدم خدمة الاستبدال. إذا لم يكن ذلك ممكناً، فسيتم رد المبلغ خلال ٥-١٠ أيام." },
        { t: "٣. سياسة الإرجاع", d: "يرجى فحص المنتجات عند التسليم. لا يتم قبول الشكاوى بمجرد مغادرة مندوب التوصيل." },
        { t: "٤. خصوصية البيانات", d: "معلوماتك الشخصية آمنة معنا. نحن لا نشارك بياناتك مع أطراف ثالثة أبداً." },
      ],
      footer: "شكرًا لاختياركم مذر عباية!"
    }
  };

  const tabs = [
    { id: "en", label: "English", icon: "🇺🇸" },
    { id: "bn", label: "বাংলা", icon: "🇧🇩" },
    { id: "ar", label: "العربية", icon: "🇸🇦" },
  ];

  return (
    <main className="min-h-screen bg-[#FDF7FB] pb-24">
      <PageHero title={content[activeTab as keyof typeof content].title} />

      <div className="container mx-auto px-4 -mt-12">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-pink-100/50 overflow-hidden border border-white">
          
          {/* Modern Language Switcher */}
          <div className="flex bg-gray-50/80 backdrop-blur-md p-3 gap-3 border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all duration-300 transform active:scale-95 ${
                  activeTab === tab.id 
                  ? "bg-[#B3589D] text-white shadow-lg shadow-pink-200" 
                  : "text-gray-400 hover:bg-white hover:text-[#B3589D] hover:shadow-sm"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="hidden sm:inline tracking-wide">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Premium Content Area */}
          <div 
            className={`p-8 md:p-16 transition-all duration-500 ${activeTab === 'ar' ? 'text-right' : 'text-left'}`} 
            dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
          >
            {/* Header section */}
            <div className={`flex flex-col ${activeTab === 'ar' ? 'items-start' : 'items-start'} gap-4 mb-10`}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#B3589D]/10 text-[#B3589D] mb-2">
                <ShieldCheck size={40} />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  {content[activeTab as keyof typeof content].title}
                </h2>
                <div className="h-1.5 w-24 bg-[#B3589D] rounded-full"></div>
              </div>
            </div>

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-12 border-l-4 border-[#B3589D] pl-6 py-2 bg-pink-50/30 rounded-r-xl">
              {content[activeTab as keyof typeof content].intro}
            </p>

            {/* List items with cards */}
            <div className="grid gap-6">
              {content[activeTab as keyof typeof content].items.map((item, i) => (
                <div 
                  key={i} 
                  className="group relative p-6 rounded-3xl bg-white border border-gray-100 hover:border-[#B3589D]/30 hover:shadow-xl hover:shadow-pink-50 transition-all duration-300"
                >
                  <div className={`flex ${activeTab === 'ar' ? 'flex-row-reverse' : 'flex-row'} items-start gap-5`}>
                    <div className="flex-shrink-0 mt-1">
                       <CheckCircle2 size={24} className="text-[#B3589D]" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-xl mb-2 group-hover:text-[#B3589D] transition-colors">
                        {item.t}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                        {item.d}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Professional Footer */}
            <div className="mt-20 py-10 border-t border-dashed border-gray-200 flex flex-col items-center">
              <div className="text-[#B3589D] font-black text-2xl md:text-3xl mb-2 italic">
                {content[activeTab as keyof typeof content].brand}
              </div>
              <p className="text-gray-400 font-medium tracking-widest uppercase text-xs md:text-sm">
                {content[activeTab as keyof typeof content].footer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;