import { motion } from 'framer-motion';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { ComparisonUser } from '@/app/types/dashboard';

interface ComparisonProps {
  users: ComparisonUser[];
}

export default function Comparison({ users }: ComparisonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center space-x-2 mb-6">
        <UserGroupIcon className="h-6 w-6 text-foreground" />
        <h2 className="text-xl font-semibold text-foreground">Compare with Other Yappers</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <motion.div
            key={user.username}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">{index + 1}</span>
                </div>
                <span className="font-medium text-foreground">@{user.username}</span>
              </div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Score: {user.reputationScore}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-foreground/90 text-white">Successful Submissions</span>
                <span className="font-medium text-foreground">
                  {user.successfulSubmissions}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-foreground/90 text-white">Current Streak</span>
                <span className="font-medium text-foreground">
                  {user.currentStreak} days
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 