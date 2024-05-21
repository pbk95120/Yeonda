// Chat ================================================
export interface ChatMessage {
  user_id: number;
  message: string;
  picture_url: string;
  send_at: string;
  is_read: number;
}

export interface ChatMessageGetProps {
  partner_id: number;
  nickname: string;
  picture_url: string;
  user_id: number;
  chat: ChatMessage[];
}

export interface ChatMessageWithDate extends ChatMessageGetProps {
  showDate: boolean;
}

export interface ChatMessageProps {
  id: number;
  message: string;
  sendAt: string;
  pictureUrl: string;
  showDate?: boolean;
}

export interface ChatListProps {
  commu_streak?: number;
  couple_id: number;
  is_read: number;
  message: string;
  nickname: string;
  picture_url: string;
  user2_id: number;
  user1_id: number;
  email: string;
}

export interface ChatProfileProps {
  profileImage: string;
  nickName: string;
}

// Diary ================================================

export interface Diary {
  id: number;
  nickname: string;
  picture_url: string;
  title: string;
  content: string;
  tags: number[];
  created_at: string;
  likes: number;
}

export interface FetchDiariesParams {
  currentPage: number;
  limit: number;
  sort: number;
}

export interface Tag {
  id: number;
  name: string;
}

export type DiaryHeader = Pick<Diary, 'nickname' | 'picture_url'>;

export type DiaryContent = Omit<Diary, 'nickname' | 'picture_url'>;

export type DiaryChange = Pick<Diary, 'title' | 'content'>;
