"use client";
import { Permission, Team } from "@prisma/client";
import { teamActions } from "#/app/actions";
import { validationSchema } from "#/lib/data/group";

import { PermissionButton } from "#/ui/smart";
import { FormProvider, FieldGrid } from "#/ui/form";
import { teamFields } from "./fields";
import { usePage } from "../[id]/context";

type Data = Omit<Team, "id" | "createdAt" | "updatedAt">;

export const EditModal = () => {
  const { team, setTeam } = usePage();
  return (
    <FormProvider<Data, Team>
      title="Edit Team"
      onSubmit={data => teamActions.create(data)}
      onSuccess={data => setTeam(data)}
      schema={validationSchema}
      variant="modal"
      openButton={open => (
        <PermissionButton
          permissions={[Permission.TEAM_MANAGE]}
          purpose="edit"
          onClick={open}
        >
          Edit Team
        </PermissionButton>
      )}
    >
      <FieldGrid fields={teamFields()} />
    </FormProvider>
  );
}