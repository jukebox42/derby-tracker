import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "#/ui/common";
import { RteContent } from "../common/RteContent";

export const NULL_VALUE = "-";

export type ConnectedValueProps = {
  type: "string" | "number" | "link" | "datetime" | "boolean" | "enum" | "array"
  value: any,
  /**
   * Only used when the type is string or number to insert something before the value.
   */
  pre?: string,
  /**
   * Only used when the type is string or number to insert something after the value
   */
  post?: string,
  /**
   * Only used when the type is link.
   */
  href?: string,
  /**
   * Only used when the type is link.
   */
  newWindow?: boolean,
  /**
   * Only used when the type is enum or array to translate the key to a string.
   */
  map?: { [key: string]: string },
  /**
   * Only used when the type is a boolean to use check and X instead of Yes and No.
   */
  useIcons?: boolean,
}

export const renderValue = {
  string: (value: string, pre?: string, post?: string) =>
    value ? `${pre ?? ""}${value}${post ?? ""}` : NULL_VALUE,
  number: (value: string | number, pre?: string, post?: string) =>
    value === null || value === "" ? `${pre ?? ""}${value}${post ?? ""}` : NULL_VALUE,
  link: (value: string, href: string, newWindow=false) =>
    value ? <Link href={href} target={newWindow ? "_blank" : undefined}>{value}</Link> : NULL_VALUE,
  datetime: (value: Date) =>
    value ? <time>{value.toDateString()}</time> : NULL_VALUE,
  boolean: (value: boolean, useIcons=false) =>
    useIcons ? (value ? <CheckIcon /> : <CloseIcon />) : (value ? "Yes" : "No"),
  enum: (value: string, map: { [key: string]: string }) =>
    value ? map ? map[value] : value : NULL_VALUE,
  array: (value: string[], map?: { [key: string]: string }) =>
    value ? value.map(v => map ? (map[v] ? map[v] : v) : value) : NULL_VALUE,
  rte: (value: string) => value ? <RteContent html={value} /> : NULL_VALUE,
}

export const RenderValue = ({ value, type, pre, post, href, newWindow, map, useIcons }: ConnectedValueProps) => {
  if (value === null || value === "") {
    return NULL_VALUE;
  }

  const render = {
    string: () => renderValue.string(value, pre, post),
    number: () => renderValue.number(value, pre, post),
    link: () => renderValue.link(value, href ?? "#", newWindow),
    datetime: () => renderValue.datetime(value as Date),
    boolean: () => renderValue.boolean(value, useIcons),
    enum: () => !map ? NULL_VALUE : renderValue.enum(value, map),
    array: () => renderValue.array(value, map),
    rte: () => renderValue.rte(value),
  }

  return render[type]() ?? NULL_VALUE;
}