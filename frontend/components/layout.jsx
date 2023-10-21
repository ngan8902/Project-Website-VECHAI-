import Link from 'next/link';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import {
    BsSun,
    BsFillMoonStarsFill,
    BsFillBellFill,
} from "react-icons/bs"

export default function Layout({ pages = [], user = {}, children }) {
    const [navs, setNavs] = useState(pages);

    useEffect(() => {
        setNavs(pages)
    }, [pages])

    const handelLogout = () => {
        setCookie("vechaitoken", "");
        window.location.reload();
    };
    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    return (
        <>
            <div className="dashboard">
                {/* <!-- Sidebar --> */}
                <div className="sidebar flex-c flex-sb">
                    <div className="brand">VeChai <p className="decription" style={{ fontSize: 12 , padding: '10px' , color: 'white' }}>{ user.name }</p> </div>
                    <div className="side-nav">

                        {navs.map((nav, index) => {
                            return (
                                <div className="menu-item flex" key={index}>
                                    <Link className='navcontent' href={nav.href}>
                                        <div className="icon">{nav.icon}</div>
                                        <p>{nav.name}</p>
                                    </Link>
                                </div>
                            );
                        })}

                    </div>
                    <div className="log-out">
                        <div className="menu-item flex" onClick={handelLogout}>
                            <div className="icon">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </div>

                            <p>Logout</p>
                        </div>
                    </div>
                </div>
                {/* <!-- End Sidebar --> */}

                {/* <!-- Dashboard Content --> */}
                <div className="dashboard-content">
                    {/* <!-- ======Topbar======= --> */}
                    <div className="topbar flex flex-sb">
                        <div className="search flex">
                            <div className="icon">
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <input type="text" placeholder=" Tìm kiếm ..." />
                        </div>

                        <div className="theme flex">
                            <div className="dark flex">
                                <BsFillMoonStarsFill />
                            </div>
                            <div className="light active flex">
                                <BsSun />
                            </div>
                        </div>

                        <div className="notification icon">
                            <BsFillBellFill style={{cursor: 'pointer'}} />
                        </div>

                        <div className="user flex flex-sb">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                             <p>{ user.fullname }</p>
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