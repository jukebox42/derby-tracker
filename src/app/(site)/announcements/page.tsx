"use client";
import { useSite } from "#/context";
import { announcementActions } from "#/app/actions";
import { announcementDefinition } from "#/lib/data/announcement";
import { Card } from "#/ui/common";
import { CreateModal } from "./_ui/CreateModal";
import { DataDisplayList } from "#/ui/data";

export default function Page() {
  const columns = ["author", "createdAt"];

  return (
    <>
      <Card>
        <DataDisplayList
          api={announcementActions.list}
          searchFields={["title", "description"]}
          actions={refresh => (
            <CreateModal refresh={refresh} />
          )}
          listColumnKeys={columns}
          titleColumnKey="title"
          listDescriptionKey="description"
          definition={announcementDefinition}
        />
      </Card>
    </>
  );
}