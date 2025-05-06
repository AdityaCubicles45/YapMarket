import { motion } from 'framer-motion';
import { TrophyIcon, ChartBarIcon, FireIcon } from '@heroicons/react/24/outline';
import { Yapper } from '@/app/types/dashboard';

interface StatsCardsProps {
  yapper: Yapper;
  reputationScore: number;
}

export default function StatsCards({ yapper, reputationScore }: StatsCardsProps) {
  const successRate = yapper.totalSubmissions === 0 
    ? 0 
    : ((yapper.successfulSubmissions / yapper.totalSubmissions) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground/90 text-sm text-white font-medium">Reputation Score</p>
            <p className="text-4xl font-bold text-foreground mt-1">{reputationScore}</p>
          </div>
          <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <TrophyIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground/90 text-sm text-white font-medium">Success Rate</p>
            <p className="text-4xl font-bold text-foreground mt-1">{successRate}%</p>
          </div>
          <div className="h-12 w-12 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-foreground/90 text-sm text-white font-medium">Current Streak</p>
            <p className="text-4xl font-bold text-foreground mt-1">{yapper.currentStreak} days</p>
          </div>
          <div className="h-12 w-12 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
            <FireIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </motion.div>
    </div>
  );
} 