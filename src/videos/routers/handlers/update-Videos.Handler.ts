import {Request, Response} from 'express';
import { db } from '../../../db/in-memory.db.ts';
import { HttpStatus } from '../../../core/types/http-status.ts';
import { Resolution } from '../../types/video.ts';
import request from 'supertest';
import {Video} from '../../types/video'
import { VideoInputDto } from '../../dto/video.input.dto.ts';

export function updateVideoHandler(
  req: Request<{}, {}, Video, VideoInputDto>,
  res: Response,
) {
  const foundVideo = db.videos.find((v) => v.id === Number(req.params.id));
  if (!foundVideo) {
    res.sendStatus(HttpStatus.NotFound_404);
    return;
  }
  let errorsMessages: { message: string; field: string }[] = [];
  if (
    typeof req.body.title !== 'string' ||
    req.body.title.trim().length === 0 ||
    req.body.title.length > 40
  ) {
    errorsMessages.push({ message: 'Error title', field: 'title' });
  }
  if (
    typeof req.body.author !== 'string' ||
    req.body.author.trim().length === 0 ||
    req.body.author.length > 20
  ) {
    errorsMessages.push({ message: 'Error author', field: 'author' });
  }

  if (typeof req.body.canBeDownloaded !== 'boolean') {
    errorsMessages.push({
      message: 'Error canBeDownloaded',
      field: 'canBeDownloaded',
    });
  }
  if (
    req.body.minAgeRestriction !== null &&
    (typeof req.body.minAgeRestriction !== 'number' ||
      req.body.minAgeRestriction < 1 ||
      req.body.minAgeRestriction > 18)
  ) {
    errorsMessages.push({
      message: 'Error minAgeRestriction',
      field: 'minAgeRestriction',
    });
  }

  if (
    !Array.isArray(req.body.availableResolutions) ||
    req.body.availableResolutions.length === 0 ||
    !req.body.availableResolutions.every((r: Resolution) =>
      Object.values(Resolution).includes(r),
    )
  ) {
    errorsMessages.push({
      message: 'Error availableResolutions',
      field: 'availableResolutions',
    });
  }

  if (
    typeof req.body.publicationDate !== 'string' ||
    isNaN(Date.parse(req.body.publicationDate))
  ) {
    errorsMessages.push({
      message: 'Error publicationDate',
      field: 'publicationDate',
    });
  }

  if (errorsMessages.length > 0) {
    res.status(HttpStatus.BadRequest_400).json({ errorsMessages });
    return;
  }

  foundVideo.title = req.body.title;
  foundVideo.author = req.body.author;
  foundVideo.availableResolutions = req.body.availableResolutions;
  foundVideo.canBeDownloaded = req.body.canBeDownloaded;
  foundVideo.minAgeRestriction = req.body.minAgeRestriction;
  foundVideo.publicationDate = req.body.publicationDate;

  res.sendStatus(HttpStatus.NoContent_204);
}