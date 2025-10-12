# Image Upload Setup Guide

## 📸 Зургийн Upload Систем

### Хэрэглээ

Мэдээний админ хэсэгт зураг upload хийхэд дараах систем ажиллана:

1. **Local Development**: Зураг `public/uploads/news/` фолдерт хадгалагдана
2. **Production (DigitalOcean)**: Зураг Git-ээр дамжуулан deploy хийгдэнэ

### Файлын Бүтэц

```
public/
  uploads/
    news/
      .gitkeep                    # Фолдерыг git-д хадгалах
      news-1234567890-abc123.jpg  # Upload хийгдсэн зургууд
```

### API Endpoint

**POST** `/api/upload/image`

**Request:**
- Content-Type: `multipart/form-data`
- Field: `image` (File)

**Response:**
```json
{
  "success": true,
  "message": "Зураг амжилттай ачааллагдлаа",
  "url": "/uploads/news/news-1234567890-abc123.jpg",
  "filename": "news-1234567890-abc123.jpg"
}
```

**Validation:**
- File Types: JPG, PNG, WebP, GIF
- Max Size: 5MB
- Filename: `news-{timestamp}-{random}.{extension}`

### Error Handling

API нь дараах алдаануудыг шалгана:

1. ❌ **No file provided**: Файл илгээгээгүй
2. ❌ **Invalid file type**: Буруу файлын төрөл
3. ❌ **File too large**: 5MB-аас их
4. ❌ **Directory creation failed**: Фолдер үүсгэх боломжгүй (эрхийн асуудал)
5. ❌ **File write failed**: Файл хадгалах боломжгүй

### Console Logs

Upload үед дараах log-ууд гарна:

```
📤 Upload API called
📁 File received: { name, type, size }
📂 Upload directory: /path/to/public/uploads/news
✅ Directory already exists (эсвэл created)
📝 Generated filename: news-1234567890-abc123.jpg
💾 Buffer created, size: 123456
💾 Writing file to: /path/to/file
✅ File written successfully
✅ Upload successful, URL: /uploads/news/...
```

### DigitalOcean Deployment Шалгах Зүйлс

#### 1. File System Access

App Platform дээр файл системд бичих эрхтэй эсэхийг шалгах:

```bash
# Runtime logs дээр шалгах
✅ Directory created successfully
✅ File written successfully
```

Хэрэв эрх байхгүй бол:
```bash
❌ Failed to create directory: EACCES: permission denied
❌ Failed to write file: EACCES: permission denied
```

**Шийдэл:**
- DigitalOcean App Platform дээр файл систем `read-only` байна
- Зургууд заавал Git-ээр deploy хийгдэх ёстой
- Upload хийсэн зургууд `git add`, `git commit`, `git push` хийгдэнэ

#### 2. Public Folder Access

Зургууд `/uploads/news/` URL-аар хандагдаж байгаа эсэхийг шалгах:

```
https://your-app.ondigitalocean.app/uploads/news/news-1234567890.jpg
```

**Next.js config** (`next.config.ts`):
```javascript
async headers() {
  return [
    {
      source: '/uploads/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

#### 3. Git Workflow for Uploads

**Зураг upload хийсний дараа:**

```bash
# 1. Uploaded зургуудыг git-д нэмэх
git add public/uploads/news/*.jpg
git add public/uploads/news/*.png

# 2. Commit хийх
git commit -m "feat: Add uploaded news images"

# 3. Push хийх
git push origin main
```

**Автоматаар deploy** хийгдэнэ (DigitalOcean-д GitHub холбогдсон бол)

#### 4. Alternative: Use DigitalOcean Spaces

Олон зураг байвал **DigitalOcean Spaces** (S3-compatible) ашиглах нь дээр:

**Давуу тал:**
- ✅ Гэрэлтэй тэлэх боломжтой
- ✅ Git-д хөнгөн байна
- ✅ CDN дэмжлэг
- ✅ Олон GB зураг хадгалах боломжтой

**Setup:**
1. DigitalOcean Spaces үүсгэх
2. Access Key & Secret Key авах
3. `@aws-sdk/client-s3` суулгах
4. Upload API-г Spaces ашиглахаар өөрчлөх

### Testing

#### Local Testing

```bash
# Server ажиллуулах
npm run dev

# Browser Console дээр test upload
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('/api/upload/image', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
console.log(result);
```

#### Production Testing

1. Admin хэсэгт нэвтрэх: `https://your-app.com/admin/news/create`
2. Зураг сонгох
3. Upload хийх
4. Console logs шалгах
5. Зураг харагдаж байгаа эсэхийг шалгах

### Troubleshooting

#### "Зураг ачааллахад алдаа гарлаа"

1. **Browser Console шалгах:**
   ```
   F12 → Console → Network → upload/image → Response
   ```

2. **Server logs шалгах:**
   - DigitalOcean → Your App → Runtime Logs
   - `❌` тэмдэгтэй мөрүүдийг хайх

3. **Common Issues:**
   - File too large: 5MB limit шалгах
   - Wrong format: JPG/PNG/WebP/GIF ашиглах
   - Permission denied: DigitalOcean read-only filesystem

#### Зураг харагдахгүй байна

1. **URL шалгах:**
   ```
   /uploads/news/filename.jpg  ✅ Зөв
   uploads/news/filename.jpg   ❌ Буруу (/ байхгүй)
   ```

2. **Git-д орсон эсэхийг шалгах:**
   ```bash
   git status
   # public/uploads/news/xxx.jpg файлууд харагдах ёстой
   ```

3. **Deploy болсон эсэхийг шалгах:**
   ```bash
   git log -1
   # Сүүлчийн commit-д зураг орсон эсэхийг харах
   ```

### Security

- ✅ File type validation
- ✅ File size limit (5MB)
- ✅ Filename sanitization
- ✅ Random filename generation
- ⚠️ **TODO**: Add authentication check (login required)
- ⚠️ **TODO**: Rate limiting for uploads

### Future Improvements

1. **DigitalOcean Spaces Integration**
   - CDN delivery
   - Unlimited storage
   - Better performance

2. **Image Processing**
   - Automatic resize
   - Thumbnail generation
   - Format conversion (WebP)

3. **Authentication**
   - Require login for upload
   - Admin role check

4. **Analytics**
   - Track upload count
   - Monitor storage usage

## 🔗 Холбоотой Файлууд

- `/app/api/upload/image/route.ts` - Upload API
- `/app/admin/news/create/page.tsx` - Create page upload
- `/app/admin/news/edit/[id]/page.tsx` - Edit page upload
- `/public/uploads/news/` - Upload directory
- `/next.config.ts` - Static file serving config
