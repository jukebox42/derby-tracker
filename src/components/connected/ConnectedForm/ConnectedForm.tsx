"use client"
import React, { useEffect, useState } from "react";
import { Control, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { UseConnectedForm, useConnectedForm } from "@/hooks/useConnectedForm";
import { ErrorText, Pane, Panel } from "@/components";

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
  variant?: "standard" | "panel" | "unstyled",
  children?: React.ReactNode | React.ReactNode[],
  onOpen?: () => void,
  panelButton?: (open: () => void) => React.ReactNode
} & UseConnectedForm<T,F>;

const FormContext = React.createContext<RenderFuncProps<any> | undefined>(undefined);

export const ConnectedForm = <T extends FieldValues, F>(
  {
    title,
    onSubmit,
    onSuccess,
    onCancel,
    onOpen,
    panelButton,
    hideCancel,
    schema,
    children,
    submitButtonText = "Submit",
    isLoading = false,
    variant = "standard"
  }: ConnectedFormProps<T, F>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    cancel,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    apiError
  } = useConnectedForm<T, F>({ schema, onSubmit, onSuccess });

  useEffect(() => {
    if(!isOpen) {
      return;
    }
    onOpen?.();
  }, [isOpen])

  const handleCancel = () => {
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

  if (variant === "unstyled") {
    return (
      <>
        {title && <Typography component="h1" variant="h5">{title}</Typography>}
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
        <Panel isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {title && <Typography component="h1" variant="h5">{title}</Typography>}
          {fields}
          <ErrorText text={apiError} />
          {submit}
        </Panel>
      </>
    )
  }

  return (
    <Pane sx={{ gap:1 }}>
      {title && <Typography component="h1" variant="h5">{title}</Typography>}
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