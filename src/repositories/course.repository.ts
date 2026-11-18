import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { Course, CourseInput } from '../models/course.model';

const isNotFoundError = (error: unknown): boolean => {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  );
};

export async function findAll(): Promise<Course[]> {
  return prisma.course.findMany({
    orderBy: { id: 'asc' },
  });
}

export async function findById(id: number): Promise<Course | null> {
  return prisma.course.findUnique({
    where: { id },
  });
}

export async function create(data: CourseInput): Promise<Course> {
  return prisma.course.create({
    data,
  });
}

export async function update(
  id: number,
  data: Partial<CourseInput>
): Promise<Course | null> {
  try {
    return await prisma.course.update({
      where: { id },
      data,
    });
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

export async function remove(id: number): Promise<boolean> {
  try {
    await prisma.course.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (isNotFoundError(error)) return false;
    throw error;
  }
}