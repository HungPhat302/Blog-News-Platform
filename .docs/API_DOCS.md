# 📚 Blog News Platform — API Documentation

> Base URL: `http://localhost:3000/api`  
> Authentication: Bearer Token (JWT) — thêm vào header: `Authorization: Bearer <accessToken>`

---

## 🔐 Auth (`/api/auth`)

| Method | Endpoint | Auth | Mô tả |
|--------|----------|------|-------|
| POST | `/auth/register` | ❌ | Đăng ký tài khoản mới |
| POST | `/auth/login` | ❌ | Đăng nhập |
| POST | `/auth/refresh-token` | ❌ | Làm mới access token |
| POST | `/auth/logout` | ❌ | Đăng xuất |
| POST | `/auth/forgot-password` | ❌ | Yêu cầu reset mật khẩu |
| POST | `/auth/reset-password` | ❌ | Đặt lại mật khẩu |

### POST `/auth/register`
```json
// Request Body
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "123456",
  "confirmpassword": "123456"
}

// Response 201
{ "message": "Register success" }
```

### POST `/auth/login`
```json
// Request Body
{
  "email": "john@example.com",
  "password": "123456"
}

// Response 200
{
  "accessToken": "<jwt_access_token>",
  "refreshToken": "<jwt_refresh_token>"
}
```

### POST `/auth/refresh-token`
```json
// Request Body
{ "refreshToken": "<jwt_refresh_token>" }

// Response 200
{ "accessToken": "<new_access_token>" }
```

### POST `/auth/logout`
```json
// Request Body
{ "refreshToken": "<jwt_refresh_token>" }

// Response 200
{ "message": "Logged out" }
```

### POST `/auth/forgot-password`
```json
// Request Body
{ "email": "john@example.com" }

// Response 200
{
  "message": "Reset password email sent",
  "data": "http://localhost:3000/reset-password?token=<token>"
}
```

### POST `/auth/reset-password`
```json
// Request Body
{
  "token": "<reset_token>",
  "password": "newpassword123"
}

// Response 200
{ "message": "Password reset success" }
```

---

## 👤 User (`/api/user`)

> Roles được phép: `reader`, `author`

| Method | Endpoint | Auth | Role | Mô tả |
|--------|----------|------|------|-------|
| GET | `/user/me` | ✅ | reader, author | Lấy thông tin profile |
| PUT | `/user/me` | ✅ | reader, author | Cập nhật profile |
| PUT | `/user/me/author` | ✅ | reader | Nâng cấp lên Author |
| PUT | `/user/me/:postid` | ✅ | author | Submit bài viết cho editor review |

### GET `/user/me`
```json
// Response 200
{
  "message": "Get Info successfully",
  "data": {
    "_id": "...",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "reader",
    "isActive": true,
    "createdAt": "..."
  }
}
```

### PUT `/user/me`
```json
// Request Body
{
  "username": "newname",
  "email": "newemail@example.com"
}

// Response 201
{
  "message": "Update profile successfully",
  "data": { ...updatedUser }
}
```

### PUT `/user/me/author`
```json
// Response 200
{
  "message": "Upgrade role to author successfully",
  "data": { ...user }
}
```

### PUT `/user/me/:postid`
```json
// Response 201
{
  "message": "Submit to review status successfully",
  "data": { ...post }
}
```

---

## 📝 Posts (`/api/posts`)

| Method | Endpoint | Auth | Role | Mô tả |
|--------|----------|------|------|-------|
| GET | `/posts` | ❌ | — | Lấy tất cả bài viết |
| GET | `/posts/:id` | ❌ | — | Chi tiết 1 bài viết |
| GET | `/posts/search/:keywords` | ❌ | — | Tìm kiếm theo từ khóa |
| GET | `/posts/category/:categorySlug` | ❌ | — | Lấy bài viết theo category |
| GET | `/posts/tag/:tagSlug` | ❌ | — | Lấy bài viết theo tag |
| POST | `/posts` | ✅ | author, admin | Tạo bài viết mới |
| PUT | `/posts/:id` | ✅ | author, admin | Cập nhật bài viết |
| DELETE | `/posts/:id` | ✅ | admin | Xóa bài viết |

### GET `/posts` — Query Params
| Param | Type | Default | Mô tả |
|-------|------|---------|-------|
| `page` | number | 1 | Trang hiện tại |
| `limit` | number | 10 | Số bài mỗi trang |
| `sortBy` | string | createdAt | Trường sắp xếp |
| `order` | string | desc | `asc` hoặc `desc` |
| `author` | string | — | Filter theo author ID |
| `status` | string | — | `draft`, `review`, `published` |
| `fromDate` | date | — | Từ ngày (ISO string) |
| `toDate` | date | — | Đến ngày (ISO string) |

