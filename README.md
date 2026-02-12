# 📚 Thư viện PTIT - Hệ thống quản lý thư viện trực tuyến

Dự án quản lý thư viện cho Học viện Công nghệ Bưu chính Viễn thông (PTIT).

## 📋 Tính năng

### Dành cho Admin (Quản lý thư viện)
- **Quản lý sách**: Thêm, sửa, xóa, tìm kiếm sách
- **Quản lý độc giả**: Xem, cập nhật thông tin, reset mật khẩu, vô hiệu hóa tài khoản
- **Quản lý mượn trả**: Duyệt/từ chối phiếu mượn, yêu cầu chỉnh sửa, xác nhận trả sách

### Dành cho User (Độc giả)
- **Xem danh sách sách**: Tìm kiếm, lọc theo danh mục
- **Giỏ mượn (Wishlist)**: Thêm sách muốn mượn, điều chỉnh số lượng
- **Tạo phiếu mượn**: Gửi yêu cầu mượn sách, chờ admin duyệt
- **Theo dõi phiếu mượn**: Xem trạng thái, chỉnh sửa khi cần

## 🛠️ Công nghệ sử dụng

- **Backend**: Python + FastAPI
- **Database**: MySQL
- **Frontend**: HTML/CSS/JavaScript (Vanilla)
- **Authentication**: JWT (JSON Web Tokens)

## 📁 Cấu trúc dự án

```
LibraryPTIT/
├── main.py                 # Entry point FastAPI
├── requirements.txt        # Python dependencies
├── .env                    # Biến môi trường (cần cấu hình)
├── app/
│   ├── config.py          # Cấu hình (DB, JWT)
│   ├── database.py        # Kết nối MySQL
│   ├── models/            # SQLAlchemy Models
│   │   ├── user.py
│   │   ├── book.py
│   │   ├── wishlist.py
│   │   └── borrow.py
│   ├── schemas/           # Pydantic Schemas
│   │   ├── user.py
│   │   ├── book.py
│   │   ├── wishlist.py
│   │   └── borrow.py
│   ├── routers/           # API Routes
│   │   ├── auth.py
│   │   ├── books.py
│   │   ├── users.py
│   │   ├── wishlist.py
│   │   └── borrows.py
│   └── utils/             # Utilities
│       ├── auth.py        # JWT, Password hashing
│       └── dependencies.py # Dependency injection
├── frontend/
│   ├── index.html         # Trang chủ
│   ├── login.html         # Đăng nhập
│   ├── register.html      # Đăng ký
│   ├── css/style.css      # Styles
│   ├── js/
│   │   ├── api.js         # API calls
│   │   ├── auth.js        # Auth utilities
│   │   └── app.js         # UI utilities
│   ├── admin/             # Trang Admin
│   │   ├── dashboard.html
│   │   ├── books.html
│   │   ├── users.html
│   │   └── borrows.html
│   └── user/              # Trang User
│       ├── dashboard.html
│       ├── books.html
│       ├── wishlist.html
│       └── borrows.html
└── sql/
    └── init.sql           # Script tạo database
```

## 🚀 Hướng dẫn cài đặt

### Bước 1: Cài đặt MySQL

1. Tải và cài đặt MySQL: https://dev.mysql.com/downloads/
2. Tạo database và chạy script SQL:

```bash
# Đăng nhập MySQL
mysql -u root -p

# Chạy script tạo database
source sql/init.sql
```

Hoặc mở MySQL Workbench và chạy nội dung file `sql/init.sql`.

### Bước 2: Cấu hình môi trường

1. Mở file `.env` và cập nhật thông tin:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password  # ← Đổi thành password của bạn
DB_NAME=library_ptit

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this  # ← Đổi thành key bí mật
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Bước 3: Cài đặt Python dependencies

```bash
# Tạo virtual environment (khuyến nghị)
python -m venv venv

# Kích hoạt venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Cài đặt packages
pip install -r requirements.txt
```

### Bước 4: Chạy ứng dụng

