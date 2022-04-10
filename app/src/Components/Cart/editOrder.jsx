import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productCrud from './../../Models/ProductModel';
import cartCrud from './../../Models/CartModel';
import { message, Modal, Select } from 'antd';
const { Option } = Select;


const Addtocart = () => {

    let {id}  = useParams();
    let navigate  = useNavigate()

    let [product, setProduct] = useState(null);
    let [order, setOrder] = useState(null);
    let [flagExist, setFlagExist] = useState(false);
    let selectedQuantity = 0;
    const isInitialMount = useRef(true);

    useEffect(() => {
        if(id != undefined) {
            productCrud.GetById(id)
                .then(data => data.json())
                .then(res => {
                    setProduct(res)
                    cartCrud.GetOrderById(res.id)
                        .then(data => data.json())
                        .then(res => {
                            setOrder(res)
                            if(res) setFlagExist(true);
                        })
                });
        }
    }, [id]);

    useEffect(() => {
        if (!isInitialMount.current) { 
            if(order != null)
            {
                if(flagExist) {
                    cartCrud.UpdateOrder(order);
                }
                else {
                    cartCrud.AddOrder(order);
                }
            }
        }
    }, [order])
      
    const handleOk = () => {
        if(selectedQuantity > 0)
        {
            if(order)
            {
                let newQuantity = order.quantity + selectedQuantity
                setOrder({ ...order, ["quantity"]: newQuantity, ["price"]: product.price * newQuantity });
            }
            else 
            {
                setOrder({
                    id: product.id,
                    productname: product.name,
                    quantity: selectedQuantity,
                    price: product.price * selectedQuantity
                });
            }
            navigate(-1);
        }
        else 
        {
            message.error("Choose quantity");
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const changeHandle = (val) => {
        // use seconed useEffect in updates only
        isInitialMount.current = false;
        selectedQuantity = val;
    }


    if(product) 
    {
        let options = [];
        for (let num = 1; num <= product.quantity; num++) {
            options.push(<Option key={num} value={num}>{num}</Option>)
        }
    
        return (
            <>
                <Modal 
                    title= {<h4 className="text-center mt-2" style={{color: "#1890ff"}}> Add to Cart </h4> }
                    visible={true} 
                    onOk={handleOk} 
                    okText="Add to cart"
                    maskClosable= {false}
                    onCancel={handleCancel}>
                    <label className='mx-3 fs-5'> Quantity: </label>
                        <Select
                            id='newVal'
                            className="my-2"
                            onChange={changeHandle}
                            placeholder="Select Quantity"
                            style={{ width: 200 }}
                        >
                            {options}
                        </Select>
                </Modal>
            </>
        );
    }
    
};

export default Addtocart;
