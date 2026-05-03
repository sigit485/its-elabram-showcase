import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function ModalOverlay({ modalId, children, maxWidth = 580 }) {
  const { state, closeModal } = useApp();
  const isOpen = state.activeModal === modalId;

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && isOpen) closeModal();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeModal]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  return (
    <div className={`modal-overlay${isOpen ? ' open' : ''}`} onClick={handleOverlayClick}>
      <div className="modal" style={{ maxWidth }}>
        {children}
      </div>
    </div>
  );
}
