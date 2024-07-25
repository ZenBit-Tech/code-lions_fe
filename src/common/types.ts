import { rootReducer } from 'src/redux/store';

type IMessage = {
  id?: string;
  content: string;
  createdAt: string;
  sender: ChatPartner;
};

type Chat = {
  id: string;
  chatPartner: ChatPartner;
  messages: IMessage[];
};

type ChatPartner = {
  id: string;
  name: string;
  photoUrl: string;
};

type ChatWithMainData = {
  id: string;
  chatPartner: ChatPartner;
  unreadMessageCount: number;
  lastMessage: IMessage;
};

type RootState = ReturnType<typeof rootReducer>;

export type { IMessage, Chat, ChatPartner, ChatWithMainData, RootState };
