"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import RollerSkatingIcon from "@mui/icons-material/RollerSkating";

export const Header = () => {
  return (
    <>
      <RollerSkatingIcon sx={{ mr: 1 }} />
      <Typography
        variant="h3"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        NHRD
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      {/* TODO: we could put stuff here if we wanted it in the header */}
    </>
  );
}