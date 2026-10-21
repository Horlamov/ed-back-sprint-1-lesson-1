import { db } from '../db/in-memory.db.ts';
import { Video } from '../videos/types/video.ts'


export const blogRepository = {
  findALl(): Video[] {
    return db.videos;
  },

  findById(id: number): Video | null {
    return db.videos.find((v) => v.id === id) ?? null;
  },

  create(newVideo: Omit<Video, 'id'>): Video {
    const lastVideo = db.videos[db.videos.length - 1];
    const created: Video = {
      id: lastVideo ? lastVideo.id + 1 : 1,
      ... newVideo
    };
    db.videos.push(created);
    return created;
  },

  update(id: number, video: Omit<Video, 'id' | 'createdAt'>): boolean {
    const index = db.videos.findIndex((v) => v.id == id);
    if (index === -1 ) {
      return false;
    }

    db.videos[index] = {...db.videos[index], ...video};
    return true;

  },

  delete(id: number): boolean {
    const foundIndex = db.videos.findIndex((v) => v.id === id);
    if (foundIndex === -1) {
      return false;
    }

    db.videos.splice(foundIndex, 1);
    return true
  },
  };