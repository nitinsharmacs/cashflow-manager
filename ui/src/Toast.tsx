import ReactDOM from 'react-dom/client';
import ToastCard from './components/ToastCard/ToastCard';

class Toast {
  static insert(message: string): void {
    ReactDOM.createRoot(document.getElementById('toasts')!).render(
      <ToastCard message={message} />
    );
    //
  }
}

export default Toast;
