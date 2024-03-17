"use client"
import { Permission } from "@prisma/client";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

import { ActionResponseType, groupActions, hasPermission, memberGroupActions } from "#/app/actions";
import { useStore } from "#/hooks/useStore";
import { Card } from "#/ui/common";
import { groupDefinition } from "#/lib/data/group";
import { DataDisplay } from "#/ui/data";
import { PromptButton } from "#/ui/smart";

import { usePage } from "../../context";
import { AddGroupModal } from "../../../_ui/AddGroupModal";

export default function Page({ params: { id } }: { params: { id: string }}) {
  const { member } = usePage();
  const session = useStore(state => state.session);
  const canManage = hasPermission([Permission.GROUP_MANAGE], session);

  const columns = ["name", "description"];
  const listColumns: string[] = [];

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
  }

  return (
    <Card>
      <DataDisplay
        api={groupActions.listByMember}
        searchFields={["name", "description"]}
        defaultFilters={{ memberId: member.id }}
        actions={refresh => (
          <AddGroupModal refresh={refresh} />
        )}
        rowAction={(row, refresh) => {
          const handleClick = async () => {
            const result = await memberGroupActions.removeMember(row.id as string, member.id);
            if (result.type === ActionResponseType.ERROR) {
              throw new Error(result.error.message);
            }
            refresh();
          }
          return (
            <PromptButton
              onClick={handleClick}
              startIcon={<GroupRemoveIcon />}
              isIconButton
              promptMessage={"You are about to remove this group from this member."}
            />
          );
        }}
        columnKeys={columns}
        titleColumnKey="name"
        listDescriptionKey="description"
        listColumnKeys={listColumns}
        definition={groupDefinition}
      />
    </Card>
  );
}