import { DataDisplay, DataDisplayTableProps } from ".";
import { DataDisplayRow } from "./types";

export const DataDisplayTable = <R extends DataDisplayRow,F>(params: DataDisplayTableProps<R,F>) => (
  <DataDisplay
    {...params}
    variant="table"
    listTitleKey=""
    listColumnKeys={[]}
  />
);