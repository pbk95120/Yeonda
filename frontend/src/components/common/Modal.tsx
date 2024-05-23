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
        isOpen ? 'fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-75' : '',
      )}
    >
      <div
        className={cls(
          `absolute flex h-[283px] w-[331px] flex-col items-center justify-around rounded-xl bg-white p-3 shadow-xl ${className}`,
          isOpen ? 'block' : 'hidden',
        )}
      >
        <div className='flex flex-col items-center space-y-7 pt-5'>
          <div className='font-sans text-2xl font-bold'>{purposeMsg}</div>
          <div className='m-5 text-center font-sans text-sm text-red'>{cautionMsg}</div>
        </div>
        <div className='mb-5 flex flex-row space-x-10'>
          <Button onClick={closeModal} children='취소' color='darkgray' size='mini' />
          {onClick ? (
            <Button id='active' children='확인' color='pastelred' size='mini' onClick={onClick} />
          ) : (
            <Button id='active' children='확인' color='pastelred' size='mini' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
