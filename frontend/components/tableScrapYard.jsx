import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Image from "next/image";


export default function TableScrapYard({ yards = [] }) {
    const [data, setData] = useState(yards);
    useEffect(() => {
        setData(yards)
        return () => { }
    }, [yards])

    return (
        <>
            <div className="table-yards">
                <div className="addyard">
                    <Table style={{ borderCollapse: 'separate', fontSize: '0.95rem', marginTop: '10px' }}>
                        <thead>
                            <tr>
                                <th>
                                    STT
                                </th>
                                <th>
                                    Hình ảnh
                                </th>
                                <th>
                                    Tên vựa
                                </th>
                                <th>
                                    Thời gian mở cửa
                                </th>
                                <th>
                                    Địa chỉ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((yard, index) => {
                                    return (
                                        <tr key={index} className="table-yard">
                                            <th scope="row">
                                                <div>{yard.yards_id}</div>
                                            </th>
                                            <td>
                                                <Image
                                                    loader={() => { return yard.image }}
                                                    src="https://via.placeholder.com/500x500"
                                                    alt="Picture of the author"
                                                    width={70}
                                                    height={70}
                                                />
                                            </td>
                                            <td>
                                                <div>{yard.name}</div>
                                            </td>
                                            <td>
                                                <div>{yard.open_time}</div>
                                            </td>
                                            <td>
                                                <div style={{ width: '200px' }}>{yard.address}</div>
                                            </td>
        
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}
