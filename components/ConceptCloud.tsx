import React, { useState } from 'react';
import { INITIAL_CONCEPTS } from '../constants';
import { Concept } from '../types';
import Modal from './Modal';
import { generateDetailedExplanation } from '../services/geminiService';
import { BookOpen, Search, Zap } from 'lucide-react';

const ConceptCloud: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [details, setDetails] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleConceptClick = async (concept: Concept) => {
    setSelectedConcept(concept);
    setLoading(true);
    const text = await generateDetailedExplanation(concept.term, 'concept');
    setDetails(text);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm border-l-8 border-vivid-blue">
        <BookOpen className="text-vivid-blue" size={32} />
        <h2 className="text-3xl font-serif font-bold text-warm-900">Conceptos Claves</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {INITIAL_CONCEPTS.map((concept, index) => {
            // Vivid color cycling logic
            const colorClasses = [
                'bg-red-50 hover:bg-red-100 border-red-200 text-red-900',
                'bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-900',
                'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900',
                'bg-green-50 hover:bg-green-100 border-green-200 text-green-900',
                'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-900',
                'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-900',
                'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-900',
                'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-900',
            ];
            const currentStyle = colorClasses[index % colorClasses.length];

            return (
                <button
                    key={index}
                    onClick={() => handleConceptClick(concept)}
                    className={`
                        p-5 rounded-2xl text-left transition-all duration-300
                        border-b-4 hover:-translate-y-1
                        group relative overflow-hidden shadow-sm hover:shadow-lg
                        ${currentStyle}
                    `}
                >
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-black text-lg leading-tight group-hover:scale-105 transition-transform origin-left">{concept.term}</h3>
                            <Zap size={16} className="opacity-50 group-hover:text-yellow-500 group-hover:opacity-100 transition-all" />
                        </div>
                        <p className="text-sm font-medium opacity-80 leading-snug">{concept.shortDefinition}</p>
                    </div>
                    <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity transform rotate-12 scale-150">
                        <Search size={64} />
                    </div>
                </button>
            )
        })}
      </div>

      <Modal
        isOpen={!!selectedConcept}
        onClose={() => setSelectedConcept(null)}
        title={selectedConcept?.term || ''}
      >
        {loading ? (
             <div className="flex flex-col items-center py-12 gap-4">
                <div className="w-12 h-12 border-4 border-vivid-blue border-t-transparent rounded-full animate-spin"></div>
                <p className="text-vivid-blue font-bold animate-pulse">Analizando concepto...</p>
            </div>
        ) : (
            <div className="space-y-6">
                <div className="p-4 bg-vivid-blue/10 rounded-lg border-l-4 border-vivid-blue">
                    <p className="font-bold text-vivid-blue/80 text-sm uppercase mb-1">Definición Corta</p>
                    <p className="font-semibold text-warm-900 text-lg">
                        {selectedConcept?.shortDefinition}
                    </p>
                </div>
                <div className="prose prose-warm max-w-none text-warm-700 leading-relaxed">
                    <p>{details}</p>
                </div>
            </div>
        )}
      </Modal>
    </div>
  );
};

export default ConceptCloud;