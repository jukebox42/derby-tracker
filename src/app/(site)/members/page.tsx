"use client"
import { Permission } from "@prisma/client";

import { useSite } from "#/context";
import { hasPermission, memberActions } from "#/app/actions";
import { levels, memberDefinition, positions } from "#/lib/data/members";
import { Card } from "#/ui/common";
import { DataDisplay, FilterControls } from "#/ui/data";

import { CreateModal } from "./_ui/CreateModal";

export default function Page() {
  // TODO: do permissions check and redirect somewhere.
  const { session } = useSite();
  const canManage = hasPermission([Permission.MEMBER_MANAGE], session);

  const columns = ["alias", "number", "name", "level", "isOnLoa", "preferredPosition"];
  const listColumns = ["number", "level", "preferredPosition"];
  const filterControls: FilterControls[] = [
    {
      label: "Level",
      name: "level",
      type: "string",
      options: levels,
    },
    {
      label: "Position",
      name: "preferredPosition",
      type: "string",
      options: positions,
    },
    {
      label: "LoA",
      name: "isOnLoa",
      type: "boolean",
      defaultValue: false,
    },
  ];

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
    filterControls.push({
      label: "Active",
      name: "active",
      type: "boolean",
      defaultValue: true
    });
  }

  return (
    <>
      <Card>
        <DataDisplay
          api={memberActions.list}
          defaultFilters={{ active: true, isOnLoa: false }}
          searchFields={["name", "alias", "number"]}
          filterControls={filterControls}
          actions={refresh => (
            <CreateModal refresh={refresh} />
          )}
          columnKeys={columns}
          titleColumnKey="alias"
          listColumnKeys={listColumns}
          definition={memberDefinition}
        />
      </Card>
    </>
  );
}