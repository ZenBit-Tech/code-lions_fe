import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from 'src/redux/hooks';
import { setNotification } from 'src/redux/notification/notificationsSlice';
import { INotification } from 'src/redux/notification/types';

const useNotificationSocket = () => {
  const { id: myId, accessToken } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const socketRef = useRef<Socket<DefaultEventsMap>>();
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`, {
      auth: { token: accessToken },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('getNotifications', { userId: myId });
    });

    socket.on('userNotifications', (data: INotification[]) => {
      setNotifications(data);
    });

    socket.on('newNotification', (notification: INotification) => {
      setNotifications((prevNotifications) => {
        const exists = prevNotifications.find(
          (notif) => notif.id === notification.id
        );

        if (!exists) {
          return [...prevNotifications, notification];
        }

        return prevNotifications;
      });
      dispatch(setNotification(notification));
    });

    return () => {
      socket.off('userNotifications');
      socket.off('newNotification');
      socket.disconnect();
    };
  }, [myId, accessToken, dispatch]);

  return {
    notifications,
  };
};

export default useNotificationSocket;
