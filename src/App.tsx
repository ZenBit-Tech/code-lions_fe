import { RouterProvider } from 'react-router-dom';

import useChatSocket from 'src/common/hooks/useChatSocket';
import { useAppSelector } from 'src/redux/hooks';

import ChatContext from './ChatContext';
import router from './routes/routes';
import './App.css';

function App() {
  const { id: myId, accessToken } = useAppSelector((state) => state.user);
  const chatSocket = useChatSocket({ myId, accessToken });

  return (
    <ChatContext.Provider value={chatSocket}>
      <RouterProvider router={router} />
    </ChatContext.Provider>
  );
}

export default App;
