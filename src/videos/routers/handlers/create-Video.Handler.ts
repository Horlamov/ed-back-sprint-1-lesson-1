import {Request, Response} from 'express';
import { db } from '../../../db/in-memory.db.ts';
import { Resolution, Video } from '../../types/video.ts';
import { HttpStatus } from '../../../core/types/http-status.ts';
import { VideoInputDto } from '../../dto/video.input.dto.ts';

export function createVideoHandler(
  req: Request <{}, {}, VideoInputDto>,
  res: Response,
) {
  const lastVideo = db.videos[db.videos.length - 1];
  const createdAt = new Date();
  const publicationDate = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
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

  if (errorsMessages.length > 0) {
    res.status(HttpStatus.BadRequest_400).json({ errorsMessages });
    return;
  }

  const newVideo: Video = {
    id: lastVideo ? lastVideo.id + 1 : 1,
    title: req.body.title,
    author: req.body.author ?? 'admin',
    canBeDownloaded: req.body.canBeDownloaded ?? false,
    minAgeRestriction: req.body.minAgeRestriction ?? null,
    createdAt: createdAt.toISOString(),
    publicationDate: publicationDate.toISOString(),
    availableResolutions: req.body.availableResolutions ?? ['P144'],
  };

  //3. Добавляем созданное видео newVideo в БД
  db.videos.push(newVideo);
  res.status(HttpStatus.Created_201).send(newVideo);
}