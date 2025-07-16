# replit.md

## Overview

This is a modern full-stack web application built for Manish Cheepa's personal portfolio website. The application showcases his professional experience, skills, projects, and certifications as a Software Developer IV specializing in data engineering and cloud technologies. The stack uses React with TypeScript for the frontend, Express.js for the backend, and PostgreSQL with Drizzle ORM for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Component Library**: Radix UI primitives with custom shadcn/ui components
- **Animations**: Framer Motion for smooth animations and transitions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Request Logging**: Custom middleware for API request/response logging
- **Development**: Hot reload with tsx for TypeScript execution

### Data Layer
- **Database**: PostgreSQL (configured for production)
- **ORM**: Drizzle ORM with type-safe database operations
- **Schema**: Shared TypeScript schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database schema management
- **Validation**: Zod schemas for runtime type validation

## Key Components

### Frontend Components
- **Navigation**: Responsive navigation with smooth scrolling to sections
- **Hero Section**: Main landing section with animations and call-to-action buttons
- **About Section**: Professional summary with achievements and education
- **Skills Section**: Animated skill bars with programming languages and technologies
- **Experience Section**: Timeline-based work experience with achievements
- **Projects Section**: Featured projects with descriptions and technologies used
- **Certifications Section**: Professional certifications with details
- **Contact Section**: Contact form with validation and submission handling
- **UI Components**: Complete set of reusable UI components based on Radix UI

### Backend Endpoints
- `POST /api/contact`: Handle contact form submissions with validation
- `GET /api/contacts`: Retrieve all contact submissions (admin endpoint)
- Error handling middleware for consistent error responses
- Development-only Vite middleware integration

### Shared Resources
- **Schema Definitions**: Contact form schema with insert/select types
- **Type Safety**: End-to-end TypeScript types from database to frontend
- **Validation**: Shared Zod schemas for consistent validation

## Data Flow

### Contact Form Submission
1. User fills out contact form with name, email, subject, and message
2. Frontend validates input using react-hook-form with Zod resolver
3. Form data is sent to backend via POST /api/contact
4. Backend validates data using shared Zod schema
5. Contact information is stored in PostgreSQL database
6. Success/error response is sent back to frontend
7. User receives feedback via toast notification

### Development vs Production
- **Development**: Vite dev server with HMR, integrated with Express backend
- **Production**: Static assets served by Express with optimized builds
- **Database**: PostgreSQL in both environments with connection via DATABASE_URL

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI/UX**: Radix UI primitives, Framer Motion, Tailwind CSS
- **Data Fetching**: TanStack Query for server state management
- **Validation**: Zod for schema validation
- **Utilities**: clsx, class-variance-authority for conditional styling
- **Date Handling**: date-fns for date formatting

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL adapter (@neondatabase/serverless)
- **Validation**: Zod for runtime type checking
- **Development**: tsx for TypeScript execution, Vite integration

### Development Tools
- **Build**: Vite with React plugin and custom configuration
- **Database Management**: Drizzle Kit for migrations and schema management
- **Type Checking**: TypeScript with strict configuration
- **Styling**: PostCSS with Tailwind CSS and Autoprefixer
- **Replit Integration**: Custom plugins for development environment

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild compiles TypeScript server to `dist/index.js`
3. **Database Setup**: Drizzle migrations ensure schema is up-to-date
4. **Static Assets**: Frontend assets served by Express in production

### Environment Configuration
- **Development**: NODE_ENV=development with Vite dev server
- **Production**: NODE_ENV=production with compiled assets
- **Database**: DATABASE_URL environment variable for PostgreSQL connection
- **Replit**: Special handling for Replit development environment

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with client, server, and shared code for easier development and deployment
2. **Type Safety**: End-to-end TypeScript with shared schemas ensures type safety from database to UI
3. **Modern React Patterns**: Functional components with hooks, React Query for state management
4. **Responsive Design**: Mobile-first approach with Tailwind CSS for consistent styling
5. **Performance**: Vite for fast development builds, code splitting, and optimized production bundles
6. **Developer Experience**: Hot reload, TypeScript strict mode, and integrated development tools