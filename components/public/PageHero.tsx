import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

interface PageHeroProps {
  title: string;
}

const PageHero = ({ title }: PageHeroProps) => {
  return (
    <section className="bg-[#B3589D] py-16 px-4 text-center text-black/90">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {title}
      </h1>
      <div className="flex justify-center items-center gap-2 text-sm md:text-base opacity-90 underline-offset-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <Link 
          href="/" 
          className="hover:text-gray-200 transition-colors flex items-center gap-1 group"
        >
          <Home size={16} className="group-hover:scale-110 transition-transform" /> 
          Home
        </Link>
        <span className="text-black/50">/</span>
        <span className="font-semibold tracking-wide text-xs md:text-sm">
          {title}
        </span>
      </div>
    </section>
  );
};

export default PageHero;