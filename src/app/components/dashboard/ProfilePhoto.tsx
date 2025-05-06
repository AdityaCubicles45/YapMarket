'use client';

import { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ProfilePhotoProps {
  imageUrl?: string | null;
  username?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProfilePhoto({ imageUrl, username, size = 'md' }: ProfilePhotoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <Link href="/dashboard/profile" className="group">
      <div className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={username || 'Profile'}
            className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-800 group-hover:border-blue-500 transition-colors`}
          />
        ) : (
          <UserCircleIcon
            className={`${sizeClasses[size]} text-gray-600 group-hover:text-blue-500 transition-colors`}
          />
        )}
        <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
      </div>
    </Link>
  );
} 