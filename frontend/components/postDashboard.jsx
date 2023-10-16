import { useState, useEffect } from "react";
import axios from 'axios'
import Image from "next/image";
import styles from '@/styles/Dashboard.module.css'
import { BsHeart, BsChatText, BsChatSquareDots } from 'react-icons/bs'

export default function PostDashboard({ posts = [] }) {
    const [data, setData] = useState(posts);

    useEffect(() => {
        setData(posts)
        return () => { }
    }, [posts])

    function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign +
                (j ? i.substr(0, j) + thousands : '') +
                i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <>
            <div className='post'>
                {
                    data.map((post, index) => {
                        return (
                            <>
                                <div className={styles.poster} key={index}>
                                    <img className={styles.img}
                                        src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                        alt=""
                                    />
                                    <p>{post.fullname}</p>
                                </div>
                                <p className='status'>{post.content}</p>
                                <div className={styles.newsfeed}>
                                    <div className={styles.newsfeed1}>
                                        <Image className={styles.imgpost}
                                            loader={() => { return post.image }}
                                            src="https://via.placeholder.com/100x100"
                                            alt="Picture of the author"
                                            width={500}
                                            height={500}
                                        />

                                        {/* <Image className={styles.imgpost}
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
                                        /> */}
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

                            </>
                        );
                    })
                }
            </div>
        </>
    );
}