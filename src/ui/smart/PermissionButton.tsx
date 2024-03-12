"use client"
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { Permission } from "@prisma/client";

import { useSite } from "#/context";

export type PermissionButtonProps = {
  path?: string,
  permissions?: Permission[],
  purpose?: "create" | "edit",
} & Omit<ButtonProps, "href">;

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
  ...buttonProps
}: PermissionButtonProps) => {
  const { hasAccess } = useSite(permissions);
  const router = useRouter();

  let customStartIcon = startIcon;
  if (purpose === "create") {
    customStartIcon = <AddIcon />;
  } else if (purpose === "edit") {
    customStartIcon = <EditIcon />;
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    path && router.push(path);
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