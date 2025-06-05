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

### DevOps
- Docker
- Docker Compose
- Nginx

## Yêu cầu hệ thống

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Docker & Docker Compose
- OpenAI API Key

## Cài đặt

### 1. Clone repository
```bash
git clone https://github.com/your-username/hustfood.git
cd hustfood
```

### 2. Cấu hình môi trường
```bash
# Copy file .env.example thành .env
cp .env.example .env

# Chỉnh sửa các biến môi trường trong .env
nano .env
```

### 3. Chạy với Docker
```bash
# Build và chạy các containers
docker-compose up --build

# Chạy ở chế độ background
docker-compose up -d
```

### 4. Chạy thủ công

#### Backend
```bash
cd hustfood/backend
./mvnw spring-boot:run
```

#### Frontend
```bash
cd hustfood/frontend
npm install
npm start
```

## Cấu trúc thư mục

```
hustfood/
├── backend/                 # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/               # React frontend
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml      # Docker Compose configuration
├── .env                    # Environment variables
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

## Đóng góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## Liên hệ

- Email: your.email@example.com
- GitHub: [@your-username](https://github.com/your-username)

## Cảm ơn

Cảm ơn bạn đã quan tâm đến dự án HustFood! Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng tạo issue hoặc liên hệ với chúng tôi.

