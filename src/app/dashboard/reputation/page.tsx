'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ReputationData } from '@/app/types/dashboard';
import TwitterIdInput from '@/app/components/dashboard/TwitterIdInput';
import WelcomeMessage from '@/app/components/dashboard/WelcomeMessage';
import StatsCards from '@/app/components/dashboard/StatsCards';
import SubmissionStats from '@/app/components/dashboard/SubmissionStats';
import Badges from '@/app/components/dashboard/Badges';
import ProgressChart from '@/app/components/dashboard/ProgressChart';
import Comparison from '@/app/components/dashboard/Comparison';
import ProfilePhoto from '@/app/components/dashboard/ProfilePhoto';

export default function ReputationDashboard() {
  const [data, setData] = useState<ReputationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [twitterId, setTwitterId] = useState('');

  const fetchReputationData = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/yapper/${id}/reputation`);
      if (!res.ok) {
        throw new Error(res.status === 404 ? 'Yapper not found' : 'Failed to fetch reputation data');
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!twitterId.trim()) {
      setError('Please enter a Twitter ID');
      return;
    }
    fetchReputationData(twitterId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-black">Reputation Dashboard</h1>
          <p className="text-black mb-8">Track your Yapper reputation and compare with others</p>
        </motion.div>
        <ProfilePhoto size="lg" username={data?.yapper.username} imageUrl={data?.yapper.profileImage} />
      </div>

      <TwitterIdInput
        twitterId={twitterId}
        setTwitterId={setTwitterId}
        handleSubmit={handleSubmit}
        error={error}
      />

      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {data.yapper.totalSubmissions === 0 && <WelcomeMessage />}

          <StatsCards yapper={data.yapper} reputationScore={data.reputationScore} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SubmissionStats yapper={data.yapper} />
            <Badges yapper={data.yapper} />
          </div>

          <ProgressChart submissions={data.yapper.submissions} />
          <Comparison users={data.comparison.users} />
        </motion.div>
      )}
    </div>
  );
} 