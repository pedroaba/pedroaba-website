# Pedro Augusto - Portfolio Website

A modern, fast, and accessible portfolio website built with React 19, Next.js 15, and Framer Motion.

## 🚀 Features

- **React 19 + Next.js 15** with App Router and Server Components
- **Smooth Animations** with Framer Motion v12
- **Dark/Light Mode** with next-themes
- **Fully Responsive** design with Tailwind CSS
- **Accessible** with semantic HTML and keyboard navigation
- **SEO Optimized** with metadata, OpenGraph, and structured data
- **GitHub Integration** to showcase repositories automatically
- **Performance Optimized** with proper caching and image optimization
- **Admin Dashboard** for freelancer project management
- **Authentication** with NextAuth.js
- **Database** with PostgreSQL and Prisma ORM

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Theme:** next-themes
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL with Prisma ORM
- **Deployment:** Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (landing-page)/     # Public portfolio pages
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth.js routes
│   │   └── github/         # GitHub API integration
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Admin dashboard
│   │   ├── clients/        # Client management
│   │   └── projects/       # Project management
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── opengraph-image.tsx # Dynamic OG image
│   ├── robots.ts           # SEO robots.txt
│   └── sitemap.ts          # SEO sitemap
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── dashboard/          # Dashboard components
│   ├── animation-div.tsx   # Animation wrapper
│   ├── header.tsx          # Navigation header
│   ├── hero.tsx            # Hero section
│   ├── about.tsx           # About section
│   ├── skills.tsx          # Skills showcase
│   ├── projects.tsx        # GitHub projects
│   ├── experience.tsx      # Work experience
│   ├── contact.tsx         # Contact form
│   ├── footer.tsx          # Site footer
│   ├── repo-card.tsx       # Repository card
│   └── filters-bar.tsx     # Project filters
├── config/                 # Configuration files
│   ├── portfolio.config.ts # Site & profile config
│   ├── skills.ts           # Skills data
│   └── social.ts           # Social links
├── lib/                    # Utility libraries
│   ├── authjs.ts           # NextAuth.js configuration
│   ├── prisma.ts           # Database client
│   ├── github.ts           # GitHub API functions
│   ├── animations.ts       # Animation presets
│   └── formatters.ts       # Utility functions
└── actions/                # Server actions
    ├── procedures/         # Database procedures
    └── create-user.ts      # User creation
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # GitHub Configuration
   NEXT_PUBLIC_GH_USER=pedroaba
   GITHUB_TOKEN=your_github_token_here

   # Site Configuration  
   NEXT_PUBLIC_SITE_URL=https://pedroaba.dev

   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

   # NextAuth.js Configuration
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   ```

4. **Configure your portfolio:**
   Edit the configuration files in the `src/config/` directory:
   - `portfolio.config.ts` - Site metadata and personal info
   - `skills.ts` - Your skills and technologies
   - `social.ts` - Social media links

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.
   
   **Dashboard Access:**
   - Visit `/auth/sign-in` to access the admin dashboard
   - Create your first user account through the sign-up process

## 📝 Customization

### Personal Information
Update your details in `src/config/portfolio.config.ts`:
- Name, role, and location
- Bio and about section
- Contact information
- Curated repository list

### Skills & Technologies
Modify `src/config/skills.ts` to reflect your skill set:
- Organize skills by categories
- Set proficiency levels (expert, intermediate, learning)
- Customize colors and styling

### Social Links
Update `src/config/social.ts` with your social media profiles:
- Add or remove platforms
- Customize hover colors
- Update profile URLs

### Styling & Theme
- Colors and theme are configured via shadcn/ui
- Custom styles in `src/app/globals.css`
- Animation presets in `src/lib/animations.ts`

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GH_USER` | GitHub username for repository fetching | Yes |
| `GITHUB_TOKEN` | GitHub personal access token (for higher rate limits) | No |
| `NEXT_PUBLIC_SITE_URL` | Your website URL for SEO | Yes |
| `DATABASE_URL` | PostgreSQL database connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Your website URL for NextAuth.js | Yes |

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM for data management. The database schema includes:

### Core Models

#### **User**
- Authentication and user management
- Supports NextAuth.js integration
- WebAuthn support for enhanced security

#### **Client**
- **Basic Info:** name, email, phone, company, website, address, notes
- **Status:** ACTIVE, INACTIVE, POTENTIAL, ARCHIVED
- **Fiscal Info:** taxId (CNPJ/CPF), taxName (corporate name)
- **Relationships:** One-to-many with Projects

#### **Project**
- **Basic Info:** name, description
- **Status:** BACKLOG, PLANNING, TODO, IN_PROGRESS, REVIEW, COMPLETED, ON_HOLD, CANCELLED
- **Financial:** budget, hourlyRate, totalHours, totalValue
- **Dates:** startDate, endDate, dueDate
- **Links:** repository, liveUrl, figmaUrl
- **Technologies:** Array of technology strings
- **Relationships:** Belongs to Client

### Enums

```prisma
enum EntityState {
  ACTIVE
  DELETED
}

enum ClientStatus {
  ACTIVE
  INACTIVE
  POTENTIAL
  ARCHIVED
}

enum ProjectStatus {
  BACKLOG
  PLANNING
  TODO
  IN_PROGRESS
  REVIEW
  COMPLETED
  ON_HOLD
  CANCELLED
}
```

### Database Setup

1. **Install Prisma:**
   ```bash
   npm install prisma @prisma/client
   ```

2. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

3. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   ```

4. **View Database (Optional):**
   ```bash
   npx prisma studio
   ```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The site works on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- Self-hosted

## 📊 Performance

This portfolio is optimized for performance:
- **Lighthouse Score:** 95+ across all metrics
- **Server Components** for faster initial loads
- **Image optimization** with next/image
- **Caching strategies** for GitHub API
- **Minimal JavaScript** bundle size

## ♿ Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatible
- Focus indicators
- Color contrast compliance
- Reduced motion support

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find bugs or have suggestions for improvements, please open an issue or submit a pull request.

---

Built with ❤️ using Next.js, shadcn/ui, and Framer Motion.
