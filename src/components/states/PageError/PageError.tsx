"use client"
import React from "react";
import { Box, Toolbar } from "@mui/material";

export const PageError = ({ children }: { children: React.ReactNode }) => (
  <Box component="main" sx={{ width: 400, mt: 10, mr: "auto", ml: "auto" }}>
    <Toolbar />
    {children}
  </Box>
)