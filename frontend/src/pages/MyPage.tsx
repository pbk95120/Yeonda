import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { useState } from 'react';

const MyPage = () => {
  const [open, setOpen] = useState(true);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <div className='flex flex-col justify-around w-[300px] h-[300px]'>
      <button className='h-full w-full' onClick={openModal}>
        Open Modal
      </button>
      <Modal isOpen={open} closeModal={closeModal} className=''>
        <Input type='search' placeholder='입력해주세요' className='' />
        <Input type='default' placeholder='입력해주세요' className='' />
        <div className='block'></div>
      </Modal>
    </div>
  );
};

export default MyPage;
