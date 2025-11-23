import React, { useState } from 'react';
import { INITIAL_TIMELINE } from '../constants';
import { TimelineEvent } from '../types';
import Modal from './Modal';
import { generateDetailedExplanation } from '../services/geminiService';
import { Clock, Calendar, ChevronRight, Star } from 'lucide-react';

const TimelineSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [details, setDetails] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Array of vivid colors to cycle through
  const cardColors = [
    'border-terra-DEFAULT hover:shadow-terra-light/50',
    'border-vivid-blue hover:shadow-vivid-blue/50',
    'border-vivid-purple hover:shadow-vivid-purple/50',
    'border-vivid-teal hover:shadow-vivid-teal/50',
  ];

  const dotColors = [
    'bg-terra-DEFAULT',
    'bg-vivid-blue',
    'bg-vivid-purple',
    'bg-vivid-teal',
  ];

  const handleEventClick = async (event: TimelineEvent) => {
    setSelectedEvent(event);
    setLoading(true);
    // In a real app, we check if we already have the full description
    if (event.fullDescription) {
        setDetails(event.fullDescription);
    } else {
        const text = await generateDetailedExplanation(event.title, 'event');
        setDetails(text);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm border-l-8 border-terra-DEFAULT">
            <Clock className="text-terra-DEFAULT" size={32} />
            <h2 className="text-3xl font-serif font-bold text-warm-900">Línea de Tiempo (1973-1990)</h2>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div className="w-full overflow-x-auto pb-12 pt-4 custom-scrollbar">
            {/* Wrapper for line and items to ensure line stretches with content */}
            <div className="relative min-w-max px-4">
                
                {/* The Line - Positioned absolute relative to this scrolling container */}
                {/* Adjusted top position to align with the center of the dots (approx 36px from top padding) */}
                <div className="absolute top-[2.25rem] left-0 w-full h-2 bg-gradient-to-r from-terra-light via-vivid-purple to-vivid-teal rounded-full z-0 opacity-50"></div>

                <div className="flex gap-8 pt-4 pb-4">
                    {INITIAL_TIMELINE.map((event, index) => {
                        const colorIndex = index % cardColors.length;
                        return (
                            <div 
                                key={index} 
                                className="relative z-10 flex flex-col items-center w-72 group cursor-pointer perspective-1000"
                                onClick={() => handleEventClick(event)}
                            >
                                {/* Dot */}
                                <div className={`w-10 h-10 rounded-full ${dotColors[colorIndex]} border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300 mb-6 z-20 flex items-center justify-center`}>
                                <Star size={16} className="text-white fill-current" />
                                </div>

                                {/* Card */}
                                <div className={`bg-white p-5 rounded-xl shadow-lg border-b-4 w-full hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-3 ${cardColors[colorIndex]}`}>
                                    <div className="flex items-center gap-2 text-warm-900 font-bold mb-3 bg-warm-100 w-fit px-3 py-1 rounded-full text-xs">
                                        <Calendar size={14} />
                                        <span>{event.year}</span>
                                        <span className="font-normal text-warm-600">| {event.month}</span>
                                    </div>
                                    <h3 className="font-bold text-xl leading-tight mb-3 text-warm-900 group-hover:text-terra-DEFAULT transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-sm text-warm-600 line-clamp-3 leading-relaxed">
                                        {event.shortDescription}
                                    </p>
                                    <div className="mt-4 flex items-center justify-end text-sm font-bold text-terra-DEFAULT opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                                        <span>Explorar</span>
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        <Modal 
            isOpen={!!selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
            title={selectedEvent?.title || ''}
        >
            <div className="space-y-4">
                <div className="flex items-baseline gap-2 border-b-2 border-warm-100 pb-3">
                    <span className="text-4xl font-black text-terra-DEFAULT">{selectedEvent?.year}</span>
                    <span className="text-xl font-bold text-warm-400 uppercase tracking-wide">{selectedEvent?.month}</span>
                </div>
                {loading ? (
                    <div className="flex flex-col items-center py-12 gap-4">
                        <div className="w-12 h-12 border-4 border-terra-light border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-warm-500 font-semibold animate-pulse">Desclasificando archivos...</p>
                    </div>
                ) : (
                    <div className="prose prose-lg prose-warm max-w-none text-warm-800 leading-relaxed">
                        <p>{details}</p>
                    </div>
                )}
            </div>
        </Modal>
    </div>
  );
};

export default TimelineSection;