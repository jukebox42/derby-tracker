"use client"
import { useState } from "react"
import { Box, FormHelperText, Skeleton, SxProps, Typography } from "@mui/material"
import { Controller } from "react-hook-form";
import 'quill/dist/quill.bubble.css';

import theme from "#/theme";

import { useField } from ".";
import { Editor } from "./Editor";

export type RteProps = {
  label: string,
  name: string,
  defaultValue?: string,
  height?: string,
  required?: boolean,
  disabled?: boolean,
  isLoading?: boolean,
}

// https://jpuri.github.io/react-draft-wysiwyg/#/demo

export const Rte = ({ label, name, defaultValue, required, disabled, isLoading, height = "200px" }: RteProps) => {
  const [isActive, setIsActive] = useState(false);
  const { control, isSubmitting, isLoading: formIsLoading } = useField();

  if (formIsLoading || isLoading) {
    return <Skeleton variant="rounded" sx={{height: `calc(${height} + 42px)`, mt: 1, mb: 2 }} />
  }

  const sx: SxProps = {
    boxSizing: "border-box",
    borderWidth: !isActive ? "1px" : "2px",
    margin: !isActive ? 0 : "-1px",
    borderColor: !isActive ? "rgba(0, 0, 0, 0.23)" : theme.palette.primary.main,
    borderStyle: "solid",
    borderRadius: `${theme.shape.borderRadius}px`,

    ["&:hover"]: {
      borderWidth: !isActive ? "1px" : "2px",
      margin: !isActive ? 0 : "-1px",
      borderColor: !isActive ? theme.palette.common.black : theme.palette.primary.main,
    },
    ["& .ql-toolbar"]: {
      borderTopLeftRadius: `${theme.shape.borderRadius}px`,
      borderTopRightRadius: `${theme.shape.borderRadius}px`,
      background: theme.palette.background.default,
      border: "none",
      borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
    },
    ["& .ql-container"]: {
      background: theme.palette.background.paper,
      border: "none",
      height: height,
      overflowY: "auto",
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Typography variant="body2" mb={.5} color={isActive ? "primary" : undefined}>
        {label} {" "} {required && "*"}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value }, fieldState: { error }, }) => (
          <>
            <Box sx={sx}>
              <Editor
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                onChange={onChange}
                value={value}
                disabled={isSubmitting || disabled}
              />
            </Box>
            <FormHelperText>{error?.message}</FormHelperText>
          </>
        )}
      />
    </Box>
  );
}