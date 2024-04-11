import { useState } from "react"
import { MenuItem } from "@mui/material"
import { Member, MemberGroup, Permission } from "@prisma/client"

import { ActionResponseType, memberActions, memberGroupActions } from "#/app/actions"
import { PermissionButton } from "#/ui/smart"
import { usePage } from "../[id]/context"
import { memberIdValidationSchema } from "#/lib/data/groupMembers"
import { FormProvider, TextField } from "#/ui/form"

export const AddMemberModal = ({ refresh }: { refresh: () => void }) => {
  const { group } = usePage();
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

  return (
    <FormProvider<{ memberId: string }, MemberGroup>
      title="Add Member"
      onSubmit={data => memberGroupActions.addMember(group.id, data.memberId)}
      onSuccess={refresh}
      schema={memberIdValidationSchema}
      variant="modal"
      isLoading={isMembersLoading}
      onOpen={getMembers}
      openButton={open => (
        <PermissionButton permissions={[Permission.GROUP_MANAGE]} purpose="create" onClick={open}>Add Member</PermissionButton>
      )}
    >
      <TextField defaultValue={group.name} label="Group" name="_" disabled={true} />
      <TextField
        select
        required
        label="Member"
        name="memberId"
        defaultValue=""
        disabled={isMembersLoading}
      >
        {members.map(m => (
          <MenuItem key={m.id} value={m.id}>{m.alias} ({m.name})</MenuItem>
        ))}
      </TextField>
    </FormProvider>
  );
}