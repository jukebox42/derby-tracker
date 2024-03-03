import { Definition } from "./types";

export const formatColumn = (key: string, definition: Definition) => ({
  field: key,
  headerName: definition[key].label,
  renderCell: definition[key].renderCell,
  type: definition[key].type,
  headerClassName: "controlled-table-header",
});