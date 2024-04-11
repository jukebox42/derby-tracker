"use client"
import { Switch as Wrapped, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { useField } from ".";

export type SwitchProps = {
  name: string,
  label: string,
  defaultChecked?: boolean,
  disabled?: boolean,
};

export const Switch = ({ label, name, disabled, defaultChecked = false }: SwitchProps) => {
  const { control, isSubmitting } = useField();
  return (
    <Controller
      key={`${name}-${defaultChecked.toString()}`}
      name={name}
      control={control}
      defaultValue={!!defaultChecked}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={<Wrapped onChange={onChange} value={value} disabled={isSubmitting || disabled} />}
          label={label}
        />
      )}
    />
  );
}