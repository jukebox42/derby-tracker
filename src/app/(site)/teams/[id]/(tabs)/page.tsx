"use client";
import { Card } from "#/ui/common";

import { usePage } from "../context";

export default function Page({ params: { id } }: { params: { id: string }}) {
  const { team } = usePage();

  const columns = ["alias", "name", "createdAt"];
  const listColumns = ["name", "createdAt"];

  return (
    <Card>
      TODO: Charter, the list of members on this team.
    </Card>
  );
}