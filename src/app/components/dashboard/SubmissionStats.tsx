import { motion } from 'framer-motion';
import { ArrowTrendingUpIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Yapper } from '@/app/types/dashboard';

interface SubmissionStatsProps {
  yapper: Yapper;
}

export default function SubmissionStats({ yapper }: SubmissionStatsProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <h2 className="text-xl font-semibold mb-6 text-foreground">Submission Statistics</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div>
            <p className="text-foreground/90 text-white text-sm">Total Submissions</p>
            <p className="text-2xl font-bold text-foreground mt-1">{yapper.totalSubmissions}</p>
          </div>
          <ArrowTrendingUpIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>
        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div>
            <p className="text-foreground/90 text-white text-sm">Successful Submissions</p>
            <p className="text-2xl font-bold text-foreground mt-1">{yapper.successfulSubmissions}</p>
          </div>
          <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div>
            <p className="text-foreground/90 text-white text-sm">Rejected Submissions</p>
            <p className="text-2xl font-bold text-foreground mt-1">{yapper.rejectedSubmissions}</p>
          </div>
          <ChartBarIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
      </div>
      {yapper.totalSubmissions === 0 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200">
            Welcome! Start submitting to build your reputation.
          </p>
        </div>
      )}
    </motion.div>
  );
} 