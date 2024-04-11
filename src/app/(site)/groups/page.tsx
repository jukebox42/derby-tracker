"use client";
import { useRouter } from "next/navigation";

import { groupActions } from "#/app/actions";
import { groupDetailPath, groupDefinition } from "#/lib/data/group";
import { CreateModal } from "./_ui/CreateModal";
import { Card } from "#/ui/common";
import { DataDisplay } from "#/ui/data";

export default function Page() {
  const router = useRouter();
  const columns = ["name", "description", "createdAt"];
  const listColumns = ["description", "createdAt"];

  return (
    <>
      <Card>
        <DataDisplay
          api={groupActions.list}
          searchFields={["name", "description"]}
          actions={refresh => (
            <CreateModal refresh={refresh} />
          )}
          listTitleKey="name"
          listOnClick={(row) => router.push(groupDetailPath(row.id))}
          columnKeys={columns}
          listColumnKeys={listColumns}
          definition={groupDefinition}
        />
      </Card>
    </>
  );
}