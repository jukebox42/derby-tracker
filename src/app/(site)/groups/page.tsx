"use client";
import { useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { Permission } from "@prisma/client";
import { groupActions } from "@/app/actions";
import { groupDefinition } from "@/lib/data/group";
import { useStore } from "@/hooks/useStore";

import { Pane, ConnectedTable, AddButton } from "@/components";
import { Typography } from "@mui/material";

export default function Page() {
  const router = useRouter();
  const session = useStore(state => state.session);
  const canManage = session?.permissions.find(p => p === Permission.GROUP_MANAGE);
  const columns = ["name", "description"];
  const handleCreate = () => router.push(routes.GROUPS_CREATE.path);

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
  }

  return (
    <>
      <Typography variant="h4">{routes.GROUPS.label}</Typography>
      <Pane>
        <ConnectedTable
          api={groupActions.list}
          searchFields={["name", "description"]}
          actions={
            <AddButton permissions={[Permission.GROUP_MANAGE]} label="Add Group" onClick={handleCreate} />
          }
          columnKeys={columns}
          definition={groupDefinition}
        />
      </Pane>
    </>
  );
}