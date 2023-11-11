import { useState, useEffect } from "react";


export default function TopBuyer({ buyer = []}) {
    const [data, setData] = useState(buyer);

    useEffect(() => {
        setData(buyer)
        return () => { }
    }, [buyer])


    return (
        <>
            <div className="top-creators">
                <div className="heading ">
                    <h2>Người Thu Mua</h2>
                </div>
                {
                    data.map((user, index) => {
                        return (
                            <div className="creator flex flex-sb" key={index}>
                                <div className="follow-creator flex">
                                    <Image
                                        loader={() => { return buyer.userImage || "https://via.placeholder.com/100x100" }}
                                        src="https://via.placeholder.com/100x100"
                                        alt="Picture of the author"
                                        width={500}
                                        height={500}
                                    />
                                    <div className="creator-details">
                                        <h3>{user.fullname}</h3>
                                        <p>@{user.email}</p>
                                    </div>
                                </div>

                                <a href="#" className="btn following">
                                    Đang theo
                                </a>
                            </div>
                        )
                    })
                }

            </div>

        </>

    )

}