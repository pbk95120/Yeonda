import { useState } from 'react';
import { ChatProfileProps } from '@/types/type';
import Modal from '@/components/common/Modal';
/**
 * 채팅 상대 프로필 페이지 컴포넌트
 */
const ChatProfile = ({ profileImage, nickName }: ChatProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='my-16 flex flex-col items-center justify-center'>
      <img src={profileImage} alt='profile' className='rounded-full' />
      <p className='mt-4 text-2xl font-bold'>{nickName}</p>
      <button className='mt-4 text-base text-red' onClick={openModal}>
        차단 및 채팅 삭제
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <p>정말로 차단하고 채팅을 삭제하시겠습니까?</p>
      </Modal>
    </div>
  );
};

export default ChatProfile;
