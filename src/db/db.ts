// src/db/db.ts
import { Videos } from '../core/types/type';


export const db: { videos: Videos[] } = {
  videos: [
    {
      id: 1,
      title: 'front-end',
      author: 'admin',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: ['P144'],
    },
    {
      id: 2,
      title: 'back-end',
      author: 'admin',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: new Date().toISOString(),
      availableResolutions: ['P144'],
    },
    // ... остальные по тому же шаблону
  ],
};
