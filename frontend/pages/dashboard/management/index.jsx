import dynamic from "next/dynamic";
import Layout from "@/components/layout";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "@/helper/axios.helper";
import { Table } from "reactstrap";
import _ from "lodash";
import { pages } from "@/utils/contanst";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CreateYard from "@/components/createYard"

export async function getServerSideProps({ req, res }) {
    const token = req.cookies["vechaitoken"];
    const { data } = await axios({
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

export default function YardManage({ userData }) {

    const { fullname, name, email, accessApp } = userData;
    const [layoutPages, setLayoutPages] = useState([]);

    useEffect(() => {
        detectAccessPage()
    }, []);

    const renderContent = (roleName) => {
        if (roleName === "yard") {
            return <YardManagePage></YardManagePage>;
        } else {
            return <h1></h1>
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
                <title>Quản lý vựa</title>
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

function YardManagePage({ userData }) {
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleCreatedCB = () => {
        setModal(false)
    }

    const handleClosePost = () => {
        setModal(false)
    }

    return (
        <>
            <div>
                <h2 className="title-manage">Quản lý vựa VeChai</h2>
                <p style={{color: 'rgb(122, 64, 222)', cursor: 'pointer'}} onClick={toggle}>Thêm vựa</p>
            </div>
            <div className="table-manage">
                <div className="map-yard">
                    <Map></Map>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                #
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                1
                            </th>
                            <td>
                                Mark
                            </td>
                            <td>
                                Otto
                            </td>
                            <td>
                                @mdo
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader><span style={{ color: "black", width: '140px', padding: '8px' }}>Thêm Vựa VeChai</span></ModalHeader>
                <ModalBody>
                    <CreateYard handleCreatedCB={handleCreatedCB} handleClosePost={handleClosePost}></CreateYard>
                </ModalBody>
            </Modal>
        </>
    )
}