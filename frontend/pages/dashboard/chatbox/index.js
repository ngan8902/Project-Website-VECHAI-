import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout";
import Axios from "@/helper/axios.helper";
import Script from "next/script";
import axios from "axios";
import _, { get } from "lodash";
import { useSearchParams } from 'next/navigation';
import { pages } from "@/utils/contanst";
import { BsFillSendFill, BsFileEarmarkImage } from "react-icons/bs";

export async function getServerSideProps({ req, res }) {
  const token = req.cookies["vechaitoken"];
  const { data: userData } = await Axios({
    url: "/api/customer/getbytoken",
    method: "GET",
    headers: { authorization: token },
  });
  const { data: users } = await Axios({
    url: "/api/customer/getalluser",
    method: "GET",
    headers: { authorization: token },
  });

  const getUserList = (key, users) => {
    // saler - buyer
    let result = [];
    switch (key) {
      case "saler":
        // get buyer list
        result = users.filter((user) => {
          return user.name === "buyer";
        });
        break;
      case "buyer":
        // get saler list
        result = users.filter((user) => {
          return user.name === "saler";
        });
        break;
      default:
        return result;
    }
    return result;
  };

  const filterUser = getUserList(userData[0].name, users); // saler
  // console.log("Filer::", filterUser);

  return {
    props: {
      userData: userData[0],
      filterUser,
    },
  };
}

