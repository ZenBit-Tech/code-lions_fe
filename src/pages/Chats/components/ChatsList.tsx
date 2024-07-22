import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Chat } from 'common/types.ts';
import SearchInput from 'src/components/shared/SearchInput';

import ChatDetail from './ChatDetails.tsx';
import { ChatsContainer, ScrollableBox } from './styles.ts';

type Props = {
  chats: Chat[];
};

function ChatsList({ chats }: Props) {
  const methods = useForm();
  const [filteredChats, setFilteredChats] = useState<Chat[]>(chats);

  const handleSearchChange = (value: string): void => {
    if (value.trim()) {
      setFilteredChats(
        chats.filter((chat) =>
          chat.fullName.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredChats(chats);
    }
  };

  return (
    <ChatsContainer>
      <FormProvider {...methods}>
        <SearchInput setSearch={handleSearchChange} />
      </FormProvider>
      <ScrollableBox>
        {filteredChats.map((chat) => (
          <ChatDetail key={chat.id} chat={chat} />
        ))}
      </ScrollableBox>
    </ChatsContainer>
  );
}

export default ChatsList;
