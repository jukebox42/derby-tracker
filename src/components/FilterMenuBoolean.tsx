import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Chip } from "@mui/material";

export type FilterMenuBooleanProps = {
  label: string,
  defaultValue?: boolean,
  onChange: (value: boolean | undefined) => void,
};

export const FilterMenuBoolean = ({ label, onChange, defaultValue }: FilterMenuBooleanProps) => {
  const [value, setValue] = useState<boolean | undefined>(defaultValue);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (value: boolean | undefined) => {
    setValue(value);
    handleClose();
    return onChange(value);
  }

  let displayValue = "All";
  if (value === false) {
    displayValue = "No";
  } else if (value === true) {
    displayValue = "Yes";
  }

  return (
    <>
      <Chip
        onClick={handleClick}
        variant="outlined"
        label={<><strong>{label}:</strong> {displayValue}</>}
        color={value ? "primary" : undefined}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect(undefined)}>All</MenuItem>
        <MenuItem onClick={() => handleSelect(true)}>Yes</MenuItem>
        <MenuItem onClick={() => handleSelect(false)}>No</MenuItem>
      </Menu>
    </>
  );
}