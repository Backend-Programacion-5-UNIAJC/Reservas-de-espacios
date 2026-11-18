import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { Reservation, ReservationInput } from '../models/reservation.model';

const isNotFoundError = (error: unknown): boolean => {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  );
};

export async function findAllReservations(): Promise<any[]> {
  return prisma.reservation.findMany({
    include: {
      space: true,
      course: true,
    },
    orderBy: { id: 'asc' },
  });
}

export async function findReservationById(id: number): Promise<any | null> {
  return prisma.reservation.findUnique({
    where: { id },
    include: {
      space: true,
      course: true,
    },
  });
}

export async function createReservation(data: ReservationInput): Promise<Reservation> {
  return prisma.reservation.create({
    data: {
      date: new Date(data.date),
      startTime: data.startTime,
      endTime: data.endTime,
      spaceId: Number(data.spaceId),
      courseId: Number(data.courseId),
    },
  });
}

export async function removeReservation(id: number): Promise<boolean> {
  try {
    await prisma.reservation.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (isNotFoundError(error)) return false;
    throw error;
  }
}