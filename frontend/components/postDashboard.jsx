import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


export default function PostDashboard({ posts = []}) {
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
            <div className="browse" style={{ cursor: "pointer" }}>
                {
                    data.map((post, index) => {
                        return (
                            <div className="nft" key={index}>
                                <Image
                                    loader={() => { return post.image }}
                                    src="https://via.placeholder.com/500x500"
                                    alt="Picture of the author"
                                    width={500}
                                    height={500}
                                />
                                <div className="title">{post.name}</div>
                                <Link href={`/dashboard/productdetail/${post.post_id}`}>
                                    Xem chi tiết sản phẩm
                                </Link>
                                <p className='status'>{post.content}</p>
                                <div className="details flex flex-sb">
                                    <div className="author flex">
                                        <Image
                                            loader={() => { return post.userImage || "https://via.placeholder.com/100x100" }}
                                            src="https://via.placeholder.com/100x100"
                                            alt="Picture of the author"
                                            width={500}
                                            height={500}
                                        />
                                        <p>{post.fullname}</p>
                                    </div>
                                    <div className="price" style={{ fontSize: 10 }}>{formatMoney(post.expect_price, 0) || 'Thương lượng'}{' '}/Kg</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}