```bash
# Chạy server
uvicorn main:app --reload

# Hoặc
python -m uvicorn main:app --reload
```

Server sẽ chạy tại: http://localhost:8000

## 📖 Sử dụng

### Truy cập ứng dụng

- **Trang chủ**: http://localhost:8000/static/index.html
- **Đăng nhập**: http://localhost:8000/static/login.html
- **API Docs**: http://localhost:8000/docs (Swagger UI)

### Tài khoản mặc định

- **Admin**:
  - Username: `admin`
  - Password: `admin123`

### Quy trình mượn sách

1. **User đăng ký/đăng nhập**
2. **Xem danh sách sách** → Thêm sách vào giỏ mượn
3. **Vào giỏ mượn** → Điều chỉnh số lượng → Chọn ngày trả → Tạo phiếu mượn
4. **Phiếu mượn ở trạng thái "Chờ duyệt"**
5. **Admin duyệt phiếu** → Số lượng sách giảm
6. **Nếu không đủ sách** → Admin yêu cầu chỉnh sửa → User chỉnh lại
7. **Khi trả sách** → Admin xác nhận → Số lượng sách tăng lại

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký tài khoản |
| POST | `/api/auth/login` | Đăng nhập |
| GET | `/api/auth/me` | Lấy thông tin user hiện tại |

### Books
| Method | Endpoint | Mô tả | Role |
|--------|----------|-------|------|
| GET | `/api/books` | Danh sách sách | All |
| GET | `/api/books/{id}` | Chi tiết sách | All |
| POST | `/api/books` | Thêm sách | Admin |
| PUT | `/api/books/{id}` | Cập nhật sách | Admin |
| DELETE | `/api/books/{id}` | Xóa sách | Admin |

### Users
| Method | Endpoint | Mô tả | Role |
|--------|----------|-------|------|
| GET | `/api/users` | Danh sách độc giả | Admin |
| PUT | `/api/users/{id}` | Cập nhật độc giả | Admin |
| PUT | `/api/users/{id}/reset-password` | Reset mật khẩu | Admin |
| DELETE | `/api/users/{id}` | Xóa độc giả | Admin |

### Wishlist
| Method | Endpoint | Mô tả | Role |
|--------|----------|-------|------|
| GET | `/api/wishlist` | Xem giỏ mượn | User |
| POST | `/api/wishlist` | Thêm sách vào giỏ | User |
| PUT | `/api/wishlist/{book_id}` | Cập nhật số lượng | User |
| DELETE | `/api/wishlist/{book_id}` | Xóa khỏi giỏ | User |

### Borrows
| Method | Endpoint | Mô tả | Role |
|--------|----------|-------|------|
| GET | `/api/borrows` | Danh sách phiếu mượn | All |
| POST | `/api/borrows` | Tạo phiếu mượn | User |
| PUT | `/api/borrows/{id}` | Chỉnh sửa phiếu | User |
| PUT | `/api/borrows/{id}/approve` | Duyệt phiếu | Admin |
| PUT | `/api/borrows/{id}/reject` | Từ chối/yêu cầu sửa | Admin |
| PUT | `/api/borrows/{id}/return` | Xác nhận trả sách | Admin |

## 📝 Trạng thái phiếu mượn

| Status | Mô tả |
|--------|-------|
| `pending` | Chờ duyệt |
| `approved` | Đã duyệt (đang mượn) |
| `need_edit` | Cần chỉnh sửa (không đủ sách) |
| `rejected` | Từ chối |
| `returned` | Đã trả sách |

## ⚠️ Lưu ý

1. **Bảo mật**: Trong production, hãy:
   - Đổi `SECRET_KEY` trong `.env`
   - Giới hạn CORS origins trong `main.py`
   - Sử dụng HTTPS

2. **Password admin mặc định**: Đổi mật khẩu admin sau khi triển khai

3. **Database**: Script SQL tạo sẵn tài khoản admin và một số sách mẫu

## 📧 Liên hệ

Dự án được phát triển cho môn học Python - PTIT.

---

© 2024 Thư viện PTIT. All rights reserved.

