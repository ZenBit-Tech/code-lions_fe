import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Typography } from '@mui/material';

import Loader from 'src/components/Loader';
import { useGetNotificationsByUserQuery } from 'src/redux/notification/notificationsService';
import { INotification } from 'src/redux/notification/types';
import { selectUserId } from 'src/redux/user/userSlice';

import {
  SectionWrapper,
  Notification,
  NotificationMassage,
  NotificationTitle,
  NotificationHeader,
  NoNotification,
  NotificationText,
} from './styles';

function NotificationsPage() {
  const { t } = useTranslation();
  const id = useSelector(selectUserId);
  const { data: notifications, isLoading } = useGetNotificationsByUserQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  const sortedNotifications = notifications
    ?.slice()
    .sort(
      (a: INotification, b: INotification) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <SectionWrapper>
      <Notification>{t('notifications.notifications')}</Notification>
      {sortedNotifications?.length ? (
        sortedNotifications.map(
          (notification: INotification, index: number) => (
            <NotificationMassage key={index} sx={{ padding: '12px 16px' }}>
              <NotificationHeader>
                <NotificationTitle variant="subtitle1" fontWeight="bold">
                  {notification.type}
                </NotificationTitle>
                <Typography variant="caption">
                  {new Date(notification.createdAt).toLocaleTimeString(
                    'en-US',
                    { hour: '2-digit', minute: '2-digit', hour12: true }
                  )}
                </Typography>
              </NotificationHeader>
              <NotificationText variant="body2">
                <span dangerouslySetInnerHTML={{ __html: notification.text }} />
              </NotificationText>
            </NotificationMassage>
          )
        )
      ) : (
        <NoNotification variant="body2" color="textSecondary">
          {t('notifications.noNotifications')}
        </NoNotification>
      )}
    </SectionWrapper>
  );
}

export default NotificationsPage;
