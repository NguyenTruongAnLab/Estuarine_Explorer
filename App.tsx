import React, { useState, useMemo } from 'react';
import MapVisualization from './components/MapVisualization';
import EstuaryList from './components/EstuaryList';
import EstuaryDetail from './components/EstuaryDetail';
import Navigation from './components/Navigation';
import { INITIAL_ESTUARIES } from './constants';
import { Estuary, SortOption } from './types';
import { Globe, Search, Sparkles, BookOpenCheck } from 'lucide-react';
import { searchGlobalEstuaries } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'map' | 'list' | 'saved'>('map');
  const [allEstuaries, setAllEstuaries] = useState<Estuary[]>(INITIAL_ESTUARIES);
  const [selectedEstuary, setSelectedEstuary] = useState<Estuary | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [hoveredEstuaryId, setHoveredEstuaryId] = useState<string | null>(null);
  
  // Persist saved items
  const toggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const displayedEstuaries = useMemo(() => {
    let baseList = allEstuaries;
    
    if (currentView === 'saved') {
      baseList = baseList.filter(e => savedIds.includes(e.id));
    }
    
    if (searchQuery.trim()) {
      const lowerQ = searchQuery.toLowerCase();
      baseList = baseList.filter(e => 
        e.name.toLowerCase().includes(lowerQ) || 
        e.location.toLowerCase().includes(lowerQ)
      );
    }
    
    return baseList;
  }, [currentView, savedIds, allEstuaries, searchQuery]);

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearchingAI(true);
    const newEstuaries = await searchGlobalEstuaries(searchQuery);
    
    if (newEstuaries.length > 0) {
        setAllEstuaries(prev => {
            // Merge avoiding duplicates by ID
            const existingIds = new Set(prev.map(e => e.id));
            const uniqueNew = newEstuaries.filter(e => !existingIds.has(e.id));
            return [...prev, ...uniqueNew];
        });
        alert(`Academic Census Complete: ${newEstuaries.length} systems added for "${searchQuery}".`);
    } else {
        alert("No additional academic data found for this region.");
    }
    setIsSearchingAI(false);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50">
      
      {/* Desktop Header */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-white border-b shadow-sm z-30 gap-4">
        <div className="flex items-center gap-2 text-blue-700 self-start md:self-auto">
            <Globe className="w-8 h-8" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Estuarine Explorer</h1>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl w-full relative">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Deep Search (e.g. 'Vietnam', 'Norwegian Fjords')..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 rounded-lg outline-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                />
            </div>
            {searchQuery && !isSearchingAI && (
                 <button 
                    onClick={handleAiSearch}
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors shadow-sm"
                 >
                    <BookOpenCheck className="w-3 h-3" />
                    Deep Research
                 </button>
            )}
             {isSearchingAI && (
                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-600 font-medium animate-pulse flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Conducting Census...
                 </span>
            )}
        </div>

        <div className="flex gap-2 hidden md:flex">
            <button 
                onClick={() => setCurrentView('map')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'map' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
                Map
            </button>
            <button 
                onClick={() => setCurrentView('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'list' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
                List
            </button>
            <button 
                onClick={() => setCurrentView('saved')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'saved' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
                Saved ({savedIds.length})
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col md:flex-row">
        
        {/* View Switcher Logic */}
        <div className={`flex-1 h-full transition-opacity duration-300 relative ${currentView === 'map' ? 'block' : 'hidden md:block'}`}>
            <MapVisualization 
                estuaries={displayedEstuaries} 
                onSelectEstuary={setSelectedEstuary}
                selectedEstuaryId={selectedEstuary?.id}
                hoveredEstuaryId={hoveredEstuaryId}
            />
             {/* Map Legend Overlay */}
            <div className="absolute top-4 right-4 md:right-auto md:left-4 bg-white/90 p-3 rounded-lg shadow-lg border border-slate-200 pointer-events-none md:pointer-events-auto">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Estuary Size (Scale)</h4>
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-[8px] h-[8px] rounded-full bg-blue-500 mx-auto"></div>
                        <span className="text-xs w-12">Small</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-[12px] h-[12px] rounded-full bg-blue-500 mx-auto"></div>
                        <span className="text-xs w-12">Medium</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-[18px] h-[18px] rounded-full bg-blue-500 mx-auto"></div>
                        <span className="text-xs w-12">Large</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-[24px] h-[24px] rounded-full bg-blue-500 mx-auto"></div>
                        <span className="text-xs w-12">Massive</span>
                    </div>
                </div>
            </div>

            {/* AI Search Prompt on Map if no results locally */}
            {searchQuery && displayedEstuaries.length === 0 && !isSearchingAI && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 pointer-events-none">
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center pointer-events-auto max-w-sm">
                        <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2">Research Mode</h3>
                        <p className="text-slate-600 mb-4 text-sm">Initiate an academic census to find all estuarine systems in "{searchQuery}".</p>
                        <button 
                            onClick={handleAiSearch}
                            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                            <BookOpenCheck className="w-4 h-4" />
                            Run Deep Search
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* List View */}
        {(currentView === 'list' || currentView === 'saved') && (
           <div className="flex-1 h-full bg-white z-10 absolute inset-0 md:relative">
              <EstuaryList 
                estuaries={displayedEstuaries}
                savedIds={savedIds}
                onToggleSave={toggleSave}
                onSelectEstuary={setSelectedEstuary}
                sortOption={sortOption}
                setSortOption={setSortOption}
                onHoverEstuary={setHoveredEstuaryId}
              />
           </div>
        )}

        {/* Estuary Detail Overlay */}
        {selectedEstuary && (
            <EstuaryDetail 
                estuary={selectedEstuary} 
                onClose={() => setSelectedEstuary(null)}
                isSaved={savedIds.includes(selectedEstuary.id)}
                onToggleSave={() => toggleSave(selectedEstuary.id)}
            />
        )}
      </main>

      {/* Mobile Navigation */}
      <Navigation currentView={currentView} setView={setCurrentView} savedCount={savedIds.length} />
      
    </div>
  );
};

export default App;
