"use client"
import { Announcement, Permission } from "@prisma/client";
import { announcementActions } from "#/app/actions";
import { validationSchema } from "#/lib/data/announcement";

import { PermissionButton } from "#/ui/smart";
import { FormProvider, TextField } from "#/ui/form";

type CreateData = Omit<Announcement, "id" | "authorId" | "createdAt" | "updatedAt">;

export const CreateModal = ({ refresh }: { refresh: () => void }) => (
  <FormProvider<CreateData, Announcement>
    title="Add Announcement"
    onSubmit={data => announcementActions.create(data)}
    onSuccess={refresh}
    schema={validationSchema}
    variant="modal"
    openButton={open => (
      <PermissionButton
        permissions={[Permission.ANNOUNCEMENTS_MANAGE]}
        purpose="create"
        onClick={open}
      >
        Add Announcement
      </PermissionButton>
    )}
  >
    <TextField
      required
      label="Announcement Title"
      name="title"
      autoFocus
    />

    <TextField
      label="Description"
      name="description"
    />
  </FormProvider>
);