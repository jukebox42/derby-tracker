"use client";
import { Permission, Team } from "@prisma/client";
import { teamActions } from "#/app/actions";
import { validationSchema } from "#/lib/data/group";

import { routes } from "#/lib/routes";
import { PermissionButton } from "#/ui/smart";
import { FormProvider, FieldGrid } from "#/ui/form";
import { teamFields } from "./fields";


type Data = Omit<Team, "id" | "createdAt" | "updatedAt">;

export const CreateModal = ({ refresh }: { refresh: () => void }) => {
  
  return (
    <FormProvider<Data, Team>
      title={routes.TEAMS_CREATE.label}
      onSubmit={data => teamActions.create(data)}
      onSuccess={refresh}
      schema={validationSchema}
      variant="modal"
      openButton={open => (
        <PermissionButton
          permissions={[Permission.TEAM_MANAGE]}
          purpose="create"
          onClick={open}
        >
          Add Team
        </PermissionButton>
      )}
    >
      <FieldGrid fields={teamFields()} />
    </FormProvider>
  );
}