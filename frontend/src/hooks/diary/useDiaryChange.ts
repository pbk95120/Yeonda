import { changeDiary } from '@/api/diaries.api';
import { useDiaryItemStore } from '@/store/diaryStore';
import { Diary } from '@/types/type';
import { useCallback, useState } from 'react';

interface DiaryChangeProps {
  diary: Diary | undefined;
  diaryId: string | undefined;
}

export const useDiaryChange = ({ diary, diaryId }: DiaryChangeProps) => {
  const [toast, setToast] = useState<boolean>(false);
  const { setIsEditing, isEditing } = useDiaryItemStore();

  const editDiary = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const editCancel = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const editSave = useCallback(async () => {
    if (diary && diaryId) {
      try {
        await changeDiary(diaryId, { title: diary.title, content: diary.content });
        setIsEditing(false);
        setToast(true);
      } catch (error) {
        console.error('일기 수정 실패:', error);
      }
    }
  }, [diary, diaryId, setIsEditing]);

  return { editSave, editDiary, editCancel, isEditing, setToast, toast };
};
