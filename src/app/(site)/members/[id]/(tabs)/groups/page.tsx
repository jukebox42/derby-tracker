"use client"
import { useState } from "react";
import { MenuItem } from "@mui/material";

import { Group, MemberGroup, Permission } from "@prisma/client";
import { ActionResponseType, groupActions, hasPermission, memberGroupActions } from "#/app/actions";
import { groupDefinition } from "#/lib/data/group";
import { groupIdValidationSchema } from "#/lib/data/groupMembers";
import { useStore } from "#/hooks/useStore";

import { AddButton, ConnectedForm, ConnectedTable, Pane, TextField, } from "#/components";
import { usePage } from "../../context";

export default function Page({ params: { id } }: { params: { id: string }}) {
  const { member } = usePage();
  const session = useStore(state => state.session);
  const canManage = hasPermission([Permission.GROUP_MANAGE], session);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isGroupsLoading, setIsGroupsLoading] = useState(false);

  const getGroups = async () => {
    setIsGroupsLoading(true);
    try {
      const result = await groupActions.list();
      if(result.type === ActionResponseType.OK) {
        setGroups(result.data);
        setIsGroupsLoading(false);
      }
    } catch {}
    setIsGroupsLoading(false);
  };

  const action = (refresh: () => void) => (
    <ConnectedForm<{ groupId: string }, MemberGroup>
      title="Add Member To Group"
      onSubmit={data => memberGroupActions.addMember(data.groupId, id)}
      onSuccess={refresh}
      schema={groupIdValidationSchema}
      variant="modal"
      isLoading={isGroupsLoading}
      onOpen={getGroups}
      panelButton={open => (
        <AddButton permissions={[Permission.GROUP_MANAGE]} label="Add Member To Group" onClick={open} />
      )}
    >
      <TextField defaultValue={member.alias} label="Member" name="_" disabled={true} />
      <TextField
        select
        required
        label="Group"
        name="groupId"
        defaultValue=""
        disabled={isGroupsLoading}
      >
        {groups.map(g => (
          <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
        ))}
      </TextField>
    </ConnectedForm>
  );

  const columns = ["name", "description"];

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
  }

  return (
    <Pane>
      <ConnectedTable
        api={groupActions.listByMember}
        searchFields={["name", "description"]}
        defaultFilters={{ memberId: member.id }}
        actions={action}
        rowAction={async (row, refresh) => {
          await memberGroupActions.removeMember(row.id, id);
          // TODO: check response and show a toast. disable button while removing.
          refresh();
        }}
        columnKeys={columns}
        definition={groupDefinition}
      />
    </Pane>
  );
}