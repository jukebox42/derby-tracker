"use client"
import { Controller } from "react-hook-form";
import { useField } from "..";

type Props = {
  name: string,
  defaultValue: string,
}

export const TextField = (props: Props) => {
  const { name, defaultValue } = props;
  const { control } = useField();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, }) => (
        <input name="name" type="hidden" onChange={onChange} value={value} />
      )}
    />
  );
}