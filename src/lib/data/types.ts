import { Permission } from "@prisma/client";
import React from "react";

export type DefinitionItem = {
  key: string,
  label: string,
  type: string,
  map?: {[key: string]: string},
  render: (params: any) => React.ReactNode,
  renderCell?: (params: any) => React.ReactNode,
  validation: () => any,
  permissions?: Permission[],
}

export type Definition = Record<string, DefinitionItem>;