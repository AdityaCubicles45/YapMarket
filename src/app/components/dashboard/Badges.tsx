import { motion } from 'framer-motion';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { Yapper } from '@/app/types/dashboard';

interface BadgesProps {
  yapper: Yapper;
}

export default function Badges({ yapper }: BadgesProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <h2 className="text-xl font-semibold mb-6 text-foreground">Badges Earned</h2>
      {yapper.badges.length === 0 ? (
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
          <TrophyIcon className="h-12 w-12 text-white dark:text-gray-400 mx-auto mb-4" />
          <p className="text-foreground/90 text-white">
            No badges earned yet. Keep submitting to earn badges!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {yapper.badges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <h3 className="font-medium text-foreground">{badge.type.name}</h3>
              <p className="text-sm text-foreground/90 mt-1">{badge.type.description}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
} 