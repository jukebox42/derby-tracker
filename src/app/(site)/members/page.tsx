"use client";
import { useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { Permission } from "@prisma/client";
import { memberActions } from "@/app/actions";
import { levels, memberDefinition, positions } from "@/lib/data/members";

import { Pane, ConnectedTable, AddButton, ConnectedFilterControls } from "@/components";
import { useStore } from "@/hooks/useStore";
import { Typography } from "@mui/material";

export default function Page() {
  const router = useRouter();
  const session = useStore(state => state.session);
  const canManage = session?.permissions.find(p => p === Permission.MEMBER_MANAGE);
  const columns = ["alias", "number", "name", "level", "isOnLoa", "preferredPosition"];
  const filterControls: ConnectedFilterControls[] = [
    {
      label: "Level",
      name: "level",
      type: "string",
      options: levels,
    },
    {
      label: "Position",
      name: "preferredPosition",
      type: "string",
      options: positions,
    },
    {
      label: "LoA",
      name: "isOnLoa",
      type: "boolean",
    },
  ];

  // Add admin column and filter
  if (canManage) {
    columns.push("createdAt");
    filterControls.push({
      label: "Active",
      name: "active",
      type: "boolean",
      defaultValue: true
    });
  }

  const handleCreate = () => router.push(routes.MEMBERS_CREATE.path);

  return (
    <>
      <Typography variant="h4">{routes.MEMBERS.label}</Typography>
      <Pane>
        <ConnectedTable
          api={memberActions.list}
          defaultFilters={{ active: true }}
          searchFields={["name", "alias", "number"]}
          filterControls={filterControls}
          actions={
            <AddButton permissions={[Permission.MEMBER_MANAGE]} label="Add Member" onClick={handleCreate} />
          }
          columnKeys={columns}
          definition={memberDefinition}
        />
      </Pane>
    </>
  );
}