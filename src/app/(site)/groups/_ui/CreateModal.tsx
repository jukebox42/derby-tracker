"use client";
import { Group, Permission } from "@prisma/client";
import { groupActions } from "#/app/actions";
import { permissions, validationSchema } from "#/lib/data/group";

import { routes } from "#/lib/routes";
import { PermissionButton } from "#/ui/smart";
import { FormProvider, Autocomplete, TextField } from "#/ui/form";

type CreateGroupData = Omit<Group, "id" | "createdAt" | "updatedAt">;

export const CreateModal = ({ refresh }: { refresh: () => void }) => {
  return (
    <FormProvider<CreateGroupData, Group>
      title={routes.GROUPS_CREATE.label}
      onSubmit={data => groupActions.create(data)}
      onSuccess={refresh}
      schema={validationSchema}
      variant="modal"
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
      <TextField
        required
        label="Group Name"
        name="name"
        autoFocus
      />

      <TextField
        label="Description"
        name="description"
      />

      <Autocomplete
        required
        label="Permissions"
        name="permissions"
        options={Object.keys(permissions)}
        getOptionLabel={(option) => permissions[option]}
      />
    </FormProvider>
  );
}