import { useTranslation } from 'react-i18next';

import AdminSectionTitle from '../admin/AdminSectionTitle';

import ChatMessages from './components/ChatMessages';
import ChatsList from './components/ChatsList';
import { chats, messages } from './mocks.ts';
import SectionWrapper from './styles.ts';

function ChatsPage() {
  const { t } = useTranslation();

  return (
    <>
      <AdminSectionTitle title={t('sidebar.chats')} fontWeight={600} />
      <SectionWrapper>
        <ChatsList chats={chats} />
        <ChatMessages messages={messages} />
      </SectionWrapper>
    </>
  );
}

export default ChatsPage;
