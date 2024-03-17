"use client"
import { useState } from "react";
import { MenuItem } from "@mui/material";
import { Group, MemberGroup, Permission } from "@prisma/client";

import { ActionResponseType, groupActions, memberGroupActions } from "#/app/actions";
import { PermissionButton } from "#/ui/smart";
import { groupIdValidationSchema } from "#/lib/data/groupMembers";

import { usePage } from "../[id]/context";
import { FormProvider, TextField } from "#/ui/form";

type CreateData = { groupId: string };

export const AddGroupModal = ({ refresh }: { refresh: () => void }) => {
  const { member } = usePage();
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

  return (
    <FormProvider<CreateData, MemberGroup>
      title="Add Group"
      onSubmit={data => memberGroupActions.addMember(data.groupId, member.id)}
      onSuccess={refresh}
      schema={groupIdValidationSchema}
      variant="modal"
      isLoading={isGroupsLoading}
      onOpen={getGroups}
      openButton={open => (
        <PermissionButton
          permissions={[Permission.GROUP_MANAGE]}
          purpose="create"
          onClick={open}
        >
          Add Group
        </PermissionButton>
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
    </FormProvider>
  );
};