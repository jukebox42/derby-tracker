"use client";
import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import React, { ReactNode } from "react";

export type PaneProps = {
  children: ReactNode | ReactNode[],
  elevation?: number,
  sx?: SxProps<Theme>,
}

export type TitlePaneProps = {
  title: String,
  boxSx?: SxProps<Theme>,
} & PaneProps;

export const Pane = ({children, sx, elevation=3}: PaneProps) => (
  <Paper
    elevation={elevation}
    sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, ...sx }}
  >
    {children}
  </Paper>
);

export const TitlePane = ({title, children, sx, elevation=3, boxSx}: TitlePaneProps) => (
  <Paper elevation={elevation} sx={{ p: 2, ...sx }}>
    <Typography variant="h6">{title}</Typography>
    <Box sx={{  display: "flex", flexDirection: "column", gap: 2, ...boxSx }}>
      {children}
    </Box>
  </Paper>
);