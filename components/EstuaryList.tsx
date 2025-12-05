import React from 'react';
import { Estuary, SortOption } from '../types';
import { Heart, Users, Activity, Leaf, Trophy, Globe, MapPin, ArrowRight } from 'lucide-react';

interface EstuaryListProps {
  estuaries: Estuary[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectEstuary: (estuary: Estuary) => void;
  sortOption: SortOption;
  setSortOption: (opt: SortOption) => void;
  onHoverEstuary: (id: string | null) => void;
}

const EstuaryList: React.FC<EstuaryListProps> = ({ 
  estuaries, 
  savedIds, 
  onToggleSave, 
  onSelectEstuary, 
  sortOption, 
  setSortOption,
  onHoverEstuary
}) => {
  
  const sortedEstuaries = [...estuaries].sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'scale') {
        const scaleOrder = { 'Massive': 4, 'Large': 3, 'Medium': 2, 'Small': 1 };
        return (scaleOrder[b.scale || 'Small'] || 0) - (scaleOrder[a.scale || 'Small'] || 0);
    }
    if (sortOption === 'population') {
         const popOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
         return (popOrder[b.populationDensity || 'Low'] || 0) - (popOrder[a.populationDensity || 'Low'] || 0);
    }
    if (sortOption === 'biodiversity') {
         const bioOrder = { 'Very High': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
         return (bioOrder[b.biodiversityRating || 'Medium'] || 0) - (bioOrder[a.biodiversityRating || 'Medium'] || 0);
    }
    return 0;
  });

  return (
    <div className="flex flex-col h-full bg-slate-100">
      {/* Header Bar */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm z-10 sticky top-0">
        <div className="flex items-baseline gap-2">
           <h2 className="text-xl font-bold text-slate-800">Global Estuaries</h2>
           <span className="text-sm text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
             {sortedEstuaries.length} Systems
           </span>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-lg border border-slate-200">
          <span className="text-xs font-bold text-slate-400 pl-3 uppercase tracking-wider">Sort By</span>
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="text-sm bg-white border-l border-slate-200 py-1.5 pl-3 pr-8 rounded-md outline-none focus:text-blue-600 font-medium cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <option value="name">Name (A-Z)</option>
            <option value="scale">System Scale</option>
            <option value="population">Population Impact</option>
            <option value="biodiversity">Biodiversity Index</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
          {sortedEstuaries.map((estuary, index) => (
            <div 
              key={estuary.id} 
              onClick={() => onSelectEstuary(estuary)}
              onMouseEnter={() => onHoverEstuary(estuary.id)}
              onMouseLeave={() => onHoverEstuary(null)}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden group h-auto"
            >
              {/* Image Section */}
              <div className="h-56 w-full relative overflow-hidden shrink-0 bg-slate-200">
                 <img 
                  src={estuary.image} 
                  alt={estuary.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Overlay Gradient for Text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-90"></div>

                {/* Rank & Metrics Container - Top Left */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 items-start z-10">
                     {/* Rank Badge */}
                     <div className={`
                        flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shadow-lg border-2 border-white/20 backdrop-blur-md
                        ${index < 3 ? 'bg-amber-400 text-amber-900' : 'bg-slate-900/80 text-white'}
                    `}>
                        #{index + 1}
                    </div>

                    {/* Compact Metrics Stack */}
                    <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-left-2 duration-500 delay-100">
                         {/* Scale */}
                         <div className="flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 shadow-sm" title="System Scale">
                            <Activity className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] font-semibold text-white/90">{estuary.scale}</span>
                         </div>
                         {/* Pop */}
                         <div className="flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 shadow-sm" title="Population Density">
                            <Users className="w-3 h-3 text-orange-400" />
                            <span className="text-[10px] font-semibold text-white/90">{estuary.populationDensity}</span>
                         </div>
                         {/* Bio */}
                         {estuary.biodiversityRating && (
                             <div className="flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 shadow-sm" title="Biodiversity Rating">
                                <Leaf className="w-3 h-3 text-green-400" />
                                <span className="text-[10px] font-semibold text-white/90">{estuary.biodiversityRating}</span>
                             </div>
                         )}
                    </div>
                </div>

                {/* Save Button - Top Right */}
                 <button 
                  onClick={(e) => { e.stopPropagation(); onToggleSave(estuary.id); }}
                  className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full hover:bg-white transition-all duration-200 group-hover:opacity-100 shadow-sm z-20"
                  title={savedIds.includes(estuary.id) ? "Remove from Saved" : "Save Estuary"}
                >
                  <Heart 
                    className={`w-5 h-5 ${savedIds.includes(estuary.id) ? 'fill-rose-500 text-rose-500' : 'text-white'}`} 
                  />
                </button>

                {/* Location Badge on Image - Bottom Left */}
                 <div className="absolute bottom-3 left-3 text-white max-w-[90%]">
                    <p className="text-xs font-medium bg-black/40 px-2 py-1 rounded-md backdrop-blur-md border border-white/10 flex items-center gap-1 inline-flex truncate max-w-full">
                        <MapPin className="w-3 h-3 text-blue-300" />
                        {estuary.location}
                    </p>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex flex-col flex-1 relative">
                 <div className="mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight line-clamp-1">
                        {estuary.name}
                    </h3>
                 </div>

                 <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 mb-4">
                    {estuary.shortDescription}
                 </p>
                 
                 {/* Call to Action */}
                 <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Click for Details</span>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="w-3 h-3" />
                    </span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstuaryList;
