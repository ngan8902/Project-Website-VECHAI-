import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FcShop, FcNews } from 'react-icons/fc';
import { useState, useEffect } from 'react';
import { pages } from "@/utils/contanst";
import { NextResponse } from "next/server";
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

import Axios from "@/helper/axios.helper";
import Layout from '@/components/layout';
import CreatePost from "@/components/createPost"
import PostDashboard from "@/components/postDashboard";


export async function getServerSideProps({ req, res }) {
    const token = req.cookies["vechaitoken"];
    const { data } = await Axios({
        url: "/api/customer/getbytoken",
        method: "GET",
        headers: { authorization: token },
    });
    if (!data) NextResponse.redirect(new URL("/login", req.url));

    return {
        props: {
            userData: data[0] || {},
        },
    };
}


export default function Dashboard({ userData }) {
    const { fullname, name, email, accessApp } = userData; // accessApp = "dashboard, post"

    const [layoutPages, setLayoutPages] = useState([]);

    useEffect(() => {
        detectAccessPage()
    }, []);

    const renderContent = (roleName) => {
        if (roleName === "saler") {
            return <SalerComponent userData={userData}></SalerComponent>;
        } else if (roleName === "buyer") {
            return <BuyerComponent></BuyerComponent>;
        } else {
            return <h1>test</h1>;
        }
    };

    const detectAccessPage = () => {
        const accessAppsList = accessApp.split(", ");
        if (accessAppsList && Array.isArray(accessAppsList)) {
            const userPages = _.filter(pages, (page) => {
                return accessAppsList.includes(page.key);
            });
            setLayoutPages(userPages);
        }
    }


    return (
        <>
            <Head>
                <title>Trang chủ</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="ico" href="/favicon.ico"></link>
            </Head>
            <main>
                <Layout pages={layoutPages} user={{ fullname, name, email }}>
                    {renderContent(name, userData)}
                </Layout>
            </main>
        </>
    );
}

function BuyerComponent({ user = {} }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/post?limit=5").then((res) => {
            console.log(res);
            if (res && res.data) {
                const { data } = res.data;
                setPosts(data);
            }
        });
    }, []);

    const Map = dynamic(() => import("@/components/map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });

    return <>
        {/* <!-- ======Section======= --> */}
        <div className="section flex flex-sb">
            {/* <!-- Section Left --> */}
            <div className="section-left">
                {/* <!-- ======Banner======= --> */}
                <div>
                    <Map></Map>
                </div>

                <div className="nfts">
                    <div className="trending heading flex flex-sb">
                        <h2>Bài đăng về ve chai cần bán</h2>
                    </div>

                    {/* <!-- ======Categories======= --> */}

                    <div className="categories flex flex-sb">
                        <div className="category flex">
                            <div className="icon">🔥</div>
                            <p>Tin nổi bật</p>
                        </div>

                        <div className="category flex">
                            <FcNews style={{ marginRight: '10px' }} className='icon' />
                            <p>Bảng tin</p>
                        </div>

                        <div className="category flex">
                            <div className="icon">🕹️</div>
                            <p>Gần bạn</p>
                        </div>

                        <div className="category flex">
                            <FcShop style={{ marginRight: '10px' }} className='icon' />
                            <p>Các vựa</p>
                        </div>
                    </div>

                    {/*Các bài viết*/}
                    <PostDashboard posts={posts}></PostDashboard>
                    {/*Sroll */}
                    <scroll></scroll>

                </div>

            </div>

            {/* <!-- Section Right --> */}
            <div className="section-right">

                <div className="top-yards">
                    <div className="heading flex flex-sb">
                        <h2>Top Vựa Ve Chai</h2>
                        <p style={{ fontSize: '1rem' }}>Xem thêm</p>
                    </div>

                </div>
                <div className="top-creators">
                    <div className="heading flex flex-sb">
                        <h2>Top Thu Mua</h2>
                        <p style={{ fontSize: '1rem' }}>Xem thêm</p>
                    </div>

                    <div className="creator flex flex-sb">
                        <div className="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div className="creator-details">
                                <h3>Huy Nguyễn</h3>
                                <p>@huynguyen</p>
                            </div>
                        </div>

                        <a href="#" className="btn following">
                            Đang theo
                        </a>
                    </div>

                    <div className="creator flex flex-sb">
                        <div className="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div className="creator-details">
                                <h3>Ngân Nguyễn</h3>
                                <p>@bichngan</p>
                            </div>
                        </div>

                        <a href="#" className="btn follow following">
                            Theo dõi
                        </a>
                    </div>

                    <div className="creator flex flex-sb">
                        <div className="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div className="creator-details">
                                <h3>Hassnain Haider</h3>
                                <p>@hassnain</p>
                            </div>
                        </div>

                        <a href="#" className="btn follow following">
                            Theo dõi
                        </a>
                    </div>

                    <div className="creator flex flex-sb">
                        <div className="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div className="creator-details">
                                <h3>Hassnain Haider</h3>
                                <p>@hassnain</p>
                            </div>
                        </div>

                        <a href="#" className="btn follow following">
                            Theo dõi
                        </a>
                    </div>

                    <div className="creator flex flex-sb">
                        <div className="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div className="creator-details">
                                <h3>Hassnain Haider</h3>
                                <p>@hassnain</p>
                            </div>
                        </div>

                        <a href="#" className="btn follow following">
                            Theo dõi
                        </a>
                    </div>

                    <div className="creator flex flex-sb">
                        <div className="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div className="creator-details">
                                <h3>Hassnain Haider</h3>
                                <p>@hassnain</p>
                            </div>
                        </div>

                        <a href="#" className="btn follow following">
                            Theo dõi
                        </a>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- ======End Section======= --> */}
    </>
}

