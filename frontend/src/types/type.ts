export interface Diary {
  id: number;
  nickname: string;
  picture_url: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  likes: number;
}
