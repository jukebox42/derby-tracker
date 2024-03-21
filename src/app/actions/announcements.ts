"use server"
import { Announcement, Permission, Prisma } from "@prisma/client";
import prisma from "#/lib/prisma";

import { check as checkAccess, get as getAccess } from "./access";
import { ActionResponseType, formatResponse, formatThrownErrorResponse, genericActionErrors, hasPermission, sanitizeHtml } from ".";
import { validationSchema } from "#/lib/data/announcement";

/**
 * Protected Action
 * 
 * Returns a list of announcements.
 */
export const list = async (filters?: Prisma.AnnouncementWhereInput) => {
  const isOk = await checkAccess([Permission.ANNOUNCEMENTS_READ, Permission.ANNOUNCEMENTS_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const announcements = await prisma.announcement.findMany({
    where: filters,
    include: { author: true }
  });

  return formatResponse<Announcement[]>(announcements);
}

/**
 * Protected Action
 * 
 * Returns an announcement.
 */
export const get = async (id: string) => {
  const isOk = await checkAccess([Permission.ANNOUNCEMENTS_READ, Permission.ANNOUNCEMENTS_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id },
      include: { author: true }
    });

    if (!announcement) {
      return genericActionErrors.notFound();
    }

    return formatResponse<Announcement>(announcement);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Creates a new announcement
 */
export const create = async (announcement: Omit<Announcement, "id" | "authorId" | "createdAt" | "updatedAt">) => {
  const session = await getAccess();
  if (session.type === ActionResponseType.ERROR || !hasPermission([Permission.ANNOUNCEMENTS_MANAGE], session.data)) {
    return genericActionErrors.permissionDenied();
  }

  const cleanAnnouncement = {
    title: announcement.title,
    description: sanitizeHtml(announcement.description),
    authorId: session.data.memberId,
  }

  try {
    await validationSchema.validate(cleanAnnouncement);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }

  const newAnnouncement = await prisma.announcement.create({
    data: { ...cleanAnnouncement }
  });

  return formatResponse<Announcement>(newAnnouncement);
}

/**
 * Protected Action
 * 
 * Edit an existing announcement
 */
export const edit = async (id: string, announcement: Omit<Announcement, "id" | "authorId" | "createdAt" | "updatedAt">) => {
  // TODO: do we only let them edit if they were the author?
  const isOk = await checkAccess([Permission.ANNOUNCEMENTS_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const cleanAnnouncement = {
    title: announcement.title,
    description: announcement.description,
  }

  try {
    await validationSchema.validate(cleanAnnouncement);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }

  const editAnnouncement = await prisma.announcement.update({
    where: { id },
    data: { ...cleanAnnouncement }
  });

  return formatResponse<Announcement>(editAnnouncement);
}

/**
 * Protected Action
 * 
 * Remove an existing announcement
 */
export const remove = async (id: string) => {
  // TODO: do we only let them edit if they were the author?
  const isOk = await checkAccess([Permission.ANNOUNCEMENTS_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  try {
    await prisma.announcement.delete({
      where: { id },
    });

    return formatResponse(true);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}