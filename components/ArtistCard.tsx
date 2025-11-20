
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '../types';
import { ArrowRight, Calendar, Hash } from 'lucide-react';

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}

const ArtistCard: React.FC<PortfolioCardProps> = ({ item, index, onClick }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center w-full mb-24 md:mb-32 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      
      {/* Timeline Dot (Desktop Center) */}
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-2 border-[#f97316] rounded-full z-20 mt-[-280px] md:mt-0 hidden md:block">
        <div className="absolute inset-0 bg-[#f97316] animate-ping opacity-20 rounded-full"></div>
      </div>

      {/* Content Half */}
      <motion.div 
        className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Mobile Timeline Line/Dot substitute */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#f97316] to-transparent md:hidden"></div>
        <div className="absolute left-4 top-0 w-2.5 h-2.5 bg-[#f97316] rounded-full md:hidden ring-4 ring-black z-10"></div>

        <div 
          className="group cursor-pointer"
          onClick={onClick}
          data-hover="true"
        >
          {/* Header Info */}
          <div className={`flex flex-col gap-2 mb-4 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
            <div className="flex items-center gap-2 text-[#f97316] font-mono text-xs tracking-[0.2em] uppercase">
              <Hash className="w-3 h-3" />
              <span>Archive 00{index + 1}</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase leading-none group-hover:text-[#f97316] transition-colors duration-300">
              {item.title}
            </h3>
            <div className={`flex items-center gap-3 mt-1 text-gray-400 font-light ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
               <span className="px-3 py-1 border border-white/10 rounded-full text-xs uppercase tracking-wider bg-white/5">{item.role}</span>
               <span className="text-[#f97316]">•</span>
               <span className="font-mono text-sm">{item.year}</span>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative overflow-hidden aspect-video w-full border border-white/10 group-hover:border-[#f97316]/50 transition-colors duration-500 bg-[#121212]">
            <motion.img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
               <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm border border-white px-6 py-3 hover:bg-[#f97316] hover:border-[#f97316] hover:text-black transition-all">
                 View Case Study <ArrowRight className="w-4 h-4" />
               </div>
            </div>
          </div>
          
          <p className="mt-4 text-gray-500 text-sm leading-relaxed line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity">
             {item.description}
          </p>
        </div>
      </motion.div>

      {/* Empty Half for Desktop Layout Spacing */}
      <div className="hidden md:block w-1/2"></div>
    </div>
  );
};

export default ArtistCard;
