import * as Yup from "yup";

import { renderValue } from "#/ui/data";
import { Definition } from "./types";
import { Permission } from "@prisma/client";

export const announcementDefinition: Definition = {
  title: {
    key: "title",
    label: "Title",
    type: "string",
    render: params => renderValue.string(params.title),
    validation: () => Yup.string().required("Announcement title is required."),
  },
  description: {
    key: "description",
    label: "Description",
    type: "string",
    render: params => renderValue.rte(params.description),
    validation: () => Yup.string().required("Announcement description is required."),
  },
  author: {
    key: "author",
    label: "Author",
    type: "string",
    render: params => renderValue.string(params.author.alias),
    validation: () => Yup.string().required("Author is required."),
  },
  updatedAt: {
    key: "updatedAt",
    label: "Updated",
    type: "datetime",
    render: params => renderValue.datetime(params.updatedAt),
    validation: () => Yup.date(),
    permissions: [Permission.ANNOUNCEMENTS_MANAGE],
  },
  createdAt: {
    key: "createdAt",
    label: "Created",
    type: "datetime",
    render: params => renderValue.datetime(params.createdAt),
    validation: () => Yup.date(),
  },
}

export const validationSchema = Yup.object().shape({
  title: announcementDefinition["title"].validation(),
  description: announcementDefinition["description"].validation(),
});