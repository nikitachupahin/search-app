import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Youtube } from './components/Youtube';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 font-sans p-5">
        <Youtube />
      </div>
    </QueryClientProvider>
  );
}
