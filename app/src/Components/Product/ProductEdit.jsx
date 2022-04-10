import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import productCrud from './../../Models/ProductModel';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Button, message, Card } from 'antd';

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
    //let [initProduct, setInitProduct] = useState(null);

    let Navigate = useNavigate();

    useEffect(() => {
        if(id != undefined) {
            productCrud.GetById(id)
                .then(data => data.json())
                .then(res => {
                    setProduct(JSON.parse(JSON.stringify(res)))
                    //setInitProduct(JSON.parse(JSON.stringify(res)));
                }
            );
        }
    }, [id]);

    const [form] = Form.useForm();

    const onFinish = () => {
        productCrud.Update(product);
        Navigate("/products");
    };
    
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    /* const onReset = () => {
        console.log(initProduct)
        setProduct(initProduct)
        form.resetFields(); 
        console.log(product)
    }; */

    let getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const changeHandler = (e) => {
        if(e.target.name == "image")
        {
            let imageBase64 = '';
            getBase64(e.target.files[0], (result) => {
                imageBase64 = result;
                setProduct({ ...product, [e.target.name]: imageBase64 });
            });
        }
        else
            setProduct({ ...product, [e.target.name]: e.target.value });
    }

    if(product) {
        return(
            <div className="container mt-2">

                <Card 
                    title={<h4 className="text-center m-0" style={{color: "#1890ff"}}> Edit Product </h4> }
                    bordered={false} 
                    style={{ width: 500 }} 
                    className="m-auto"
                >
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues= {{
                                name: product.name,
                                price: product.price,
                                quantity: product.quantity,
                                description: product.description
                            }} >
                        <Form.Item 
                            name="image" 
                            label="Image"
                            labelAlign="left" 
                            /* rules={[
                                {
                                    required: true,
                                }
                            ]} */
                        > 
                            <input type={"file"} name="image" onChange={changeHandler} />
                        </Form.Item>
                        <Form.Item 
                            name="name" 
                            label="Product name"
                            labelAlign="left" 
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    type: 'string',
                                    min: 3,
                                },
                            ]}
                            validateTrigger="onBlur"
                        >
                            <Input placeholder="Name" name="name" onChange={changeHandler} style={{width: 250}} />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            labelAlign="left"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    pattern: /^[1-9][0-9]*$/,
                                    message: "'quantity' should contain just number, greater than 0",
                                }
                            ]}
                            validateTrigger="onBlur"
                        >
                            <Input placeholder="Price" name="price" onChange={changeHandler} style={{width: 250}} />
                        </Form.Item>
                        <Form.Item
                            label="Quantity"
                            labelAlign="left"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    pattern: /^[1-9][0-9]*$/,
                                    message: "'quantity' should contain just number, greater than 0",
                                }
                            ]}
                            validateTrigger="onBlur"
                        >
                            <Input placeholder="Quantity" name="quantity" onChange={changeHandler} style={{width: 250}} />
                        </Form.Item>
                        <Form.Item 
                            name="description" 
                            label="Description" 
                            labelAlign="left"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    type: 'string',
                                    min: 6,
                                },
                            ]}
                            validateTrigger="onBlur"
                        >
                            <Input placeholder="Description" name="description" onChange={changeHandler} style={{width: 250}} />
                        </Form.Item>

                        <Form.Item style={{
                                display:"flex",
                                justifyContent: "space-around"
                            }} >
                            <Button type="primary" htmlType="submit" className="w-100">
                                Submit
                            </Button>
                            {/* <Button htmlType="button" onClick={onReset} className="float-end">
                                Reset
                            </Button> */}
                        </Form.Item>
                    </Form>
                </Card>

            </div>
        )
    }
    else {
        return (
            <div className="container text-center">
                <h4 style={{
                        marginTop: "30vh",
                        color: "#1890ff"
                    }}> 
                    Loading.............. <LoadingOutlined />
                </h4>
            </div>
        )
    }
}

export default EditProduct;
