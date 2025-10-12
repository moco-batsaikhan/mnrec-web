# Deployment Guide - mnrec.mn

## 🚀 Deployment дээр 404 алдаа гарах шалтгаан

404 алдаа нь дараах шалтгаануудаас болж гарч болно:

### 1. **Next.js Server ажиллаагүй байна**

Next.js-ийг standalone mode дээр ажиллуулах хэрэгтэй:

```bash
# Build хийх
npm run build

# Production server эхлүүлэх
npm start
# эсвэл
node .next/standalone/server.js
```

### 2. **PM2 ашиглан background дээр ажиллуулах**

```bash
# PM2 суулгах
npm install -g pm2

# Next.js эхлүүлэх
pm2 start npm --name "mnrec-web" -- start

# Эсвэл ecosystem file ашиглах
pm2 start ecosystem.config.js

# Status шалгах
pm2 status

# Logs харах
pm2 logs mnrec-web

# Auto-restart on system reboot
pm2 startup
pm2 save
```

### 3. **Nginx Configuration**

Хэрэв Nginx ашиглаж байгаа бол:

```bash
# nginx.conf.example файлыг хуулах
sudo cp nginx.conf.example /etc/nginx/sites-available/mnrec.mn
sudo ln -s /etc/nginx/sites-available/mnrec.mn /etc/nginx/sites-enabled/

# SSL certificate paths засах
sudo nano /etc/nginx/sites-available/mnrec.mn

# Nginx test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx
```

### 4. **Apache Configuration (.htaccess)**

Static export ашиглаж байгаа бол:

- `public/.htaccess` файл аль хэдийн үүссэн
- Apache `mod_rewrite` идэвхжүүлэх:

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### 5. **Environment Variables**

`.env.local` файлыг server дээр үүсгэх:

```bash
# Server дээр
cd /var/www/mnrec-web
nano .env.local
```

Дараах утгуудыг оруулах:

```env
DATABASE_HOST=localhost
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=mnrec_db

JWT_SECRET=your-secret-key
REFRESH_TOKEN_SECRET=your-refresh-secret
```

### 6. **Database Tables үүсгэх**

```bash
# MySQL руу орох
mysql -u root -p

# Database үүсгэх
CREATE DATABASE mnrec_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Tables үүсгэх
mysql -u root -p mnrec_db < scripts/create-contact-messages-table.sql
mysql -u root -p mnrec_db < scripts/create-newsletter-table.sql
mysql -u root -p mnrec_db < scripts/update-users-table.sql
```

### 7. **File Permissions**

```bash
# Uploads folder
sudo chown -R www-data:www-data public/uploads
sudo chmod -R 755 public/uploads

# Node modules
sudo chown -R $USER:$USER node_modules
```

## 📋 Deployment Checklist

- [ ] `npm run build` амжилттай
- [ ] `.env.local` файл server дээр байгаа
- [ ] Database tables үүссэн
- [ ] Next.js server ажиллаж байгаа (port 3000)
- [ ] Nginx/Apache тохиргоо зөв
- [ ] SSL certificate суусан
- [ ] PM2 дээр auto-restart тохируулсан
- [ ] File permissions зөв

## 🔍 Debugging Commands

```bash
# Next.js server ажиллаж байгаа эсэхийг шалгах
curl http://localhost:3000

# Ports шалгах
sudo netstat -tulpn | grep :3000

# PM2 status
pm2 status

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Next.js logs
pm2 logs mnrec-web
```

## 🌐 Production URL Structure

- **Homepage:** https://mnrec.mn → redirects to https://mnrec.mn/mn
- **English:** https://mnrec.mn/en
- **Mongolian:** https://mnrec.mn/mn
- **Admin:** https://mnrec.mn/admin
- **API:** https://mnrec.mn/api/*

## ⚡ Quick Fix Commands

Хэрэв 404 гарч байвал:

```bash
# 1. Next.js restart
pm2 restart mnrec-web

# 2. Nginx restart
sudo systemctl restart nginx

# 3. Rebuild and restart
cd /var/www/mnrec-web
npm run build
pm2 restart mnrec-web

# 4. Clear cache
pm2 flush
sudo systemctl restart nginx
```

## 📞 Support

Хэрэв асуудал үргэлжилвэл дараах мэдээллийг илгээнэ үү:

- Server OS (Ubuntu, CentOS гэх мэт)
- Web server (Nginx, Apache)
- Error logs
- `pm2 status` output
