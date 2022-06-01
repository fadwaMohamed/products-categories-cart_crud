import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryCrud from "./../../Models/CategoryModel";
import { Form, Input, Button, message, Card } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

let AddCategory = () => {
  let [category, setCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

  let Navigate = useNavigate();

  useEffect(() => {
    let ids = [];
    categoryCrud
      .GetAll()
      .then((data) => data.json())
      .then((res) => {
        res.forEach((element) => {
          ids.push(element.id);
        });
        setCategory({ ...category, ["id"]: generateNewId(ids) });
      });
  }, []);

  const generateNewId = (ids) => {
    let newId;
    do {
      newId = Math.floor(Math.random() * 1000);
    } while (ids.find((elm) => newId == elm));
    return newId;
  };

  const [form] = Form.useForm();

  const onFinish = () => {
    categoryCrud.Add(category);
    Navigate("/categories");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  /* const onReset = () => {
        form.resetFields(); 
        console.log(category)
    }; */

  const changeHandler = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      <Card
        title={
          <h4 className="text-center m-0" style={{ color: "#1890ff" }}>
            {" "}
            Add new category{" "}
          </h4>
        }
        bordered={false}
        style={{ width: 500 }}
        className="m-auto"
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            label="Category name"
            labelAlign="left"
            rules={[
              {
                required: true,
              },
              {
                type: "string",
                min: 3,
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="Name"
              name="name"
              onChange={changeHandler}
              style={{ width: 250 }}
            />
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
                type: "string",
                min: 6,
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="Description"
              name="description"
              onChange={changeHandler}
              style={{ width: 250 }}
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
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
  );
};

export default AddCategory;
