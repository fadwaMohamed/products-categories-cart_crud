import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import productCrud from './../../Models/ProductModel';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Button, message, InputNumber } from 'antd';

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
}; 

let EditProduct = () => {

    let {id}  = useParams();

    let [product, setProduct] = useState(null);

    useEffect(() => {
        if(id != undefined) {
            productCrud.GetById(id)
                .then(data => data.json())
                .then(json => setProduct(json)
            );
        }
    }, [id]);

    const [form] = Form.useForm();

    const onFinish = () => {
        message.success('Submit success!');
    };
    
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onReset = () => {
        form.resetFields();
    };

    if(product) {
        return(
            <div className="container mt-5">

                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}
                        onFinishFailed={onFinishFailed} >
                    <Form.Item name="name" label="Product name" rules={[
                                                                        {
                                                                            required: true,
                                                                        },
                                                                        {
                                                                            type: 'string',
                                                                            min: 3,
                                                                        },
                                                                    ]}>
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Price">
                        <Form.Item name="price" noStyle>
                            <InputNumber min={0} style={{width: "100%"}} rules={[{required: true}]} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Quantity">
                        <Form.Item name="quantity" noStyle>
                            <InputNumber min={1} style={{width: "100%"}} rules={[{required: true}]} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[
                                                                            {
                                                                                required: true,
                                                                            },
                                                                            {
                                                                                type: 'string',
                                                                                min: 6,
                                                                            },
                                                                        ]}>
                        <Input placeholder="Description" />
                    </Form.Item>

                    <Form.Item style={{
                            display:"flex",
                            justifyContent: "space-around"
                        }} >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset} className="float-end">
                            Reset
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }
    else {
        return (
            <div className="container text-center">
                <h4 style={{
                        marginTop: "30vh",
                        color: "#003a8c"
                    }}> 
                    Loading.............. <LoadingOutlined />
                </h4>
            </div>
        )
    }
}

export default EditProduct;
