import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import categoryCrud from './../../Models/CategoryModel';
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

let EditCategory = () => {

    let {id}  = useParams();

    let [category, setCategory] = useState(null);
    //let [initCategory, setInitCategory] = useState(null);

    let Navigate = useNavigate();

    useEffect(() => {
        if(id != undefined) {
            categoryCrud.GetById(id)
                .then(data => data.json())
                .then(res => {
                    setCategory(JSON.parse(JSON.stringify(res)))
                    //setInitCategory(JSON.parse(JSON.stringify(res)));
                }
            );
        }
    }, [id]);

    const [form] = Form.useForm();

    const onFinish = () => {
        categoryCrud.Update(category);
        Navigate("/categories");
    };
    
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    /* const onReset = () => {
        console.log(initCategory)
        setCategory(initCategory)
        form.resetFields(); 
        console.log(category)
    }; */

    const changeHandler = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }

    if(category) {
        return(
            <div className="container mt-2">

                <Card 
                    title={<h4 className="text-center m-0" style={{color: "#1890ff"}}> Edit Category </h4> }
                    bordered={false} 
                    style={{ width: 500 }} 
                    className="m-auto"
                >
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues= {{
                                name: category.name,
                                description: category.description
                            }} >
                        <Form.Item 
                            name="name" 
                            label="Category name"
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

export default EditCategory;
