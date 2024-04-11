import { Team, TeamLevel } from "@prisma/client";

import { teamDefinition as td, teamLevels } from "#/lib/data/team";
import { FieldGridField } from "#/ui/form";

export const teamFields = (team?: Team): FieldGridField[] => {
  return [
    {
      variant: "TextField",
      wide: true,
      props: {
        name: td.name.key,
        label: td.name.label,
        defaultValue: team?.name,
        required: true,
      },
    },
    {
      variant: "TextField",
      wide: true,
      props: {
        name: td.description.key,
        label: td.description.label,
        defaultValue: team?.description,
      },
    },
    {
      variant: "TextField",
      options: teamLevels,
      wide: true,
      props: {
        name: td.level.key,
        label: td.level.label,
        defaultValue: team?.level ?? TeamLevel.HOME,
        required: true,
      },
    },
  ]
}