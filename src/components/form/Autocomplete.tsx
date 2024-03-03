"use client"
import { Autocomplete as Wrapped, TextField, Chip } from "@mui/material";
import { Controller } from "react-hook-form";
import { useField } from "..";

type Props = {
  name: string,
  label: string,
  required?: boolean,
  options: string[],
  defaultValue?: string[],
  getOptionLabel?: (option: string) => string,
  disabled?: boolean,
};

export const Autocomplete = (props: Props) => {
  const { label, name, required, defaultValue = "", options, getOptionLabel, disabled } = props;
  const { control, isSubmitting } = useField();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? []}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Wrapped
          {...field}
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={(option, value) => option === value}
          multiple
          fullWidth
          disableClearable
          filterSelectedOptions
          disableCloseOnSelect
          onChange={(_, value) => field.onChange(value)}
          disabled={disabled || isSubmitting}
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
              <Chip {...getTagProps({ index })} key={option} label={getOptionLabel?.(option) || option} />
            ))
          }}
          renderInput={params => (
            <TextField
              label={label}
              required={required}
              margin="normal"
              type="search"
              error={!!error}
              inputRef={ref}
              helperText={error?.message}
              {...params}
            />
          )}
        />
      )}
    />
  );
};