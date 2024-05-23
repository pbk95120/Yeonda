import { changeDiary } from '@/api/diaries.api';
import { useDiaryItemStore } from '@/store/diaryStore';
import { Diary } from '@/types/type';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface DiaryChangeProps {
  diary: Diary | undefined;
  diaryId: string | undefined;
  setToast: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
  setValid: Dispatch<SetStateAction<boolean>>;
}

export const useDiaryChange = ({ diary, diaryId, setToast, setValid, setValue }: DiaryChangeProps) => {
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
        await changeDiary(diaryId, { title: diary.title, content: diary.content, tags: diary.tags });
        setIsEditing(false);
        setToast(true);
        setValue('수정이 완료되었습니다.');
        setValid(true);
      } catch (error) {
        console.error('일기 수정 실패:', error);
        setIsEditing(false);
        setToast(true);
        setValue('수정 실패했습니다. 다시 시도 해주세요.');
        setValid(false);
      }
    }
  }, [diary, diaryId, setIsEditing]);

  return { editSave, editDiary, editCancel, isEditing, setToast };
};
