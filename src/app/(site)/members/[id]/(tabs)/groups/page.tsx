"use client"
import { useState } from "react";

import { useConnectedList } from "@/hooks/useConnectedList";
import { usePage } from "../../context";
import { Group, MemberGroup, Permission } from "@prisma/client";
import { ActionResponseType, groupActions } from "@/app/actions";
import { AddButton, ConnectedForm, ConnectedTable, Pane, TextField, Panel } from "@/components";
import { groupDefinition } from "@/lib/data/group";
import { validationSchema } from "@/lib/data/groupMembers";
import { MenuItem } from "@mui/material";

export default function Page({ params: { id } }: { params: { id: string }}) {
  const { member } = usePage();
  const connectedList = useConnectedList<Group, { memberId: string }>(groupActions.listByMember as any, { memberId: member.id });
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

  const action = (
    <ConnectedForm<{ groupId: string }, MemberGroup>
      title="Add Member To Group"
      onSubmit={data => groupActions.addMember(data.groupId, id)}
      onSuccess={() => connectedList.onRefresh()}
      schema={validationSchema}
      variant="unstyled"
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

  const columns = ["name", "description", "permissions", "createdAt"];

  return (
    <Pane>
      <ConnectedTable
        {...connectedList}
        actions={action}
        columnKeys={columns}
        definition={groupDefinition}
      />
    </Pane>
  );
}