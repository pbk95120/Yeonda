import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/common/Modal';

/**
 * 채팅 상대 프로필 페이지 컴포넌트
 */
const ChatProfile = () => {
  const nickName = localStorage.getItem('nickname');
  const profileImg = localStorage.getItem('profileImg') || undefined;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  const controls = useAnimation();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const deleteChat = () => {
    console.log('삭제완료');
    navigate('/chat');
  };

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      const handleScroll = () => {
        console.log('mainContent.scrollTop : ', mainContent.scrollTop);
        setScroll(mainContent.scrollTop > 20);
      };

      mainContent.addEventListener('scroll', handleScroll);

      if (scroll) {
        controls.start({
          height: '2rem',
          paddingBottom: '1rem',
          transition: { duration: 0.2, ease: 'easeInOut' },
        });
      } else {
        controls.start({
          height: 'auto',
          transition: { duration: 0.2, ease: 'easeInOut' },
        });
      }

      return () => {
        mainContent.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scroll, controls]);

  return (
    <motion.div
      className='flex flex-col items-center justify-center py-12'
      style={{
        height: scroll ? '2.5rem' : 'auto',
      }}
      animate={controls}
    >
      <motion.img
        src={profileImg}
        alt='profile'
        className='h-[16.2rem] w-[16.2rem] rounded-full'
        animate={scroll ? { x: 140, y: 55, scale: 0.15 } : { x: 0.1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.p
        className='mt-4 text-2xl font-bold'
        initial={{ x: 0, scale: 1 }}
        animate={scroll ? { x: -120, y: -110, scale: 0.8 } : { x: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {nickName}
      </motion.p>
      <motion.button
        className='mt-4 text-base text-red'
        onClick={openModal}
        animate={{ opacity: scroll ? 0 : 1 }}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
      >
        차단 및 채팅 삭제
      </motion.button>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        cautionMsg='정말 유저와의 채팅을 삭제하시겠습니까?'
        purposeMsg='차단 및 채팅 삭제'
        onClick={deleteChat}
      />
    </motion.div>
  );
};

export default ChatProfile;
