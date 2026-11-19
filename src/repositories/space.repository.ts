import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { Space, SpaceInput } from '../models/space.model';

const isNotFoundError = (error: unknown): boolean => {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  );
};

export async function findAllSpaces(): Promise<Space[]> {
  return prisma.space.findMany({
    orderBy: { id: 'asc' },
  });
}

export async function findSpaceById(id: number): Promise<Space | null> {
  return prisma.space.findUnique({
    where: { id },
  });
}

export async function createSpace(data: SpaceInput): Promise<Space> {
  return prisma.space.create({
    data,
  });
}

export async function updateSpace(
  id: number,
  data: Partial<SpaceInput>
): Promise<Space | null> {
  try {
    return await prisma.space.update({
      where: { id },
      data,
    });
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

export async function removeSpace(id: number): Promise<boolean> {
  try {
    await prisma.space.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (isNotFoundError(error)) return false;
    throw error;
  }
}