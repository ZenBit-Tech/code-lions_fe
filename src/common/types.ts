type IMessage = {
  id?: number;
  messageBody: string;
  createdAt: string;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    photo: string;
  };
};

type Chat = {
  id: number;
  photo: string;
  fullName: string;
  lastMessage: string;
  unreadMessages: number;
  lastMessageDate: Date;
};

export type { IMessage, Chat };
