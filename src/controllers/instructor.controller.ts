import { Request, Response } from 'express';
import * as instructorRepo from '../repositories/instructor.repository';

export const getInstructors = async (_req: Request, res: Response) => {
  const instructors = await instructorRepo.getAllInstructors();
  res.json(instructors);
};

export const getInstructorById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const instructor = await instructorRepo.getInstructorById(id);
  if (!instructor) return res.status(404).json({ message: 'Instructor no encontrado' });
  res.json(instructor);
};

export const createInstructor = async (req: Request, res: Response) => {
  try {
    const newInstructor = await instructorRepo.createInstructor(req.body);
    res.status(201).json(newInstructor);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear instructor', error });
  }
};

export const updateInstructor = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await instructorRepo.updateInstructor(id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: 'No se pudo actualizar el instructor' });
  }
};

export const deleteInstructor = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await instructorRepo.deleteInstructor(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'No se pudo eliminar el instructor' });
  }
};