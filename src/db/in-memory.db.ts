// src/inMemoryDb/inMemoryDb.ts
import { Resolution, Video } from '../videos/types/video';

export const db = {
  videos: <Video[]> [
    {
      id: 1,
      title: 'front-end',
      author: 'admin',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: [Resolution.P144],
    },
    {
      id: 2,
      title: 'back-end',
      author: 'admin',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: [Resolution.P360],
    },
    {
      id: 3,
      title: 'Dev-ops',
      author: 'admin',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: [Resolution.P480],
    },
    {
      id: 4,
      title: 'QA-test',
      author: 'admin',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: [Resolution.P1440],
    },
  ],
};
