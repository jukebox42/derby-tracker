"use client"
import { TextField as Wrapped, TextFieldProps as MuiTextFieldProps, Skeleton, } from "@mui/material";
import { Controller } from "react-hook-form";
import { useField } from ".";

export type TextFieldProps = {
  name: string,
  label: string,
  defaultValue?: string | null,
  isLoading?: boolean,
} & Omit<MuiTextFieldProps, "label" | "name" | "defaultValue" | "onChange" | "helperText" | "error">

export const TextField = (props: TextFieldProps) => {
  const { name, label, defaultValue = "", children, disabled, isLoading, ...rest} = props;
  const { control, isSubmitting, isLoading: formIsLoading } = useField();

  if (formIsLoading || isLoading) {
    return <Skeleton variant="rounded" sx={{height: "54px", mt: 1, mb: 2 }} />
  }

  return (
    <Controller
      key={`${name}-${defaultValue}`}
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