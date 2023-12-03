import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout";
import Axios from '@/helper/axios.helper';
import _ from 'lodash'
import { pages } from '@/utils/contanst'
import { FaPaperPlane, FaSearch, FaSmileBeam } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export async function getServerSideProps({ req, res }) {
    const token = req.cookies["vechaitoken"];
    const { data: userData } = await Axios({
        url: "/api/customer/getbytoken",
        method: "GET",
        headers: { authorization: token },
    })

    const { data: users } = await Axios({
        url: "/api/customer/getalluser",
        method: "GET",
        headers: { authorization: token },
    })

    console.log('User::::', users)

    const getUserList = (key, users) => {
        let result = []
        switch (key) {
            case "saler":
                result = users.filter((user) => {
                    return user.name === "buyer"
                })
            case "buyer":
                result = users.filter((user) => {
                    return user.name === "saler"
                })
        }
        return result
    }

    const listuser = getUserList(userData[0].name, users)

    return {
        props: {
            userData: userData[0] || {},
            listuser
        },
    };


}


export default function Chatbox({ userData }) {
    const { fullname, name, email, accessApp } = userData
    const searchParams = useSearchParams()

    const socketIO = useRef(null);
    const chatLeftRenderd = useRef([]);
    const [layoutPages, setLayoutPages] = useState([]);
    const [chanel, setChanel] = useState(null);
    const [chatText, setChatText] = useState("")
    const [filterUser, setFilterUser] = useState([]);

    useEffect(() => {
        socketIO.current = io("ws://localhost:8000");
        triggerLayout();
        // On event::::::
        socketIO.current.on("receiveMessage", (messageObj) => {
            console.log(`Ms:::`, messageObj);
            const { from, to, message } = messageObj
            if (to === userData.id) {
                if (!chatLeftRenderd.current.includes(messageObj.timestamp)) {
                    addMessage(message, 'left')
                    chatLeftRenderd.current.push(messageObj.timestamp)
                }
            }
        });
        console.log(userData)
        getMessageByUser({ userId: userData.id, role: userData.name }).then(() => {
            // Check Query params
            triggerGetDataByParam()
        })

    }, []);

    const triggerLayout = () => {
        const accessAppsList = accessApp.split(", ");
        if (accessAppsList && Array.isArray(accessAppsList)) {
            const userPages = _.filter(pages, (page) => {
                return accessAppsList.includes(page.key);
            });
            setLayoutPages(userPages);
        }
    };

    const clickSend = () => {
        console.log(socketIO.current)
        const messObj = {
            from: userData.id,
            to: chanel.id,
            mess: chatText,
            timestamp: new Date().getTime()
        }
        socketIO.current.emit('sendMess', messObj);
        sendMess(chatText, 'right')
    }

    const chatWith = (user) => {
        setChanel(user)

    }
    const addMessage = (message, key) => {
        console.log(message)
        let child = document.createElement('div');
        if (key === "left") {
            child.innerHTML = '<div class="row no-gutters"><div class="col-md-4"><div class="chat-bubble chat-bubble--left">' +
                message +
                '</div></div></div>';
        } else {
            child.innerHTML = '<div class="row no-gutters"><div class="col-md-4 offset-md-8"><div class="chat-bubble chat-bubble--right">' +
                message +
                '</div></div></div>'
        }
        child = child.firstChild;
        document.getElementById('chatbox').appendChild(child)
    }

    const triggerGetDataByParam = () => {
        const salerId = searchParams.get('salerId')
        const postId = searchParams.get('postId')
        if (salerId && postId) {
            checkAndCreate({
                buyerId: userData.id,
                salerId: salerId,
                postId: postId
            })
            // getMessageByParams({
            //     buyerId: userData.id,
            //     salerId: salerId,
            //     postId: postId
            // })
        }
    }

    const checkAndCreate = async ({ buyerId, salerId, postId }) => {
        axios.post(`/api/chat`).then((res) => {
            console.log(res);
            if (res && res.data) {
                const { data } = res.data;
                if (data && data[0]) {
                    setChanel(data[0]);
                }

            }
        });
    }

    const getMessageByParams = async ({ buyerId, salerId, postId }) => {
        axios.get(`/api/chat/getbypost?buyerId=${buyerId}&salerId=${salerId}&postId=${postId}`).then((res) => {
            console.log(res);
            if (res && res.data) {
                const { data } = res.data;
                if (data && data[0]) {
                    setChanel(data[0]);
                }

            }
        });
    }

    const getMessageByUser = async ({ userId, role }) => {
        return axios.get(`/api/chat/getbyuser?userId=${userId}&role=${role}`).then((res) => {
            console.log(res);
            if (res && res.data) {
                const { data } = res.data;
                setFilterUser(data);
            }
        });
    }
    return (
        <>
            <Head>
                <title>Chat</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="ico" href="/favicon.ico"></link>
                <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
            </Head>
            <main>
                <Layout pages={layoutPages} user={{ fullname, name, email }}>
                    <div className="body-chat">
                        <div className="container">
                            <div className="row no-gutters">
                                <div className="col-md-4 border-right">
                                    <div className="search-box">
                                        <div className="input-wrapper" style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <FaSearch />
                                            <input placeholder="Tìm kiếm..." type="text" />
                                        </div>
                                    </div>
                                    {
                                        filterUser && filterUser.map((fuser, index) => {
                                            return (
                                                <>
                                                    <div className="friend-drawer-left friend-drawer--onhover" key={index} onClick={() => { chatWith(fuser) }}>
                                                        <img className="profile-image"
                                                            src={fuser.post_image}
                                                        />
                                                        <div className="text" style={{ marginLeft: '10px' }}>
                                                            <h6>{fuser.saler_fullname}</h6>
                                                            <p className="text-muted">{fuser.saler_phonenumber}</p>
                                                        </div>
                                                        <span className="time text-muted small">{fuser.name}</span>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                                <div className="col-md-8" style={{ borderLeft: '0.5px soild', paddingLeft: '0px' }}>
                                    {
                                        chanel ?
                                            <>
                                                <div className="settings-tray">
                                                    <div className="friend-drawer no-gutters friend-drawer--grey">
                                                        <img className="profile-image" src={chanel.post_image} alt="" />
                                                        <div className="text" style={{ marginLeft: '10px' }}>
                                                           <p>Người bán: {chanel.saler_fullname}</p>
                                                           <p>Người mua: {chanel.buyer_fullname}</p>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="chat-panel">
                                                    <div className="row no-gutters">
                                                        <div className="col-md-3">
                                                            <div className="chat-bubble chat-bubble--left">
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="chat-box-tray">
                                                                <FaSmileBeam />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Nhập tin nhắn..."
                                                                    value={chatText}
                                                                    onChange={(e) => { setChatText(e.target.value) }}
                                                                />
                                                                <FaPaperPlane onClick={clickSend} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </> : <p></p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </main>
        </>
    );
}