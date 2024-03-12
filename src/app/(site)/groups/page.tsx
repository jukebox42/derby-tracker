"use client";
import { Permission } from "@prisma/client";

import { useSite } from "#/context";
import { routes } from "#/lib/routes";
import { groupActions, hasPermission } from "#/app/actions";
import { groupDefinition } from "#/lib/data/group";
import { Pane, ConnectedTable } from "#/components";
import { PermissionButton } from "#/ui/smart";

export default function Page() {
  const { session } = useSite();
  const canManage = hasPermission([Permission.GROUP_MANAGE], session);
  const columns = ["name", "description"];

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
  }

  return (
    <>
      <Pane>
        <ConnectedTable
          api={groupActions.list}
          searchFields={["name", "description"]}
          actions={
            <PermissionButton
              permissions={[Permission.GROUP_MANAGE]}
              path={routes.GROUPS_CREATE.path}
              purpose="create"
            >
              Add Group
            </PermissionButton>
          }
          columnKeys={columns}
          definition={groupDefinition}
        />
      </Pane>
    </>
  );
}