"use client";
import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import { CardProps } from ".";

export type TitleCardProps = {
  title: String,
  boxSx?: SxProps<Theme>,
} & CardProps;

export const TitleCard = ({title, children, sx, elevation=3, boxSx}: TitleCardProps) => (
  <Paper elevation={elevation} sx={{ p: 2, ...sx }}>
    <Typography component="h1" variant="h4">{title}</Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ...boxSx }}>
      {children}
    </Box>
  </Paper>
);