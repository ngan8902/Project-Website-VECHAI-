### ĐỒ ÁN HỌC TẬP VỀ NODEJS VÀ NEXTJS - WEBSITE THU MUA VECHAI
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
  - Website chia ra 2 side là Frontend và Backend. Frontend và Backend giao tiếp với nhau thông qua API.
  - Cả 3 trang dành cho người bán, người thu mua, chủ vựa đều dùng Client Side Render (CRD)

# Công nghệ sử dụng:

Font end:
<br>
<a><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> 
</a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original-wordmark.svg" alt="nextjs" width="40" height="40"/> 
<a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> 

Back end:
<br>
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> 
</a>   
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> 
</a> 

Database:
<br>
<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> 
</a> 

Quản lý mã nguồn:
<br>
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> 
</a> 
