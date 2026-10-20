import {Request, Response} from 'express';
import { db } from '../../../db/in-memory.db.ts';
import { HttpStatus } from '../../../core/types/http-status.ts';


export function getVideoHandler(
  req: Request<{id: string}>,
  res: Response
) {
  const foundVideo = db.videos.find((v) => v.id === Number(req.params.id));

  if (!foundVideo) {
    res.sendStatus(HttpStatus.NotFound_404);
    return;
  }
  res.status(HttpStatus.Ok_200).send(foundVideo);
}
