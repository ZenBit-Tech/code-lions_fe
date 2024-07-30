import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Chat } from 'common/types';
import useChatSocket from 'src/common/hooks/useChatSocket';
import Loader from 'src/components/Loader';
import {
  useGetChatByIdQuery,
  useGetChatsQuery,
} from 'src/redux/chat/chatService';
import { useAppSelector } from 'src/redux/hooks';

import ChatMessages from '../Chats/components/ChatMessages';

import { SectionWrapper, TextWrapper } from './styles.ts';

function SupportPage() {
  const { t } = useTranslation();
  const { chatId } = useParams();
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();
  const { chats } = useAppSelector((state) => state.chat);
  const { id: myId, accessToken } = useAppSelector((state) => state.user);
  const { isLoading } = useGetChatsQuery();
  const { isLoading: isLoadingSelectedChat } = useGetChatByIdQuery(chatId);

  const socket = useChatSocket({
    myId,
    accessToken,
    chatId,
  });

  useEffect(() => {
    if (chatId && chats) {
      const chat = chats.find((chatElement: Chat) => chatElement.id === chatId);

      setSelectedChat(chat);
    }
  }, [chatId, chats]);

  if (isLoading || isLoadingSelectedChat) return <Loader />;

  return (
    <SectionWrapper>
      {selectedChat ? (
        <ChatMessages chat={selectedChat} socket={socket} />
      ) : (
        <TextWrapper>{t('chat.selectChat')}</TextWrapper>
      )}
    </SectionWrapper>
  );
}

export default SupportPage;
