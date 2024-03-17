import { DataDisplay, DataDisplayTableProps } from ".";
import { BaseRow } from "./types";

export const DataDisplayTable = <R extends BaseRow,F>(params: DataDisplayTableProps<R,F>) => (
  <DataDisplay
    {...params}
    variant="table"
    titleColumnKey=""
    listColumnKeys={[]}
  />
);