export default function ChatBox({ userData }) {
  const { fullname, name, email, accessApp } = userData;
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
      const { from, to, text } = messageObj    
      console.log('TO', to)
      console.log('ID', userData.id)
      if(to === userData.id) {
        if(!chatLeftRenderd.current.includes(messageObj.timestamp)) {
          addMessage(text, 'left')
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

  const handleSendMsg = () => {
    console.log(socketIO.current);

    const messageObj = {
      messageId: chanel.message_id,
      userId: userData.id,
      from: userData.id,
      to: (chanel.buyer_id == userData.id) ? chanel.saler_id : userData.id,
      text: chatText,
      timestamp: new Date().getTime()
    }
    socketIO.current.emit(`sendMessage`, messageObj);
    addMessage(chatText, 'right')
    setChatText('')
    // message text chatText
    // chanel - chanel
  };

  const chatWith = (user) => {
    console.log(user);
    user.contentObj = JSON.parse(user.content)
    setChanel(user);
  };

  const addMessage = (message, key) => { // key - right left 
    let child = document.createElement('div');
    if(key === "left") {
      child.innerHTML = '<div class="row no-gutters"><div class="col-md-3"><div class="chat-bubble chat-bubble--left">' +
              message +
            '</div></div></div>';
    } else {
      child.innerHTML = '<div class="row no-gutters"><div class="col-md-3 offset-md-9"><div class="chat-bubble chat-bubble--right">' +
      message + '</div></div></div>';
    }
    child = child.firstChild;
    document.getElementById('chatbox').appendChild(child)
  }

  const triggerGetDataByParam = () => {
    const salerId = searchParams.get('salerId')
    const postId = searchParams.get('postId')
    if(salerId && postId) {
      checkAndCreateMessage({
        buyerId: userData.id,
        salerId: salerId,
        postId: postId 
      })
    }
  }

  const checkAndCreateMessage = async ({ buyerId, salerId, postId }) => {
    axios.post(`/api/message`, {
      buyerId, salerId, postId
    }).then((res) => {
      console.log(res);
      if (res && res.data) {
          const { data } = res;
          if(data && data.content) {
            data.contentObj = JSON.parse(data.content)
          }
          setChanel(data);
      }
    })
  }

  // const getMessageByParams = async ({ buyerId, salerId, postId }) => {
  //   axios.get(`/api/message/getbypost?buyerId=${buyerId}&salerId=${salerId}&postId=${postId}`).then((res) => {
  //     console.log(res);
  //     if (res && res.data) {
  //         const { data } = res.data;
  //         if(data && data[0]) {
  //           setChanel(data[0]);
  //         }

  //     }
  //   });
  // }
  
  const getMessageByUser = async ({ userId, role }) => {
    return axios.get(`/api/message/getbyuser?userId=${userId}&role=${role}`).then((res) => {
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
        <title>Các bài đăng</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="ico" href="/favicon.ico"></link>
        <script
          src="https://cdn.socket.io/4.7.2/socket.io.min.js"
          strategy="worker"
        ></script>
      </Head>
      <main>
        <Layout pages={layoutPages} user={{ fullname, name, email }}>
          <h2 className="posttitle" style={{ padding: "10px" }}>
            Chat box
          </h2>

          <div className="chat-box">
            <div className="container">
              <div className="row no-gutters">
                <div className="col-md-4 border-right">
                  <div className="search-box">
                    <div className="input-wrapper">
                      <input placeholder="Search here" type="text" />
                    </div>
                  </div>

                  {filterUser &&
                    filterUser.map((fuser, index) => {
                      return (
                        <div key={index} onClick={() => chatWith(fuser)}>
                          <div className="friend-drawer friend-drawer--onhover">
                            <img
                              className="profile-image"
                              src={
                                fuser.post_image ||
                                "https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                              }
                              alt=""
                            />
                            <div className="text">
                              <h6>{fuser.saler_fullname}</h6>
                              <p className="text-muted">{fuser.post_name}</p>
                            </div>
                            <span className="time text-muted small">
                              {fuser.saler_phonenumber}
                            </span>
                          </div>
                          <hr />
                        </div>
                      );
                    })}
                </div>
                <div className="col-md-8" style={{ height: 500, overflowY: "auto" }}>
                  {chanel ? (
                    <>
                      <div className="settings-tray">
                        <div className="friend-drawer no-gutters friend-drawer--grey">
                          <img
                            className="profile-image"
                            src={ chanel.post_image || "https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png" }
                            alt=""
                          />
                          <div className="text">
                            <h6>Bài viết: {chanel.post_name}</h6>
                            <p>Người bán: { chanel.saler_fullname }</p>
                            <p>Người mua: { chanel.buyer_fullname }</p>
                          </div>
                          <span className="settings-tray--right">
                          <p>Trạng thái bán: { chanel.post_approve_request || 'chưa bán' }</p>
                            <span>Giá muốn bán: { chanel.post_expectprice }</span>
                            {/* <i className="material-icons">cached</i> */}
                          </span>
                        </div>
                      </div>
                      <div className="chat-panel">
                        <div id="chatbox">
                          {
                            chanel.contentObj && chanel.contentObj.messages.map((msg, index) => {
                              let tpl = ''
                              if(msg && msg.userId === userData.id) {
                                tpl = <div className="row no-gutters" key={index}><div className="col-md-3 offset-md-9"><div className="chat-bubble chat-bubble--right"> {msg.text} </div></div></div>
                              } else {
                                tpl = <div className="row no-gutters" key={index}><div className="col-md-3"><div className="chat-bubble chat-bubble--left"> {msg.text} </div></div></div>
                              }
                              return tpl
                            })
                          }

                        </div>
                        {/* <div className="row no-gutters">
                          <div className="col-md-3">
                            <div className="chat-bubble chat-bubble--left">
                              Hello dude!
                            </div>
                          </div>
                        </div>
                        <div className="row no-gutters">
                          <div className="col-md-3 offset-md-9">
                            <div className="chat-bubble chat-bubble--right">
                              Hello dude!
                            </div>
                          </div>
                        </div> */}

                        <div className="row">
                          <div className="col-12">
                            <div className="chat-box-tray">
                              <BsFileEarmarkImage></BsFileEarmarkImage>
                              <input
                                type="text"
                                placeholder="Type your message here..."
                                value={chatText}
                                onChange={(e) => setChatText(e.target.value)}
                              />
                              <BsFillSendFill
                                onClick={handleSendMsg}
                              ></BsFillSendFill>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
