import * as Yup from "yup";

import { NULL_VALUE, renderValue } from "#/ui/data";

import { Definition } from "./types";

export const memberSocialDefinition: Definition = {
  slack: {
    key: "slack",
    label: "Slack",
    type: "string",
    render: params => params ? renderValue.link(params.slack, `http://slack.com/@${params.slack}`, true) : NULL_VALUE,
    renderCell: params => params ? renderValue.link(params.value, `http://slack.com/@${params.value}`, true) : NULL_VALUE,
    // TODO
    validation: () => Yup.string().nullable(),
  },
  facebook: {
    key: "facebook",
    label: "Facebook",
    type: "link",
    render: params => params ? renderValue.link(params.facebook, params.facebook, true) : NULL_VALUE,
    renderCell: params => params ? renderValue.link(params.value, params.value, true) : NULL_VALUE,
    // TODO
    validation: () => Yup.string().nullable(),
  },
};