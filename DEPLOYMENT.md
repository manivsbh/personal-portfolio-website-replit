# Deployment Guide

## Quick Start Options

### 1. Vercel (Fastest - 2 minutes)
```bash
npm install -g vercel
vercel --prod
```
✅ **Best for:** Quick deployment, automatic CI/CD
⚠️ **Note:** Serverless functions have cold starts

### 2. Railway (Full-Stack - 5 minutes)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```
✅ **Best for:** Full-stack apps with database
💰 **Cost:** $5/month for hobby plan

### 3. DigitalOcean (Production - 10 minutes)
- Connect GitHub repo in DO App Platform
- Set environment variables
- Deploy automatically
✅ **Best for:** Production apps with custom domains
💰 **Cost:** $12/month minimum

## Environment Variables Needed

```bash
NODE_ENV=production
PORT=5000
# DATABASE_URL=postgresql://... (if using PostgreSQL)
```

## Pre-Deployment Checklist

- [ ] Update personal information in `client/src/lib/data.ts`
- [ ] Replace placeholder photo with your actual photo
- [ ] Test contact form functionality
- [ ] Set up domain name (optional)
- [ ] Configure SSL certificate
- [ ] Set up monitoring (optional)

## Production Optimizations

1. **Image Optimization**
   - Compress images before uploading
   - Use WebP format when possible

2. **Performance**
   - Enable gzip compression
   - Set up CDN for static assets
   - Configure caching headers

3. **Security**
   - Set up HTTPS
   - Configure CORS properly
   - Use environment variables for secrets

## Custom Domain Setup

### Vercel
1. Add domain in Vercel dashboard
2. Update DNS records as shown
3. SSL automatically configured

### Railway
1. Add custom domain in Railway dashboard
2. Update CNAME record to `<your-app>.railway.app`
3. SSL automatically configured

### DigitalOcean
1. Add domain in DO dashboard
2. Update nameservers or DNS records
3. SSL automatically configured

## Database Migration (Optional)

If you want to use PostgreSQL instead of in-memory storage:

1. **Update environment variables**
```bash
DATABASE_URL=postgresql://username:password@host:port/database
```

2. **Run migrations**
```bash
npm run db:push
```

3. **Verify connection**
```bash
npm run db:studio
```

## Monitoring and Analytics

### Add Google Analytics
1. Get tracking ID from Google Analytics
2. Add to `client/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Error Monitoring
Consider adding Sentry for error tracking:
```bash
npm install @sentry/react @sentry/node
```

## Backup Strategy

1. **Code:** Use Git with GitHub/GitLab
2. **Database:** Set up automated backups
3. **Uploads:** Sync to cloud storage (S3, Cloudinary)

## Performance Tips

1. **Image Optimization**
   - Use next-gen formats (WebP, AVIF)
   - Implement lazy loading
   - Compress images

2. **Code Splitting**
   - Already implemented with Vite
   - Consider route-based splitting for larger apps

3. **Caching**
   - Set up Redis for session storage
   - Configure browser caching
   - Use CDN for static assets

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, CloudFlare)
- Multiple server instances
- Shared database and file storage

### Database Scaling
- Connection pooling
- Read replicas
- Database optimization

### File Storage
- Move uploads to cloud storage (AWS S3, Cloudinary)
- Implement CDN for images
- Image processing service

## Security Best Practices

1. **Environment Variables**
   - Never commit secrets to Git
   - Use strong passwords
   - Rotate credentials regularly

2. **File Uploads**
   - Validate file types
   - Scan for malware
   - Limit file sizes

3. **Web Security**
   - Enable HTTPS only
   - Set security headers
   - Configure CORS properly
   - Regular dependency updates

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

2. **Port Issues**
```bash
# Check if port is available
netstat -tulpn | grep :5000
```

3. **Memory Issues**
```bash
# Increase Node.js memory limit
node --max_old_space_size=4096 server/index.js
```

4. **File Upload Issues**
- Check directory permissions
- Verify disk space
- Check file size limits

### Getting Help

1. **Check logs first**
   - Application logs
   - Server logs
   - Database logs

2. **Common error patterns**
   - Permission denied: Check file permissions
   - Port in use: Kill existing process
   - Module not found: Reinstall dependencies

3. **Resources**
   - Platform documentation
   - Stack Overflow
   - GitHub issues

## Cost Estimation

### Free Tiers
- **Vercel:** 100GB bandwidth/month
- **Railway:** $5 credit/month
- **Netlify:** 100GB bandwidth/month

### Paid Plans
- **Vercel Pro:** $20/month
- **Railway Hobby:** $5/month
- **DigitalOcean:** $12-$24/month
- **AWS/GCP:** Variable, typically $10-$50/month

## Success Metrics

Track these metrics after deployment:
- **Page Load Speed:** < 3 seconds
- **Mobile Performance:** > 90 Lighthouse score
- **Uptime:** > 99.9%
- **Contact Form Success Rate:** > 95%

Your portfolio is now ready for professional deployment! 🚀