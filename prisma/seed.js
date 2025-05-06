const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create badge types
  const badgeTypes = [
    {
      name: 'SUBMISSION_MILESTONE_10',
      description: 'Submitted 10 successful submissions',
    },
    {
      name: 'SUBMISSION_MILESTONE_50',
      description: 'Submitted 50 successful submissions',
    },
    {
      name: 'SUBMISSION_MILESTONE_100',
      description: 'Submitted 100 successful submissions',
    },
    {
      name: 'STREAK_3',
      description: 'Maintained a 3-day streak',
    },
    {
      name: 'STREAK_7',
      description: 'Maintained a 7-day streak',
    },
    {
      name: 'STREAK_30',
      description: 'Maintained a 30-day streak',
    },
    {
      name: 'HIGH_ACCURACY',
      description: 'Achieved 80% success rate with at least 10 submissions',
    },
    {
      name: 'MASTER_ACCURACY',
      description: 'Achieved 90% success rate with at least 20 submissions',
    },
  ];

  for (const badgeType of badgeTypes) {
    await prisma.badgeType.upsert({
      where: { name: badgeType.name },
      update: badgeType,
      create: badgeType,
    });
  }

  // Create some test Yappers
  const testYappers = [
    {
      username: 'johndoe',
      email: 'john@example.com',
      stats: { total: 15, success: 12, streak: 5 },
    },
    {
      username: 'janedoe',
      email: 'jane@example.com',
      stats: { total: 50, success: 45, streak: 10 },
    },
    {
      username: 'testuser',
      email: 'test@example.com',
      stats: { total: 100, success: 95, streak: 30 },
    },
  ];

  for (const yapperData of testYappers) {
    const yapper = await prisma.yapper.upsert({
      where: { username: yapperData.username },
      update: {},
      create: {
        username: yapperData.username,
        email: yapperData.email,
        totalSubmissions: yapperData.stats.total,
        successfulSubmissions: yapperData.stats.success,
        rejectedSubmissions: yapperData.stats.total - yapperData.stats.success,
        currentStreak: yapperData.stats.streak,
        lastActive: new Date(),
      },
    });

    // Create submissions for this yapper
    const submissionDates = Array.from({ length: yapperData.stats.total }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    });

    for (let i = 0; i < yapperData.stats.total; i++) {
      await prisma.submission.create({
        data: {
          yapperId: yapper.id,
          status: i < yapperData.stats.success ? 'SUCCESS' : 'REJECTED',
          createdAt: submissionDates[i],
        },
      });
    }
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 