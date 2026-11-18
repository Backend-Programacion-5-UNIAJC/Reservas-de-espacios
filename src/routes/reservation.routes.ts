import { Router } from 'express';
import {
  getReservations,
  getReservationById,
  createReservation,
  deleteReservation,
} from '../controllers/reservation.controller';

const router = Router();

router.get('/', getReservations);
router.get('/:id', getReservationById);
router.post('/', createReservation);
router.delete('/:id', deleteReservation);

export default router;