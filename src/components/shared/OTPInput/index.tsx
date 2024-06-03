import * as React from 'react';
import { Box } from '@mui/system';
import OTP from './OTP';

interface IOTPInputProps {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  isError: boolean;
}

function OTPInput({ otp, setOtp, isError }: IOTPInputProps) {
  return (
    <Box display="flex" sx={{ marginTop: '8px' }}>
      <OTP
        separator={<span> </span>}
        value={otp}
        onChange={setOtp}
        length={6}
        isError={isError}
      />
    </Box>
  );
}

export default OTPInput;
