import * as React from 'react';
import {
  Input as BaseInput,
  InputInputSlotPropsOverrides,
} from '@mui/base/Input';
import { Box } from '@mui/system';
import StyledOtpInput from 'src/components/shared/OTPInput/StyledOtpInput';
import useOtpFunctions from './OTPhook';

interface IOTPProps {
  separator: React.ReactNode;
  length: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isError: boolean;
}

interface IInputSlotPropsOverrides extends InputInputSlotPropsOverrides {
  error: boolean;
}

function OTP({ separator, length, value, onChange, isError }: IOTPProps) {
  const { inputRefs, handleKeyDown, handleChange, handleClick, handlePaste } =
    useOtpFunctions({ length, onChange, value });

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: StyledOtpInput,
            }}
            slotProps={{
              input: {
                ref: (ele: HTMLInputElement | null) => {
                  inputRefs.current[index] = ele!;
                },
                onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(event, index),
                onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event, index),
                onClick: (event: React.MouseEvent<HTMLInputElement>) =>
                  handleClick(event, index),
                onPaste: (event: React.ClipboardEvent<HTMLInputElement>) =>
                  handlePaste(event, index),
                value: value[index] ?? '',
                error: isError,
              } as IInputSlotPropsOverrides,
            }}
          />

          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default OTP;
