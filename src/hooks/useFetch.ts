import { useQuery } from '@tanstack/react-query';
import { searchYouTube } from '../services/youtubeApi';
import { useDebounce } from './useDebounce';

export const useFetch = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);

  return useQuery({
    queryKey: ['youtubeSearch', debouncedQuery],
    queryFn: ({ signal }) => searchYouTube(debouncedQuery, signal),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
