import {Request, Response} from 'express';
import {db} from '../../../db/in-memory.db.ts'
import { HttpStatus } from '../../../core/types/http-status.ts';

export function getVideoListHandler(req: Request, res: Response)
{
  res
    .status(HttpStatus.Ok_200)
    .send(db.videos)
}