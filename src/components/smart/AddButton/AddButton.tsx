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
  permissions?: Permission[],
  api?: () => Promise<ActionResponse<boolean>>
}

export const AddButton = ({ label, onClick, api, permissions }: AddButtonProps) => {
  const session = useStore(state => state.session);
  const [disabled, setDisabled] = useState(true);

  const handleCheck = async () => {
    if (permissions && session && hasPermission(permissions, session)) {
      return setDisabled(false);
    }

    if (!api) {
      return setDisabled(true);
    }

    const result = await api();
    if (result.type === ActionResponseType.ERROR || result.data === false) {
      return setDisabled(true);
    }

    return setDisabled(false);
  }

  useEffect(() => {
    handleCheck();
  }, []);

  return (
    <Button
      startIcon={<AddIcon />}
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}