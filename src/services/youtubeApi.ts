import type { YouTubeVideo, YouTubeSearchResultItem } from '../types/youtube';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export const searchYouTube = async (
  query: string,
  signal: AbortSignal
): Promise<YouTubeVideo[]> => {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: '10',
    q: query,
    type: 'video',
    key: YOUTUBE_API_KEY,
  });

  const response = await fetch(`${YOUTUBE_API_URL}?${params}`, { signal });

  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  const data = await response.json();

  return data.items.map((item: YouTubeSearchResultItem) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    publishedAt: item.snippet.publishedAt,
  }));
};
