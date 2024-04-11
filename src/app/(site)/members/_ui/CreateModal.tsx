"use client"
import { Member, Permission } from "@prisma/client";

import { memberActions } from "#/app/actions";
import { validationSchema } from "#/lib/data/members";
import { PermissionButton } from "#/ui/smart";
import { FieldGrid, FormProvider } from "#/ui/form";

import { memberFields } from "./fields";

type CreateData = Omit<Member, "id" | "createdAt" | "updatedAt">;

export const CreateModal = ({ refresh }: { refresh: () => void }) => {
  const memberFieldVars = memberFields();

  return (
    <FormProvider<CreateData, Member>
      title="Create Member"
      onSubmit={data => memberActions.create(data)}
      onSuccess={refresh}
      schema={validationSchema}
      variant="modal"
      openButton={open => (
        <PermissionButton
          permissions={[Permission.MEMBER_MANAGE]}
          purpose="create"
          onClick={open}
        >
          Add Member
        </PermissionButton>
      )}
    >
      <FieldGrid fields={memberFieldVars} />
    </FormProvider>
  );
};