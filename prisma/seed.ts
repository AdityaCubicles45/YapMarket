import { PrismaClient } from '@prisma/client';

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