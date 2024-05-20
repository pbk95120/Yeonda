import { removeDiary } from '@/api/diaries.api';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface DiaryRemoveProps {
  diaryId: string | undefined;
}

export const useDiaryRemove = ({ diaryId }: DiaryRemoveProps) => {
  const navigate = useNavigate();

  const deleteDiary = useCallback(async () => {
    try {
      await removeDiary(String(diaryId));
      navigate('/mydiary', { state: '삭제가 완료되었습니다.' });
    } catch (error) {
      console.error('일기 삭제 실패:', error);
    }
  }, [diaryId, navigate]);

  return { deleteDiary };
};
