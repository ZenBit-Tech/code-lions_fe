import { Chat, IMessage } from 'common/types.ts';

/** *THIS IS MOCKED DATA. THE REAL DATA WILL BE FETCHED FROM BACKEND API.***/
const chats: Chat[] = [
  {
    id: 1,
    photo: '',
    fullName: 'Djan Askabek',
    lastMessage: 'Hi baby',
    unreadMessages: 4,
    lastMessageDate: new Date(),
  },
  {
    id: 2,
    photo: '',
    fullName: 'Kim Di',
    lastMessage: 'Hi baby',
    unreadMessages: 4,
    lastMessageDate: new Date(),
  },
  {
    id: 3,
    photo: '',
    fullName: 'Ben White',
    lastMessage: 'Hi baby',
    unreadMessages: 4,
    lastMessageDate: new Date(),
  },
  {
    id: 4,
    photo: '',
    fullName: 'Djan Askabek',
    lastMessage: 'Hi baby',
    unreadMessages: 4,
    lastMessageDate: new Date(),
  },
  {
    id: 5,
    photo: '',
    fullName: 'Djan Askabek',
    lastMessage: 'Hi baby',
    unreadMessages: 4,
    lastMessageDate: new Date(),
  },
  {
    id: 6,
    photo: '',
    fullName: 'Djan Askabek',
    lastMessage: 'Hi baby',
    unreadMessages: 4,
    lastMessageDate: new Date(),
  },
];

const messages: IMessage[] = [
  {
    id: 1,
    messageBody:
      'Ever wondered how some graphic designers always manage to produce',
    createdAt: '07:00 PM',
    author: {
      id: 2,
      photo: '',
      firstName: 'Askabek',
      lastName: 'Djanbolotov',
    },
  },
  {
    id: 2,
    messageBody: 'Freelance Design Tricks',
    createdAt: '08:13 PM',
    author: {
      id: 1,
      photo: '',
      firstName: 'Askabek',
      lastName: 'Djanbolotov',
    },
  },
  {
    id: 3,
    messageBody:
      'Successful businesses have many things in common, today we’ll look',
    createdAt: '11:21 AM',
    author: {
      id: 2,
      photo: '',
      firstName: 'Askabek',
      lastName: 'Djanbolotov',
    },
  },
  {
    id: 4,
    messageBody: 'Some graphic designers always manage to produce',
    createdAt: '13:56 AM',
    author: {
      id: 1,
      photo: '',
      firstName: 'Askabek',
      lastName: 'Djanbolotov',
    },
  },
];

export { chats, messages };
