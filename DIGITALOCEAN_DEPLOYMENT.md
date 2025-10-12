# DigitalOcean App Platform - Deployment Fix Guide

## 🔴 Асуудал: "the requested path could not be found"

Энэ алдаа нь Next.js server mode буруу тохируулагдсанаас болж гарч байна.

## ✅ Шийдэл: Дараах алхмуудыг дагах

### 1. **GitHub-руу өөрчлөлтүүдийг push хийх**

```bash
# Өөрчлөлтүүдийг commit хийх
git add .
git commit -m "Fix: Configure Next.js standalone mode for DigitalOcean"
git push origin main
```

Дараах файлууд өөрчлөгдсөн:

- `next.config.ts` - standalone output mode
- `.do/app.yaml` - DigitalOcean configuration
- `Dockerfile` - Production Docker build
- `.dockerignore` - Docker ignore patterns

### 2. **DigitalOcean App Platform Settings**

#### A. Run Command шалгах/засах

Dashboard → Your App → Settings → Commands

**Run Command байх ёстой:**

```bash
npm start
```

эсвэл Dockerfile ашиглаж байвал:

```bash
node server.js
```

#### B. Build Command

**Build Command:**

```bash
npm run build
```

#### C. Environment Variables

Settings → Environment Variables хэсэгт дараах утгуудыг **ЗААВАЛ** нэмэх:

```env
# Node Environment
NODE_ENV=production
PORT=3000

# Database (Managed Database холбосон бол автоматаар орно)
DATABASE_HOST=your-db-host.db.ondigitalocean.com
DATABASE_PORT=25060
DATABASE_USER=doadmin
DATABASE_PASSWORD=your-db-password
DATABASE_NAME=mnrec_db

# JWT Secrets (Random string generate хийх)
JWT_SECRET=your-random-jwt-secret-minimum-32-characters
REFRESH_TOKEN_SECRET=your-random-refresh-secret-minimum-32-characters
```

**JWT Secret үүсгэх:**

```bash
# Local дээрээ terminal дээр
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. **Health Check тохируулах**

Settings → Health Check:

- **HTTP Path:** `/mn` (эсвэл `/api/auth/check`)
- **Initial Delay:** 30 секунд
- **Port:** 3000

### 4. **Rebuild & Redeploy**

DigitalOcean дээр:

1. **Actions** → **Force Rebuild and Deploy**
2. Build logs-г харах
3. Runtime logs-г шалгах

Build успешно болсоны дараа:

```
✓ Creating optimized production build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (XX/XX)
✓ Finalizing page optimization
```

### 5. **Database Tables үүсгэх**

Deployment амжилттай болсны дараа browser дээр:

```
https://your-app-name.ondigitalocean.app/api/db/init
https://your-app-name.ondigitalocean.app/api/db/init-contact
https://your-app-name.ondigitalocean.app/api/db/init-newsletter
```

### 6. **Custom Domain холбох**

Settings → Domains → Add Domain:

1. `mnrec.mn` нэмэх
2. DigitalOcean-аас өгсөн DNS records-ыг хуулах
3. Domain registrar дээрээ (GoDaddy, Namecheap гэх мэт) A records нэмэх:

```
Type: A
Name: @
Value: <DigitalOcean IP address>

Type: A
Name: www
Value: <DigitalOcean IP address>
```

## 🔍 Debugging

### Logs шалгах

DigitalOcean Dashboard → Your App → Runtime Logs

Хайх keywords:

- `Error: Cannot find module`
- `ECONNREFUSED` (database connection)
- `404` errors
- `middleware`

### Local тест хийх

```bash
# Standalone mode build
npm run build

# Server эхлүүлэх
npm start

# Тест
curl http://localhost:3000
curl http://localhost:3000/mn
curl http://localhost:3000/api/auth/check
```

## � Debugging - "Failed to fetch" алдаа

### Шалгах алхмууд:

#### 1. **Health Check API шалгах**

Browser дээр дараах URL нээх:

```
https://your-app-name.ondigitalocean.app/api/health
```

Хариу:

```json
{
  "status": "ok",
  "timestamp": "2025-10-12T...",
  "environment": {
    "nodeEnv": "production",
    "hasDatabase": true,
    "hasJwtSecret": true
  }
}
```

Хэрэв `hasDatabase: false` эсвэл `hasJwtSecret: false` бол Environment Variables шалгах!

#### 2. **Database Connection шалгах**

```
https://your-app-name.ondigitalocean.app/api/db/check
```

Амжилттай бол:

```json
{
  "status": "ok",
  "message": "✅ Database холболт амжилттай"
}
```

Алдаатай бол:

```json
{
  "status": "error",
  "message": "❌ Database холболт амжилтгүй",
  "config": {
    "host": "❌ Алга",
    "user": "❌ Алга",
    ...
  }
}
```

#### 3. **Runtime Logs шалгах**

DigitalOcean Dashboard → Your App → Runtime Logs

Хайх зүйлс:

- `Error: getaddrinfo ENOTFOUND` - Database host буруу
- `ER_ACCESS_DENIED_ERROR` - Database username/password буруу
- `Cannot find module` - Build амжилтгүй
- `ECONNREFUSED` - Database port буруу

#### 4. **Environment Variables дахин шалгах**

Settings → Environment Variables

**ЗААВАЛ байх ёстой:**

```env
NODE_ENV=production
PORT=3000
DATABASE_HOST=<db-host>.db.ondigitalocean.com
DATABASE_PORT=25060
DATABASE_USER=doadmin
DATABASE_PASSWORD=<password>
DATABASE_NAME=mnrec_db
JWT_SECRET=<32-char-random-string>
REFRESH_TOKEN_SECRET=<32-char-random-string>
```

#### 5. **Managed Database Firewall**

DigitalOcean → Databases → Your DB → Settings → Trusted Sources

**ADD:** Your App Platform

## �🚨 Түгээмэл алдаанууд

### 1. "Cannot find module" - node_modules алга

**Шийдэл:** App Settings → Build Command:

```bash
npm ci && npm run build
```

### 2. Database connection failed

**Шийдэл:**

- Environment variables зөв эсэхийг шалгах
- Managed Database-ийн Firewall дээр App Platform-ыг trusted source болгох

### 3. Middleware redirect loop

**Шийдэл:**

- `middleware.ts` файл дахь admin/auth routing зөв эсэхийг шалгах
- Root path (`/`) redirect зөв ажиллаж байгаа эсэхийг шалгах

### 4. Static files 404

**Шийдэл:**

- `public` folder dockerfile дээр зөв copy хийгдсэн эсэхийг шалгах
- `.next/static` folder build дараа үүссэн эсэхийг шалгах

## ✅ Амжилттай deployment-ын шалгуур

- [ ] https://your-app.ondigitalocean.app нээгдэж байна
- [ ] Root path `/` → `/mn` redirect ажиллаж байна
- [ ] `/admin` → login page redirect ажиллаж байна
- [ ] Static assets (images, CSS, JS) ачаалагдаж байна
- [ ] Database connection амжилттай
- [ ] API endpoints ажиллаж байна
- [ ] Contact form submit ажиллаж байна
- [ ] Newsletter subscribe ажиллаж байна

## 📞 Асуудал үргэлжилвэл

Runtime logs дээрх error messages-ийг илгээгээрэй:

```bash
# DigitalOcean Dashboard → Runtime Logs → Copy errors
```
