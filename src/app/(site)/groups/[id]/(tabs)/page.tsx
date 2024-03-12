"use client";
import { Permission } from "@prisma/client";

import { ConnectedTable } from "#/components";
import { usePage } from "../context";
import { hasPermission, memberActions, memberGroupActions } from "#/app/actions";
import { memberDefinition } from "#/lib/data/members";
import { useSite } from "#/context";
import { Card } from "#/ui/common";
import { AddMemberModal } from "../_ui/AddMemberModal";

export default function Page({ params: { id } }: { params: { id: string }}) {
  const { group } = usePage();
  const { session } = useSite();
  const canManage = hasPermission([Permission.GROUP_MANAGE], session);

  const columns = ["alias", "name"];

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
  }

  return (
    <Card>
      <ConnectedTable
        api={memberActions.listByGroup}
        searchFields={["alias", "name"]}
        defaultFilters={{ groupId: group.id }}
        actions={(refresh) => <AddMemberModal refresh={refresh} />}
        rowAction={async (row, refresh) => {
          await memberGroupActions.removeMember(id, row.id);
          // TODO: check response and show a toast. disable button while removing.
          refresh();
        }}
        columnKeys={columns}
        definition={memberDefinition}
      />
    </Card>
  );
}