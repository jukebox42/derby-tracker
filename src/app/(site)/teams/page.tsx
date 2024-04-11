"use client";
import { useRouter } from "next/navigation";

import { teamActions } from "#/app/actions";
import { teamDetailPath, teamDefinition, teamLevels } from "#/lib/data/team";
import { CreateModal } from "./_ui/CreateModal";
import { Card } from "#/ui/common";
import { DataDisplay, FilterControls } from "#/ui/data";

export default function Page() {
  const router = useRouter();
  const columns = ["name", "level", "description", "createdAt"];
  const listColumns = ["level", "description", "createdAt"];

  const filterControls: FilterControls[] = [
    {
      label: "Level",
      name: "level",
      type: "string",
      options: teamLevels,
    },
  ];

  return (
    <>
      <Card>
        <DataDisplay
          api={teamActions.list}
          searchFields={["name", "description"]}
          filterControls={filterControls}
          actions={refresh => (
            <CreateModal refresh={refresh} />
          )}
          listTitleKey="name"
          listOnClick={(row) => router.push(teamDetailPath(row.id))}
          columnKeys={columns}
          listColumnKeys={listColumns}
          definition={teamDefinition}
        />
      </Card>
    </>
  );
}