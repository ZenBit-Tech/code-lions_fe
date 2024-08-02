import { ChangeEvent, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';

import SendMessageIcon from 'src/assets/icons/SendMessage.svg';
import UploadFileIcon from 'src/assets/icons/UploadFileIcon.svg';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useUploadFileMutation } from 'src/redux/chat/chatService';

type Props = {
  chatId: string;
  inputValue: string;
  setTyping: (value: string) => void;
  send: (message: string) => void;
};

function MessageInput({ chatId, inputValue, setTyping, send }: Props) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const loadingSize = 24;
  const [uploadFile, { isLoading, error }] = useUploadFileMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();

      formData.append('file', file);
      uploadFile({ id: chatId, file: formData });
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (error) {
      showToast('error', t('chat.cantSend'));
    }
  }, [error]);

  return (
    <TextField
      value={inputValue}
      onChange={(e) => setTyping(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          send(inputValue);
        }
      }}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <input
              accept=".jpg,.jpeg,.png"
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <IconButton onClick={handleFileUploadClick} edge="start">
              <UploadFileIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => send(inputValue)} edge="end">
              {isLoading ? (
                <CircularProgress size={loadingSize} />
              ) : (
                <SendMessageIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default MessageInput;
