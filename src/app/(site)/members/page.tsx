"use client"
import { Permission } from "@prisma/client";

import { useSite } from "#/context";
import { routes } from "#/lib/routes";
import { hasPermission, memberActions } from "#/app/actions";
import { levels, memberDefinition, positions } from "#/lib/data/members";

import { Pane, ConnectedTable, ConnectedFilterControls } from "#/components";
import { PermissionButton } from "#/ui/smart";

export default function Page() {
  // TODO: do permissions check and redirect somewhere.
  const { session } = useSite();
  const canManage = hasPermission([Permission.MEMBER_MANAGE], session);

  const columns = ["alias", "number", "name", "level", "isOnLoa", "preferredPosition"];
  const filterControls: ConnectedFilterControls[] = [
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
      <Pane>
        <ConnectedTable
          api={memberActions.list}
          defaultFilters={{ active: true }}
          searchFields={["name", "alias", "number"]}
          filterControls={filterControls}
          actions={
            <PermissionButton
              permissions={[Permission.MEMBER_MANAGE]}
              purpose="create"
              path={routes.MEMBERS_CREATE.path}
            >
              Add Member
            </PermissionButton>
          }
          columnKeys={columns}
          definition={memberDefinition}
        />
      </Pane>
    </>
  );
}