"use client"
import * as Yup from "yup";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ActionResponse, ActionResponseType } from "@/app/actions";

export type UseConnectedForm<T, F> = {
  onSubmit: (data: T) => Promise<ActionResponse<F>>,
  onSuccess: (data: F) => any,
  schema: Yup.ObjectSchema<any>,
  resetOnSuccess?: boolean,
}

export const useConnectedForm = <T extends FieldValues, F>(
  { schema, onSubmit, onSuccess, resetOnSuccess }: UseConnectedForm<T, F>
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setAPIError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<T>({ resolver: yupResolver(schema) });

  const cancel = () => {
    setIsSubmitting(false);
    reset();
  }

  const processSubmit = async (data: T) => {
    setIsSubmitting(true);
    try {
      const result  = await onSubmit(data);
      if (result.type === ActionResponseType.ERROR) {
        setAPIError(result.error.message);
        return setIsSubmitting(false);
      }

      resetOnSuccess && setIsSubmitting(false);
      resetOnSuccess && reset();
      onSuccess(result.data);
    } catch (e) {
      setAPIError(e + "");
      setIsSubmitting(false);
    }
  };

  return {
    cancel,
    errors,
    apiError,
    control,
    register,
    isSubmitting,
    handleSubmit: handleSubmit(processSubmit),
  }
}