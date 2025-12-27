import React, { useState } from 'react';
import { SearchInput } from './SearchInput';
import { VideoList } from './VideoList';
import { useFetch } from '../hooks/useFetch';

export const Youtube: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: videos = [],
    isLoading,
    isError,
    error,
  } = useFetch(searchQuery);

  const renderStatus = () => {
    if (isLoading) return <div>Loading...</div>;

    if (isError) {
      return (
        <div className="text-red-600">
          {error instanceof Error ? error.message : 'Something went wrong'}
        </div>
      );
    }

    if (videos.length === 0) {
      return (
        <div>
          {searchQuery
            ? 'No results found'
            : 'Enter a query to search for videos'}
        </div>
      );
    }

    return null;
  };

  const statusContent = renderStatus();

  return (
    <div className="max-w-300 mx-auto">
      <h1 className="text-3xl font-bold mb-5 text-center text-black">
        Search YouTube videos
      </h1>

      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      {statusContent && (
        <div className="text-center py-10 text-lg text-gray-500">
          {statusContent}
        </div>
      )}

      <VideoList videos={videos} />
    </div>
  );
};
