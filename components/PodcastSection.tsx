import React, { useState, useRef } from 'react';
import { Upload, Play, Pause, Lock, Unlock, Music, Headphones } from 'lucide-react';
import { PodcastState } from '../types';

const PodcastSection: React.FC = () => {
  const [state, setState] = useState<PodcastState>({
    isAdmin: false,
    audioUrl: null,
    title: "Episodio Introductorio: El quiebre democrático"
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAdmin = () => setState(prev => ({ ...prev, isAdmin: !prev.isAdmin }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setState(prev => ({ ...prev, audioUrl: url, title: file.name.replace(/\.[^/.]+$/, "") }));
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border-4 border-vivid-teal overflow-hidden">
      <div className="bg-vivid-teal p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="flex items-center gap-4 z-10">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
            <Headphones size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-black">Podcast Educativo</h2>
            <p className="text-teal-100 font-medium">Memoria Sonora</p>
          </div>
        </div>
        
        <button 
          onClick={toggleAdmin}
          className="z-10 flex items-center gap-2 text-xs bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full transition-colors border border-white/20 font-bold"
        >
          {state.isAdmin ? <Unlock size={14} /> : <Lock size={14} />}
          {state.isAdmin ? 'Modo Admin Activo' : 'Acceso Admin'}
        </button>
      </div>

      <div className="p-10 flex flex-col items-center justify-center gap-8 bg-gradient-to-b from-teal-50/50 to-white">
        <div className="relative group cursor-pointer" onClick={togglePlay}>
            <div className={`w-40 h-40 bg-gradient-to-tr from-vivid-teal to-teal-400 rounded-full flex items-center justify-center shadow-2xl relative z-10 transition-transform duration-300 ${isPlaying ? 'scale-105' : 'group-hover:scale-105'}`}>
                <Music size={64} className="text-white drop-shadow-md" />
            </div>
            {/* Pulse Rings */}
            {isPlaying && (
                <>
                    <span className="absolute inset-0 rounded-full animate-ping bg-vivid-teal/20 animation-delay-100"></span>
                    <span className="absolute inset-0 rounded-full animate-ping bg-vivid-teal/10 animation-delay-300"></span>
                </>
            )}
        </div>

        <div className="text-center max-w-lg">
            <h3 className="text-2xl font-bold text-warm-900 mb-2">{state.title}</h3>
            <p className="text-warm-600 font-medium">Escucha el análisis histórico y reflexiona sobre los hechos.</p>
        </div>

        {/* Player Controls */}
        <div className="w-full max-w-2xl bg-white rounded-full p-3 flex items-center gap-4 border-2 border-teal-100 shadow-lg">
             <button 
                onClick={togglePlay}
                disabled={!state.audioUrl && !state.isAdmin} // In demo mode without upload, disable if not mocked
                className="w-14 h-14 bg-vivid-teal rounded-full flex items-center justify-center text-white hover:bg-teal-600 transition-transform hover:scale-110 shadow-md flex-shrink-0"
             >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
             </button>
             <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative">
                 {/* Visual Mock Progress */}
                 <div className={`h-full bg-vivid-teal transition-all duration-1000 ${isPlaying ? 'w-full animate-pulse' : 'w-0'}`}></div>
             </div>
             <audio 
                ref={audioRef} 
                src={state.audioUrl || undefined} 
                onEnded={() => setIsPlaying(false)}
             />
        </div>

        {/* Admin Area */}
        {state.isAdmin && (
            <div className="w-full max-w-lg mt-4 p-6 border-2 border-dashed border-vivid-teal/40 rounded-2xl bg-teal-50/50 text-center animate-in fade-in slide-in-from-top-4">
                <label className="cursor-pointer block group">
                    <div className="flex flex-col items-center gap-3 text-teal-700 group-hover:text-vivid-teal transition-colors">
                        <div className="p-3 bg-white rounded-full shadow-sm">
                            <Upload size={24} />
                        </div>
                        <span className="font-bold text-lg">Subir episodio</span>
                        <span className="text-xs font-semibold uppercase tracking-wider opacity-70">MP3 • WAV</span>
                    </div>
                    <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                </label>
            </div>
        )}
      </div>
    </div>
  );
};

export default PodcastSection;