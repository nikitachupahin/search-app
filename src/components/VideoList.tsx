import React from 'react';
import type { YouTubeVideo } from '../types/youtube';
import { VideoItem } from './VideoItem';

interface VideoListProps {
  videos: YouTubeVideo[];
}

export const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
};
