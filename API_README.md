# MNREC API Documentation

## Admin Authentication API

### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@mnrec.mn",
  "password": "password123"
}
```

### Check Auth

```
GET /api/auth/login
Authorization: Bearer {token}
```

### Logout

```
POST /api/auth/logout
```

## Users API

### Get All Users

```
GET /api/users?page=1&limit=10&search=&role=&status=
```

### Create User

```
POST /api/users
Content-Type: application/json

{
  "email": "newuser@example.com",
  "name": "Шинэ хэрэглэгч",
  "role": "user",
  "password": "password123"
}
```

### Get Single User

```
GET /api/users/{id}
```

### Update User

```
PUT /api/users/{id}
Content-Type: application/json

{
  "email": "updated@example.com",
  "name": "Засварласан нэр",
  "role": "editor",
  "status": "active"
}
```

### Delete User

```
DELETE /api/users/{id}
```

## News API

### Get All News

```
GET /api/news?page=1&limit=10&search=&status=&category=&sortBy=createdAt&sortOrder=desc
```

### Create News

```
POST /api/news
Content-Type: application/json

{
  "title": "Шинэ мэдээний гарчиг",
  "content": "Мэдээний дэлгэрэнгүй агуулга...",
  "summary": "Товч агуулга",
  "status": "draft",
  "category": "Мэдээ",
  "tags": ["tag1", "tag2"],
  "authorId": 1,
  "featuredImage": "/path/to/image.jpg"
}
```

### Get Single News

```
GET /api/news/{id}
```

### Update News

```
PUT /api/news/{id}
Content-Type: application/json

{
  "title": "Засварласан гарчиг",
  "content": "Засварласан агуулга",
  "status": "published"
}
```

### Delete News

```
DELETE /api/news/{id}
```

## Dashboard Stats API

### Get Dashboard Statistics

```
GET /api/dashboard/stats
```

Response:

```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 3,
      "activeUsers": 2,
      "totalNews": 4,
      "publishedNews": 3,
      "draftNews": 1,
      "totalViews": 2815,
      "totalComments": 89
    },
    "charts": {
      "last7Days": [...]
    },
    "recentActivity": [...],
    "topPosts": [...]
  }
}
```

## Demo Data

### Users

- admin@mnrec.mn / password123 (Admin)
- editor@mnrec.mn / editor123 (Editor)
- user@example.com (User)

### News Categories

- Хурал
- Төсөл
- Судалгаа
- Байгаль орчин
- Мэдээ

### News Status

- draft (Ноорог)
- published (Нийтлэгдсэн)
- archived (Архивлагдсан)

## Testing with curl

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mnrec.mn","password":"password123"}'
```

### Get Users

```bash
curl -X GET "http://localhost:3000/api/users?page=1&limit=5"
```

### Get News

```bash
curl -X GET "http://localhost:3000/api/news?status=published"
```

### Get Dashboard Stats

```bash
curl -X GET http://localhost:3000/api/dashboard/stats
```
