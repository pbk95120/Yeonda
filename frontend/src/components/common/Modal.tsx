import { cls } from '@/utils/cls';

interface ModalProps {
  isOpen: boolean;
  closeModal?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Modal = ({ isOpen, children, closeModal, className }: ModalProps) => {
  return (
    <div
      className={cls(
        '',
        isOpen ? 'fixed flex justify-center items-center top-0 left-0 bottom-0 right-0 bg-black bg-opacity-75' : '',
      )}
    >
      <div
        className={cls(
          `absolute shadow-xl items-center justify-center p-3 rounded-xl bg-white ${className}`,
          isOpen ? 'block' : 'hidden',
        )}
      >
        <div>{children}</div>
        <button onClick={closeModal} className='bg-lightgray w-full h-full'>
          close
        </button>
      </div>
    </div>
  );
};

export default Modal;
