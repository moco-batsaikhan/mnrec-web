# Хэрэглэгчийн удирдлагын систем

## Тойм

Admin хэсэгт хэрэглэгчийн бүрэн удирдлагын систем нэмэгдлээ. Энэ нь дараах функцуудыг дэмждэг:

- ✅ Хэрэглэгч үүсгэх (password encryption-тэй)
- ✅ Хэрэглэгч засварлах
- ✅ Хэрэглэгч устгах
- ✅ Хэрэглэгчийн жагсаалт харах
- ✅ Хайлт, шүүлт хийх
- ✅ Role-based access control

## Хэрэглэгчийн эрхүүд

### 1. Editor (Редактор)

- Мэдээ нэмэх, засах, устгах
- Өөрийн нийтлэлүүдийг удирдах

### 2. Admin (Админ)

- Редакторын бүх эрх
- Мэдээ хянах, батлах
- Тохиргоо засах

### 3. SuperAdmin (Супер Админ)

- Админы бүх эрх
- **Хэрэглэгч үүсгэх, засах, устгах**
- Системийн бүх тохиргоог удирдах

> ⚠️ **Анхаар:** Зөвхөн SuperAdmin эрх бүхий хэрэглэгч л хэрэглэгчдийг удирдах боломжтой!

## Database Setup

Өгөгдлийн сангийн талбаруудыг шинэчлэхийн тулд дараах SQL script-ийг ажиллуулна уу:

```bash
# MySQL-д холбогдож SQL script ажиллуулах
mysql -u root -p mnrec < scripts/update-users-table.sql

# эсвэл MySQL client дээр шууд:
mysql -u root -p mnrec
source scripts/update-users-table.sql;
```

SQL script нь дараах өөрчлөлтүүдийг хийнэ:

- `role` талбарын ENUM утгуудыг шинэчлэх: `admin`, `editor`, `superAdmin`
- `status` талбарын ENUM утгуудыг шинэчлэх: `active`, `inactive`, `suspended`
- Performance-ийг сайжруулах index-үүд нэмэх

## Password Security

### Bcrypt Hashing

Бүх хэрэглэгчийн нууц үг bcrypt (10 rounds) ашиглан hash хийгдэнэ:

```typescript
import bcrypt from "bcryptjs";

// Нууц үг hash хийх
const hashedPassword = await bcrypt.hash(password, 10);

// Нууц үг шалгах
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

### Password Requirements

- Хамгийн багадаа 6 тэмдэгт
- Хэрэглэгч үүсгэх болон засварлах үед validate хийгдэнэ

## API Endpoints

### GET /api/users

Хэрэглэгчдийн жагсаалт авах (pagination, filter, search)

**Query Parameters:**

- `page` - Хуудасны дугаар (default: 1)
- `limit` - Хуудас бүрийн тоо (default: 10)
- `search` - Нэр эсвэл и-мэйлээр хайх
- `role` - Эрхээр шүүх (`admin`, `editor`, `superAdmin`)
- `status` - Төлөвөөр шүүх (`active`, `inactive`, `suspended`)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "superAdmin",
      "status": "active",
      "created_at": "2025-01-01T00:00:00.000Z",
      "updated_at": "2025-01-01T00:00:00.000Z",
      "last_login": "2025-01-10T12:00:00.000Z"
    }
  ],
  "pagination": {
    "current": 1,
    "total": 5,
    "count": 50,
    "perPage": 10
  }
}
```

### POST /api/users

Шинэ хэрэглэгч үүсгэх

**Body:**

```json
{
  "name": "Бат Болд",
  "email": "bat@example.com",
  "password": "securepass123",
  "role": "editor"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Хэрэглэгч амжилттай нэмэгдлээ",
  "data": {
    "id": 2,
    "email": "bat@example.com",
    "name": "Бат Болд",
    "role": "editor",
    "status": "active"
  }
}
```

### GET /api/users/[id]

