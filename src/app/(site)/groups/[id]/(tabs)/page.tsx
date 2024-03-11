"use client";
import { useState } from "react";
import { AddButton, ConnectedForm, ConnectedTable, Pane, TextField } from "@/components";
import { usePage } from "../context";
import { ActionResponseType, hasPermission, memberActions, memberGroupActions } from "@/app/actions";
import { memberDefinition } from "@/lib/data/members";
import { useStore } from "@/hooks/useStore";
import { Member, MemberGroup, Permission } from "@prisma/client";
import { memberIdValidationSchema } from "@/lib/data/groupMembers";
import { MenuItem } from "@mui/material";

export default function Page({ params: { id } }: { params: { id: string }}) {
  const { group } = usePage();
  const session = useStore(state => state.session);
  const canManage = hasPermission([Permission.GROUP_MANAGE], session);
  const [members, setMembers] = useState<Member[]>([]);
  const [isMembersLoading, setIsMembersLoading] = useState(false);

  const getMembers = async () => {
    setIsMembersLoading(true);
    try {
      const result = await memberActions.list({ active: true });
      if(result.type === ActionResponseType.OK) {
        setMembers(result.data);
        setIsMembersLoading(false);
      }
    } catch {}
    setIsMembersLoading(false);
  };

  const action = (refresh: () => void) => (
    <ConnectedForm<{ memberId: string }, MemberGroup>
      title="Add Member To Group"
      onSubmit={data => memberGroupActions.addMember(id, data.memberId)}
      onSuccess={refresh}
      schema={memberIdValidationSchema}
      variant="modal"
      isLoading={isMembersLoading}
      onOpen={getMembers}
      panelButton={open => (
        <AddButton permissions={[Permission.GROUP_MANAGE]} label="Add Member To Group" onClick={open} />
      )}
    >
      <TextField defaultValue={group.name} label="Member" name="_" disabled={true} />
      <TextField
        select
        required
        label="Group"
        name="memberId"
        defaultValue=""
        disabled={isMembersLoading}
      >
        {members.map(m => (
          <MenuItem key={m.id} value={m.id}>{m.alias} ({m.name})</MenuItem>
        ))}
      </TextField>
    </ConnectedForm>
  );

  const columns = ["alias", "name"];

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
  }

  return (
    <Pane>
      <ConnectedTable
        api={memberActions.listByGroup}
        searchFields={["alias", "name"]}
        defaultFilters={{ groupId: group.id }}
        actions={action}
        rowAction={async (row, refresh) => {
          await memberGroupActions.removeMember(id, row.id);
          // TODO: check response and show a toast. disable button while removing.
          refresh();
        }}
        columnKeys={columns}
        definition={memberDefinition}
      />
    </Pane>
  );
}