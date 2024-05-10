import DiaryItem from '@/components/diaries/DiaryItem';
import DiaryHeader from '@/components/diaries/DiaryHeader';
import Dropdown from '@/components/common/Dropdown';
import useDiaries from '@/hooks/useDiaries'; // 추후 API 연결 시 이용
import diariesData from '@/mocks/diaryData';
import { RiMoreFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Toast from '@/components/common/Toast';
import Modal from '@/components/common/Modal';
import { useDiaryItemStore } from '@/store/diaryStore';

const MyDiaryDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toast, setToast] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setIsEditing, isEditing } = useDiaryItemStore();

  const editSuccess = () => {
    setIsEditing(false);
    setToast(true);
  };

  const editDiary = () => {
    setIsEditing(true);
  };

  const deleteDiary = () => {
    navigate('/mydiary', { state: '삭제가 완료되었습니다.' });
  };

  const editCancel = () => {
    setIsEditing(false);
  };

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='relative'>
      <DiaryHeader diariesData={diariesData[0]} />
      {isEditing ? (
        <div className='flex justify-around my-[20px]'>
          <button onClick={editCancel} className='text-base'>
            취소
          </button>
          <h1 className='font-bold text-lg'>일기 수정</h1>
          <button onClick={editSuccess} className='text-base text-pastelred'>
            완료
          </button>
        </div>
      ) : (
        <div className='absolute right-[14px] top-[90px] '>
          <Dropdown className='absolute top-[20px] right-[0px]' toggleButton={<RiMoreFill className='fill-gray' />}>
            <div className='text-xs'>
              <div className='hover:bg-lightgray'>
                <button onClick={modalOpen} className='p-[15px] text-pastelred'>
                  삭제
                </button>
              </div>
              <div className='hover:bg-lightgray border-t border-lightgray'>
                <button onClick={editDiary} className='p-[15px]'>
                  수정
                </button>
              </div>
            </div>
          </Dropdown>
          {toast && (
            <Toast
              className='left-[50%] -translate-x-1/2'
              value='수정이 완료되었습니다.'
              valid={true}
              setToast={setToast}
            />
          )}
          <Modal
            isOpen={isModalOpen}
            closeModal={modalClose}
            onClick={deleteDiary}
            purposeMsg='일기 삭제'
            cautionMsg='한번 삭제한 일기는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?'
          />
        </div>
      )}
      <DiaryItem diary={diariesData[Number(id) - 1]} />
    </div>
  );
};

export default MyDiaryDetailPage;
