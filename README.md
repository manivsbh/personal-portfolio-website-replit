# Manish Cheepa - Professional Portfolio Website

A premium professional portfolio website showcasing software development expertise with high-end design components and interactive features.

## 🚀 Features

- **Modern Hero Section** with gradient design and floating animations
- **Photo Upload Functionality** - Upload and change profile photos
- **Interactive Skills Section** with animated progress bars
- **Timeline-based Experience** showcase with 6+ years of career history
- **Featured Projects** with high-impact achievements
- **Professional Certifications** display
- **Working Contact Form** with backend integration
- **Premium Dark Theme** with glassmorphism effects
- **Responsive Design** for all devices
- **Smooth Animations** using Framer Motion

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **Radix UI** components with shadcn/ui
- **TanStack Query** for state management
- **React Hook Form** with Zod validation
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **Multer** for file uploads
- **Drizzle ORM** (ready for PostgreSQL)
- **In-memory storage** for development

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Frontend + Serverless)

1. **Prepare for deployment**
```bash
# Build the project
npm run build
```

2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

3. **Environment Variables**
- Set `NODE_ENV=production` in Vercel dashboard
- Add any other environment variables as needed

### Option 2: Railway (Full-Stack with PostgreSQL)

1. **Connect to Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

2. **Add PostgreSQL Database**
- In Railway dashboard, add PostgreSQL service
- Copy the `DATABASE_URL` to environment variables

3. **Environment Variables in Railway**
- `NODE_ENV=production`
- `DATABASE_URL=<your-postgresql-url>`

### Option 3: DigitalOcean App Platform

1. **Create `app.yaml`**
```yaml
name: portfolio-website
services:
- name: web
  source_dir: /
  github:
    repo: <your-repo>
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  envs:
  - key: NODE_ENV
    value: production
```

2. **Deploy via DigitalOcean dashboard**
- Connect your GitHub repository
- Configure environment variables
- Deploy

### Option 4: Traditional VPS (Ubuntu/CentOS)

1. **Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

2. **Deploy Application**
```bash
# Clone and setup
git clone <your-repo-url> /var/www/portfolio
cd /var/www/portfolio
npm install
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- start
pm2 startup
pm2 save
```

3. **Configure Nginx**
```nginx
# /etc/nginx/sites-available/portfolio
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## 🗄️ Database Setup (For Production)

### PostgreSQL Setup
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Create database and user
sudo -u postgres psql
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
```

### Environment Variables
```bash
# .env file
DATABASE_URL="postgresql://portfolio_user:secure_password@localhost:5432/portfolio_db"
NODE_ENV=production
PORT=5000
```

### Run Migrations
```bash
npm run db:push
```

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and data
│   │   └── pages/          # Page components
│   └── index.html
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage interface
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schemas
├── uploads/               # File upload directory
└── package.json
```

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run db:push      # Push database schema changes
npm run db:studio    # Open database studio
```

## 🔐 Security Considerations

1. **File Uploads**
   - Images are validated by type and size
   - Files are stored with unique names
   - 5MB upload limit enforced

2. **Environment Variables**
   - Never commit `.env` files
   - Use strong database passwords
   - Set `NODE_ENV=production` in production

3. **CORS and Headers**
   - Configure CORS for your domain
   - Set security headers in production

## 📱 Features Overview

### Photo Upload
- Drag & drop interface
- File type validation (jpeg, jpg, png, gif, webp)
- 5MB size limit
- Automatic file naming

### Contact Form
- Form validation with Zod
- Email field validation
- Success/error notifications
- Backend integration ready

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions

## 🎨 Customization

### Colors and Theme
Edit `client/src/index.css` to customize the color scheme:

```css
:root {
  --primary: hsl(239, 84%, 67%);
  --secondary: hsl(263, 70%, 50%);
  --accent: hsl(142, 76%, 36%);
  /* ... more colors */
}
```

### Content
Update `client/src/lib/data.ts` to modify:
- Personal information
- Skills and experience
- Projects and achievements
- Certifications

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

2. **Photo Upload Not Working**
- Check uploads directory permissions
- Verify file size limits
- Check network connectivity

3. **Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For any issues or questions:
- Email: manishchhipa98@gmail.com
- LinkedIn: https://www.linkedin.com/in/manishcheepa/

## 📄 License

© 2024 Manish Cheepa. All rights reserved.