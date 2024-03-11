"use client";
import { Avatar, Box, Chip, ChipProps, Paper, Stack, SxProps, Theme, Typography } from "@mui/material";
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

export type ProfilePaneProps = {
  avatarUrl?: string,
  avatarCharacters?: string,
  chips?: ({ label: string } & Pick<ChipProps, "color">)[],
  boxSx?: SxProps<Theme>,
} & TitlePaneProps;

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
    <Typography component="h1" variant="h4">{title}</Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ...boxSx }}>
      {children}
    </Box>
  </Paper>
);

export const ProfilePane = ({title, chips, avatarUrl, avatarCharacters, children, sx, elevation=3, boxSx}: ProfilePaneProps) => (
  <Paper elevation={elevation} sx={{ p: 2, ...sx }}>
    <Stack spacing={2} direction={{ md: "column", xs: "row" }} alignItems="center" mb={2}>
      <Avatar
        sx={{
          width: { xs: 50, sm: 100, md: 150 },
          height: { xs: 50, sm: 100, md: 150 }
        }}
        variant="rounded"
        src={avatarUrl}
      >
        {avatarCharacters}
      </Avatar>
      <Typography component="h1" variant="h4">
        {title}
      </Typography>
    </Stack>
    {!!chips?.length && (
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
        {chips && chips.map(chip => (
          <Chip label={chip.label} variant="outlined" color={chip.color} size="small" key={chip.label} />
        ))}
      </Stack>
      )}
    <Box sx={{  display: "flex", flexDirection: "column", gap: 2, ...boxSx }}>
      {children}
    </Box>
  </Paper>
);