import { Request, Response } from 'express';
import * as spaceRepository from '../repositories/space.repository';

export const getSpaces = async (_req: Request, res: Response) => {
  try {
    const spaces = await spaceRepository.findAllSpaces();
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los espacios' });
  }
};

export const getSpaceById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const space = await spaceRepository.findSpaceById(id);

    if (!space) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }

    res.status(200).json(space);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el espacio' });
  }
};

export const createSpace = async (req: Request, res: Response) => {
  try {
    const { name, capacity, location } = req.body;
    const newSpace = await spaceRepository.createSpace({
      name,
      capacity: Number(capacity),
      location,
    });
    res.status(201).json(newSpace);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el espacio' });
  }
};

export const updateSpace = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, capacity, location } = req.body;
    const updated = await spaceRepository.updateSpace(id, {
      ...(name !== undefined && { name }),
      ...(capacity !== undefined && { capacity: Number(capacity) }),
      ...(location !== undefined && { location }),
    });

    if (!updated) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el espacio' });
  }
};

export const deleteSpace = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await spaceRepository.removeSpace(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el espacio' });
  }
};