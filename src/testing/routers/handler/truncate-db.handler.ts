import {Request, Response} from 'express';
import { HttpStatus } from '../../../core/types/http-status.ts';
import { db } from '../../../db/in-memory.db'

export function truncateDbHandler(
  _req: Request,
  res: Response
) {
  db.videos = [];
  res.sendStatus(HttpStatus.NoContent_204)
}