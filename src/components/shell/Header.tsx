"use client";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from "react";

type Props = {

}

export const Header = (props: Props) => {
  return (
    <>
      <AdbIcon sx={{ mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        LOGO
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        sx={{ display: { xs: "block", md: "none" }}}
      >
        <Avatar />
      </IconButton>
    </>
  );
}