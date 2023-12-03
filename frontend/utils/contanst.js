import {
  BsPencilSquare,
  BsHouseDoorFill,
  BsFillPostcardHeartFill,
  BsPersonLinesFill,
  BsShop,
} from "react-icons/bs";

import {FaFacebookMessenger} from "react-icons/fa"

const pages = [
  {
    key: "dashboard",
    name: "Trang chủ",
    icon: <BsHouseDoorFill></BsHouseDoorFill>,
    href: "/dashboard",
  },
  {
    key: "posts",
    name: "Các bài đăng",
    icon: <BsFillPostcardHeartFill />,
    href: "/dashboard/posts"
  },
  {
    key: "findbuyer",
    name: "Tìm người thu mua",
    icon: <BsPersonLinesFill />,
    href: "/dashboard/findbuyer",
  },
  {
    key: "findscrapyard",
    name: "Tìm chủ vựa",
    icon: <BsShop />,
    href: "/dashboard/findscrapyard",
  },
  {
    key: "management",
    name: "Quản lý vựa",
    icon: <BsPencilSquare />,
    href: "/dashboard/management",
  },
  {
    key: "chat",
    name: "Hộp thoại",
    icon: <FaFacebookMessenger/>,
    href: "/dashboard/chatbox",
  },
];
export { pages };
