"use client"
import { FormControl, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePickerProps, DatePicker as Wrapped } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { useField } from '.';

type Props = {
  name: string,
  label: string,
  defaultValue?: Date,
} & Omit<DatePickerProps<Date>,  "label" | "name" | "defaultValue" | "onChange">

export const DatePicker = ({ name, label, defaultValue, disabled, ...rest }: Props) => {
  const { control, isSubmitting } = useField();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState: { error }, }) => (
          <FormControl error={!!error}>
            <Wrapped label={label} value={value} onChange={onChange} disabled={isSubmitting || disabled} {...rest} />
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </LocalizationProvider>
  );
}