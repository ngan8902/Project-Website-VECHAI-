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
### Kiến trúc và công nghệ
-------------
Kiến trúc:

![image](https://github.com/ngan8902/Project-Website-VECHAI-/assets/85479415/d3272512-bca3-4207-8cb8-ab4ad9773933)
  - Website sử dụng kiến monolithic (kiến trúc khối).
  - Website chia ra 2 side là Frontend và Backend. Frontend và Backend giao tiếp với nhau thông     qua API.
  - Cả 3 trang dành cho người bán, người thu mua, chủ vựa đều dùng Client Side Render (CRD)

# Công nghệ sử dụng:

Font end: <br>
![next-js](https://github.com/ngan8902/Project-Website-VECHAI-/assets/85479415/9ba35966-cc08-4985-9f1d-927a06de43a3)
<svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><path d="m23.749 30.005c-.119.063-.109.083.005.025.037-.015.068-.036.095-.061 0-.021 0-.021-.1.036zm.24-.13c-.057.047-.057.047.011.016.036-.021.068-.041.068-.047 0-.027-.016-.021-.079.031zm.156-.094c-.057.047-.057.047.011.016.037-.021.068-.043.068-.048 0-.025-.016-.02-.079.032zm.158-.093c-.057.047-.057.047.009.015.037-.02.068-.041.068-.047 0-.025-.016-.02-.077.032zm.213-.141c-.109.073-.147.12-.047.068.067-.041.181-.131.161-.131-.043.016-.079.043-.115.063zm-9.563-29.536c-.073.005-.292.025-.484.041-4.548.412-8.803 2.86-11.5 6.631-1.491 2.067-2.459 4.468-2.824 6.989-.129.88-.145 1.14-.145 2.333 0 1.192.016 1.448.145 2.328.871 6.011 5.147 11.057 10.943 12.927 1.043.333 2.136.563 3.381.704.484.052 2.577.052 3.061 0 2.152-.24 3.969-.771 5.767-1.688.276-.14.328-.177.291-.208-.88-1.161-1.744-2.323-2.609-3.495l-2.557-3.453-3.203-4.745c-1.068-1.588-2.14-3.172-3.229-4.744-.011 0-.025 2.109-.031 4.681-.011 4.505-.011 4.688-.068 4.792-.057.125-.151.229-.276.287-.099.047-.188.057-.661.057h-.541l-.141-.088c-.088-.057-.161-.136-.208-.229l-.068-.141.005-6.271.011-6.271.099-.125c.063-.077.141-.14.229-.187.131-.063.183-.073.724-.073.635 0 .74.025.907.208 1.296 1.932 2.588 3.869 3.859 5.812 2.079 3.152 4.917 7.453 6.312 9.563l2.537 3.839.125-.083c1.219-.813 2.328-1.781 3.285-2.885 2.016-2.308 3.324-5.147 3.767-8.177.129-.88.145-1.141.145-2.333 0-1.193-.016-1.448-.145-2.328-.871-6.011-5.147-11.057-10.943-12.928-1.084-.343-2.199-.577-3.328-.697-.303-.031-2.371-.068-2.631-.041zm6.547 9.677c.151.072.265.208.317.364.027.084.032 1.823.027 5.74l-.011 5.624-.989-1.52-.995-1.521v-4.083c0-2.647.011-4.131.025-4.204.047-.167.161-.307.313-.395.124-.063.172-.068.667-.068.463 0 .541.005.645.063z"/></svg>










