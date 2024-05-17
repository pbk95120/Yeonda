import DiaryItem from '@/components/diaries/DiaryItem';
import DiaryHeader from '@/components/diaries/DiaryHeader';
import Dropdown from '@/components/common/Dropdown';
import useDiaries from '@/hooks/useDiaries';
import { RiMoreFill } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Toast from '@/components/common/Toast';
import Modal from '@/components/common/Modal';
import { useDiaryItemStore } from '@/store/diaryStore';
import { removeDiary } from '@/api/diaries.api';
import type { Diary, DiaryContent } from '@/types/type';

const MyDiaryDetailPage = () => {
  const { diaries, isDiariesLoading, error } = useDiaries();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [toast, setToast] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setIsEditing, isEditing } = useDiaryItemStore();

  const [diary, setDiary] = useState<DiaryContent | null>(null);

  useEffect(() => {
    const diaryItem = diaries.find((item: Diary) => item.id === Number(id));
    if (diaryItem) {
      setDiary(diaryItem);
    }
  }, [diaries, id]);

  const editSuccess = () => {
    setIsEditing(false);
    setToast(true);
  };

  const editDiary = () => {
    setIsEditing(true);
  };

  const deleteDiary = () => {
    removeDiary(String(id));
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

  const handleDiaryChange = (field: string, value: string) => {
    setDiary((prevDiary) => (prevDiary ? { ...prevDiary, [field]: value } : null));
  };

  if (error) return <div>{error}</div>;
  if (isDiariesLoading || !diary) return <div>Loading...</div>;

  return (
    <div className='relative'>
      <DiaryHeader diariesData={diaries[0]} />
      {isEditing ? (
        <div className='my-[20px] flex justify-around'>
          <button onClick={editCancel} className='text-base'>
            취소
          </button>
          <h1 className='text-lg font-bold'>일기 수정</h1>
          <button onClick={editSuccess} className='text-base text-pastelred'>
            완료
          </button>
        </div>
      ) : (
        <div className='absolute right-[14px] top-[90px] '>
          <Dropdown className='absolute right-[0px] top-[20px]' toggleButton={<RiMoreFill className='fill-gray' />}>
            <div className='text-xs'>
              <div className='hover:bg-lightgray'>
                <button onClick={modalOpen} className='p-[15px] text-pastelred'>
                  삭제
                </button>
              </div>
              <div className='border-t border-lightgray hover:bg-lightgray'>
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
      <DiaryItem diary={diary} onDiaryChange={handleDiaryChange} />
    </div>
  );
};

export default MyDiaryDetailPage;
