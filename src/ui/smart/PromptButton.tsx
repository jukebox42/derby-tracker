"use client"
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


import { PermissionButton, PermissionButtonProps } from ".";
import { LoadingButton } from "@mui/lab";
import { ErrorText } from "#/ui/form";

// TODO: add a finally function so we can handle api calls in here?

export type PromptButtonProps = {
  promptTitle?: string,
  promptMessage?: React.ReactNode,
  agreeText?: string,
  declineText?: string,
  /**
   * Pass in an async function to make sure it waits during submission.
   * throw an error and it will display as an inline error in the modal.
   */
  onClick?: () => Promise<void>,
} & PermissionButtonProps;

export const PromptButton = ({
  promptTitle = "Are you sure?",
  promptMessage,
  agreeText = "Yes",
  declineText = "No",
  onClick,
  // button props
  variant = "outlined",
  children,
  ...buttonProps
}: PromptButtonProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setError("");
    setOpen(false);
  }
  const handleOpen = () => setOpen(true);
  const handleCommit = async () => {
    setIsSubmitting(true);
    try {
      await onClick?.();
      handleClose();
    } catch (e) {
      setError(e + "");
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{promptTitle}</DialogTitle>
        <DialogContent>
        {promptMessage && <DialogContentText>{promptMessage}</DialogContentText>}
        <ErrorText text={error} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{declineText}</Button>
          <LoadingButton variant="contained" loading={isSubmitting} onClick={handleCommit}>
            {agreeText}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <PermissionButton variant={variant} onClick={handleOpen} {...buttonProps}>
        {children}
      </PermissionButton>
    </>
  );
}