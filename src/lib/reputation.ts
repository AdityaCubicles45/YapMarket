import { PrismaClient, Badge, Yapper as PrismaYapper } from '@prisma/client';

const prisma = new PrismaClient();

type SubmissionWithStatus = {
  status: 'SUCCESS' | 'REJECTED';
  createdAt: Date;
};

type BadgeWithType = Badge & {
  type: {
    id: string;
    name: string;
    description: string;
  };
};

type YapperWithBadges = PrismaYapper & {
  badges: BadgeWithType[];
};

export async function updateYapperReputation(yapperId: string) {
  // Get all submissions for the yapper
  const submissions = await prisma.submission.findMany({
    where: { yapperId },
    select: {
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Calculate submission statistics
  const totalSubmissions = submissions.length;
  const successfulSubmissions = submissions.filter(
    (sub: SubmissionWithStatus) => sub.status === 'SUCCESS'
  ).length;
  const rejectedSubmissions = submissions.filter(
    (sub: SubmissionWithStatus) => sub.status === 'REJECTED'
  ).length;

  // Calculate current streak
  let currentStreak = 0;
  let lastSubmissionDate: Date | null = null;

  for (const submission of submissions.reverse()) {
    if (submission.status === 'SUCCESS') {
      if (!lastSubmissionDate) {
        currentStreak = 1;
        lastSubmissionDate = submission.createdAt;
      } else {
        const daysDiff = Math.floor(
          (lastSubmissionDate.getTime() - submission.createdAt.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (daysDiff <= 1) {
          currentStreak++;
          lastSubmissionDate = submission.createdAt;
        } else {
          break;
        }
      }
    } else {
      break;
    }
  }

  // Update yapper stats
  const updatedYapper = await prisma.yapper.update({
    where: { id: yapperId },
    data: {
      totalSubmissions,
      successfulSubmissions,
      rejectedSubmissions,
      currentStreak,
      lastActive: new Date(),
    },
    include: {
      badges: {
        include: {
          type: true,
        },
      },
    },
  });

  // Check and assign badges
  await checkAndAssignBadges(updatedYapper);

  return updatedYapper;
}

async function checkAndAssignBadges(yapper: YapperWithBadges) {
  // Get existing badges
  const existingBadges = await prisma.badge.findMany({
    where: { yapperId: yapper.id },
    include: { type: true },
  });

  // Check for submission count badges
  if (yapper.totalSubmissions >= 10) {
    await assignBadgeIfNotExists(
      yapper.id,
      'SUBMISSION_MILESTONE_10',
      existingBadges
    );
  }
  if (yapper.totalSubmissions >= 50) {
    await assignBadgeIfNotExists(
      yapper.id,
      'SUBMISSION_MILESTONE_50',
      existingBadges
    );
  }
  if (yapper.totalSubmissions >= 100) {
    await assignBadgeIfNotExists(
      yapper.id,
      'SUBMISSION_MILESTONE_100',
      existingBadges
    );
  }

  // Check for streak badges
  if (yapper.currentStreak >= 3) {
    await assignBadgeIfNotExists(yapper.id, 'STREAK_3', existingBadges);
  }
  if (yapper.currentStreak >= 7) {
    await assignBadgeIfNotExists(yapper.id, 'STREAK_7', existingBadges);
  }
  if (yapper.currentStreak >= 30) {
    await assignBadgeIfNotExists(yapper.id, 'STREAK_30', existingBadges);
  }

  // Check for success rate badges
  const successRate =
    yapper.totalSubmissions > 0
      ? yapper.successfulSubmissions / yapper.totalSubmissions
      : 0;

  if (successRate >= 0.8 && yapper.totalSubmissions >= 10) {
    await assignBadgeIfNotExists(yapper.id, 'HIGH_ACCURACY', existingBadges);
  }
  if (successRate >= 0.9 && yapper.totalSubmissions >= 20) {
    await assignBadgeIfNotExists(yapper.id, 'MASTER_ACCURACY', existingBadges);
  }
}

async function assignBadgeIfNotExists(
  yapperId: string,
  badgeTypeName: string,
  existingBadges: BadgeWithType[]
) {
  const hasBadge = existingBadges.some(
    (badge) => badge.type.name === badgeTypeName
  );

  if (!hasBadge) {
    const badgeType = await prisma.badgeType.findUnique({
      where: { name: badgeTypeName },
    });

    if (badgeType) {
      await prisma.badge.create({
        data: {
          yapperId,
          typeId: badgeType.id,
          assignedAt: new Date(),
        },
      });
    }
  }
}

export function calculateReputationScore(yapper: YapperWithBadges): number {
  const successRate =
    yapper.totalSubmissions > 0
      ? yapper.successfulSubmissions / yapper.totalSubmissions
      : 0;

  // Base score from success rate (0-50 points)
  const baseScore = successRate * 50;

  // Bonus points for current streak (0-50 points)
  const streakBonus = Math.min(yapper.currentStreak * 5, 50);

  return Math.round(baseScore + streakBonus);
} 