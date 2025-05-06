# Yapper Reputation Dashboard

A comprehensive reputation tracking and visualization system for the YapMarket platform. This dashboard helps users track their performance, achievements, and standing within the community.

## Features

- **Reputation Score**: Calculated based on submission success rate and activity streak
- **Activity Tracking**: Monitors total submissions, success rate, and consecutive active days
- **Badge System**: Awards badges for achievements like submission milestones and streaks
- **Visual Analytics**: Interactive charts showing reputation progress over time
- **Community Comparison**: Compare your performance with community averages

## Technical Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Visualization**: Recharts for data visualization
- **UI Components**: Headless UI and Heroicons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yapmarket.git
   cd yapmarket
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials.

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── yapper/
│   │       └── [id]/
│   │           └── reputation/
│   │               └── route.ts
│   └── dashboard/
│       └── reputation/
│           └── page.tsx
├── lib/
│   └── reputation.ts
└── prisma/
    └── schema.prisma
```

## Reputation System

The reputation score is calculated using the following formula:
```
Reputation Score = (Success Rate % × 0.6) + (Active Streak Days × 0.4)
```

### Badges

The system awards badges for various achievements:
- **Yap Novice**: Submitted 10 Yaps
- **Consistent Yapper**: Maintained a 5-day streak
- **Quality Yapper**: Maintained 80% success rate

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
