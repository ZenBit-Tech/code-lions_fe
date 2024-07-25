import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { ChatWithMainData } from 'common/types.ts';
import { urls } from 'src/common/constants';
import SearchInput from 'src/components/shared/SearchInput';

import ChatDetail from './ChatDetails.tsx';
import { ChatsContainer, ScrollableBox } from './styles.ts';

type Props = {
  chats: ChatWithMainData[];
};

function ChatsList({ chats }: Props) {
  const methods = useForm();
  const navigate = useNavigate();
  const [filteredChats, setFilteredChats] = useState<ChatWithMainData[]>(chats);

  const handleSearchChange = (value: string): void => {
    if (value.trim()) {
      setFilteredChats(
        chats.filter((chat) =>
          chat.chatPartner.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredChats(chats);
    }
  };

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  return (
    <ChatsContainer>
      <FormProvider {...methods}>
        <SearchInput setSearch={handleSearchChange} />
      </FormProvider>
      <ScrollableBox>
        {filteredChats?.map((chat) => (
          <ChatDetail
            onClick={() => navigate(`${urls.VENDOR_CHATS}/${chat.id}`)}
            key={chat.id}
            chat={chat}
          />
        ))}
      </ScrollableBox>
    </ChatsContainer>
  );
}

export default ChatsList;
