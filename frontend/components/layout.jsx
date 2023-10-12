import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';
import {
    BsSun,
    BsFillMoonStarsFill,
    BsFillBellFill,
    BsHouseDoorFill,
    BsFillPostcardHeartFill,
    BsPersonLinesFill,
    BsShop,

} from "react-icons/bs"

import style from '@/styles/Dashboard.module.css'

export default function Layout({ children }) {
    const [navs, setNavs] = useState([{
        key: "dashboard",
        name: "Trang chủ",
        icon: <BsHouseDoorFill />,
        href: "/dashboard"
    }])

    const [post, Setpost] = useState([{
        key: "dashboard",
        name: "Bài đăng",
        icon: <BsFillPostcardHeartFill />,
        href: "/dashboard"
    }])

    const [buyer, Setbuyer] = useState([{
        key: "dashboard",
        name: "Người mua ve chai",
        icon: <BsPersonLinesFill />,
        href: "/dashboard"
    }])

    const [yard, Setyard] = useState([{
        key: "dashboard",
        name: "Các vựa ve chai",
        icon: <BsShop />,
        href: "/dashboard"
    }])

    const handelLogout = () => {
        setCookie('vechaitoken', '')
        window.location.reload()

    }

    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    return (
        <>
            <div class="dashboard">
                {/* <!-- Sidebar --> */}
                <div class="sidebar flex-c flex-sb">
                    <div class="brand">VeChai</div>
                    <div class="side-nav">

                        {navs.map((nav, index) => {
                            return (
                                <div class="menu-item flex active">
                                    <Link className={style.navcontent} href={nav.href}>
                                        <div class="icon">
                                            <BsHouseDoorFill />
                                        </div>
                                        <p>{nav.name}</p>
                                    </Link>
                                </div>
                            )
                        })}

                        {post.map((nav, index) => {
                            return (
                                <div class="menu-item flex active">
                                    <Link className={style.navcontent} href={nav.href}>
                                        <div class="icon">
                                            <BsFillPostcardHeartFill />
                                        </div>
                                        <p>{nav.name}</p>
                                    </Link>
                                </div>
                            )
                        })}

                        {buyer.map((nav, index) => {
                            return (
                                <div class="menu-item flex active">
                                    <Link className={style.navcontent} href={nav.href}>
                                        <div class="icon">
                                            <BsPersonLinesFill />
                                        </div>
                                        <p>{nav.name}</p>
                                    </Link>
                                </div>
                            )
                        })}

                        {yard.map((nav, index) => {
                            return (
                                <div class="menu-item flex active">
                                    <Link className={style.navcontent} href={nav.href}>
                                        <div class="icon">
                                            <BsShop />
                                        </div>
                                        <p>{nav.name}</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    <div class="log-out">
                        <div class="menu-item flex" onClick={handelLogout}>
                            <div class="icon">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </div>

                            <p>Logout</p>
                        </div>
                    </div>
                </div>
                {/* <!-- End Sidebar --> */}

                {/* <!-- Dashboard Content --> */}
                <div class="dashboard-content">
                    {/* <!-- ======Topbar======= --> */}
                    <div class="topbar flex flex-sb">
                        <div class="search flex">
                            <div class="icon">
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <input type="text" placeholder=" Tìm kiếm ..." />
                        </div>

                        <div class="theme flex">
                            <div class="dark flex">
                                <BsFillMoonStarsFill />
                            </div>
                            <div class="light active flex">
                                <BsSun />
                            </div>
                        </div>

                        <div class="notification icon">
                            <BsFillBellFill />
                        </div>

                        <div class="user flex flex-sb">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <p>Bich Ngan</p>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>
                    </div>
                    {children}
                    {/* <!-- ======End Topbar======= --> */}
                </div>
            </div>

            {/* <!-- End Dashboard --> */}
            <Script src="/js/dashboard.js"></Script>
        </>
    )
}