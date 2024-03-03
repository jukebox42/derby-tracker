"use client";
import { useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { Group, Permission } from "@prisma/client";
import { groupActions } from "@/app/actions";
import { useConnectedList } from "@/hooks/useConnectedList";
import { groupDefinition } from "@/lib/data/group";

import { Pane, ConnectedTable, AddButton } from "@/components";

export default function Page() {
  const router = useRouter();
  const connectedList = useConnectedList<Group, { memberId: string }>(groupActions.list as any);
  const columns = ["name", "description", "permissions", "createdAt"];
  const handleCreate = () => router.push(routes.GROUPS_CREATE.path);
  const actions = <AddButton permissions={[Permission.GROUP_MANAGE]} label="Add Group" onClick={handleCreate} />;

  return (
    <>
      <Pane>
        <ConnectedTable
          {...connectedList}
          actions={actions}
          columnKeys={columns}
          definition={groupDefinition}
        />
      </Pane>
    </>
  );
}