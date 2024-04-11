"use client"
import { Permission } from "@prisma/client";

import { PreviewCard } from "#/ui/common";
import { teamDefinition as td } from "#/lib/data/team";
import { useSite } from "#/context";
import { EditModal } from "./EditModal";
import { usePage } from "../[id]/context";
import { PromptButton } from "#/ui/smart";
import { ActionResponseType, teamActions } from "#/app/actions";
import { useRouter } from "next/navigation";
import { routes } from "#/lib/routes";

export const Preview = () => {
  const { team } = usePage();
  const router = useRouter()
  const { hasAccess } = useSite([Permission.TEAM_READ, Permission.TEAM_MANAGE]);
  const aboutList = [
    { label: td.level.label, value: td.level.render(team) },
    { label: td.description.label, value: td.description.render(team) },
    ...(hasAccess ? [
      { label: td.updatedAt.label, value: td.updatedAt.render(team) },
      { label: td.createdAt.label, value: td.createdAt.render(team) },
    ] : [])
  ];
  const handleDelete = async () => {
    const result = await teamActions.remove(team.id);
    if (result.type === ActionResponseType.ERROR) {
      throw new Error(result.error.message);
    }
    router.push(routes.TEAMS.path);
  }
  return (
    <PreviewCard
      title={team.name}
      lists={[
        { title: "Details", items: aboutList },
      ]}
      actions={
        <>
        <EditModal />
          <PromptButton
            onClick={handleDelete}
            purpose="remove"
            promptMessage={"You are about to delete this team. Events tied to this team will also be removed."}
            permissions={[Permission.TEAM_MANAGE]}
          >Delete</PromptButton>
        </>
      }
    />
  );
}