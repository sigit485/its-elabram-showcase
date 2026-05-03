import { useApp } from '../../context/AppContext';

export default function ToastContainer() {
  const { state } = useApp();

  return (
    <div className="toast-container">
      {state.toasts.map(t => (
        <div key={t.id} className="toast">{t.msg}</div>
      ))}
    </div>
  );
}
