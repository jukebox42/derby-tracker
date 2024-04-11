"use server"
import { Permission, Prisma, Team } from "@prisma/client";

import { check as checkAccess } from "./access";
import { ActionResponseType, formatResponse, formatThrownErrorResponse, genericActionErrors } from ".";
import prisma from "#/lib/prisma";
import { validationSchema } from "#/lib/data/team";

/**
 * Protected Action
 * 
 * Returns a list of teams.
 */
export const list = async (filters?: Prisma.TeamWhereInput) => {
  const isOk = await checkAccess([Permission.TEAM_READ, Permission.TEAM_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  try {
    const teams = await prisma.team.findMany({
      where: filters
    });

    return formatResponse<Team[]>(teams);
  } catch (e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Returns a specific team.
 */
export const get = async (filters: Prisma.TeamWhereInput) => {
  const isOk = await checkAccess([Permission.TEAM_READ, Permission.TEAM_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  try {
    const team = await prisma.team.findUnique({
      where: filters as any,
    });

    if (!team) {
      return genericActionErrors.notFound();
    }

    return formatResponse<Team>(team);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Creates a new team
 */
export const create = async (team: Omit<Team, "id" | "createdAt" | "updatedAt">) => {
  const isOk = await checkAccess([Permission.TEAM_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const cleanTeam = {
    name: team.name,
    description: team.description ?? null,
    level: team.level,
  }

  try {
    await validationSchema.validate(cleanTeam);

    const newTeam = await prisma.team.create({
      data: { ...cleanTeam }
    });

    return formatResponse<Team>(newTeam);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * delete an existing team.
 */
export const remove = async (id: string) => {
  const isOk = await checkAccess([Permission.TEAM_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  try {
    await prisma.team.delete({
      where: { id }
    });
    return formatResponse(true);
  } catch (e) {
    return formatThrownErrorResponse(e);
  }
}