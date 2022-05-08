import { NotificationToast } from '@/components/NotificationToast';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface IToast {
  type: 'info' | 'error' | 'default';
  title: string;
  subText?: string;
}

export const ToastContext = createContext<{
  addToast: (toast: IToast) => void;
}>({
  addToast: () => {},
});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = useCallback(
    (toast: IToast) => {
      setToasts(() => [...toasts, toast]);
    },
    [toasts],
  );

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => setToasts(toast => toast.slice(1)), 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [setToasts, toasts.length]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        aria-live="assertive"
        className="absolute top-0 right-0 flex flex-col items-end px-4 py-8 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="flex flex-col items-center w-full py-16 space-y-4 sm:items-end">
          {toasts.map(({ title, subText, type }) => (
            <NotificationToast
              key={title}
              title={title}
              type={type}
              subtext={subText}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};
