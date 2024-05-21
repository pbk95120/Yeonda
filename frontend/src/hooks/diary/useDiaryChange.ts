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
  let value: string = '';
  let valid: boolean = false;

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
        value = '수정이 완료되었습니다.';
        valid = true;
      } catch (error) {
        console.error('일기 수정 실패:', error);
        value = '수정에 실패했습니다. 다시 시도 해주세요.';
        valid = false;
      }
    }
  }, [diary, diaryId, setIsEditing]);

  return { editSave, editDiary, editCancel, isEditing, setToast, toast, value, valid };
};
