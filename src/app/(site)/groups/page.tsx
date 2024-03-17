"use client";
import { Permission } from "@prisma/client";
import { useRouter } from "next/navigation";

import { useSite } from "#/context";
import { groupActions, hasPermission } from "#/app/actions";
import { groupDetailPath, groupDefinition } from "#/lib/data/group";
import { CreateModal } from "./_ui/CreateModal";
import { Card } from "#/ui/common";
import { DataDisplay } from "#/ui/data";

export default function Page() {
  const router = useRouter();
  const { session } = useSite();
  const canManage = hasPermission([Permission.GROUP_MANAGE], session);
  const columns = ["name", "description"];
  const listColumns = ["description"];

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
    listColumns.push("createdAt");
  }

  return (
    <>
      <Card>
        <DataDisplay
          api={groupActions.list}
          searchFields={["name", "description"]}
          actions={refresh => (
            <CreateModal refresh={refresh} />
          )}
          titleColumnKey="name"
          listOnClick={(row) => router.push(groupDetailPath(row.id))}
          columnKeys={columns}
          listColumnKeys={listColumns}
          definition={groupDefinition}
        />
      </Card>
    </>
  );
}