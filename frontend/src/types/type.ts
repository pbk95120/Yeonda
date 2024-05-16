// Chat ================================================
export interface ChatMessageGetProps {
  id: number;
  nickname: string;
  message: string;
  send_at: string;
}

export interface ChatMessageWithDate extends ChatMessageGetProps {
  showDate: boolean;
}

export interface ChatMessageProps {
  id: number;
  message: string;
  sendAt: string;
  showDate: boolean;
}

export interface ChatListProps {
  commu_streak?: number;
  couple_id: number;
  is_read: number;
  message: string;
  nickname: string;
  picture_url: string;
  user2_id: number;
  user_id: number;
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
  tags: string[];
  created_at: string;
  likes: number;
}

export type DiaryHeader = Pick<Diary, 'nickname' | 'picture_url'>;

export type DiaryContent = Omit<Diary, 'nickname' | 'picture_url'>;
