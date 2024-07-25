import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Chat } from 'common/types';
import Loader from 'src/components/Loader';
import {
  useGetChatByIdQuery,
  useGetChatsQuery,
} from 'src/redux/chat/chatService';
import { useAppSelector } from 'src/redux/hooks';

import AdminSectionTitle from '../admin/AdminSectionTitle';

import ChatMessages from './components/ChatMessages';
import ChatsList from './components/ChatsList';
import SectionWrapper from './styles.ts';

function ChatsPage() {
  const { t } = useTranslation();
  const { chatId } = useParams();
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();
  const { chats, chatsWithMainData } = useAppSelector((state) => state.chat);
  const { isLoading } = useGetChatsQuery();
  const { isLoading: isLoadingSelectedChat } = useGetChatByIdQuery(chatId);

  useEffect(() => {
    if (chatId && chats) {
      const chat = chats.find((chatElement) => chatElement.id === chatId);

      setSelectedChat(chat);
    }
  }, [chatId, chats]);

  if (isLoading || isLoadingSelectedChat) return <Loader />;

  return (
    <>
      <AdminSectionTitle title={t('sidebar.chats')} fontWeight={600} />
      <SectionWrapper>
        <ChatsList chats={chatsWithMainData} />
        {selectedChat && <ChatMessages chat={selectedChat} />}
      </SectionWrapper>
    </>
  );
}

export default ChatsPage;
