"use client"
import React, { useEffect, useState } from "react";
import { Control, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { UseConnectedForm, useConnectedForm } from "#/hooks/useConnectedForm";

import { Card, Modal } from "../common";
import { ErrorText } from ".";

export type RenderFuncProps<T> = {
  register: UseFormRegister<T & FieldValues>,
  control: Control<T & FieldValues, any, T & FieldValues>,
  errors: FieldErrors<T & FieldValues>,
  isLoading: boolean,
  isSubmitting: boolean,
}

export type FormProviderProps<T, F> = {
  title?: React.ReactNode,
  onCancel?: () => void,
  hideCancel?: boolean,
  submitButtonText?: string,
  isLoading?: boolean,
  variant?: "standard" | "modal" | "unstyled",
  children?: React.ReactNode | React.ReactNode[],
  onOpen?: () => void,
  openButton?: (open: () => void) => React.ReactNode,
  closeOnSuccess?: boolean,
} & UseConnectedForm<T,F>;

const FormContext = React.createContext<RenderFuncProps<any> | undefined>(undefined);

export const FormProvider = <T extends FieldValues, F>({
  title,
  onSubmit,
  onSuccess,
  onCancel,
  onOpen,
  openButton,
  hideCancel,
  schema,
  children,
  closeOnSuccess = true,
  submitButtonText = "Submit",
  isLoading = false,
  variant = "standard"
}: FormProviderProps<T, F>) => {
  const [isOpen, setIsOpen] = useState(false);
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

  if (variant === "modal" && title) {
    return (
      <>
        {openButton?.(() => setIsOpen(true))}
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

  return (
    <Card sx={{ gap:1 }}>
      {title && titleElement}
      {fields}
      <ErrorText text={apiError} />
      {submit}
    </Card>
  );
}

export const useField = () => {
  const context = React.useContext(FormContext);
  if (context === undefined) {
    throw new Error("useField must be used within a ConnectedForm.");
  }
  return context;
}