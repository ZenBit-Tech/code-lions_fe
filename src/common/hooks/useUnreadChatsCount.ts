import { useMemo } from 'react';

import { useAppSelector } from 'src/redux/hooks';

const useUnreadChatsCount = () => {
  const chatsWithMainData = useAppSelector(
    (state) => state.chat.chatsWithMainData
  );

  const noMessageCount = 0;
  const incrementMessageCount = 1;

  const unreadChatsCount = useMemo(() => {
    return chatsWithMainData.reduce((count, chat) => {
      return chat.unreadMessageCount > noMessageCount
        ? count + incrementMessageCount
        : count;
    }, noMessageCount);
  }, [chatsWithMainData]);

  return unreadChatsCount;
};

export default useUnreadChatsCount;
