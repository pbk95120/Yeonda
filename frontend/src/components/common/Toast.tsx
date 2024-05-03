import { cls } from '@/utils/cls';

interface ToastProps {
  value?: string;
  className?: string;
  valid: boolean;
}

const Toast = ({ value, className, valid }: ToastProps) => {
  return (
    <div>
      {valid ? null : null}
      <div
        className={cls(
          `opacity-0 font-sans fixed bottom-[-100px] left-50% bg-gray shadow-lg transition duration-75 translate-y-1/2 ${className}`,
        )}
      >
        {value}
      </div>
    </div>
  );
};

export default Toast;
