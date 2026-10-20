import { Router } from 'express';
import { getVideoListHandler } from './handlers/get-video-list.handler';
import { getVideoHandler } from './handlers/get-video.handler'
import { createVideoHandler } from './handlers/create-Video.Handler.ts';
import { deleteVideoHandler } from './handlers/delete-Video.Handler.ts';
import { updateVideoHandler } from './handlers/update-Videos.Handler.ts';
import { VIDEOS_ROUTES } from '../constants/videos.paths';

export const videosRouter = Router({});

videosRouter
  .get(VIDEOS_ROUTES.ROOT, getVideoListHandler)
  .get(VIDEOS_ROUTES.BY_ID, getVideoHandler)
  .post(VIDEOS_ROUTES.ROOT, createVideoHandler)
  .put(VIDEOS_ROUTES.BY_ID, updateVideoHandler)
  .delete(VIDEOS_ROUTES.BY_ID, deleteVideoHandler);