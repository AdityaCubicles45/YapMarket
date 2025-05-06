import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Yapper } from '@/app/types/dashboard';

interface ProgressChartProps {
  submissions: Yapper['submissions'];
}

export default function ProgressChart({ submissions }: ProgressChartProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 mb-8"
    >
      <h2 className="text-xl font-semibold mb-6 text-foreground">Reputation Progress</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={submissions}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
            <XAxis 
              dataKey="date" 
              className="text-sm text-foreground"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-sm text-foreground"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--foreground)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                color: 'var(--foreground)',
              }}
              formatter={(value: number) => [`${value}%`, 'Success Rate']}
            />
            <Line
              type="monotone"
              dataKey="successRate"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: '#3b82f6' }}
              name="Success Rate"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
} 