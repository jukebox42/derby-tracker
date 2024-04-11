"use client"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { MenuItem } from "@mui/material";

import { Autocomplete, AutocompleteProps, Checkbox, CheckboxProps, DatePicker, DatePickerProps, HiddenInput, HiddenInputProps, Rating, RatingProps, Rte, RteProps, Switch, SwitchProps, TextField, TextFieldProps } from "."

// TODO: you can do better than this.


type FieldGridFieldBase = {
  variant?: "Autocomplete" | "Checkbox" | "DatePicker" | "HiddenInput" | "Rating" | "Rte" | "Switch" | "TextField",
  wide?: boolean,
}

export type FieldGridField = (
  { variant: "Autocomplete", props: AutocompleteProps } & FieldGridFieldBase
) | (
  { variant: "Checkbox", props: CheckboxProps } & FieldGridFieldBase
) | (
  { variant: "DatePicker", props: DatePickerProps } & FieldGridFieldBase
) | (
  { variant: "HiddenInput", props: HiddenInputProps } & FieldGridFieldBase
) | (
  { variant: "Rating", props: RatingProps } & FieldGridFieldBase
) | (
  { variant: "Rte", props: RteProps } & FieldGridFieldBase
) | (
  { variant: "Switch", props: SwitchProps } & FieldGridFieldBase
) | (
  { variant?: "TextField", options?: {[key: string]: string}, props: TextFieldProps } & FieldGridFieldBase
);

export const FieldGrid = ({ fields }: { fields: FieldGridField[] }) => {
  const getField = (props: FieldGridField) => {
    switch(props.variant) {
      case "Autocomplete":
        return <Autocomplete {...props.props} />;
      case "Checkbox":
        return <Checkbox {...props.props} />;
      case "DatePicker":
        return <DatePicker {...props.props} />;
      case "HiddenInput":
        return <HiddenInput {...props.props} />;
      case "Rating":
        return <Rating {...props.props} />;
      case "Rte":
        return <Rte {...props.props} />;
      case "Switch":
        return <Switch {...props.props} />;
      case "TextField":
      default:
        return (
          <TextField select={!!props.options} {...props.props}>
            {props.options && Object.keys(props.options).map((l: string) => (
              <MenuItem key={l} value={l}>{props.options?.[l]}</MenuItem>
            ))}
          </TextField>
        );
    }
  };

  return (
    <Grid container spacing={2}>
      {fields.map(f => (
        <Grid sm={12} md={f.wide ? 12 : 6} key={f.props.name}>
          {getField(f)}
        </Grid>
      ))}
    </Grid>
  );
}