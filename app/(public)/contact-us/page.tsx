import React from "react";
import PageHero from "@/components/PageHero";
import { MapPin, Phone, Facebook, MessageCircle, Home } from "lucide-react";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
     <PageHero title="Contact Us" />

      {/* Contact Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 -mt-10 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-[#B3589D]/10 p-3 rounded-lg text-[#B3589D]">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Our Address</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                         Old Al Mithaliya Hotel Bldg., Somali Market Shop #6(B),<br />
               Deira, Dubai, UAE.
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                <p className="text-gray-600 text-sm">01868272067</p>
                <p className="text-xs text-gray-400">Sat - Thu, 10am - 8pm</p>
              </div>
            </div>

            {/* Facebook Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <Facebook size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Facebook</h3>
                <a 
                  href="https://www.facebook.com/dopelook21/" 
                  target="_blank" 
                  className="text-[#B3589D] text-sm hover:underline break-all"
                >
                  fb.com/dopelook21
                </a>
              </div>
            </div>
          </div>

          {/* Messenger Support Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col justify-center items-center text-center">
              <div className="bg-blue-50 p-5 rounded-full mb-6">
                <MessageCircle size={48} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Assistance</h2>
              <p className="text-gray-600 mb-8 max-w-md">
                You can contact us directly through Facebook Messenger for any queries. Our team is ready to help you!
              </p>
              <a 
                href="https://m.me/dopelook21" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#B3589D] text-white px-8 py-4 rounded-full font-bold hover:bg-[#a04a8b] transition-all transform hover:scale-105 shadow-lg"
              >
                Chat on Messenger
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ContactPage;