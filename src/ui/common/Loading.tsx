"use client"
import { Box, LinearProgress, Toolbar } from "@mui/material";

export const Loading = ({ simple }: { simple?: boolean }) => (
  <Box component="main" sx={{ width: 200, mt: 10, mb: 10, mr: "auto", ml: "auto" }}>
    {!simple && <Toolbar />}
    <LinearProgress />
  </Box>
);