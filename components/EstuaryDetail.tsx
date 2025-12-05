import React, { useEffect, useState } from 'react';
import { Estuary, Quiz } from '../types';
import { X, BookOpen, Fish, AlertTriangle, Lightbulb, PlayCircle, Heart } from 'lucide-react';
import { generateEstuaryDetails, generateQuiz } from '../services/geminiService';
import QuizModal from './QuizModal';

interface EstuaryDetailProps {
  estuary: Estuary;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

const EstuaryDetail: React.FC<EstuaryDetailProps> = ({ estuary, onClose, isSaved, onToggleSave }) => {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      // Simulate checking cache or existing detailed props first
      if (estuary.biodiversity && estuary.ecologicalSignificance) {
         setDetails({
             biodiversity: estuary.biodiversity,
             conservationStatus: estuary.conservationStatus,
             ecologicalSignificance: estuary.ecologicalSignificance,
             funFact: "Did you know this estuary is vital for global carbon cycling?" // Default fallback
         });
         setLoading(false);
      } else {
        // Fetch from Gemini
        const data = await generateEstuaryDetails(estuary.name);
        setDetails(data);
        setLoading(false);
      }
    };
    fetchInfo();
  }, [estuary]);

  const handleStartQuiz = async () => {
    setLoadingQuiz(true);
    const generatedQuiz = await generateQuiz(estuary.name);
    setQuiz(generatedQuiz);
    setLoadingQuiz(false);
    if (generatedQuiz) setShowQuiz(true);
  };

  return (
    <div className="absolute inset-0 z-20 bg-white flex flex-col md:flex-row overflow-hidden animate-in slide-in-from-bottom duration-300">
      {/* Media Section */}
      <div className="w-full md:w-1/2 h-64 md:h-full relative bg-black">
        <img 
            src={estuary.image} 
            alt={estuary.name} 
            className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{estuary.name}</h1>
            <p className="text-white/80 text-lg flex items-center gap-2">
                <span className="bg-white/20 px-2 py-1 rounded text-sm">{estuary.location}</span>
                <span className="bg-white/20 px-2 py-1 rounded text-sm">{estuary.scale} Scale</span>
            </p>
        </div>
        <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors md:hidden"
        >
            <X />
        </button>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 flex gap-2 bg-white/90 z-10 w-full justify-end border-b">
             <button 
                onClick={onToggleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${isSaved ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
            >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
            </button>
            <button 
                onClick={onClose}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg hidden md:block"
            >
                <X />
            </button>
        </div>

        <div className="p-8 pt-20 md:pt-20 overflow-y-auto space-y-8 pb-24">
            {loading ? (
                <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    <div className="h-32 bg-slate-200 rounded w-full mt-6"></div>
                </div>
            ) : details ? (
                <>
                    <section>
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-3">
                            <BookOpen className="text-blue-500" />
                            Overview
                        </h3>
                        <p className="text-slate-700 leading-relaxed">
                            {estuary.shortDescription}
                        </p>
                    </section>

                    <section className="bg-green-50 p-6 rounded-xl border border-green-100">
                        <h3 className="text-xl font-bold text-green-800 flex items-center gap-2 mb-3">
                            <Fish className="text-green-600" />
                            Biodiversity
                        </h3>
                        <p className="text-green-900/80 leading-relaxed">
                            {details.biodiversity}
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                             <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4" /> Conservation
                             </h4>
                             <p className="text-sm text-amber-900/80">{details.conservationStatus}</p>
                        </div>
                        <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                             <h4 className="font-bold text-indigo-800 flex items-center gap-2 mb-2">
                                <Lightbulb className="w-4 h-4" /> Fun Fact
                             </h4>
                             <p className="text-sm text-indigo-900/80">{details.funFact}</p>
                        </div>
                    </section>
                    
                     <section>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Multimedia</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden">
                                <img src={`https://picsum.photos/seed/${estuary.id}1/300/200`} className="absolute inset-0 w-full h-full object-cover" alt="Video thumb"/>
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                     <PlayCircle className="w-12 h-12 text-white opacity-90" />
                                </div>
                            </div>
                            <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden">
                                <img src={`https://picsum.photos/seed/${estuary.id}2/300/200`} className="absolute inset-0 w-full h-full object-cover" alt="Gallery thumb"/>
                                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">Gallery</span>
                            </div>
                        </div>
                    </section>

                    <div className="pt-6">
                        <button 
                            onClick={handleStartQuiz}
                            disabled={loadingQuiz}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            {loadingQuiz ? 'Generating Quiz...' : 'Take the Challenge Quiz!'}
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-20 text-slate-500">
                    Unable to load details.
                </div>
            )}
        </div>
      </div>
      
      {showQuiz && quiz && <QuizModal quiz={quiz} onClose={() => setShowQuiz(false)} />}
    </div>
  );
};

export default EstuaryDetail;
