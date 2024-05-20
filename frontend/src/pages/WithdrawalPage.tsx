import { signOut } from '@/api/mypage.api';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WithdrawalPage = () => {
  const { storeLogout } = useAuthStore();
  const navigate = useNavigate();
  const [open, isOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const openModal = () => {
    isOpen(true);
  };
  const closeModal = () => {
    isOpen(false);
  };
  const withdrawalBtn = () => {
    let withdrawal = document.querySelector('#active');
    withdrawal?.addEventListener('click', () => {
      try {
        signOut(password).then(() => {
          storeLogout();
          navigate('/join');
        });
      } catch {
        alert('비밀번호가 일치하지 않습니다.탈퇴가 불가능합니다');
      }
    });
  };
  return (
    <div className='pt-12'>
      <div className='ml-8'>비밀번호 확인</div>
      <div className='mt-2 flex flex-col items-center justify-center'>
        <Input
          className='h-[56px] w-[316px] font-sans'
          inputFor='default'
          placeholder='비밀번호 확인(placeholder)'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          size='large'
          color='pastelred'
          children='회원 탈퇴'
          className='absolute bottom-12'
          onClick={openModal}
        />
      </div>
      {open && (
        <Modal
          isOpen={open}
          closeModal={closeModal}
          cautionMsg='탈퇴한 계정은 복구가 불가능합니다.
정말 탈퇴하시겠습니까?'
          purposeMsg='회원 탈퇴'
          onClick={withdrawalBtn}
        />
      )}
    </div>
  );
};

export default WithdrawalPage;
