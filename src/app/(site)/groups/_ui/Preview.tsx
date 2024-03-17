"use client"
import { Permission } from "@prisma/client";

import { PreviewCard } from "#/ui/common";
import { groupDefinition as gd } from "#/lib/data/group";
import { useSite } from "#/context";
import { EditModal } from "./EditModal";
import { usePage } from "../[id]/context";

export const Preview = () => {
  const { group } = usePage();
  const { hasAccess } = useSite([Permission.GROUP_READ, Permission.GROUP_MANAGE]);
  const aboutList = [
    { label: gd.description.label, value: gd.description.render(group) },
    ...(hasAccess ? [
      { label: gd.updatedAt.label, value: gd.updatedAt.render(group) },
      { label: gd.createdAt.label, value: gd.createdAt.render(group) },
    ] : [])
  ];
return (
  <PreviewCard
    title={group.name}
    lists={[
      { title: "Details", items: aboutList },
    ]}
    actions={
      <EditModal />
    }
  />
  );
}