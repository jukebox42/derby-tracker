"use client";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { Level, Member, Permission, Prisma } from "@prisma/client";
import { memberActions } from "@/app/actions";
import { memberDefinition } from "@/lib/data/members";

import { Pane, ConnectedTable, ConnectedListStats, AddButton } from "@/components";
import { useStore } from "@/hooks/useStore";
import { useConnectedList } from "@/hooks/useConnectedList";

export default function Page() {
  const router = useRouter();
  const session = useStore(state => state.session);
  const connectedList = useConnectedList<Member, Prisma.MemberWhereInput>(memberActions.list, { active: true });

  const columns = ["alias", "number", "name", "level", "isOnLoa", "preferredPosition"];

  // Add admin columns
  if (session?.permissions.find(p => p === Permission.MEMBER_MANAGE)) {
    columns.push("createdAt");
  }

  const handleCreate = () => router.push(routes.MEMBERS_CREATE.path);

  const members = connectedList.rows;
  const notOnLoaCount = members.filter(m => !m.isOnLoa).length;
  const rookiesCount = members.filter(m => !m.isOnLoa && m.level === Level.ROOKIE).length;
  const contactCount = members.filter(m => !m.isOnLoa && m.level === Level.CONTACT).length;
  const gameCount = members.filter(m => !m.isOnLoa && m.level === Level.GAME).length;

  const actions = <AddButton permissions={[Permission.MEMBER_MANAGE]} label="Add Member" onClick={handleCreate} />;

  return (
    <>
      <ConnectedListStats
        {...connectedList}
        stats={[
          { title: "Active Members", value: `${notOnLoaCount} / ${members.length}` },
          { title: "Rookies", value: `${rookiesCount} / ${notOnLoaCount}` },
          { title: "Contact Eligible", value: `${contactCount} / ${notOnLoaCount}` },
          { title: "Game Eligible", value: `${gameCount} / ${notOnLoaCount}` },
        ]}
      />
      <Pane>
        <ConnectedTable
          {...connectedList}
          actions={actions}
          columnKeys={columns}
          definition={memberDefinition}
        />
      </Pane>
    </>
  );
}