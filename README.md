# Linkbird Platform

A modern Next.js application that replicates the Leads and Campaigns sections from the Linkbird.ai platform, featuring infinitely scrollable tables, detailed side sheets, authentication, and responsive design.

## Features

- 🔐 **Authentication**: Pop-up dialog with credentials and Google OAuth
- 📊 **Leads Management**: Infinitely scrollable table with detailed side sheet
- 🎯 **Campaigns Management**: Campaign tracking with performance metrics
- 📱 **Responsive Design**: Mobile-first approach with sidebar navigation
- ⚡ **Real-time Updates**: TanStack Query for efficient data fetching
- 🎨 **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **State Management**: TanStack Query + Zustand
- **Server Actions**: Next.js Server Actions

## Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- PostgreSQL database
- Google OAuth credentials (optional)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkbird-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/linkbird_db"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate migrations
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

For testing purposes, you can use these demo credentials:
- **Email**: demo@example.com
- **Password**: demo123

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── leads/            # Lead-specific components
│   ├── campaigns/        # Campaign-specific components
│   ├── sidebar.tsx       # Navigation sidebar
│   └── providers.tsx     # Context providers
├── lib/                  # Utility libraries
│   ├── actions/          # Server actions
│   ├── auth.ts           # Authentication config
│   ├── db/               # Database schema and connection
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
```

## Key Features

### Authentication
- Pop-up dialog for sign-in
- Support for email/password and Google OAuth
- Session management with NextAuth.js

### Leads Management
- Infinitely scrollable table with search
- Detailed side sheet for lead information
- Create, edit, and delete leads
- Status tracking and tagging system

### Campaigns Management
- Campaign creation and management
- Performance metrics tracking
- Budget and timeline management
- Status and type categorization

### Responsive Design
- Mobile-first approach
- Collapsible sidebar navigation
- Touch-friendly interface
- Optimized for all screen sizes

## Database Schema

The application uses the following main tables:
- `users` - User accounts and profiles
- `leads` - Sales leads with contact information
- `campaigns` - Marketing campaigns with metrics
- `campaign_leads` - Junction table for campaign-lead relationships

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

### Adding New Features

1. Create server actions in `src/lib/actions/`
2. Add UI components in `src/components/`
3. Update database schema in `src/lib/db/schema.ts`
4. Generate and run migrations

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set up production database**
   - Create a PostgreSQL database
   - Update `DATABASE_URL` in environment variables
   - Run migrations: `npm run db:migrate`

3. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS
   - DigitalOcean

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.
