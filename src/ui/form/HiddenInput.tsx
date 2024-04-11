"use client"
import { Controller } from "react-hook-form";
import { useField } from ".";

export type HiddenInputProps = {
  name: string,
  defaultValue: string,
}

export const HiddenInput = (props: HiddenInputProps) => {
  const { name, defaultValue } = props;
  const { control } = useField();

  return (
    <Controller
      key={`${name}-${defaultValue}`}
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, }) => (
        <input name="name" type="hidden" onChange={onChange} value={value} />
      )}
    />
  );
}