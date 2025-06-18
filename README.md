# HustFood - Hệ thống đặt món ăn trực tuyến

HustFood là một hệ thống đặt món ăn trực tuyến được phát triển bởi sinh viên trường Đại học Bách Khoa Hà Nội. Hệ thống sử dụng công nghệ AI để cung cấp trải nghiệm đặt món thông minh và tiện lợi cho người dùng.

## Tính năng chính

- 🍽️ Đặt món ăn trực tuyến
- 🤖 Chatbot hỗ trợ tư vấn món ăn
- 📱 Giao diện responsive
- 🔍 Tìm kiếm món ăn thông minh
- 📊 Quản lý đơn hàng
- 👤 Quản lý người dùng
- 📈 Thống kê doanh thu

## Công nghệ sử dụng

### Backend
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- MySQL
- OpenAI API
- Qdrant Vector Database

### Frontend
- React.js
- Material-UI
- Axios
- React Router

## Yêu cầu hệ thống

- Java 17+
- Node.js 18+
- MySQL 8.0+
- OpenAI API Key
- Qdrant Vector Database

## Cấu hình môi trường

1. Copy file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

2. Cập nhật các biến môi trường trong file `.env` với giá trị thực tế của bạn:
- DB_USERNAME: Tên người dùng MySQL
- DB_PASSWORD: Mật khẩu MySQL
- JWT_SECRET: Khóa bí mật cho JWT
- OPENAI_API_KEY: API key của OpenAI

## Cài đặt và chạy dự án

### 1. Clone repository
```bash
git clone https://github.com/your-username/hustfood.git
cd hustfood
```

### 2. Cài đặt và chạy Backend

```bash
cd hustfood/backend
./mvnw clean install
./mvnw spring-boot:run
```

### 3. Cài đặt và chạy Frontend

```bash
cd hustfood/frontend
npm install
npm start
```

### 4. Cài đặt và chạy Qdrant

1. Tải và cài đặt Qdrant từ [trang chủ Qdrant](https://qdrant.tech/documentation/quick-start/)
2. Chạy Qdrant server:
```bash
qdrant
```

### 5. Cấu hình Database

1. Tạo database MySQL:
```sql
CREATE DATABASE hustfood;
```

2. Import schema từ file `hustfood/sql/mysql/schema.sql`

## Truy cập ứng dụng

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

## Cấu trúc thư mục

```
hustfood/
├── backend/                 # Spring Boot backend
│   ├── src/
│   └── pom.xml
├── frontend/               # React frontend
│   ├── src/
│   └── package.json
├── sql/                    # Database scripts
│   └── mysql/
└── README.md
```

## API Documentation

### Authentication
- POST `/api/auth/login` - Đăng nhập
- POST `/api/auth/register` - Đăng ký
- POST `/api/auth/logout` - Đăng xuất

### Products
- GET `/api/products` - Lấy danh sách sản phẩm
- GET `/api/products/{id}` - Lấy chi tiết sản phẩm
- POST `/api/products` - Thêm sản phẩm mới
- PUT `/api/products/{id}` - Cập nhật sản phẩm
- DELETE `/api/products/{id}` - Xóa sản phẩm

### Orders
- GET `/api/orders` - Lấy danh sách đơn hàng
- GET `/api/orders/{id}` - Lấy chi tiết đơn hàng
- POST `/api/orders` - Tạo đơn hàng mới
- PUT `/api/orders/{id}` - Cập nhật trạng thái đơn hàng

### Chatbot
- POST `/api/chat` - Gửi tin nhắn đến chatbot

## Bảo mật

- Không đẩy file `.env` lên git
- Sử dụng biến môi trường cho các thông tin nhạy cảm
- Mã hóa mật khẩu người dùng
- Sử dụng JWT cho xác thực

## Đóng góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## Liên hệ

- Email:
- GitHub: 

## Cảm ơn

Cảm ơn bạn đã quan tâm đến dự án HustFood! Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng tạo issue hoặc liên hệ với chúng tôi.