function SalerComponent({userData }) {
    const Map = dynamic(() => import("@/components/map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });

    const [posts, setPosts] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios.get("/api/post?limit=5").then((res) => {
            console.log(res);
            if (res && res.data) {
                const { data } = res.data;
                setPosts(data);
            }
        });
    }, []);

    const toggle = () => setModal(!modal);

    const externalCloseBtn = (
        <button
            type="button"
            className="close"
            style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                borderRadius: '15px'
            }}
            onClick={toggle}
        >
            &times;
        </button>
    );

    const handleCreatedCB = () => {
        setModal(false)
        refreshPosts()
      }

    return (
        <>
            {/* <!-- ======Section======= --> */}
            <div className="section flex flex-sb">
                {/* <!-- Section Left --> */}
                <div className="section-left">
                    {/* <!-- ======Banner======= --> */}
                    <div>
                        <Map></Map>
                    </div>

                    <div className="nfts">
                        <div className="trending heading flex flex-sb">
                            <h2>Bài đăng về ve chai cần bán</h2>
                            <p onClick={toggle}>Tạo bài viết</p>
                        </div>

                        {/* <!-- ======Categories======= --> */}

                        <div className="categories flex flex-sb">
                            <div className="category flex">
                                <div className="icon">🔥</div>
                                <p>Tin nổi bật</p>
                            </div>

                            <div className="category flex">
                                <FcNews style={{ marginRight: '10px' }} className='icon' />
                                <p>Bảng tin</p>
                            </div>

                            <div className="category flex">
                                <div className="icon">🕹️</div>
                                <p>Gần bạn</p>
                            </div>

                            <div className="category flex">
                                <FcShop style={{ marginRight: '10px' }} className='icon' />
                                <p>Các vựa</p>
                            </div>
                        </div>
                        {/* <!-- =====Bai Viet===== --> */}
                        <PostDashboard posts={posts}></PostDashboard>
                    </div>
                </div>

                {/* <!-- Section Right --> */}
                <div className="section-right">

                    <div className="top-yards">
                        <div className="heading flex flex-sb">
                            <h2>Top Vựa Ve Chai</h2>
                            <p style={{ fontSize: '1rem' }}>Xem thêm</p>
                        </div>

                    </div>
                    <div className="top-creators">
                        <div className="heading flex flex-sb">
                            <h2>Top Thu Mua</h2>
                            <p style={{ fontSize: '1rem' }}>Xem thêm</p>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Huy Nguyễn</h3>
                                    <p>@huynguyen</p>
                                </div>
                            </div>

                            <a href="#" className="btn following">
                                Đang theo
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Ngân Nguyễn</h3>
                                    <p>@bichngan</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Theo dõi
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Theo dõi
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Theo dõi
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Theo dõi
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Theo dõi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ======End Section======= --> */}

            <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn} >
                <ModalHeader><span style={{ color: "black", width: '140px', padding: '8px' }}>Tạo bài viết mới</span></ModalHeader>
                <ModalBody>
                    <CreatePost userData={userData} handleCreatedCB={handleCreatedCB}></CreatePost>
                </ModalBody>
            </Modal>
        </>
    );
}