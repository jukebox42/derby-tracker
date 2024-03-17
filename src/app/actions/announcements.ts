"use server"
import { Announcement, Permission, Prisma } from "@prisma/client";
import prisma from "#/lib/prisma";

import { check as checkAccess, get as getAccess } from "./access";
import { ActionResponseType, formatResponse, genericActionErrors, hasPermission } from ".";
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
 * Creates a new announcement
 */
export const create = async (announcement: Omit<Announcement, "id" | "authorId" | "createdAt" | "updatedAt">) => {
  const session = await getAccess();
  if (session.type === ActionResponseType.ERROR || !hasPermission([Permission.ANNOUNCEMENTS_MANAGE], session.data)) {
    return genericActionErrors.permissionDenied();
  }

  const cleanAnnouncement = {
    title: announcement.title,
    description: announcement.description,
    authorId: session.data.memberId,
  }

  try {
    await validationSchema.validate(cleanAnnouncement);
  } catch(e) {
    return genericActionErrors.invalid("" + e);
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
    return genericActionErrors.invalid("" + e);
  }

  const editAnnouncement = await prisma.announcement.update({
    where: { id },
    data: { ...cleanAnnouncement }
  });

  return formatResponse<Announcement>(editAnnouncement);
}