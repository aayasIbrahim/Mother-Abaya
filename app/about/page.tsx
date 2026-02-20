import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Star, ShieldCheck, Heart, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#D8AED3]">

      {/* Hero */}
      <PageHero title="About Us" />

      {/* Main Section */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#B3589D]/10 rounded-3xl rotate-2 group-hover:rotate-0 transition-all duration-500"></div>

            <div className="relative overflow-hidden rounded-3xl shadow-xl border border-white/40">

              <Image
                src="/mother store.jpg"
                alt="Mother Abaya Store"
                width={1200}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-[1000px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-semibold text-lg tracking-wide">
                  Mother Abaya Store
                </p>
              </div>

            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 rounded-full bg-[#B3589D]/10 text-[#B3589D] text-sm font-semibold uppercase tracking-wider">
              Our Identity
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              One of the Most Popular Clothing Brands in Dubai
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Mother Abaya offers trendy, high-quality fashion for all.
              With a strong presence both online and offline, we operate
              from our retail outlet in Chittagong, serving a diverse clientele.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-medium">
              We take pride in our dedication to style, quality, and
              customer satisfaction. Every piece is crafted to make you
              feel elegant and confident.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition">
                <ShieldCheck className="text-[#B3589D]" size={24} />
                <span className="font-semibold text-gray-800">
                  Premium Quality
                </span>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition">
                <Heart className="text-[#B3589D]" size={24} />
                <span className="font-semibold text-gray-800">
                  Elegant Design
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-5xl">

          <h2 className="text-3xl sm:text-4xl font-bold mb-14 text-gray-900">
            Why Choose Mother Abaya?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

            {[
              {
                icon: <Star />,
                title: "Exclusive Collection",
                desc: "Unique designs that blend tradition with modern aesthetics."
              },
              {
                icon: <Users />,
                title: "Happy Customers",
                desc: "Join thousands of satisfied women who trust our quality."
              },
              {
                icon: <Heart />,
                title: "Crafted with Love",
                desc: "We focus on every stitch to ensure perfection for you."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-[#B3589D] mb-4">
                  {item.icon}
                </div>

                <h4 className="font-bold text-xl mb-2 text-gray-900">
                  {item.title}
                </h4>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutPage;