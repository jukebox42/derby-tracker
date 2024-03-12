"use client"
import React, { useEffect, useState } from "react";
import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { Permission } from "@prisma/client";
import { ActionResponse, ActionResponseType } from "#/app/actions";
import { hasPermission } from "#/app/actions";
import { useStore } from "#/hooks/useStore";

export type PromptButtonProps = {
  label: string,
  promptTitle?: string,
  promptMessage?: React.ReactNode,
  agreeText?: string,
  declineText?: string,
  disabled?: boolean,
  onClick: () => void,
  permissions?: Permission[],
  api?: () => Promise<ActionResponse<boolean>>
} & Pick<ButtonProps, "color" | "variant">;

export const PromptButton = ({
  label,
  onClick,
  api,
  permissions,
  disabled,
  color = "primary",
  variant = "outlined",
  promptMessage,
  promptTitle = "Are you sure?",
  agreeText = "Yes",
  declineText = "No",
}: PromptButtonProps) => {
  const session = useStore(state => state.session);
  const [intDisabled, setIntDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  const handleCheck = async () => {
    if (permissions && session && hasPermission(permissions, session)) {
      return setIntDisabled(false);
    }

    if (!api) {
      return setIntDisabled(true);
    }

    const result = await api();
    if (result.type === ActionResponseType.ERROR || result.data === false) {
      return setIntDisabled(true);
    }

    return setIntDisabled(false);
  }

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleCommit = () => {
    onClick();
    setOpen(false);
  }

  useEffect(() => {
    handleCheck();
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{promptTitle}</DialogTitle>
        {promptMessage && (
          <DialogContent>
            <DialogContentText>{promptMessage}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>{declineText}</Button>
          <Button onClick={handleCommit} variant="contained" autoFocus>{agreeText}</Button>
        </DialogActions>
      </Dialog>
      <Button
        disabled={disabled || intDisabled}
        variant={variant}
        color={color}
        onClick={handleOpen}
      >
        {label}
      </Button>
    </>
  );
}