# HustFood - Web Quản Lý Bán Hàng Online

## Giới thiệu
HustFood là một hệ thống quản lý bán hàng online dành cho quán ăn, giúp quản lý sản phẩm, đơn hàng, khách hàng và phản hồi từ khách hàng.

## Công nghệ sử dụng
- **Backend:** Java, Spring Boot, Hibernate
- **Frontend:** ReactJS, HTML, CSS
- **Cơ sở dữ liệu:** MySQL

## Tính năng chính
- Quản lý sản phẩm (thêm, sửa, xóa, hiển thị danh sách)
- Quản lý đơn hàng (đặt hàng, cập nhật trạng thái đơn hàng)
- Quản lý khách hàng (đăng nhập, đăng ký, cập nhật thông tin cá nhân)
- Quản lý phản hồi từ khách hàng
- Liên kết backend với frontend thông qua API

## Cài đặt và chạy dự án
### Yêu cầu hệ thống
- Java 21 hoặc cao hơn
- Node.js và npm (dành cho frontend)
- MySQL

### Hướng dẫn cài đặt
#### 1. Cấu hình Backend
1. Clone repository:
   ```sh
   https://github.com/IncuksukEi/HustFood1.0.0.git
   cd hustfood/backend
   ```
2. Cấu hình database trong `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/hustfood
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. Chạy ứng dụng Spring Boot:
   ```sh
   mvn spring-boot:run
   ```

#### 2. Cấu hình Frontend
1. Di chuyển đến thư mục frontend:
   ```sh
   cd hustfood/frontend
   ```
2. Cài đặt các gói npm:
   ```sh
   npm install
   ```
3. Chạy ứng dụng React:
   ```sh
   npm start
   ```

## Đóng góp
Nếu bạn muốn đóng góp, hãy tạo một **pull request** hoặc liên hệ với nhóm phát triển.

## Liên hệ
- Email: hustfood@support.com
- Facebook: [IncuksukEi](https://www.facebook.com/vu.uc.hoanganh.586997)

