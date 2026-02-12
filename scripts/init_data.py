"""
Script khởi tạo dữ liệu mẫu cho database.
Chạy script này sau khi đã tạo database và cấu hình .env

Usage:
    python scripts/init_data.py
"""
import sys
import os

# Thêm thư mục gốc vào path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, engine, Base
from app.models.user import User, UserRole
from app.models.book import Book
from app.utils.auth import get_password_hash

def init_database():
    """Tạo tất cả tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Đã tạo các tables trong database")

def create_admin():
    """Tạo tài khoản admin mặc định"""
    db = SessionLocal()
    try:
        # Kiểm tra admin đã tồn tại chưa
        existing_admin = db.query(User).filter(User.username == "admin").first()
        if existing_admin:
            print("ℹ️ Tài khoản admin đã tồn tại")
            return

        # Tạo admin mới
        admin = User(
            username="admin",
            email="admin@ptit.edu.vn",
            password_hash=get_password_hash("admin123"),
            full_name="Administrator",
            role=UserRole.admin,
            is_active=True
        )
        db.add(admin)
        db.commit()
        print("✅ Đã tạo tài khoản admin:")
        print("   Username: admin")
        print("   Password: admin123")
    finally:
        db.close()

def create_sample_books():
    """Tạo một số sách mẫu"""
    db = SessionLocal()
    try:
        # Kiểm tra đã có sách chưa
        existing_books = db.query(Book).count()
        if existing_books > 0:
            print(f"ℹ️ Database đã có {existing_books} cuốn sách")
            return

        # Danh sách sách mẫu
        sample_books = [
            {
                "title": "Lập trình Python cơ bản",
                "author": "Nguyễn Văn A",
                "isbn": "978-604-1-00001-1",
                "category": "Công nghệ thông tin",
                "description": "Sách hướng dẫn lập trình Python từ cơ bản đến nâng cao, phù hợp cho người mới bắt đầu.",
                "quantity": 10,
                "available_quantity": 10
            },
            {
                "title": "Cấu trúc dữ liệu và giải thuật",
                "author": "Trần Văn B",
                "isbn": "978-604-1-00002-2",
                "category": "Công nghệ thông tin",
                "description": "Sách về các cấu trúc dữ liệu và thuật toán phổ biến trong lập trình.",
                "quantity": 5,
                "available_quantity": 5
            },
            {
                "title": "Mạng máy tính",
                "author": "Lê Thị C",
                "isbn": "978-604-1-00003-3",
                "category": "Công nghệ thông tin",
                "description": "Giáo trình mạng máy tính, bao gồm các khái niệm cơ bản về networking.",
                "quantity": 8,
                "available_quantity": 8
            },
            {
                "title": "Cơ sở dữ liệu",
                "author": "Phạm Văn D",
                "isbn": "978-604-1-00004-4",
                "category": "Công nghệ thông tin",
                "description": "Nhập môn cơ sở dữ liệu, SQL và thiết kế database.",
                "quantity": 12,
                "available_quantity": 12
            },
            {
                "title": "Toán cao cấp A1",
                "author": "Hoàng Văn E",
                "isbn": "978-604-1-00005-5",
                "category": "Toán học",
                "description": "Giáo trình toán cao cấp A1 dành cho sinh viên đại học.",
                "quantity": 15,
                "available_quantity": 15
            },
            {
                "title": "Vật lý đại cương",
                "author": "Ngô Thị F",
                "isbn": "978-604-1-00006-6",
                "category": "Vật lý",
                "description": "Giáo trình vật lý đại cương cho sinh viên khối kỹ thuật.",
                "quantity": 10,
                "available_quantity": 10
            },
            {
                "title": "Lập trình Web với HTML/CSS/JavaScript",
                "author": "Đỗ Văn G",
                "isbn": "978-604-1-00007-7",
                "category": "Công nghệ thông tin",
                "description": "Hướng dẫn lập trình web frontend từ cơ bản đến nâng cao.",
                "quantity": 7,
                "available_quantity": 7
            },
            {
                "title": "Trí tuệ nhân tạo",
                "author": "Vũ Thị H",
                "isbn": "978-604-1-00008-8",
                "category": "Công nghệ thông tin",
                "description": "Giới thiệu về AI, Machine Learning và Deep Learning.",
                "quantity": 6,
                "available_quantity": 6
            },
            {
                "title": "Tiếng Anh chuyên ngành CNTT",
                "author": "Bùi Văn I",
                "isbn": "978-604-1-00009-9",
                "category": "Ngoại ngữ",
                "description": "Từ vựng và ngữ pháp tiếng Anh trong lĩnh vực CNTT.",
                "quantity": 20,
                "available_quantity": 20
            },
            {
                "title": "Kinh tế vĩ mô",
                "author": "Cao Thị K",
                "isbn": "978-604-1-00010-0",
                "category": "Kinh tế",
                "description": "Giáo trình kinh tế vĩ mô cơ bản.",
                "quantity": 8,
                "available_quantity": 8
            }
        ]

        for book_data in sample_books:
            book = Book(**book_data)
            db.add(book)

        db.commit()
        print(f"✅ Đã tạo {len(sample_books)} cuốn sách mẫu")
    finally:
        db.close()

def create_sample_user():
    """Tạo một tài khoản user mẫu"""
    db = SessionLocal()
    try:
        existing_user = db.query(User).filter(User.username == "user1").first()
        if existing_user:
            print("ℹ️ Tài khoản user1 đã tồn tại")
            return

        user = User(
            username="user1",
            email="user1@ptit.edu.vn",
            password_hash=get_password_hash("user123"),
            full_name="Nguyễn Văn User",
            phone="0123456789",
            role=UserRole.user,
            is_active=True
        )
        db.add(user)
        db.commit()
        print("✅ Đã tạo tài khoản user mẫu:")
        print("   Username: user1")
        print("   Password: user123")
    finally:
        db.close()

if __name__ == "__main__":
    print("="*50)
    print("🚀 Khởi tạo dữ liệu cho Thư viện PTIT")
    print("="*50)

    try:
        init_database()
        create_admin()
        create_sample_books()
        create_sample_user()

        print("="*50)
        print("✅ Hoàn tất khởi tạo!")
        print("="*50)
    except Exception as e:
        print(f"❌ Lỗi: {e}")
        print("Hãy kiểm tra lại cấu hình database trong file .env")