Тодорхой хэрэглэгч авах

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "superAdmin",
    "status": "active",
    "created_at": "2025-01-01T00:00:00.000Z",
    "updated_at": "2025-01-01T00:00:00.000Z",
    "last_login": "2025-01-10T12:00:00.000Z"
  }
}
```

### PUT /api/users/[id]

Хэрэглэгч засварлах

**Body:**

```json
{
  "name": "Бат Болд (Updated)",
  "email": "bat.updated@example.com",
  "role": "admin",
  "status": "active",
  "password": "newpassword123" // Optional - зөвхөн нууц үг солих үед
}
```

### DELETE /api/users/[id]

Хэрэглэгч устгах

**Response:**

```json
{
  "success": true,
  "message": "Хэрэглэгч амжилттай устгагдлаа"
}
```

## Admin UI Pages

### 1. Users List (`/admin/users`)

- Хэрэглэгчдийн жагсаалт
- Хайлт (нэр, и-мэйл)
- Шүүлт (эрх, төлөв)
- Pagination
- Засах/Устгах үйлдлүүд

### 2. Create User (`/admin/users/create`)

- Нэр, и-мэйл, нууц үг оруулах
- Эрх сонгох
- Form validation
- Password confirmation

### 3. Edit User (`/admin/users/edit/[id]`)

- Хэрэглэгчийн мэдээлэл засварлах
- Төлөв өөрчлөх (active, inactive, suspended)
- Нууц үг солих (optional)
- Эрх өөрчлөх

## Features

### ✅ Password Encryption

- bcryptjs ашиглан 10 rounds hash
- Нууц үг хэзээ ч plain text-ээр хадгалагдахгүй
- Password strength validation (minimum 6 characters)

### ✅ Role Validation

- API level дээр role validation
- Valid roles: `admin`, `editor`, `superAdmin`
- Default role: `editor`

### ✅ Email Validation

- И-мэйл формат шалгах
- Давхардсан и-мэйл шалгах
- Regex validation

### ✅ Status Management

- `active` - Идэвхтэй хэрэглэгч
- `inactive` - Түр идэвхгүй
- `suspended` - Түр хаасан (нэвтрэх боломжгүй)

### ✅ User Safety

- Admin хэрэглэгчийг устгах боломжгүй
- Delete confirmation dialog
- Validation errors with user-friendly messages

### ✅ Search & Filter

- Нэр эсвэл и-мэйлээр хайх
- Эрхээр шүүх
- Төлөвөөр шүүх
- Real-time filtering

### ✅ Pagination

- Default: 10 items per page
- Page navigation
- Total count display
- Responsive design

## Security Best Practices

1. **Password Hashing**: Bcrypt with 10 rounds
2. **Input Validation**: Client and server-side validation
3. **SQL Injection Prevention**: Prepared statements with mysql2
4. **XSS Prevention**: React's built-in XSS protection
5. **Role-Based Access**: Check user role before allowing actions

## Testing

### Manual Testing Steps:

1. **Database Setup**

```bash
mysql -u root -p mnrec < scripts/update-users-table.sql
```

2. **Create SuperAdmin User** (via database)

```sql
INSERT INTO users (name, email, password, role, status, created_at, updated_at)
VALUES (
  'Super Admin',
  'superadmin@mnrec.mn',
  '$2a$10$YourHashedPasswordHere',  -- Use bcrypt to hash
  'superAdmin',
  'active',
  NOW(),
  NOW()
);
```

3. **Test API Endpoints**

```bash
# Get users
curl http://localhost:3000/api/users

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","role":"editor"}'

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","status":"inactive"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/2
```

4. **Test UI**

- Navigate to `/admin/users`
- Create new user
- Edit user
- Change status
- Delete user
- Test search and filters

## Troubleshooting

### Password not working?

- Ensure bcrypt hash was generated correctly
- Password should be at least 6 characters
- Check password confirmation matches

### Can't access users page?

- Check user role is `superAdmin`
- Verify database role column has correct ENUM values
- Run update SQL script

### Role/Status not updating?

- Ensure database columns are ENUM type
- Check valid values: roles (`admin`, `editor`, `superAdmin`), status (`active`, `inactive`, `suspended`)

## Next Steps

1. Implement authentication middleware to check user role
2. Add activity logging
3. Add email notifications for user creation
4. Implement password reset functionality
5. Add 2FA support
6. Create user activity dashboard

## Files Changed/Created

### API Routes:

- ✅ `/app/api/users/route.ts` - Updated with bcrypt
- ✅ `/app/api/users/[id]/route.ts` - Updated with bcrypt

### Admin Pages:

- ✅ `/app/admin/users/page.tsx` - Users list
- ✅ `/app/admin/users/create/page.tsx` - Create user
- ✅ `/app/admin/users/edit/[id]/page.tsx` - Edit user

### Components:

- ✅ `/app/admin/components/AdminSidebar.tsx` - Added users menu item

### Scripts:

- ✅ `/scripts/update-users-table.sql` - Database update script

### Documentation:

- ✅ `/app/admin/users/README.md` - This file
