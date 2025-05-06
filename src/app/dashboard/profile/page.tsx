'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CameraIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ProfileFormData {
  username: string;
  email: string;
  bio: string;
  emailNotifications: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    email: '',
    bio: '',
    emailNotifications: true,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Here you would typically upload to your storage service
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      toast.success('Profile photo updated');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload profile photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const savePromise = new Promise<string>(async (resolve, reject) => {
      try {
        const response = await fetch('/api/yapper/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            profileImage,
            yapperId: 'current-user-id', // You'll need to get this from your auth system
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update profile');
        }

        // Refresh the page data
        router.refresh();
        resolve('Profile updated successfully');
      } catch (error) {
        console.error('Error saving profile:', error);
        reject('Failed to update profile');
      } finally {
        setIsSaving(false);
      }
    });

    toast.promise(savePromise, {
      loading: 'Updating profile...',
      success: (message: string) => {
        // Navigate back to dashboard after successful update
        setTimeout(() => {
          router.push('/dashboard/reputation');
        }, 1000);
        return message;
      },
      error: (error: string) => error,
    });
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-black">Profile Settings</h1>
        <p className="text-black mb-8">Manage your YapMarket profile and preferences</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="h-24 w-24 text-gray-600" />
              )}
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <CameraIcon className="h-5 w-5 text-white" />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Profile Photo</h2>
              <p className="text-gray-400 mt-1">
                Upload a photo to personalize your profile
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your username"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-400">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Email Notifications</h3>
                <p className="text-gray-400 text-sm">Receive updates about your reputation</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleToggleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/reputation')}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 