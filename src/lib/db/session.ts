"use server"
import prisma from "../prisma";
import { getAccess } from "./access";

const MAX_AGE = 30 * 24 * 60 * 60;

export const createSession = async (memberId: string) => {
  try {
    await prisma.session.delete({
      where: { memberId }
    });
  } catch {}; // we don't care if delete fails.
  const permissions = await getAccess(memberId);
  return prisma.session.create({
    data: {
      memberId,
      maxAge: MAX_AGE,
      permissions,
    }
  });
}

export const getSession = async (sessionId: string, memberId: string) => {
  const session = await prisma.session.findUnique({
    where: { id: sessionId, memberId }
  });

  if (!session) {
    return false;
  }

  if (session.updatedAt.getTime() + MAX_AGE < new Date().getTime()) {
    return false;
  }

  await updateSession(sessionId);

  return session;
}

export const updateSession = (sessionId: string) =>
  prisma.session.update({
    where: { id: sessionId },
    data: {}
  });

export const deleteSession = (sessionId: string) => 
  prisma.session.delete({
    where: { id: sessionId }
  });