"use client"
import { Rating as Wrapped, FormControlLabel, FormHelperText, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";
import { useField } from ".";

export type RatingProps = {
  name: string,
  label: string,
  defaultValue?: string,
  disabled?: boolean,
};

export const Rating = ({ label, name, defaultValue, disabled }: RatingProps) => {
  const { control, isSubmitting } = useField();
  return (
    <Controller
      key={`${name}-${defaultValue}`}
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




