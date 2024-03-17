"use client"
import React from "react";
import { Alert } from "@mui/material";

type ErrorTextProps = {
  text?: string,
  action?: React.ReactNode,
}

export const ErrorText = ({ text, action }: ErrorTextProps) => {
  if (!text) {
    return <></>;
  }
  return (
    <Alert severity="error" action={action}>{text}</Alert>
  );
}