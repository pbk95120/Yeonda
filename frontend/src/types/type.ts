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
  message: string;
  sendAt: string;
  showDate: boolean;
}

export interface ChatListProps {
  nickName: string;
  message: string;
  pendingRead: number;
}

export interface ChatProfileProps {
  profileImage: string;
  nickName: string;
}
