import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl border-4 border-terra-DEFAULT relative flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-warm-200 bg-warm-50 rounded-t-lg">
          <h2 className="text-xl font-bold text-terra-dark font-serif">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-warm-200 rounded-full transition-colors text-warm-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar text-warm-900 leading-relaxed">
          {children}
        </div>
        <div className="p-4 border-t border-warm-200 bg-warm-50 rounded-b-lg flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-terra-DEFAULT text-white rounded hover:bg-terra-dark transition-colors font-semibold shadow-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;