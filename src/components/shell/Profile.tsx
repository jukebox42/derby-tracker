"use client";
import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

type ProfileProps = {
  name: string;
  number: string | null;
}

export const Profile = ({ name, number }: ProfileProps) => (
  <Box sx={{ 
    display: { xs: "none", md: "flex"},
    alignItems: "center",
    gap: 2,
    flexDirection: "column",
    pt: 2,
    pb: 2
  }}>
    <Avatar sx={{ width: 80, height: 80 }} />
    <Typography variant="h6" align="center">
      {name}
      {number && <Typography variant="subtitle2">#{number}</Typography>}
    </Typography>
  </Box>
);