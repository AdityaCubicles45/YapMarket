export interface Badge {
  id: string;
  type: BadgeType;
}

export interface BadgeType {
  name: string;
  description: string;
}

export interface Submission {
  id: string;
  date: string;
  success: boolean;
}

export interface Yapper {
  username: string;
  profileImage: string | null;
  totalSubmissions: number;
  successfulSubmissions: number;
  rejectedSubmissions: number;
  currentStreak: number;
  badges: Badge[];
  submissions: Submission[];
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