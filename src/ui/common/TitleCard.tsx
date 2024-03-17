"use client";
import React from "react";
import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import { CardProps } from ".";

export type TitleCardProps = {
  title: String,
  action?: React.ReactNode,
  boxSx?: SxProps<Theme>,
} & CardProps;

export const TitleCard = ({title, action, children, sx, elevation=3, boxSx}: TitleCardProps) => (
  <Paper elevation={elevation} sx={{ p: 2, ...sx }}>
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
      <Typography flexGrow={1} component="h1" variant="h4">{title}</Typography>
      {action}
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, ...boxSx }}>
      {children}
    </Box>
  </Paper>
);