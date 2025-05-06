import { motion } from 'framer-motion';

interface TwitterIdInputProps {
  twitterId: string;
  setTwitterId: (id: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string | null;
}

export default function TwitterIdInput({ twitterId, setTwitterId, handleSubmit, error }: TwitterIdInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="twitterId" className="block text-sm font-medium text-foreground mb-2">
            Enter Twitter ID
          </label>
          <div className="mt-1 flex rounded-lg shadow-sm">
            <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">
              @
            </span>
            <input
              type="text"
              id="twitterId"
              value={twitterId}
              onChange={(e) => setTwitterId(e.target.value)}
              className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-lg sm:text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-foreground"
              placeholder="username"
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          View Reputation
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-lg">
          {error}
        </div>
      )}
    </motion.div>
  );
} 