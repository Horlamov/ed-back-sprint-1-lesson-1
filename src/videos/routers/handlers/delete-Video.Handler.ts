import {Request ,Response} from 'express';
import { db } from '../../../db/in-memory.db.ts';
import { HttpStatus } from '../../../core/types/http-status.ts';

export function deleteVideoHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  const foundIndex = db.videos.findIndex((v) => v.id === +req.params.id);
  if (foundIndex === -1) {
    res.sendStatus(HttpStatus.NotFound_404);
    return;
  }
  db.videos.splice(foundIndex, 1);
  res.sendStatus(HttpStatus.NoContent_204);
  return;
}