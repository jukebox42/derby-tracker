import * as Yup from "yup";

import { renderValue } from "#/ui/data";
import { Definition } from "./types";

export const announcementDefinition: Definition = {
  title: {
    key: "title",
    label: "Title",
    type: "string",
    render: params => renderValue.string(params.title),
    renderCell: params => renderValue.string(params.value),
    validation: () => Yup.string().required("Announcement title is required."),
  },
  description: {
    key: "description",
    label: "Description",
    type: "string",
    render: params => renderValue.string(params.description),
    renderCell: params => renderValue.string(params.value),
    validation: () => Yup.string().required("Announcement description is required."),
  },
  author: {
    key: "author",
    label: "Author",
    type: "string",
    render: params => renderValue.string(params.author.alias),
    renderCell: params => renderValue.string(params.value.alias),
    validation: () => Yup.string().required("Author is required."),
  },
  updatedAt: {
    key: "updatedAt",
    label: "Updated",
    type: "datetime",
    render: params => renderValue.datetime(params.updatedAt),
    renderCell: params => renderValue.datetime(params.value),
    validation: () => Yup.date(),
  },
  createdAt: {
    key: "createdAt",
    label: "Created",
    type: "datetime",
    render: params => renderValue.datetime(params.createdAt),
    renderCell: params => renderValue.datetime(params.value),
    validation: () => Yup.date(),
  },
}

export const validationSchema = Yup.object().shape({
  title: announcementDefinition["title"].validation(),
  description: announcementDefinition["description"].validation(),
});