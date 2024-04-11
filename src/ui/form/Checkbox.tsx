"use client"
import { Checkbox as Wrapped, FormControlLabel, CheckboxProps as MuiCheckboxProps } from "@mui/material";
import { Controller } from "react-hook-form";
import { useField } from ".";

export type CheckboxProps = {
  name: string,
  label: string,
  defaultChecked?: boolean,
} & Omit<MuiCheckboxProps,  "label" | "name" | "defaultValue">

export const Checkbox = ({ label, name, defaultChecked = false, disabled, ...rest }: CheckboxProps) => {
  const { control, isSubmitting } = useField();
  return(
    <Controller
      name={name}
      control={control}
      defaultValue={!!defaultChecked}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={<Wrapped onChange={onChange} value={value} disabled={disabled || isSubmitting} {...rest} />}
          label={label}
        />
      )}
    />
  );
}