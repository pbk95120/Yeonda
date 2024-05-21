import DiaryItem from '@/components/diaries/DiaryItem';
import DiaryHeader from '@/components/diaries/DiaryHeader';
import Dropdown from '@/components/common/Dropdown';
import { RiMoreFill } from 'react-icons/ri';
import { useState, useCallback } from 'react';
import Toast from '@/components/common/Toast';
import Modal from '@/components/common/Modal';
import { useDiary } from '@/hooks/diary/useDiary';
import { useDiaryChange } from '@/hooks/diary/useDiaryChange';
import { useDiaryRemove } from '@/hooks/diary/useDiaryRemove';
import LoadingIndicator from '@/components/common/LoadingIndicator';

const MyDiaryDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { diary, diaryId, handleDiaryChange, isLoading } = useDiary();

  const { editSave, editDiary, editCancel, isEditing, toast, setToast } = useDiaryChange({ diary, diaryId });

  const { deleteDiary } = useDiaryRemove({ diaryId });

  const modalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const modalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className='relative'>
      {isLoading && <LoadingIndicator />}
      {diary && <DiaryHeader diariesData={diary} />}
      {isEditing ? (
        <div className='my-[20px] flex justify-around'>
          <button onClick={editCancel} className='text-base'>
            취소
          </button>
          <h1 className='text-lg font-bold'>일기 수정</h1>
          <button onClick={editSave} className='text-base text-pastelred'>
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
      {diary && <DiaryItem diary={diary} onDiaryChange={handleDiaryChange} />}
    </div>
  );
};

export default MyDiaryDetailPage;
