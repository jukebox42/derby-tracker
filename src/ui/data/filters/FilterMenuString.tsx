import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Chip } from "@mui/material";

export type FilterMenuStringProps = {
  label: string,
  options: {[key: string]: string},
  defaultValue?: string,
  onChange: (value: string | undefined) => void,
};

export const FilterMenuString = ({ label, onChange, options, defaultValue }: FilterMenuStringProps) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (value: string | undefined) => {
    setValue(value);
    handleClose();
    return onChange(value);
  }

  const allLabel = "All";

  return (
    <>
      <Chip
        onClick={handleClick}
        variant="outlined"
        label={<><strong>{label}:</strong> {value === undefined ? allLabel : options[value]}</>}
        color={value ? "primary" : undefined}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect(undefined)}>{allLabel}</MenuItem>
        {Object.keys(options).map(key => (
          <MenuItem key={key} onClick={() => handleSelect(key)}>{options[key]}</MenuItem>
        ))}
      </Menu>
    </>
  );
}