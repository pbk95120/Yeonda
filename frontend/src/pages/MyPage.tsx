import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import { useState } from 'react';

const MyPage = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const activateToast = () => {};
  return (
    <div className='flex flex-col justify-around h-[500px]'>
      <button className='h-full w-full' onClick={openModal}>
        Open Modal
      </button>
      <Toast value='가입이 완료되었습니다' valid={true} />
      <Button children='toast button' />
      <Modal isOpen={open} closeModal={closeModal} className='' cautionMsg='진짜로 삭제???' purposeMsg='일기삭제' />
    </div>
  );
};

export default MyPage;
