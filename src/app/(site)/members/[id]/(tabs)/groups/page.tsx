"use client"
import { useEffect, useState } from "react";

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
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    if(!isAddOpen) {
      return;
    }
    setIsGroupsLoading(true);
    groupActions.list().then(result => {
      if(result.type === ActionResponseType.OK) {
        setGroups(result.data);
        setIsGroupsLoading(false);
      }
    })
  }, [isAddOpen]);

  const columns = ["name", "description", "permissions", "createdAt"];
  const actions = <AddButton permissions={[Permission.GROUP_MANAGE]} label="Add Member To Group" onClick={() => setIsAddOpen(true)} />;

  return (
    <Pane>
      <Panel isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <ConnectedForm<{ groupId: string }, MemberGroup>
          title="Add Member To Group"
          onSubmit={data => groupActions.addMember(data.groupId, id)}
          onSuccess={() => {
            connectedList.onRefresh();
            setIsAddOpen(false);
          }}
          schema={validationSchema}
          variant="unstyled"
          isLoading={isGroupsLoading}
          onCancel={() => setIsAddOpen(false)}
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
      </Panel>

      <ConnectedTable
        {...connectedList}
        actions={actions}
        columnKeys={columns}
        definition={groupDefinition}
      />
    </Pane>
  );
}