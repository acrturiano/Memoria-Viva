import React, { useState } from 'react';
import TimelineSection from './components/TimelineSection';
import ConceptCloud from './components/ConceptCloud';
import QuizChallenge from './components/QuizChallenge';
import PodcastSection from './components/PodcastSection';
import { BookOpen, Clock, Brain, Info, Music, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'concepts' | 'quiz' | 'podcast'>('timeline');

  return (
    <div className="min-h-screen bg-warm-50 text-warm-900 font-sans selection:bg-terra-light selection:text-white">
      {/* Header */}
      <header className="bg-white border-b-4 border-terra-DEFAULT shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-terra-DEFAULT to-terra-dark rounded-xl flex items-center justify-center text-white font-serif font-black text-2xl shadow-md rotate-3 transform hover:rotate-0 transition-transform">
                    MV
                </div>
                <div>
                    <h1 className="text-2xl font-black font-serif text-warm-900 leading-none tracking-tight">Memoria Viva</h1>
                    <p className="text-xs text-terra-DEFAULT font-bold tracking-widest uppercase">Gamificando la Historia</p>
                </div>
            </div>

            <nav className="flex flex-wrap justify-center bg-warm-100/50 p-1.5 rounded-xl gap-1">
                <button 
                    onClick={() => setActiveTab('timeline')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all duration-200 border-2 ${activeTab === 'timeline' ? 'bg-white border-terra-DEFAULT text-terra-DEFAULT shadow-sm scale-105' : 'border-transparent text-warm-600 hover:bg-white/50 hover:text-terra-DEFAULT'}`}
                >
                    <Clock size={18} /> <span className="">Línea de Tiempo</span>
                </button>
                <button 
                    onClick={() => setActiveTab('concepts')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all duration-200 border-2 ${activeTab === 'concepts' ? 'bg-white border-vivid-blue text-vivid-blue shadow-sm scale-105' : 'border-transparent text-warm-600 hover:bg-white/50 hover:text-vivid-blue'}`}
                >
                    <BookOpen size={18} /> <span className="">Conceptos</span>
                </button>
                <button 
                    onClick={() => setActiveTab('quiz')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all duration-200 border-2 ${activeTab === 'quiz' ? 'bg-white border-vivid-purple text-vivid-purple shadow-sm scale-105' : 'border-transparent text-warm-600 hover:bg-white/50 hover:text-vivid-purple'}`}
                >
                    <Brain size={18} /> <span className="">Desafío</span>
                </button>
                <button 
                    onClick={() => setActiveTab('podcast')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all duration-200 border-2 ${activeTab === 'podcast' ? 'bg-white border-vivid-teal text-vivid-teal shadow-sm scale-105' : 'border-transparent text-warm-600 hover:bg-white/50 hover:text-vivid-teal'}`}
                >
                    <Music size={18} /> <span className="">Podcast</span>
                </button>
            </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
        {/* Intro Banner - Show only on first load or make it smaller? Keeping it as a persistent header for now but smaller */}
        <section className="bg-gradient-to-r from-terra-dark via-terra-DEFAULT to-terra-light rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute -top-10 -right-10 opacity-20">
                <Brain size={250} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-serif font-black mb-2 text-white drop-shadow-md">
                        {activeTab === 'timeline' && "Viaja en el Tiempo"}
                        {activeTab === 'concepts' && "Domina los Conceptos"}
                        {activeTab === 'quiz' && "Pon a prueba tu Saber"}
                        {activeTab === 'podcast' && "Escucha la Historia"}
                    </h2>
                    <p className="text-lg font-medium text-warm-50 opacity-90">
                        {activeTab === 'timeline' && "Explora los 30 hitos más relevantes del período 1973-1990."}
                        {activeTab === 'concepts' && "Descubre el significado de términos clave de la época."}
                        {activeTab === 'quiz' && "Sube de nivel en la taxonomía de Bloom respondiendo preguntas."}
                        {activeTab === 'podcast' && "Análisis en profundidad a través de audio."}
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs font-bold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white border border-white/30">
                    <Info size={16} />
                    <span>IA Integrada</span>
                </div>
            </div>
        </section>

        {/* Dynamic Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            {activeTab === 'timeline' && <TimelineSection />}
            {activeTab === 'concepts' && <ConceptCloud />}
            {activeTab === 'quiz' && <QuizChallenge />}
            {activeTab === 'podcast' && <PodcastSection />}
        </div>
      </main>

      <footer className="bg-warm-900 text-warm-300 py-10 mt-12 border-t-8 border-vivid-teal">
        <div className="container mx-auto px-4 text-center">
            <p className="font-serif italic text-2xl text-white mb-4 opacity-80">"Un pueblo sin memoria es un pueblo sin futuro"</p>
            <div className="flex justify-center gap-4 mb-4">
                <div className="h-2 w-12 bg-terra-DEFAULT rounded-full"></div>
                <div className="h-2 w-12 bg-vivid-blue rounded-full"></div>
                <div className="h-2 w-12 bg-vivid-yellow rounded-full"></div>
            </div>
            <p className="text-sm font-semibold">© {new Date().getFullYear()} Memoria Viva. Aplicación Educativa Gamificada.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;