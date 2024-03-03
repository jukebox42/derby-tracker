"use client";
import React from "react";
import { Box, Drawer } from "@mui/material";

export type PanelProps = {
  isOpen: boolean
  children: React.ReactNode,
  onClose: () => void,
}

export const Panel = ({ isOpen = false, children, onClose }: PanelProps) => (
  <Drawer
    open={isOpen}
    onClose={onClose}
    anchor="right"
  >
    <Box width={400} p={3}>
    {children}
    </Box>
  </Drawer>
);