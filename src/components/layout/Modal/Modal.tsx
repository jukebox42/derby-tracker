"use client";
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from "@mui/material";

export type ModalProps = {
  isOpen: boolean,
  title: React.ReactNode,
  actions: React.ReactNode | React.ReactNode[],
  children: React.ReactNode,
  onClose: () => void,
}

export const Modal = ({ title, actions, isOpen = false, children, onClose }: ModalProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle variant="h4" sx={{ p: 3, pb: 1 }}>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        {actions}
      </DialogActions>
    </Dialog>
  );
}