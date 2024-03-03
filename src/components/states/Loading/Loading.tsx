"use client"
import { Box, LinearProgress, Toolbar } from "@mui/material";

export const Loading = () => (
  <Box component="main" sx={{ width: 200, mt: 10, mr: "auto", ml: "auto" }}>
    <Toolbar />
    <LinearProgress />
  </Box>
);