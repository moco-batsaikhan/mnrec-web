# MNREC Admin CMS

## 🎯 Зорилго

MNREC веб сайтын контент удирдах систем (CMS) - веб сайтын мэдээлэл, нийтлэл, зураг зэргийг удирдах хэсэг.

## 🚀 Хэрхэн ашиглах

### 1. Admin Panel руу нэвтрэх

```
http://localhost:3000/admin
```

### 2. Dashboard-ын онцлогууд

- **Статистик мэдээлэл**: Нийт нийтлэл, хэрэглэгч, үзэлт, сэтгэгдлийн тоо
- **Сүүлийн үйл ажиллагаа**: Системд болсон сүүлийн өөрчлөлтүүд
- **Хурдан үйлдлүүд**: Шинэ контент нэмэх товчлуурууд
- **Системийн төлөв**: Серверийн ажиллагааны мэдээлэл

## 🛠️ Технологи

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components

## 📁 Файлын бүтэц

```
app/admin/
├── page.tsx              # Үндсэн dashboard
├── layout.tsx            # Admin layout
├── components/
│   └── Navigation.tsx    # Навигацийн компонент
└── README.md            # Энэ файл
```

## 🔧 Өргөтгөх боломжууд

### Шинэ хуудас нэмэх

1. `app/admin/` дотор шинэ folder үүсгэх
2. `page.tsx` файл үүсгэх
3. `Navigation.tsx` дотор шинэ цэс нэмэх

### Пример:

```typescript
// app/admin/posts/page.tsx
export default function PostsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Нийтлэлүүд</h1>
      {/* Контент */}
    </div>
  );
}
```

## 🎨 Дизайн зарчмууд

- **Responsive**: Бүх төхөөрөмж дээр ажиллана
- **Clean UI**: Цэвэр, энгийн интерфейс
- **Mongolian Support**: Монгол хэл дэмжинэ
- **Fast Loading**: Хурдан ачаалагддаг

## 📊 Боломжит функцууд

- ✅ Dashboard with statistics
- ⏳ Нийтлэл удирдах (Post management)
- ⏳ Медиа номын сан (Media library)
- ⏳ Хэрэглэгч удирдах (User management)
- ⏳ Тохиргоо (Settings)

## 🔐 Хамгаалалт

Одоогоор энгийн интерфейс бэлэн болсон. Дараагийн шатанд:

- Нэвтрэх систем
- Эрхийн удирдлага
- SSL хамгаалалт

## 🛟 Тусламж

Асуудал гарвал:

1. Консол дахь алдааг шалгах
2. Серверийн статусыг шалгах
3. Browser cache цэвэрлэх

---

Үүсгэсэн: 2025 оны 10 сарын 02 | MNREC Web Development Team
