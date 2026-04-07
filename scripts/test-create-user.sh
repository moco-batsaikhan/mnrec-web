#!/bin/bash

# Шинэ хэрэглэгч API тест

API_URL="${NEXT_PUBLIC_API_URL:-http://localhost:3000}"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="Admin@2024"

echo "🔍 Шинэ хэрэглэгч үүсгэх API тест"
echo ""
echo "📝 Утгууд:"
echo "   API URL: $API_URL"
echo "   Admin Email: $ADMIN_EMAIL"
echo "   Admin Password: $ADMIN_PASSWORD"
echo ""

# 1. Аадминистраторын эсэхийг баталгаажуулах
echo "🔐 1. Admin-ээр нэвтрэх..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\"
  }")

echo "Login Response:"
echo "$LOGIN_RESPONSE"
echo ""

# Access token авах
ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "❌ Access token авах боломжгүй"
  echo "💡 Эхлээд admin@example.com / Admin@2024-р нэвтрэх хэрэгтэй"
  exit 1
fi

echo "✅ Access token авав (${#ACCESS_TOKEN} символ)"
echo ""

# 2. Шинэ хэрэглэгч үүсгэх
echo "👤 2. Шинэ хэрэглэгч үүсгэж байна..."

NEW_USER_EMAIL="test-$(date +%s)@example.com"
NEW_USER_NAME="Тест Хэрэглэгч"

CREATE_RESPONSE=$(curl -s -X POST "$API_URL/api/users" \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -d "{
    \"email\": \"$NEW_USER_EMAIL\",
    \"name\": \"$NEW_USER_NAME\",
    \"password\": \"$NEW_USER_PASSWORD\",
    \"role\": \"editor\"
  }")

echo "Create Response:"
echo "$CREATE_RESPONSE" | jq . 2>/dev/null || echo "$CREATE_RESPONSE"
echo ""

# Success check
if echo "$CREATE_RESPONSE" | grep -q '"success":true'; then
  echo "✅ Хэрэглэгч амжилттай үүсгэгдлээ!"
  echo ""
  echo "📝 Хэрэглэгчийн дэлгэрэнгүй:"
  echo "   И-мэйл: $NEW_USER_EMAIL"
  echo "   Нэр: $NEW_USER_NAME"
  echo "   Нууц үг: $NEW_USER_PASSWORD"
  echo "   Эрх: editor"
else
  echo "❌ Хэрэглэгч үүсгэх алдаа"
fi
