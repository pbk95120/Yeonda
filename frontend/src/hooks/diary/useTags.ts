import { fetchTag } from '@/api/diaries.api';
import { Tag } from '@/types/type';
import { useEffect, useState } from 'react';

export const useTags = (tags: Tag[]) => {
  const [tagsData, setTagsData] = useState<Tag[]>([]);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const fetchedTags = await fetchTag();
        setTagsData(fetchedTags);
      } catch (error) {
        console.error('태그 가져오기 실패:', error);
      }
    };

    loadTags();
  }, []);

  const tagNames = tags.map((tagId) => tagsData.find((tag) => tag.id == tagId.id)?.name);

  return { tagNames };
};
