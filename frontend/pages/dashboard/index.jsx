import Head from 'next/head';
import Layout from '@/components/layout';
import dynamic from 'next/dynamic';
import { FcShop, FcNews } from 'react-icons/fc';
import { BsHeart, BsChatText, BsChatSquareDots } from 'react-icons/bs'
import { useState, useEffect } from 'react';
import Axios from "@/helper/axios.helper";
import { pages } from "@/utils/contanst";
import { NextResponse } from "next/server";
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CreatePost from "@/components/createPost"
import PostDashboard from "@/components/postDashboard";
import axios from 'axios';
import styles from '@/styles/Dashboard.module.css'
import Image from 'next/image';

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
            return <SalerComponent></SalerComponent>;
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
                    {renderContent(name)}
                </Layout>
            </main>
        </>
    );
}

function BuyerComponent({ user = {} }) {
    const Map = dynamic(() => import("@/components/map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });

    return <>
        {/* <!-- ======Section======= --> */}
        <div class="section flex flex-sb">
            {/* <!-- Section Left --> */}
            <div class="section-left">
                {/* <!-- ======Banner======= --> */}
                <div>
                    <Map></Map>
                </div>

                <div class="nfts">
                    <div class="trending heading flex flex-sb">
                        <h2>Bài đăng về ve chai cần bán</h2>
                    </div>

                    {/* <!-- ======Categories======= --> */}

                    <div class="categories flex flex-sb">
                        <div class="category flex">
                            <div class="icon">🔥</div>
                            <p>Tin nổi bật</p>
                        </div>

                        <div class="category flex">
                            <FcNews style={{ marginRight: '10px' }} class='icon' />
                            <p>Bảng tin</p>
                        </div>

                        <div class="category flex">
                            <div class="icon">🕹️</div>
                            <p>Gần bạn</p>
                        </div>

                        <div class="category flex">
                            <FcShop style={{ marginRight: '10px' }} class='icon' />
                            <p>Các vựa</p>
                        </div>
                    </div>

                </div>
                <div className='post'>
                    <div className={styles.poster}>
                        <img className={styles.img}
                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                            alt=""
                        />
                        <p>{user.fullname} bichngan</p>
                    </div>
                    <div className={styles.newsfeed}>
                        <div className={styles.newsfeed1}>
                            <Image className={styles.imgpost}
                                src={'/sanpham/chainhua_draw.jpg'}
                                width={250}
                                height={250}
                            />

                            <Image className={styles.imgpost}
                                src={'/sanpham/catton.jpg'}
                                width={250}
                                height={250}
                            />
                        </div>
                        <div className={styles.newsfeed1}>
                            <Image className={styles.imgpost}
                                src={'/sanpham/thungcatton.jpg'}
                                width={250}
                                height={250}
                            />

                            <Image className={styles.imgpost}
                                src={'/sanpham/chainhuapost.jpg'}
                                width={250}
                                height={250}
                            />
                        </div>

                        <div className={styles.comment}>
                            <button className='btn_cm'>
                                <BsHeart />
                            </button>
                            <button className='btn_cm'>
                                <BsChatSquareDots />

                            </button>
                            <button className='btn_cm'>
                                <BsChatText />
                            </button>
                        </div>

                        <div className={styles.comment1}>
                            <img className={styles.img}
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <input className='cmt' placeholder='Viết bình luận...'>

                            </input>
                        </div>

                    </div>

                </div>

            </div>

            {/* <!-- Section Right --> */}
            <div class="section-right">

                <div class="top-yards">
                    <div class="heading flex flex-sb">
                        <h2>Top Vựa Ve Chai</h2>
                        <p style={{ fontSize: '1rem' }}>Xem thêm</p>
                    </div>

                </div>
                <div class="top-creators">
                    <div class="heading flex flex-sb">
                        <h2>Top Thu Mua</h2>
                        <p style={{ fontSize: '1rem' }}>Xem thêm</p>
                    </div>

                    <div class="creator flex flex-sb">
                        <div class="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div class="creator-details">
                                <h3>Huy Nguyễn</h3>
                                <p>@huynguyen</p>
                            </div>
                        </div>

                        <a href="#" class="btn following">
                            Đang theo
                        </a>
                    </div>

                    <div class="creator flex flex-sb">
                        <div class="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div class="creator-details">
                                <h3>Ngân Nguyễn</h3>
                                <p>@bichngan</p>
                            </div>
                        </div>

                        <a href="#" class="btn follow following">
                            Theo dõi
                        </a>
                    </div>

                    <div class="creator flex flex-sb">
                        <div class="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div class="creator-details">
                                <h3>Hassnain Haider</h3>
                                <p>@hassnain</p>
                            </div>
                        </div>

                        <a href="#" class="btn follow following">
                            Theo dõi
                        </a>
                    </div>

                    <div class="creator flex flex-sb">
                        <div class="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div class="creator-details">
                                <h3>Hassnain Haider</h3>
                                <p>@hassnain</p>
                            </div>
                        </div>

                        <a href="#" class="btn follow following">
                            Theo dõi
                        </a>
                    </div>

                    <div class="creator flex flex-sb">
                        <div class="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div class="creator-details">
                                <h3>Hassnain Haider</h3>
                                <p>@hassnain</p>
                            </div>
                        </div>

                        <a href="#" class="btn follow following">
                            Theo dõi
                        </a>
                    </div>

                    <div class="creator flex flex-sb">
                        <div class="follow-creator flex">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <div class="creator-details">
                                <h3>Hassnain Haider</h3>
                                <p>@hassnain</p>
                            </div>
                        </div>

                        <a href="#" class="btn follow following">
                            Theo dõi
                        </a>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- ======End Section======= --> */}
    </>
}

function SalerComponent() {
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
            style={{ position: 'absolute', top: '15px', right: '15px' }}
            onClick={toggle}
        >
            &times;
        </button>
    );

    return (
        <>
            {/* <!-- ======Section======= --> */}
            <div class="section flex flex-sb">
                {/* <!-- Section Left --> */}
                <div class="section-left">
                    {/* <!-- ======Banner======= --> */}
                    <div>
                        <Map></Map>
                    </div>

                    <div class="nfts">
                        <div class="trending heading flex flex-sb">
                            <h2>Bài đăng về ve chai cần bán</h2>
                        </div>

                        {/* <!-- ======Categories======= --> */}

                        <div class="categories flex flex-sb">
                            <div class="category flex">
                                <div class="icon">🔥</div>
                                <p>Tin nổi bật</p>
                            </div>

                            <div class="category flex">
                                <FcNews style={{ marginRight: '10px' }} class='icon' />
                                <p>Bảng tin</p>
                            </div>

                            <div class="category flex">
                                <div class="icon">🕹️</div>
                                <p>Gần bạn</p>
                            </div>

                            <div class="category flex">
                                <FcShop style={{ marginRight: '10px' }} class='icon' />
                                <p>Các vựa</p>
                            </div>
                        </div>
                        {/* <!-- =====Bai Viet===== --> */}
                        <PostDashboard posts={posts}></PostDashboard>
                    </div>
                </div>

                {/* <!-- Section Right --> */}
                <div class="section-right">

                    <div class="top-yards">
                        <div class="heading flex flex-sb">
                            <h2>Top Vựa Ve Chai</h2>
                            <p style={{ fontSize: '1rem' }}>Xem thêm</p>
                        </div>

                    </div>
                    <div class="top-creators">
                        <div class="heading flex flex-sb">
                            <h2>Top Thu Mua</h2>
                            <p style={{ fontSize: '1rem' }}>Xem thêm</p>
                        </div>

                        <div class="creator flex flex-sb">
                            <div class="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div class="creator-details">
                                    <h3>Huy Nguyễn</h3>
                                    <p>@huynguyen</p>
                                </div>
                            </div>

                            <a href="#" class="btn following">
                                Đang theo
                            </a>
                        </div>

                        <div class="creator flex flex-sb">
                            <div class="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div class="creator-details">
                                    <h3>Ngân Nguyễn</h3>
                                    <p>@bichngan</p>
                                </div>
                            </div>

                            <a href="#" class="btn follow following">
                                Theo dõi
                            </a>
                        </div>

                        <div class="creator flex flex-sb">
                            <div class="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div class="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" class="btn follow following">
                                Theo dõi
                            </a>
                        </div>

                        <div class="creator flex flex-sb">
                            <div class="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div class="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" class="btn follow following">
                                Theo dõi
                            </a>
                        </div>

                        <div class="creator flex flex-sb">
                            <div class="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div class="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" class="btn follow following">
                                Theo dõi
                            </a>
                        </div>

                        <div class="creator flex flex-sb">
                            <div class="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div class="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" class="btn follow following">
                                Theo dõi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- ======End Section======= --> */}

            <Modal isOpen={modal} toggle={toggle} external={externalCloseBtn}>
                <ModalHeader><span style={{ color: "#ccc" }}>Tạo bài viết mới</span></ModalHeader>
                <ModalBody>
                    <CreatePost></CreatePost>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" style={{ fontSize: 12 }} onClick={toggle}>
                        Hủy
                    </Button>{' '}
                    <Button color="secondary" style={{ fontSize: 12 }} onClick={toggle}>
                        Tạo
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}