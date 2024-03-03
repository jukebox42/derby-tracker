"use client"

import { usePage } from "../../context";

export default function Page({ params: { id } }: { params: { id: string }}) {
  const member = usePage();
  return (
    <>
      TEAMS
      <pre>{JSON.stringify(member, null, 2)}</pre>
    </>
  );
}