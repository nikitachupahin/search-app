import { useState, useEffect, useRef } from 'react';
import type { YouTubeVideo } from './types/youtube';
import { searchYouTube } from './services/youtubeApi';
import { useDebounce } from './hooks/useDebounce';
import { SearchInput } from './components/SearchInput';
import { VideoList } from './components/VideoList';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (!debouncedSearchQuery.trim()) {
        setVideos([]);
        setError(null);
        return;
      }

      abortControllerRef.current = new AbortController();
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchYouTube(
          debouncedSearchQuery,
          abortControllerRef.current.signal
        );
        setVideos(results);
      } catch (err) {
        if (err instanceof Error) {
          setError('Error uploading video');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
    return () => abortControllerRef.current?.abort();
  }, [debouncedSearchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-5">
      <div className="max-w-300 mx-auto">
        <h1 className="text-3xl font-bold mb-5 text-center text-black">
          Search YouTube videos
        </h1>

        <SearchInput value={searchQuery} onChange={setSearchQuery} />

        {(isLoading || error || videos.length === 0) && (
          <div className="text-center py-10 text-lg text-gray-500">
            {isLoading && <div>Loading...</div>}

            {error && <div className="text-red-600">{error}</div>}

            {!isLoading && !error && videos.length === 0 && (
              <div>
                {searchQuery
                  ? 'No results found'
                  : 'Enter a query to search for videos'}
              </div>
            )}
          </div>
        )}

        <VideoList videos={videos} />
      </div>
    </div>
  );
}
