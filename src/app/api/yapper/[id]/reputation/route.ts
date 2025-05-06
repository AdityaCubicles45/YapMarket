import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Function to generate initial stats for a new user
function generateInitialStats() {
  return {
    totalSubmissions: 0,
    successfulSubmissions: 0,
    rejectedSubmissions: 0,
    currentStreak: 0,
    lastActive: new Date(),
  };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let yapper = await prisma.yapper.findUnique({
      where: { username: params.id },
      include: {
        badges: {
          include: {
            type: true,
          },
        },
        submissions: {
          orderBy: {
            createdAt: 'asc',
          },
          select: {
            status: true,
            createdAt: true,
          },
        },
      },
    });

    // If yapper doesn't exist, create a new one
    if (!yapper) {
      const initialStats = generateInitialStats();
      yapper = await prisma.yapper.create({
        data: {
          username: params.id,
          email: `${params.id}@example.com`, // Placeholder email
          ...initialStats,
        },
        include: {
          badges: {
            include: {
              type: true,
            },
          },
          submissions: {
            orderBy: {
              createdAt: 'asc',
            },
            select: {
              status: true,
              createdAt: true,
            },
          },
        },
      });
    }

    // Calculate success rate
    const successRate = yapper.totalSubmissions === 0 
      ? 0 
      : (yapper.successfulSubmissions / yapper.totalSubmissions) * 100;

    // Calculate streak bonus (capped at 30 days)
    const streakBonus = Math.min(yapper.currentStreak, 30) / 30;

    // Calculate submission volume bonus (capped at 100 submissions)
    const volumeBonus = Math.min(yapper.totalSubmissions, 100) / 100;

    // Calculate consistency bonus (success rate impact)
    const consistencyBonus = successRate / 100;

    // Calculate reputation score (normalized to 100)
    const reputationScore = Math.round(
      (successRate * 0.4) + // Success rate (40%)
      (streakBonus * 100 * 0.3) + // Streak (30%)
      (volumeBonus * 100 * 0.2) + // Volume (20%)
      (consistencyBonus * 100 * 0.1) // Consistency (10%)
    );

    // Process submission history for the chart
    const submissionHistory = yapper.submissions.reduce((acc: any[], submission) => {
      const date = submission.createdAt.toISOString().split('T')[0];
      const existingEntry = acc.find(entry => entry.date === date);
      
      if (existingEntry) {
        existingEntry.total++;
        if (submission.status === 'SUCCESS') {
          existingEntry.successful++;
        }
        existingEntry.successRate = (existingEntry.successful / existingEntry.total) * 100;
      } else {
        acc.push({
          date,
          total: 1,
          successful: submission.status === 'SUCCESS' ? 1 : 0,
          successRate: submission.status === 'SUCCESS' ? 100 : 0,
        });
      }
      
      return acc;
    }, []);

    // Get comparison data (top 3 yappers)
    const topYappers = await prisma.yapper.findMany({
      take: 3,
      orderBy: [
        { successfulSubmissions: 'desc' },
        { currentStreak: 'desc' }
      ],
      select: {
        username: true,
        successfulSubmissions: true,
        currentStreak: true,
      },
    });

    // Calculate comparison data
    const comparison = {
      users: topYappers.map(yapper => ({
        username: yapper.username,
        reputationScore: Math.round(
          ((yapper.successfulSubmissions / Math.max(yapper.successfulSubmissions, 1)) * 100 * 0.6) +
          (Math.min(yapper.currentStreak, 30) / 30 * 100 * 0.4)
        ),
        successfulSubmissions: yapper.successfulSubmissions,
        currentStreak: yapper.currentStreak,
      })),
    };

    return NextResponse.json({
      yapper: {
        ...yapper,
        submissions: submissionHistory,
      },
      reputationScore,
      comparison,
    });
  } catch (error) {
    console.error('Error fetching reputation data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 