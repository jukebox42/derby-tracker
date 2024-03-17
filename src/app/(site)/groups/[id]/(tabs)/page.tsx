"use client";
import { Permission } from "@prisma/client";

import { ActionResponseType, hasPermission, memberActions, memberGroupActions } from "#/app/actions";
import { memberDefinition } from "#/lib/data/members";
import { useSite } from "#/context";
import { Card } from "#/ui/common";
import { DataDisplay } from "#/ui/data";
import { PromptButton } from "#/ui/smart";

import { usePage } from "../context";
import { AddMemberModal } from "../../_ui/AddMemberModal";

export default function Page({ params: { id } }: { params: { id: string }}) {
  const { group } = usePage();
  const { session } = useSite();
  const canManage = hasPermission([Permission.GROUP_MANAGE], session);

  const columns = ["alias", "name"];
  const listColumns = ["name"];

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
    listColumns.push("createdAt");
  }

  return (
    <Card>
      <DataDisplay
        api={memberActions.listByGroup}
        searchFields={["alias", "name"]}
        defaultFilters={{ groupId: group.id }}
        actions={(refresh) => <AddMemberModal refresh={refresh} />}
        rowAction={(row, refresh) => {
          const handleClick = async () => {
            const result = await memberGroupActions.removeMember(id, row.id as string);
            if (result.type === ActionResponseType.ERROR) {
              throw new Error(result.error.message);
            }
            refresh();
          }
          return (
            <PromptButton
              onClick={handleClick}
              purpose="removeMember"
              isIconButton
              promptMessage={"You are about to remove this member from this group."}
            />
          );
        }}
        columnKeys={columns}
        titleColumnKey="alias"
        listColumnKeys={listColumns}
        definition={memberDefinition}
      />
    </Card>
  );
}