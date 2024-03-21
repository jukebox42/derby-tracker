"use client"
import { useState } from "react";
import { Announcement, Permission } from "@prisma/client";
import { ActionResponseType, announcementActions } from "#/app/actions";
import { validationSchema } from "#/lib/data/announcement";

import { PermissionButton } from "#/ui/smart";
import { FormProvider, TextField, Rte } from "#/ui/form";

type EditData = Omit<Announcement, "id" | "authorId" | "createdAt" | "updatedAt">;

export const EditModal = ({ id, refresh }: { id: string ,refresh: () => void }) => {
  const [announcement, setAnnouncement] = useState<Announcement | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const getAnnouncement = async () => {
    setIsLoading(true);
    try {
      const result = await announcementActions.get(id);
      if(result.type === ActionResponseType.OK) {
        setAnnouncement(result.data);
        setIsLoading(false);
      }
    } catch {}
    setIsLoading(false);
  };

  // TODO fix edit being opened and not showing title

  return (
    <FormProvider<EditData, Announcement>
      title="Add Announcement"
      onSubmit={data => announcementActions.edit(id, data)}
      onSuccess={refresh}
      schema={validationSchema}
      variant="modal"
      isLoading={isLoading}
      onOpen={getAnnouncement}
      openButton={open => (
        <PermissionButton
          permissions={[Permission.ANNOUNCEMENTS_MANAGE]}
          purpose="edit"
          onClick={open}
          isIconButton
        />
      )}
    >
      <TextField
        required
        label="Announcement Title"
        name="title"
        defaultValue={announcement?.title}
        autoFocus
        key={`title-${announcement?.title}`}
      />

      <Rte
        label="Description"
        name="description"
        defaultValue={announcement?.description}
        key={`description-${announcement?.description.toString()}`}
        required
      />
    </FormProvider>
  );
};