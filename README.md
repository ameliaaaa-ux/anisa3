# Deployment Guide

This project is configured for deployment on Vercel and Ubuntu Server (Nginx).

## Vercel Deployment
The project includes a `vercel.json` file that handles Single Page Application (SPA) routing. Simply connect your repository to Vercel, and it should work out of the box.

## Ubuntu Server (Nginx) Deployment
If you are deploying to an Ubuntu server using Nginx, follow these steps:

1. **Build the project**:
   ```bash
   npm install
   npm run build
   ```
2. **Copy the `dist` folder** to your server (e.g., `/var/www/a-music`).
3. **Configure Nginx**:
   Create or edit your site configuration (e.g., `/etc/nginx/sites-available/a-music`):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/a-music;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Optional: Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 30d;
           add_header Cache-Control "public, no-transform";
       }
   }
   ```
4. **Enable the site and restart Nginx**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/a-music /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Path Configuration
- `vite.config.ts` is configured with `base: './'` to ensure assets are loaded correctly regardless of the root path.
- `index.html` uses relative paths for the entry point and styles.
