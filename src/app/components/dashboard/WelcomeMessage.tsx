import { motion } from 'framer-motion';
import { TrophyIcon } from '@heroicons/react/24/outline';

export default function WelcomeMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center">
            <TrophyIcon className="h-6 w-6 text-blue-400" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">Welcome to YapMarket!</h3>
          <p className="mt-2 text-white">
            You're just getting started. Submit your first Yap to begin building your reputation and earning badges.
          </p>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-white">Quick Start Guide:</h4>
            <ul className="mt-2 space-y-2 text-sm text-white">
              <li>• Submit your first Yap to start earning reputation</li>
              <li>• Maintain a daily streak to boost your score</li>
              <li>• Earn badges for consistent performance</li>
              <li>• Compare your progress with other Yappers</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 