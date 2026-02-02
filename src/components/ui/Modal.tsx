/**
 * Modal System
 * For forms and dialogs
 */

'use client';

import { useState, useCallback, createContext, useContext, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalContextType {
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={cn(
        "relative w-full max-w-lg max-h-[90vh] overflow-y-auto",
        "rounded-2xl bg-slate-900 border border-white/10 shadow-2xl",
        "animate-in zoom-in-95 fade-in duration-200"
      )}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    content: ReactNode | null;
    title?: string;
  }>({
    isOpen: false,
    content: null,
  });

  const openModal = useCallback((content: ReactNode, title?: string) => {
    setModalState({ isOpen: true, content, title });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, content: null });
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal 
        isOpen={modalState.isOpen} 
        onClose={closeModal}
        title={modalState.title}
      >
        {modalState.content}
      </Modal>
    </ModalContext.Provider>
  );
}
