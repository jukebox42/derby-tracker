// TODO: Rename me

import { hasPermission } from "#/app/actions";
import { useSite } from "#/context";
import { DataDisplayRow, SmartListDataDisplay } from "../types";
import { formatColumn } from "../utils";
import { DataList } from "./DataList";

export const SmartDataList = <R extends DataDisplayRow,>({ columnKeys, titleKey, descriptionKey, definition, onClick, ...rest }: SmartListDataDisplay<R>) => {
  const { session } = useSite();
  const columns = columnKeys.filter(key => hasPermission(definition[key].permissions ?? [], session)).map(key => formatColumn(key, definition));
  const description = descriptionKey ? formatColumn(descriptionKey, definition) : undefined;

  const title = (row: R) => {
    if (onClick) {
      return row[titleKey];
    }
    const item = formatColumn(titleKey, definition);
    return item.render(row);
  }

  return (
    <DataList
      title={title}
      secondaryItems={columns}
      description={description}
      onClick={onClick}
      {...rest}
    />
  );
}