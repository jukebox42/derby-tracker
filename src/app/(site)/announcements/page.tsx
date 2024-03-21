"use client"
import { ActionResponseType, announcementActions } from "#/app/actions";
import { announcementDefinition } from "#/lib/data/announcement";
import { Card } from "#/ui/common";
import { DataDisplayList } from "#/ui/data";
import { PromptButton } from "#/ui/smart";

import { CreateModal } from "./_ui/CreateModal";
import { EditModal } from "./_ui/EditModal";

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
          rowAction={(params, refresh) => {
            const handleClick = async () => {
              const result = await announcementActions.remove(params.id as string);
              if (result.type === ActionResponseType.ERROR) {
                throw new Error(result.error.message);
              }
              refresh();
            }
            return (
              <>
                <EditModal id={params.id as string} refresh={refresh} />
                <PromptButton
                  onClick={handleClick}
                  purpose="delete"
                  isIconButton
                  promptMessage={"You are about to delete this announcement."}
                />
              </>
            );
          }}
        />
      </Card>
    </>
  );
}