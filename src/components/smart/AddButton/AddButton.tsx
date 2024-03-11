"use client"
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { Permission } from "@prisma/client";
import { ActionResponse, ActionResponseType } from "@/app/actions";
import { hasPermission } from "@/app/actions";
import { useStore } from "@/hooks/useStore";

export type AddButtonProps = {
  label: string,
  onClick: () => void,
  disabled?: boolean,
  permissions?: Permission[],
  api?: () => Promise<ActionResponse<boolean>>
}

export const AddButton = ({ label, onClick, api, disabled, permissions }: AddButtonProps) => {
  const session = useStore(state => state.session);
  const [intDisabled, setIntDisabled] = useState(true);

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

  useEffect(() => {
    handleCheck();
  }, []);

  return (
    <Button
      startIcon={<AddIcon />}
      disabled={disabled || intDisabled}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}