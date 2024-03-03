import { Permission, Session } from "@prisma/client";

/**
 * An enum of error response codes
 */
export enum ActionErrorCodes {
  AUTH_FAIL_MISSING,
  AUTH_FAIL_INVALID,
  AUTH_FAIL_ERROR,

  SESSION_INVALID,
  SESSION_ERROR,

  PERMISSION_DENIED,
  NOT_FOUND,
  FAILED,
  INVALID,
}

export enum ActionResponseType {
  OK,
  ERROR
}

/**
 * A response error object.
 */
export type ActionResponseError = {
  type: ActionResponseType.ERROR,
  error: {
    id: ActionErrorCodes,
    message: string,
  }
}

/**
 * A successful response
 */
export type ActionSuccess<T> = {
  type: ActionResponseType.OK,
  data: T,
}

export type ActionResponse<T> = ActionSuccess<T> | ActionResponseError;

/**
 * Structure an action response that was successful.
 */
export const formatResponse = <T>(data : T): ActionResponse<T> => {
  return {
    type: ActionResponseType.OK,
    data,
  }
};

/**
 * Structure an action response that failed.
 */
export const formatErrorResponse = (id: ActionErrorCodes, message: string): ActionResponseError => {
  return {
    type: ActionResponseType.ERROR,
    error: {
      id,
      message,
    }
  }
};

type GenericActionErrors = Record<string, (message?: string) => ActionResponseError>;

/**
 * Generic action error responses.
 */
export const genericActionErrors: GenericActionErrors = {
  permissionDenied: (message) =>
    formatErrorResponse(ActionErrorCodes.PERMISSION_DENIED, message ?? "Permission denied."),
  notFound: (message) => formatErrorResponse(ActionErrorCodes.NOT_FOUND, message ?? "Item not found."),
  failed: (message) => formatErrorResponse(ActionErrorCodes.FAILED, message ?? "Action failed."),
  invalid: (message) => formatErrorResponse(ActionErrorCodes.FAILED, message ?? "Invalid request."),
}

/**
 * Check if on provided permission is within a session.
 * 
 * DOES NOT VALIDATE SESSION.
 */
export const hasPermission = (permissions: Permission[], session: Session) => 
  !!permissions.find(p => session.permissions.includes(p));