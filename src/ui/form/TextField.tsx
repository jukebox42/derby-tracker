"use client"
import { TextField as Wrapped, TextFieldProps, } from "@mui/material";
import { Controller } from "react-hook-form";
import { useField } from ".";

type Props = {
  name: string,
  label: string,
  defaultValue?: string,
} & Omit<TextFieldProps, "label" | "name" | "defaultValue" | "onChange" | "helperText" | "error">

export const TextField = (props: Props) => {
  const { name, label, defaultValue = "", children, disabled, ...rest} = props;
  const { control, isSubmitting } = useField();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error }, }) => (
        <Wrapped
          margin="normal"
          fullWidth
          {...rest}
          label={label}
          error={!!error}
          helperText={error?.message}
          value={value}
          onChange={onChange}
          disabled={disabled || isSubmitting}
        >
          {children}
        </Wrapped>
      )}
    />
  );
}