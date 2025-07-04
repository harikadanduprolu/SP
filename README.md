# 🥧 StudyPie - Smart Study Companion

A modern, gamified study application built with Next.js 13, TypeScript, and Supabase.

## Features

- 📊 **Dashboard** - Track your study progress and achievements
- 📁 **Workspaces** - Organize study materials by subject
- 📝 **Notes** - Create and manage study notes with rich formatting
- 🧠 **Mind Maps** - Visualize concepts and connections
- 🏆 **Achievements** - Gamified learning with XP and levels
- ⚙️ **Settings** - Customize your study experience
- 🤖 **AI Assistant** - Get help with your studies
- ⏱️ **Study Timer** - Pomodoro technique for focused studying

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Database**: Supabase
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd studypie
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (app)/             # Protected app routes
│   │   ├── dashboard/     # Dashboard page
│   │   ├── workspaces/    # Workspaces page
│   │   ├── notes/         # Notes page
│   │   ├── mindmap/       # Mind map page
│   │   ├── achievements/  # Achievements page
│   │   └── settings/      # Settings page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components (Radix UI)
│   ├── auth/             # Authentication components
│   └── ...               # Feature components
├── src/                  # Source code
│   ├── lib/              # Utilities and configurations
│   ├── store/            # State management (Zustand)
│   └── types/            # TypeScript type definitions
└── supabase/             # Database migrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
