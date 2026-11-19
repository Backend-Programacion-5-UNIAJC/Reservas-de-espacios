import { Request, Response } from 'express';
import * as courseRepository from '../repositories/course.repository';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseRepository.findAll();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los cursos' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const course = await courseRepository.findById(id);

    if (!course) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el curso' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, capacity } = req.body;
    const newCourse = await courseRepository.create({
      title,
      capacity: Number(capacity),
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el curso' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, capacity } = req.body;
    const updated = await courseRepository.update(id, {
      ...(title !== undefined && { title }),
      ...(capacity !== undefined && { capacity: Number(capacity) }),
    });

    if (!updated) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el curso' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await courseRepository.remove(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
};