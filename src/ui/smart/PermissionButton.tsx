"use client"
import React, { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonProps, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { Permission } from "@prisma/client";

import { useSite } from "#/context";

type Purpose = "create" | "edit" | "remove" | "removeMember";

export type PermissionButtonProps = {
  path?: string,
  permissions?: Permission[],
  purpose?: Purpose,
  isIconButton?: boolean,
} & Omit<ButtonProps, "href">;

const getCustomIcon = (purpose?: Purpose, startIcon?: React.ReactNode) => {
  if (startIcon || !purpose) {
    return startIcon;
  }
  const icons = {
    "create": <AddIcon />,
    "edit": <EditIcon />,
    "remove": <RemoveCircleIcon />,
    "delete": <DeleteIcon />,
    "removeMember": <PersonRemoveIcon />,
  }
  return icons[purpose];
}

export const PermissionButton = ({
  path,
  permissions,
  disabled,
  variant = "contained",
  color = "primary",
  purpose,
  startIcon,
  children,
  onClick,
  isIconButton,
  ...buttonProps
}: PermissionButtonProps) => {
  const { hasAccess } = useSite(permissions);
  const router = useRouter();

  const customStartIcon = getCustomIcon(purpose, startIcon);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    path && router.push(path);
  }

  if (isIconButton) {
    return (
      <IconButton
        component="button"
        {...buttonProps}
        disabled={disabled || !hasAccess}
        variant={variant}
        color={color}
        onClick={handleClick}
      >
        {customStartIcon ? customStartIcon : children}
      </IconButton>
    );
  }

  return (
    <Button
      {...buttonProps}
      startIcon={customStartIcon}
      disabled={disabled || !hasAccess}
      variant={variant}
      color={color}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}