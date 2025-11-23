import React, { useState, useCallback } from 'react';
import { BloomLevel, Question } from '../types';
import { generateQuestionsForLevel } from '../services/geminiService';
import { Brain, Trophy, CheckCircle, XCircle, ArrowRight, Loader2, Star, Zap } from 'lucide-react';

const LEVEL_ORDER = [
  BloomLevel.REMEMBER,
  BloomLevel.UNDERSTAND,
  BloomLevel.APPLY,
  BloomLevel.ANALYZE,
  BloomLevel.EVALUATE,
  BloomLevel.CREATE
];

const QuizChallenge: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'feedback' | 'completed'>('intro');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentLevel = LEVEL_ORDER[currentLevelIndex];

  const startLevel = useCallback(async () => {
    setLoading(true);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setQuestions([]); 
    
    const newQuestions = await generateQuestionsForLevel(currentLevel, 5);
    setQuestions(newQuestions);
    setLoading(false);
  }, [currentLevel]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) setScore(s => s + 100);

    setTimeout(() => {
        setGameState('feedback');
    }, 800);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);

    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setGameState('playing');
    } else {
        if (currentLevelIndex < LEVEL_ORDER.length - 1) {
            setCurrentLevelIndex(prev => prev + 1);
            setGameState('intro');
        } else {
            setGameState('completed');
        }
    }
  };

  // Render Logic
  if (gameState === 'completed') {
    return (
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border-b-8 border-vivid-yellow">
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-50 animate-pulse"></div>
                <Trophy size={96} className="relative z-10 text-yellow-500 mb-6 animate-bounce mx-auto" fill="currentColor" />
            </div>
            <h2 className="text-4xl font-black text-warm-900 mb-4 tracking-tight">¡Misión Cumplida!</h2>
            <p className="text-xl text-warm-600 mb-8 font-medium">Has desbloqueado todos los niveles cognitivos.</p>
            
            <div className="bg-warm-50 rounded-2xl p-6 mb-8 max-w-md mx-auto border-2 border-dashed border-warm-200">
                <div className="text-sm text-warm-500 font-bold uppercase tracking-wider mb-2">Puntaje Final</div>
                <div className="text-6xl font-black text-vivid-purple">{score}</div>
            </div>

            <button 
                onClick={() => window.location.reload()}
                className="bg-vivid-purple text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition-all hover:scale-105 shadow-xl ring-4 ring-purple-100"
            >
                Jugar de Nuevo
            </button>
        </div>
    );
  }

  if (gameState === 'intro') {
    return (
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl p-10 text-center border-4 border-vivid-purple/20">
             <div className="w-20 h-20 bg-vivid-purple rounded-2xl flex items-center justify-center mx-auto mb-6 text-white font-black text-3xl shadow-lg rotate-12">
                {currentLevelIndex + 1}
             </div>
             <h2 className="text-3xl font-black text-warm-900 mb-2">Nivel: {currentLevel}</h2>
             <div className="h-1 w-20 bg-vivid-purple mx-auto mb-6 rounded-full"></div>
             <p className="text-warm-600 mb-8 text-lg font-medium max-w-lg mx-auto">
                Prepárate para responder 5 preguntas diseñadas para probar tu capacidad de 
                <span className="font-bold text-vivid-purple ml-1 uppercase">{currentLevel.toLowerCase()}</span>.
             </p>
             <button 
                onClick={startLevel}
                disabled={loading}
                className="bg-vivid-purple text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all transform hover:-translate-y-1 shadow-xl flex items-center gap-3 mx-auto disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
             >
                {loading ? <Loader2 className="animate-spin" /> : <Zap fill="currentColor" />}
                {loading ? 'Generando Desafío...' : 'Comenzar Desafío'}
             </button>
        </div>
    );
  }

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl shadow-inner border-2 border-warm-100">
              <div className="relative">
                  <div className="w-16 h-16 border-8 border-vivid-purple/20 border-t-vivid-purple rounded-full animate-spin"></div>
                  <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-vivid-purple" size={24} />
              </div>
              <p className="text-vivid-purple font-bold mt-6 animate-pulse text-lg">Generando conocimiento...</p>
          </div>
      );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-warm-100">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-vivid-purple to-purple-600 p-5 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-lg font-bold text-sm backdrop-blur-sm flex items-center gap-1">
                    <Star size={14} fill="currentColor" /> NIVEL {currentLevelIndex + 1}
                </span>
                <span className="font-bold text-lg opacity-90">{currentLevel}</span>
            </div>
            <div className="bg-white text-vivid-purple px-4 py-1 rounded-full font-black font-mono text-xl shadow-sm">
                {score} pts
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-100">
            <div 
                className="h-full bg-vivid-yellow transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
        </div>

        <div className="p-8 md:p-10 min-h-[400px] flex flex-col justify-center">
            {gameState === 'feedback' ? (
                <div className="text-center space-y-8 animate-in fade-in zoom-in duration-300">
                    <div className="flex justify-center">
                        {isCorrect ? (
                            <div className="bg-green-100 p-4 rounded-full">
                                <CheckCircle size={80} className="text-green-600" />
                            </div>
                        ) : (
                            <div className="bg-red-100 p-4 rounded-full">
                                <XCircle size={80} className="text-red-600" />
                            </div>
                        )}
                    </div>
                    <h3 className={`text-3xl font-black ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? '¡Excelente!' : 'Incorrecto'}
                    </h3>
                    
                    <div className={`p-6 rounded-xl text-left border-l-8 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                        <p className={`font-bold mb-2 uppercase text-xs tracking-wider ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>Explicación Educativa</p>
                        <p className="text-warm-800 font-medium text-lg leading-relaxed">{currentQ.explanation}</p>
                    </div>

                    <button 
                        onClick={nextQuestion}
                        className="bg-warm-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Siguiente Pregunta <ArrowRight size={20} />
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-bold text-warm-900 leading-tight">
                        {currentQ?.text}
                    </h3>

                    <div className="grid gap-3">
                        {currentQ?.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className={`
                                    p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center group
                                    ${selectedAnswer === null 
                                        ? 'border-gray-200 hover:border-vivid-purple hover:bg-purple-50 hover:shadow-md' 
                                        : selectedAnswer === idx 
                                            ? 'bg-vivid-purple text-white border-vivid-purple shadow-lg scale-[1.02]'
                                            : 'border-gray-100 opacity-40'
                                    }
                                `}
                            >
                                <span className={`
                                    w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 text-sm transition-colors flex-shrink-0
                                    ${selectedAnswer === idx ? 'bg-white text-vivid-purple' : 'bg-gray-100 text-gray-500 group-hover:bg-vivid-purple group-hover:text-white'}
                                `}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                <span className="font-semibold text-base">{opt}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-sm font-bold text-gray-400 border-t border-gray-100">
            PREGUNTA {currentQuestionIndex + 1} / {questions.length}
        </div>
    </div>
  );
};

export default QuizChallenge;