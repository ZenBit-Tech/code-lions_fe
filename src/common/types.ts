import { rootReducer } from 'src/redux/store';

type IMessage = {
  id?: string;
  content: string;
  contentType: ContentType;
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

type ChatPartnerWithStatus = {
  id: string;
  name: string;
  photoUrl: string;
  isOnline: boolean;
  lastActiveAt: string;
};

type ChatWithMainData = {
  id: string;
  chatPartner: ChatPartnerWithStatus;
  unreadMessageCount: number;
  lastMessage: IMessage;
};

type CreateChat = {
  chatPartnerId: string;
  content?: string;
};

export enum UserRole {
  BUYER = 'buyer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  LINK = 'link',
}

type UploadFile = {
  id: string;
  file: FormData;
};

type RootState = ReturnType<typeof rootReducer>;

export type {
  IMessage,
  Chat,
  ChatPartner,
  ChatWithMainData,
  ChatPartnerWithStatus,
  CreateChat,
  UploadFile,
  RootState,
};
