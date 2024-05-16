// import Button from '@/components/common/Button';
// import Modal from '@/components/common/Modal';
// import Toast from '@/components/common/Toast';
// import { useState } from 'react';
import SVG from '@/assets/images/Profile.svg?react';
import { IoFemale } from 'react-icons/io5';
import { IoMale } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Tags from '@/components/common/Tags';
import { useNavigate } from 'react-router-dom';

const tags = [
  { id: 1, name: '롤토체스' },
  { id: 2, name: '농구' },
  { id: 3, name: '게임' },
  { id: 4, name: '롤토체스' },
  { id: 5, name: '취뽀' },
];

const MyPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    goToSettingPage();
  }, []);
  const goToSettingPage = () => {
    const setting = document.querySelector('#setting');
    setting?.addEventListener('click', () => navigate('/mypage/setting'));
  };

  const [gender, setGender] = useState<'male' | 'female'>('male');
  return (
    <div className='flex flex-col items-center justify-center space-y-2'>
      <SVG className='m-2 h-[221px] w-[230px]' />
      <div className='font-sans text-xl font-bold'>킹상하</div>
      <div className='flex flex-row items-center justify-center space-x-2'>
        <div className='font-sans text-xl text-lightgray'>32세</div>
        <div className={gender === 'male' ? 'text-blue' : 'text-pastelpeach'}>
          {gender === 'male' ? <IoMale className='h-5 w-5' /> : <IoFemale className='h-5 w-5' />}
        </div>
      </div>
      <div className='font-sans text-xl font-bold'>대구</div>
      <div id='tag container' className='w-80 flex-wrap items-center justify-center pt-6'>
        {tags.map((tag, i) => (
          <div key={i} className='inline-block'>
            <Tags i={i} tag={tag} className='mx-4 px-3 py-2' />
          </div>
        ))}
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
