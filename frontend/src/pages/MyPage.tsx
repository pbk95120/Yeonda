// import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
// import Modal from '@/components/common/Modal';
// import Toast from '@/components/common/Toast';
// import { useState } from 'react';
import SVG from '@/assets/images/Profile.svg?react';

import { IoFemale } from 'react-icons/io5';

const MyPage = () => {
  return (
    <div className='flex flex-col items-center'>
      <SVG className='h-[221px] w-[230px] m-2' />
      <div className='font-sans font-bold'>킹상하</div>
      <div className='flex flex-row'>
        <div className=''>32세</div>
        <div className=''></div>
        <div>
          {' '}
          <Input inputFor='search' placeholder='검색'></Input>
          <Input inputFor='default' placeholder='검색'></Input>
        </div>
      </div>
    </div>
  );
};
// const [open, setOpen] = useState(false);
// const [toast, setToast] = useState(false);
// const openModal = () => setOpen(true);
// const closeModal = () => setOpen(false);

// return (
//   <div className='flex flex-col justify-around h-[500px]'>
//     <button className='h-full w-full' onClick={openModal}>
//       Open Modal
//     </button>
//     <Input inputFor='search' />
//     <Input inputFor='image'></Input>
//     {toast && <Toast value='가입이 완료되었습니다' valid={false} setToast={setToast} />}
//     <Button children='toast button' onClick={() => setToast(!toast)} />
//     <Modal
//       isOpen={open}
//       closeModal={closeModal}
//       className=''
//       cautionMsg='한번 삭제한 일기는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?'
//       purposeMsg='일기삭제'
//     />
//   </div>
// );
export default MyPage;
