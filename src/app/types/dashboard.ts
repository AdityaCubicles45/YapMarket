export interface Badge {
  id: string;
  yapperId: string;
  typeId: string;
  assignedAt: string;
  type: {
    id: string;
    name: string;
    description: string;
  };
}

export interface SubmissionData {
  date: string;
  successful: number;
  total: number;
}

export interface Yapper {
  id: string;
  username: string;
  email: string;
  bio?: string;
  totalSubmissions: number;
  successfulSubmissions: number;
  rejectedSubmissions: number;
  currentStreak: number;
  longestStreak: number;
  lastActive: string | null;
  badges: Badge[];
  submissions: SubmissionData[];
  profileImage?: string | null;
  emailNotifications: boolean;
}

export interface ComparisonUser {
  username: string;
  reputationScore: number;
  successfulSubmissions: number;
  currentStreak: number;
}

export interface ReputationData {
  yapper: Yapper;
  reputationScore: number;
  comparison: {
    users: ComparisonUser[];
  };
} 