"use client"
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

import { Permission } from "@prisma/client";

import { ActionResponseType, groupActions, memberGroupActions } from "#/app/actions";
import { Card } from "#/ui/common";
import { groupDefinition } from "#/lib/data/group";
import { DataDisplay } from "#/ui/data";
import { PromptButton } from "#/ui/smart";

import { usePage } from "../../context";
import { AddGroupModal } from "../../../_ui/AddGroupModal";

export default function Page({ params: { id } }: { params: { id: string }}) {
  const { member } = usePage();

  const columns = ["name", "description", "createdAt"];
  const listColumns: string[] = [];

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
              permissions={[Permission.MEMBER_MANAGE]}
            />
          );
        }}
        columnKeys={columns}
        listTitleKey="name"
        listDescriptionKey="description"
        listColumnKeys={listColumns}
        definition={groupDefinition}
      />
    </Card>
  );
}