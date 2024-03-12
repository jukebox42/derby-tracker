"use client"
import React, { useEffect, useState } from "react";
import { Control, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { UseConnectedForm, useConnectedForm } from "#/hooks/useConnectedForm";
import { ErrorText, Pane, Panel } from "#/components";
import { Modal } from "#/components/layout/Modal";

export type RenderFuncProps<T> = {
  register: UseFormRegister<T & FieldValues>,
  control: Control<T & FieldValues, any, T & FieldValues>,
  errors: FieldErrors<T & FieldValues>,
  isLoading: boolean,
  isSubmitting: boolean,
}

export type ConnectedFormProps<T, F> = {
  title?: React.ReactNode,
  onCancel?: () => void,
  hideCancel?: boolean,
  submitButtonText?: string,
  isLoading?: boolean,
  variant?: "standard" | "panel" | "modal" | "slotModal" | "unstyled",
  children?: React.ReactNode | React.ReactNode[],
  onOpen?: () => void,
  panelButton?: (open: () => void) => React.ReactNode,
  closeOnSuccess?: boolean,
} & UseConnectedForm<T,F>;

const FormContext = React.createContext<RenderFuncProps<any> | undefined>(undefined);

export const ConnectedForm = <T extends FieldValues, F>({
  title,
  onSubmit,
  onSuccess,
  onCancel,
  onOpen,
  panelButton,
  hideCancel,
  schema,
  children,
  closeOnSuccess = true,
  submitButtonText = "Submit",
  isLoading = false,
  variant = "standard"
}: ConnectedFormProps<T, F>) => {
  const [isOpen, setIsOpen] = useState(variant === "slotModal");
  const {
    cancel,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    apiError
  } = useConnectedForm<T, F>({
    schema,
    onSubmit,
    onSuccess: data => {
      cancel();
      closeOnSuccess && setIsOpen(false);
      return onSuccess(data);
    }
  });

  useEffect(() => {
    if(!isOpen) {
      return;
    }
    onOpen?.();
  }, [isOpen])

  const handleCancel = () => {
    setIsOpen(false);
    cancel();
    onCancel?.();
  }

  const submit = (
    <Box width="100%" sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 1 }}>
      <LoadingButton
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={isLoading}
        onClick={handleSubmit}
        fullWidth={hideCancel}
        size={hideCancel ? "large" : undefined}
      >
        {submitButtonText}
      </LoadingButton>
      {!hideCancel && <Button variant="outlined" disabled={isSubmitting} onClick={handleCancel}>Cancel</Button>}
    </Box>
  );

  const fields = (
    <FormContext.Provider value={ { register, control, errors, isLoading, isSubmitting } }>
      {children}
    </FormContext.Provider>
  );

  const titleElement = <Typography component="h1" variant="h4">{title}</Typography>;

  if (variant === "unstyled") {
    return (
      <>
        {title && titleElement}
        {fields}
        <ErrorText text={apiError} />
        {submit}
      </>
    );
  }

  if (variant === "panel") {
    return (
      <>
        {panelButton?.(() => setIsOpen(true))}
        <Panel isOpen={isOpen} onClose={handleCancel}>
          {title && titleElement}
          {fields}
          <ErrorText text={apiError} />
          {submit}
        </Panel>
      </>
    )
  }

  if (variant === "modal" && title) {
    return (
      <>
        {panelButton?.(() => setIsOpen(true))}
        <Modal
          title={titleElement}
          isOpen={isOpen}
          onClose={handleCancel}
          actions={submit}
        >
          {fields}
          <ErrorText text={apiError} />
        </Modal>
      </>
    )
  }

  if (variant === "slotModal" && title) {
    return (
      <>
        <Modal
          title={title}
          isOpen={true}
          onClose={handleCancel}
          actions={<>
            {!hideCancel && <Button disabled={isSubmitting} onClick={handleCancel}>Cancel</Button>}
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={isLoading}
              onClick={handleSubmit}
              fullWidth={hideCancel}
              size={hideCancel ? "large" : undefined}
            >
              {submitButtonText}
            </LoadingButton>
          </>}
        >
          {fields}
          <ErrorText text={apiError} />
        </Modal>
      </>
    )
  }

  return (
    <Pane sx={{ gap:1 }}>
      {title && titleElement}
      {fields}
      <ErrorText text={apiError} />
      {submit}
    </Pane>
  );
}

export const useField = () => {
  const context = React.useContext(FormContext);
  if (context === undefined) {
    throw new Error("useField must be used within a ConnectedForm.");
  }
  return context;
}