import { Group, Permission } from "@prisma/client"

import { groupActions } from "#/app/actions"
import { PermissionButton } from "#/ui/smart"
import { permissions, validationSchema } from "#/lib/data/group"
import { usePage } from "../[id]/context"
import { FormProvider, TextField, Autocomplete } from "#/ui/form"

type EditGroupData = Omit<Group, "id" | "createdAt" | "updatedAt">;

export const EditModal = () => {
  const { group, setGroup } = usePage();

  return (
    <FormProvider<EditGroupData, Group>
      title="Edit Group"
      onSubmit={data => groupActions.edit(group.id, data)}
      onSuccess={(data) => setGroup(data)}
      schema={validationSchema}
      variant="modal"
      openButton={open => (
        <PermissionButton permissions={[Permission.GROUP_MANAGE]} purpose="edit" onClick={open}>Edit</PermissionButton>
      )}
    >
      <TextField
        required
        label="Group Name"
        name="name"
        defaultValue={group.name}
        key={group.name}
        autoFocus
      />

      <TextField
        label="Description"
        name="description"
        key={group.description ?? "_description_"}
        defaultValue={group.description ?? undefined}
      />

      <Autocomplete
        required
        label="Permissions"
        name="permissions"
        options={Object.keys(permissions)}
        key={group.permissions.join("-")}
        getOptionLabel={(option) => permissions[option]}
        defaultValue={group.permissions}
      />
    </FormProvider>
  )
}