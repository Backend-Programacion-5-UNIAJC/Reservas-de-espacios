import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { Instructor } from '../models/instructor.model';

const isNotFoundError = (error: unknown): boolean => {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  );
};

export async function getAllInstructors(): Promise<Instructor[]> {
  return prisma.instructor.findMany({
    orderBy: { id: 'asc' },
  });
}

export async function getInstructorById(id: number): Promise<Instructor | null> {
  return prisma.instructor.findUnique({
    where: { id },
  });
}

export async function createInstructor(data: Omit<Instructor, 'id'>): Promise<Instructor> {
  return prisma.instructor.create({
    data,
  });
}

export async function updateInstructor(
  id: number,
  data: Partial<Omit<Instructor, 'id'>>
): Promise<Instructor | null> {
  try {
    return await prisma.instructor.update({
      where: { id },
      data,
    });
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

export async function deleteInstructor(id: number): Promise<boolean> {
  try {
    await prisma.instructor.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (isNotFoundError(error)) return false;
    throw error;
  }
}