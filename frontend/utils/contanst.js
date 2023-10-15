import {
  BsFillBellFill,
  BsHouseDoorFill,
  BsFillPostcardHeartFill,
  BsPersonLinesFill,
  BsShop,
} from "react-icons/bs";

const pages = [
  {
    key: "dashboard",
    name: "Trang chủ",
    icon: <BsHouseDoorFill></BsHouseDoorFill>,
    href: "/dashboard",
  },
  {
    key: "posts",
    name: "Đăng bài",
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
];
export { pages };
