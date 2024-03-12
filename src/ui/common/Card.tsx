"use client"
import { ReactNode } from "react";
import { Paper, SxProps, Theme } from "@mui/material";

export type CardProps = {
  children: ReactNode | ReactNode[],
  elevation?: number,
  sx?: SxProps<Theme>,
}

export const Card = ({children, sx, elevation=3}: CardProps) => (
  <Paper
    elevation={elevation}
    sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2, ...sx }}
  >
    {children}
  </Paper>
);