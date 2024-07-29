import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Chat } from 'common/types';
import Loader from 'src/components/Loader';
import useChatSocket from 'src/pages/Chats/components/useChatSocket';
import {
  useGetChatByIdQuery,
  useGetChatsQuery,
} from 'src/redux/chat/chatService';
import { useAppSelector } from 'src/redux/hooks';

import AdminSectionTitle from '../admin/AdminSectionTitle';

import ChatMessages from './components/ChatMessages';
import ChatsList from './components/ChatsList';
import { SectionWrapper, TextWrapper } from './styles.ts';

function ChatsPage() {
  const { t } = useTranslation();
  const { chatId } = useParams();
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();
  const { chats, chatsWithMainData } = useAppSelector((state) => state.chat);
  const { id: myId, accessToken } = useAppSelector((state) => state.user);
  const { isLoading } = useGetChatsQuery();
  const { isLoading: isLoadingSelectedChat } = useGetChatByIdQuery(chatId);

  useChatSocket({ myId, accessToken });

  const renderMessages = () => {
    if (selectedChat) {
      return <ChatMessages chat={selectedChat} />;
    }

    return <TextWrapper>{t('chat.selectChat')}</TextWrapper>;
  };

  useEffect(() => {
    if (chatId && chats) {
      const chat = chats.find((chatElement) => chatElement.id === chatId);

      setSelectedChat(chat);
    }
  }, [chatId, chats, renderMessages]);

  if (isLoading || isLoadingSelectedChat) return <Loader />;

  return (
    <>
      <AdminSectionTitle title={t('sidebar.chats')} fontWeight={600} />
      <SectionWrapper>
        {chatsWithMainData.length ? (
          <>
            <ChatsList chats={chatsWithMainData} />
            {renderMessages()}
          </>
        ) : (
          <TextWrapper>{t('chat.dontHaveAnyChats')}</TextWrapper>
        )}
      </SectionWrapper>
    </>
  );
}

export default ChatsPage;