```json
// Response 200
{
  "message": "Successfully to get posts",
  "data": [ ...posts ]
}
```

### GET `/posts/:id`
```json
// Response 200
{
  "message": "Successfully to get content",
  "data": {
    "title": "...",
    "summary": "...",
    "content_html": "...",
    "slug": "...",
    "status": "published",
    "category": { "name": "..." },
    "tags": [...],
    "image": "...",
    "author": "...",
    "publishdate": "..."
  }
}
```

### POST `/posts` — multipart/form-data
```
// Form fields
title        (string, required)
summary      (string, required)
content      (string, required - Markdown)
category     (ObjectId)
tags         (ObjectId | ObjectId[])
image        (file - jpg/png/jpeg/webp)
```

```json
// Response 200
{
  "message": "Create post successfully",
  "data": { ...post }
}
```

### PUT `/posts/:id` — multipart/form-data
```
// Form fields (tất cả optional, ít nhất 1 field)
title, summary, content, category, tags, image
```

```json
// Response 200
{
  "message": "Update post successfully",
  "data": { ...post }
}
```

---

## 🗂️ Category (`/api/category`)

| Method | Endpoint | Auth | Role | Mô tả |
|--------|----------|------|------|-------|
| GET | `/category` | ❌ | — | Lấy tất cả categories |
| POST | `/category` | ✅ | admin, editor | Tạo category mới |
| DELETE | `/category/:categoryid` | ✅ | admin, editor | Xóa category |

### GET `/category`
```json
// Response 200
{
  "message": "Get all categories succsessfully",
  "data": [
    { "_id": "...", "name": "Tech", "slug": "tech", "description": "..." }
  ]
}
```

### POST `/category`
```json
// Request Body
{
  "name": "Technology",
  "description": "All tech articles"
}

// Response 201
{
  "message": "Create category successfully",
  "data": { "_id": "...", "name": "Technology", "slug": "technology", ... }
}
```

---

## 🏷️ Tag (`/api/tag`)

| Method | Endpoint | Auth | Role | Mô tả |
|--------|----------|------|------|-------|
| GET | `/tag` | ❌ | — | Lấy tất cả tags |
| POST | `/tag` | ✅ | admin, editor | Tạo tag mới |
| DELETE | `/tag/:tagid` | ✅ | admin, editor | Xóa tag |

### POST `/tag`
```json
// Request Body
{ "name": "JavaScript" }

// Response 201
{
  "message": "Create tag successfully",
  "data": { "_id": "...", "name": "JavaScript", "slug": "javascript" }
}
```

---

## 💬 Comment (`/api/comment`)

| Method | Endpoint | Auth | Role | Mô tả |
|--------|----------|------|------|-------|
| GET | `/comment/:postid` | ❌ | — | Lấy tất cả comment của 1 bài post |
| POST | `/comment` | ✅ | reader, author | Tạo comment mới |
| PUT | `/comment/:commentid` | ✅ | reader, author | Sửa comment |
| DELETE | `/comment/:commentid` | ✅ | reader, author | Xóa comment |

> ⚠️ Rate limit: tối đa **3 comment/phút** mỗi user  
> ⚠️ Spam filter: không được gửi comment trùng trong vòng **10 giây**

### POST `/comment`
```json
// Request Body
{
  "post": "<postId>",
  "user": "<userId>",
  "content": "Bài viết hay lắm!"
}

// Response 201
{
  "message": "Comment create successfully",
  "data": { ...comment }
}
```

### PUT `/comment/:commentid`
```json
// Request Body
{ "content": "Nội dung đã chỉnh sửa" }

// Response 200
{
  "message": "Update comment successfully",
  "data": { ...comment }
}
```

---

## ❤️ Reaction (`/api/reaction`)

| Method | Endpoint | Auth | Role | Mô tả |
|--------|----------|------|------|-------|
| POST | `/reaction/:commentid` | ✅ | reader, author | Like comment |
| DELETE | `/reaction/:commentid` | ✅ | reader, author | Unlike comment |

> Mỗi user chỉ được like 1 lần mỗi comment (unique constraint).

```json
// POST Response 201
{
  "message": "Reaction create successfully",
  "data": { ...reaction }
}

// DELETE Response 200
{ "message": "Unliked comment successfully" }
```

