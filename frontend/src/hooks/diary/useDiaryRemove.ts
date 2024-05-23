import { removeDiary } from '@/api/diaries.api';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface DiaryRemoveProps {
  diaryId: string | undefined;
  setToast: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
  setValid: Dispatch<SetStateAction<boolean>>;
  modalClose: () => void;
}

export const useDiaryRemove = ({ diaryId, setToast, setValid, setValue, modalClose }: DiaryRemoveProps) => {
  const navigate = useNavigate();

  const deleteDiary = useCallback(async () => {
    try {
      await removeDiary(String(diaryId));
      navigate('/mydiary', { state: '삭제가 완료되었습니다.' });
    } catch (error) {
      console.error('일기 삭제 실패:', error);
      modalClose();
      setToast(true);
      setValue('삭제 실패했습니다. 다시 시도 해주세요.');
      setValid(false);
    }
  }, [diaryId, navigate]);

  return { deleteDiary };
};
