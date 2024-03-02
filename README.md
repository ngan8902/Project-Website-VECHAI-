### ĐỒ ÁN HỌC TẬP VỀ NODEJS VÀ NESTJS - WEBSITE THU MUA VECHAI
--------
### THỰC HIỆN BỞI: BÍCH NGÂN
--------
Mô Tả: 
###
Đây là website giúp mua bán vechai giữa các người dùng. Có 3 role chính là người mua (buyer), người bán (saler) và chủ vựa (yard).
  -  Người mua có thể xem các bài đăng, chat với người bán.
  -  Người bán có thể thêm, xóa, sửa, xem bài đăng, xem các vựa thu mua và người mua và chat với        họ.
  -  Chủ vựa có thể xem, xóa, sửa, thêm vựa thu mua.
    
Dự án đã dùng những tech stacks: Next.js, Node.js, HTML, Css và Javascript
Database system: Mysql

### Hướng dẫn cài đặt
----------
Trước khi thực hiện các bước run dự án bạn cần phải cài đặt các môi trường bên dưới cho máy tính:

  NodeJs - V18 trở lên
  Xampp - dùng để chạy MySql
  
# Sau khi cài đặt môi trường > Mở source code bằng Visual Studio Code và chạy các lệnh bên dưới
  1. Cài đặt dependencies cho server
     ```hash
     npm install
     ```
  3. Tạo cơ sở dữ liệu
     ```hash
     cd backend
     node model/initialDatabase.js
     ```
  4. Run server
     ```hash
     npm start
     ```
  5. Run client
     ```hash
     cd fontend
     npm start
     ```
  (*) npm start sẽ run nodemon. Cài nodemon trước khi run

  Sau khi run server và run clinet, truy cập vào địa chỉ dưới để vào website:
  ```hash
  http://localhost:3000
  ```


