import { cls } from '@/utils/cls';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  closeModal?: () => void;
  className?: string;
  onClick?: () => any;
  purposeMsg?: string;
  cautionMsg?: string;
}

const Modal = ({ isOpen, closeModal, onClick, className, cautionMsg, purposeMsg }: ModalProps) => {
  return (
    <div
      className={cls(
        '',
        isOpen ? 'fixed flex justify-center items-center top-0 left-0 bottom-0 right-0 bg-black bg-opacity-75' : '',
      )}
    >
      <div
        className={cls(
          `absolute shadow-xl flex flex-col items-center justify-around p-3 rounded-xl h-[283px] w-[331px] bg-white ${className}`,
          isOpen ? 'block' : 'hidden',
        )}
      >
        <div className='flex flex-col space-y-7 pt-5 items-center'>
          <div className='font-sans text-2xl font-bold'>{purposeMsg}</div>
          <div className='font-sans text-sm text-red text-center m-5'>{cautionMsg}</div>
        </div>
        <div className='flex flex-row space-x-10 mb-5'>
          <Button onClick={closeModal} children='취소' color='darkgray' size='mini' />
          <Button onClick={onClick} children='확인' color='pastelred' size='mini' />
        </div>
      </div>
    </div>
  );
};

export default Modal;
