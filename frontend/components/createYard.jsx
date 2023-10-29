'use strict'

import react from 'react'
import { Form, FormGroup, Label, Col, Input, Button, Row } from 'reactstrap'
import dynamic from 'next/dynamic'
import axios from 'axios'

import { uploadFileToStorage } from "@/helper/firebase.hepler"
import UploadComponent from '@/components/uploadFile'
import _ from 'lodash'

export default function CreateYard({ handleCreatedCB, userData, handleClosePost }) {
    let selectedLatlng = null
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    })

    const { id } = userData
    const [createYard, setCreateYard] = react.useState({
        name: null, userId: id, address: null, image: null, open_time: null, lag_lat: null
    })

    const [files, setFiles] = react.useState(null)
    const [errMsg, setErrMsg] = react.useState(null)

    const handledUploadFile = (file) => {
        console.log('File::::', file.files[0])
        setFiles(file.files[0])
    }

    const handleCreateYard = () => {
        if (!files) return setErrMsg('Vui lòng thêm ảnh!!!')
        if(!selectedLatlng) return setErrMsg('Vui lòng chon5 i!!!')
        uploadFileToStorage(files).then((imgeUrl) => {
            createYard.image = imgeUrl
            createYard.lag_lat = `${selectedLatlng.lat}, ${selectedLatlng.lng}`  // latlang = "133432.32432, 324324324.324324".split(", ") 
            console.log(imgeUrl)
            axios.post('/api/yard', {
                ...createYard
            }).then((res) => {
                if (!res && !res.data) return setErrMsg('Lỗi khi tạo bài viết!')
                const { data } = res
                handleCreatedCB && handleCreatedCB(data)
            })
        }).catch((err) => {
            console.log(err)
            return setErrMsg('Tải ảnh lên thất bại!!!')
        })
    }

    const handleClose = () => {
            handleClosePost()
        }

    const handleClickMapCb = (latlang) => {
        selectedLatlng = latlang
    }

        return (
            <>
                <Form>
                    <FormGroup row>
                        <Label for="namepost" sm={4}>
                            Tên vựa VeChai
                        </Label>
                        <Col sm={8}>
                            <Input
                                id="namepost"
                                name="name"
                                placeholder="Vựa Vechai"
                                type="text"
                                value={createYard.name}
                                onChange={(e) => {
                                    setCreateYard({
                                        ...createYard,
                                        name: e.target.value
                                    })
                                }}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="picture" sm={4}>
                            Hình ảnh
                        </Label>
                        <Col sm={8}>
                            <UploadComponent
                                uploadCallBack={handledUploadFile}>
                            </UploadComponent>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleText" sm={4}>
                            Thời gian mở cửa
                        </Label>
                        <Col sm={8}>
                            <Input
                                id="exampleText"
                                name="text"
                                type="text"
                                placeholder="08:00 - 20:00 (T2-T6)"
                                value={createYard.open_time}
                                onChange={(e) => {
                                    setCreateYard({
                                        ...createYard,
                                        open_time: e.target.value
                                    })
                                }}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="location" sm={4}>
                            Địa chỉ
                        </Label>
                        <Col sm={8}>
                            <Input
                                id="location"
                                name="location"
                                type="none"
                                placeholder="11/3 ĐHT19"
                                value={createYard.address}
                                onChange={(e) => {
                                    setCreateYard({
                                        ...createYard,
                                        address: e.target.value
                                    })
                                }}
                            />
                        </Col>
                    </FormGroup>
                </Form>
                <Map handleClickMapCb={handleClickMapCb}></Map>
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
                        <button className='btnModal' color="secondary" style={{ fontSize: 12 }} onClick={handleCreateYard}>
                            Thêm
                        </button>
                    </Col>
                </Row>
            </>
        );
    }