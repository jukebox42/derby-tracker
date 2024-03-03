"use client";
import { useRouter } from "next/navigation";

import { Group } from "@prisma/client";
import { groupActions } from "@/app/actions";
import { permissions, validationSchema } from "@/lib/data/group";

import { Autocomplete, ConnectedForm, TextField } from "@/components";
import { routes } from "@/lib/routes";

type CreateGroupData = Omit<Group, "id" | "createdAt" | "updatedAt">;

export default function Page() {
  const router = useRouter();
  return (
    <ConnectedForm<CreateGroupData,Group>
      title={routes.GROUPS_CREATE.label}
      onCancel={() => router.push(routes.GROUPS.path)}
      onSubmit={data => groupActions.create(data)}
      onSuccess={data => router.push(`${routes.GROUPS.path}/${data.id}`)}
      schema={validationSchema}
    >
      <TextField
        required
        label="Name"
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
    </ConnectedForm>
  );
}