---

## 🔖 Bookmark (`/api/bookmark`)

| Method | Endpoint | Auth | Role | Mô tả |
|--------|----------|------|------|-------|
| GET | `/bookmark` | ✅ | reader, author | Lấy tất cả bookmark của user |
| POST | `/bookmark/:postid` | ✅ | reader, author | Lưu bookmark |
| DELETE | `/bookmark/:bookmarkid` | ✅ | reader, author | Xóa bookmark |

### GET `/bookmark`
```json
// Response 200
{
  "message": "Get your bookmarks successfully",
  "data": [
    {
      "_id": "...",
      "post": {
        "title": "...",
        "image": "...",
        "author": "...",
        "category": { "name": "..." }
      },
      "savedAt": "..."
    }
  ]
}
```

---

## 🛠️ Editor (`/api/editor`)

> Role: `editor`

| Method | Endpoint | Auth | Role | Mô tả |
|--------|----------|------|------|-------|
| GET | `/editor` | ✅ | editor | Lấy các bài đang chờ review |
| PUT | `/editor/publish/:postid` | ✅ | editor | Duyệt / publish bài viết |
| PUT | `/editor/reject/:postid` | ✅ | editor | Từ chối bài (về draft) |

---

## 👑 Admin (`/api/admin`)

> Role: `admin`

| Method | Endpoint | Auth | Role | Mô tả |
|--------|----------|------|------|-------|
| GET | `/admin/statistics` | ✅ | admin | Thống kê tổng quan |
| GET | `/admin/users` | ✅ | admin | Danh sách users |
| GET | `/admin/users/:id` | ✅ | admin | Chi tiết user |
| POST | `/admin/users` | ✅ | admin | Tạo user mới |
| PUT | `/admin/users/:id` | ✅ | admin | Cập nhật user |
| DELETE | `/admin/users/:id` | ✅ | admin | Xóa user |
| PUT | `/admin/users/:id/role` | ✅ | admin | Đổi role user |
| PUT | `/admin/users/:id/status` | ✅ | admin | Đổi trạng thái user |

### GET `/admin/statistics`
```json
// Response 200
{
  "message": "Get statistics successfully",
  "data": {
    "users": 120,
    "posts": 450,
    "categories": 10,
    "tags": 35
  }
}
```

### GET `/admin/users` — Query Params
| Param | Type | Mô tả |
|-------|------|-------|
| `page` | number | Trang (default: 1) |
| `limit` | number | Số lượng (default: 10) |
| `role` | string | Filter theo role |
| `status` | string | Filter theo status |

### PUT `/admin/users/:id/role`
```json
// Request Body
{ "role": "editor" }  // "reader" | "author" | "editor" | "admin"
```

### PUT `/admin/users/:id/status`
```json
// Request Body
{ "isActive": false }
```

---

## 🗃️ Data Models

### User
| Field | Type | Mô tả |
|-------|------|-------|
| `username` | String | Tên đăng nhập (unique) |
| `email` | String | Email (unique) |
| `role` | String | `reader` \| `author` \| `editor` \| `admin` |
| `isActive` | Boolean | Trạng thái tài khoản |

### Post
| Field | Type | Mô tả |
|-------|------|-------|
| `title` | String | Tiêu đề |
| `summary` | String | Tóm tắt |
| `content_markdown` | String | Nội dung Markdown gốc |
| `content_html` | String | Nội dung HTML đã xử lý |
| `slug` | String | Slug (unique) |
| `category` | ObjectId | Ref → Category |
| `tags` | ObjectId[] | Ref → Tag |
| `image` | String | URL ảnh (Cloudinary) |
| `status` | String | `draft` \| `review` \| `published` |
| `author` | ObjectId | Ref → User |

---

## 🔄 Workflow

```
Reader → Đăng ký → Đọc bài
Reader → Nâng cấp → Author
Author → Tạo bài (draft) → Submit → Editor review
Editor → Publish / Reject
Admin → Quản lý toàn bộ hệ thống
```

---

## ⚠️ HTTP Status Codes

| Code | Ý nghĩa |
|------|---------|
| 200 | Thành công |
| 201 | Tạo mới thành công |
| 400 | Bad request / Validation lỗi |
| 401 | Chưa xác thực (no/invalid token) |
| 403 | Không có quyền (sai role) |
| 404 | Không tìm thấy |
| 429 | Too many requests (rate limit) |
| 500 | Lỗi server |
