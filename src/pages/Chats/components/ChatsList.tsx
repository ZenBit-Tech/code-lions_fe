import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { urls } from 'src/common/constants';
import { ChatWithMainData, UserRole } from 'src/common/types.ts';
import SearchInput from 'src/components/shared/SearchInput';
import { useAppSelector } from 'src/redux/hooks';

import ChatDetail from './ChatDetails.tsx';
import { ChatsContainer, ScrollableBox } from './styles.ts';

type Props = {
  chats: ChatWithMainData[];
};

function ChatsList({ chats }: Props) {
  const methods = useForm();
  const navigate = useNavigate();
  const userRole = useAppSelector((state) => state.user.role);
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

  const redirectTo = (id: string): void => {
    switch (userRole) {
      case UserRole.ADMIN:
        navigate(`${urls.ADMIN_CHATS}/${id}`);
        break;

      case UserRole.VENDOR:
        navigate(`${urls.VENDOR_CHATS}/${id}`);
        break;

      case UserRole.BUYER:
        navigate(`${urls.BUYER_CHATS}/${id}`);
        break;

      default:
        navigate(`${urls.BUYER_CHATS}/${id}`);
        break;
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
            onClick={() => redirectTo(chat.id)}
            key={chat.id}
            chat={chat}
          />
        ))}
      </ScrollableBox>
    </ChatsContainer>
  );
}

export default ChatsList;
