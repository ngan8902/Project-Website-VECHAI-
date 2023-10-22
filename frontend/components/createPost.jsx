'use strict'

import react from 'react'
import { Form, FormGroup, Label, Col, Input, Button, Row } from 'reactstrap'
import UploadComponent from '@/components/uploadFile'
import { uploadFileToStorage } from '@/helper/firebase.hepler'
import axios from '@/helper/axios.helper'

export default function createPostPage({ handleCreatedCB, userData, handleClosePost }) {
    const { id } = userData
    const [createPost, setCreatePost] = react.useState({
        name: null, userId: id, image: null, content: null, expect_price: null
    })
    const [files, setFiles] = react.useState(null)
    const [errMsg, setErrMsg] = react.useState(null)

    const handledUploadFile = (file) => {
        console.log('File::::', file.files[0])
        setFiles(file.files[0])
    }

    const handleCreatePost = () => {
        if (!files) return setErrMsg('Vui lòng thêm ảnh!!!')
        uploadFileToStorage(files).then((imgeUrl) => {
            createPost.image = imgeUrl
            axios.post('/api/post', {
                ...createPost
            }).then((res) => {
                if (!res && !res.data) return setErrMsg('Lỗi khi tạo bài viết!')
                const { data } = res
                handleCreatedCB && handleCreatedCB(data)
            }).catch((err) => {
                return setErrMsg(err.message)
            })

        }).catch(() => {
            return setErrMsg('Tải ảnh lên thất bại!!!')
        })
    }

    const handleClose = () => {
        handleClosePost()
    }

    return (
        <>
            <Form>
                <FormGroup row>
                    <Label for="namepost" sm={4}>
                        Tiêu đề
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="namepost"
                            name="email"
                            placeholder="Tiêu đề bài viết"
                            type="text" value={createPost.name}
                            onChange={(e) => {
                                setCreatePost({
                                    ...createPost,
                                    name: e.target.value
                                })
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="pricepost" sm={4}>
                        Giá muốn bán
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="pricepost"
                            name="email"
                            placeholder="Giá tiền"
                            type="number" value={createPost.expect_price}
                            onChange={(e) => {
                                setCreatePost({
                                    ...createPost,
                                    expect_price: parseFloat(e.target.value)
                                })
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleText" sm={4}>
                        Nội dung
                    </Label>
                    <Col sm={8}>
                        <Input id="exampleText" name="text" type="textarea" value={createPost.content}
                            onChange={(e) => {
                                setCreatePost({
                                    ...createPost,
                                    content: e.target.value
                                })
                            }} />
                    </Col>
                </FormGroup>
            </Form>
            <UploadComponent uploadCallBack={handledUploadFile}></UploadComponent>
            <hr></hr>
            {
                errMsg ? <code>{errMsg}</code> : null
            }
            <Row style={{ float: 'right' }}>
                <Col>
                    <button className='btnModal' color="primary" style={{ fontSize: 12 }} onClick={handleClose} >
                        Hủy
                    </button>
                </Col>
                <Col>
                    <button className='btnModal' color="secondary" style={{ fontSize: 12 }} onClick={handleCreatePost}>
                        Tạo
                    </button>
                </Col>
            </Row>
        </>
    );
}