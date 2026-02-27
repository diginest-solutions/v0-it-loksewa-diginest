# 🎓 IT Loksewa Smart Prep

Nepal's premium platform for Public Service Commission IT Officer exam preparation.

## ✨ Features

### 🎯 Keyboard Shortcuts
- **Q** - Jump to Question Bank
- **M** - Jump to Mock Tests  
- **D** - Jump to Dashboard

### 📊 Full-Featured Dashboard
- **Dashboard Home**: Stats, charts, recent activity
- **Question Bank**: 10,000+ questions with filters and explanations
- **Mock Tests**: Realistic exam simulations (500+ tests)
- **Performance Analytics**: Track progress with detailed metrics
- **Global Leaderboard**: Compete with other aspirants
- **Study Notes**: Expert-curated downloadable resources
- **User Profile**: Manage settings and preferences

### 🎨 Premium Design
- **Dark theme** inspired by Vercel dashboard
- **Smooth animations** with Framer Motion
- **Loading states** with skeleton screens
- **Empty states** for better UX
- **Fully responsive** mobile-first design
- **Gradient backgrounds** and modern styling

### ⚡ Performance
- Fast page transitions
- Optimized components
- Real-time animations
- Skeleton loaders for perceived performance

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd it-loksewa-smart-prep

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
/app
  /page.tsx                         # Landing page
  /(auth)/login                     # Login page
  /(auth)/register                  # Registration page
  /dashboard                        # Dashboard pages
    /page.tsx                       # Home dashboard
    /question-bank                  # Question bank
    /mock-tests                     # Mock tests
    /performance                    # Performance analytics
    /leaderboard                    # Global leaderboard
    /notes                          # Study notes
    /profile                        # User profile

/components
  sidebar.tsx                       # Navigation sidebar
  topbar.tsx                        # Top navigation
  stats-card.tsx                    # Stats card component
  question-card.tsx                 # Question display
  mock-test-card.tsx                # Mock test card

/hooks
  use-keyboard-shortcuts.ts         # Keyboard navigation

/lib
  dummy-data.ts                     # Mock data
```

## 🎯 Key Pages

### Landing Page (/)
- Hero section with value proposition
- Features showcase
- How it works section
- Call-to-action

### Dashboard (/dashboard)
- Welcome message with user stats
- Performance charts
- Recent activity feed
- Quick action cards

### Question Bank (/dashboard/question-bank)
- 10,000+ curated questions
- Filter by difficulty and subject
- Expandable explanations
- Code snippet support
- Bookmark functionality

### Mock Tests (/dashboard/mock-tests)
- Grid of exam simulations
- Difficulty indicators
- Best score tracking
- Start test functionality

### Performance (/dashboard/performance)
- Accuracy by subject chart
- Weekly progress visualization
- Strengths and weakness analysis
- Progress metrics

### Leaderboard (/dashboard/leaderboard)
- Top 3 with medal display
- Full ranking table
- User highlighting
- Score tracking

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Theme**: next-themes
- **Language**: TypeScript

## 📚 Documentation

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Features overview
- **[KEYBOARD_SHORTCUTS.md](./KEYBOARD_SHORTCUTS.md)** - Shortcut guide
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Design tokens and patterns

## 🎨 Design Highlights

### Color System
- **Primary**: Indigo-600 (#4F46E5)
- **Secondary**: Blue-600 (#2563EB)
- **Success**: Emerald-500 (#10B981)
- **Background**: Slate-950 (#030712)
- **Cards**: Slate-900 (#111827)

### Typography
- **Headings**: Bold Geist font family
- **Body**: Regular weight for readability
- **Mono**: For code snippets

### Spacing
- Consistent padding: p-4, p-6
- Gap between elements: gap-4, gap-6
- Responsive margins

## 🎬 Animations

All pages include smooth animations:
- **Page transitions**: 300ms fade-in
- **Component entrance**: 300ms staggered
- **Hover effects**: 200ms scale + color
- **Loading states**: Skeleton shimmer

## 📱 Responsive Design

- **Mobile**: Collapsible sidebar, stacked layout
- **Tablet**: Grid adjustments, optimized spacing
- **Desktop**: Full experience with all features

## 🔐 Features

### Keyboard Navigation
- Global shortcuts (Q, M, D)
- Smooth route transitions
- Toast confirmations

### User Experience
- Loading skeletons while data loads
- Empty states with helpful messages
- Toast notifications for actions
- Smooth page transitions

### Performance
- Optimized re-renders
- Efficient animations
- Lazy loading simulation
- CSS-in-JS optimized

## 🚀 Deployment

Ready to deploy to Vercel:

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel deploy
```

## 📝 Notes

- All data is currently mock/dummy data
- Ready for integration with a backend API
- All animations use Framer Motion
- Full TypeScript support
- Fully responsive design

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your purposes.

---

**Made with ❤️ for IT Loksewa aspirants**

Start your journey to success today! Press **D** to go to the dashboard.
