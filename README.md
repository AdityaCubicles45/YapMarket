# YapMarket - Reputation & Profile Management System

YapMarket is a modern web application built with Next.js that provides a comprehensive reputation tracking and profile management system for content creators (Yappers). The platform helps users build and maintain their reputation through various metrics and achievements.

## 🌟 Features

### Reputation Tracking
- Total Yaps submitted
- Successful submissions tracking
- Submission success rate calculation
- Consecutive active days (Yap streak)
- Total rejections tracking
- Real-time reputation score calculation

### Profile Management
- Profile photo upload and management
- Personal bio and information
- Email notification preferences
- Profile customization options

### Badge System
- Multiple badge categories:
  - Submission badges
  - Streak badges
  - Special achievement badges
- Progress tracking for each badge
- Visual badge display with icons

### Dashboard Features
- Reputation score display (0-100)
- Comprehensive submission statistics
- Current streak tracking
- Badge showcase
- Visual progress indicators
- Modern dark theme UI

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: Custom components with Tailwind
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/YapMarket.git
cd YapMarket
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="your_postgresql_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── components/    # Reusable components
│   ├── dashboard/     # Dashboard pages
│   └── types/         # TypeScript types
├── lib/              # Utility functions
└── styles/           # Global styles
```

## 🔄 Reputation Score Calculation

The reputation score is calculated using the following formula:
```
Reputation Score = (Success Rate % × 0.6) + (Active Streak Days × 0.4)
```

Additional bonuses are applied for:
- Streaks longer than 7 days
- High submission success rates
- Special achievements

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Dark theme implementation
- Loading states and animations
- Toast notifications for user actions
- Full-width layout
- Modern card-based design

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped shape this project
