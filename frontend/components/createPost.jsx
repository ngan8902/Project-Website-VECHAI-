'use strict'

import { useState } from 'react'
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap'
import UploadComponent from '@/components/uploadFile'
import { uploadFileToStorage } from '@/helper/firebase.hepler'

export default function createPost() {
    const [imageUpload, setImageUpload] = useState(null)
    const [files, setFiles] = useState(null)
    const handledUploadFile = (file) => {
        console.log('File::::', file.files[0])
        setFiles(file)
    }

    return (
        <>
            {/* <input type='file'
            onChange={(event) => {
                console.log(event.target.files[0])
                setImageUpload(event.target.files[0])
            }}
        /> */}
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
                            type="text"
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
                            type="number"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="exampleText"
                        sm={4}
                    >
                        Nội dung
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                        />
                    </Col>
                </FormGroup>
            </Form>
            <UploadComponent uploadCallBack={handledUploadFile}></UploadComponent>
            <hr></hr>
            <Button onClick={() => {
                uploadFileToStorage(files)
            }}> Tạo bài Viết</Button>
        </>
    );
}