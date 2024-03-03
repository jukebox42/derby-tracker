"use client"
import { Rating as Wrapped, FormControlLabel, FormHelperText, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";
import { useField } from "..";

type Props = {
  name: string,
  label: string,
  defaultValue?: string,
  disabled?: boolean,
};

export const Rating = ({ label, name, defaultValue, disabled }: Props) => {
  const { control, isSubmitting } = useField();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error }, }) => (
        <FormControl error={!!error}>
          <FormControlLabel
              control={(
                <Wrapped
                  name="simple-controlled"
                  value={value}
                  onChange={onChange}
                  disabled={disabled || isSubmitting}
                />
              )}
              label={label}
            />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}




