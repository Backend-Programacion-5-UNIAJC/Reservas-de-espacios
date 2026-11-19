import { Request, Response } from 'express';
import * as reservationRepository from '../repositories/reservation.repository';

export const getReservations = async (_req: Request, res: Response) => {
  try {
    const reservations = await reservationRepository.findAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

export const getReservationById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const reservation = await reservationRepository.findReservationById(id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la reserva' });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { date, startTime, endTime, spaceId, courseId } = req.body;
    const newReservation = await reservationRepository.createReservation({
      date,
      startTime,
      endTime,
      spaceId,
      courseId,
    });
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reserva. Verifica que el Space ID y Course ID existan.' });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await reservationRepository.removeReservation(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};