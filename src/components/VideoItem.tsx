import React from 'react';
import type { YouTubeVideo } from '../types/youtube';

interface VideoItemProps {
  video: YouTubeVideo;
}

export const VideoItem: React.FC<VideoItemProps> = ({ video }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-45 object-cover block"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold mb-2 text-black">
          {video.title}
        </h3>
        <p className="text-sm text-gray-600 mb-1">{video.channelTitle}</p>
        <p className="text-xs text-gray-400">{formatDate(video.publishedAt)}</p>
      </div>
    </a>
  );
};
