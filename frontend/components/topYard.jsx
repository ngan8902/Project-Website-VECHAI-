import { useState, useEffect } from "react";
import { BsPinMapFill } from 'react-icons/bs'

export default function TopYards({ yards = [] }) {
    const [data, setData] = useState(yards);

    useEffect(() => {
        setData(yards)
        return () => { }
    }, [yards])

    return (
        <>
            <div className="top-yards">
                <div className="heading flex flex-sb">
                    <h2>Top Vựa Ve Chai</h2>
                </div>

                {
                    data.map((yards, index) => {
                        return (

                            <div className='yards' key={index}>
                                <div className='nameshop'>
                                    <BsPinMapFill className='yard-icon'></BsPinMapFill>
                                    <h4>{yards.name}</h4>
                                </div>
                                <p>{yards.address}</p>
                            </div>


                        )

                    })
                }
            </div>

        </>
    )

}