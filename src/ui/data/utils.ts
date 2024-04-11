import { Definition } from "#/lib/data/types";

export const formatColumn = (columnKey: string, definition: Definition) => {
  const { key, label, render, renderCell } = definition[columnKey];
  return { key, label, render, renderCell };
}