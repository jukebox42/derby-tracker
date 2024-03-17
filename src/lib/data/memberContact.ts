import * as Yup from "yup";

import { NULL_VALUE, renderValue } from "#/ui/data";

import { Definition } from "./types";
import { states } from "../states";

export const memberContactDefinition: Definition = {
  personalEmail: {
    key: "personalEmail",
    label: "Personal Email",
    type: "string",
    render: params => params ? renderValue.string(params.personalEmail) : NULL_VALUE,
    validation: () => Yup.string().nullable().email("Email Address is invalid."),
  },
  phone: {
    key: "phone",
    label: "Phone Number",
    type: "string",
    render: params => params ? renderValue.string(params.phone) : NULL_VALUE,
    // TODO
    validation: () => Yup.string().nullable(),
  },
  address: {
    key: "address",
    label: "Address",
    type: "string",
    render: params => params ? renderValue.string(params.address) : NULL_VALUE,
    // TODO
    validation: () => Yup.string().nullable(),
  },
  city: {
    key: "city",
    label: "City",
    type: "string",
    render: params => params ? renderValue.string(params.city) : NULL_VALUE,
    // TODO
    validation: () => Yup.string().nullable(),
  },
  state: {
    key: "state",
    label: "State",
    type: "string",
    render: params => params ? renderValue.enum(params.state, states) : NULL_VALUE,
    // TODO
    validation: () => Yup.string().nullable(),
  },
  zip: {
    key: "zip",
    label: "Zip",
    type: "string",
    render: params => params ? renderValue.string(params.zip) : NULL_VALUE,
    // TODO
    validation: () => Yup.string().nullable(),
  },
};

export const validationSchema = Yup.object().shape({
  personalEmail: memberContactDefinition["personalEmail"].validation(),
  phone: memberContactDefinition["phone"].validation(),
  address: memberContactDefinition["address"].validation(),
  city: memberContactDefinition["city"].validation(),
  state: memberContactDefinition["state"].validation(),
  zip: memberContactDefinition["zip"].validation(),
});