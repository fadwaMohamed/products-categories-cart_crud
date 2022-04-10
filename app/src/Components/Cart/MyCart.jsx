import React, { useEffect, useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import cartCrud from './../../Models/CartModel';
import AddToCart from './../Cart/AddProductToCart';
import { LoadingOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Card, Modal } from 'antd';
const { Meta } = Card;
const { confirm } = Modal;


const MyCart = () => {

    let navigate  = useNavigate()

    let [orders, setOrders] = useState(null);
    let [totalPrice, setTotalPrice] = useState(0);

    let getOrders = () => {
        let priceT = 0;
        cartCrud.GetAllOrders()
            .then(data => data.json())
            .then(res => {
                setOrders(res);
                res.forEach(order => {
                    priceT += order.price;
                });
                setTotalPrice(priceT);
            })
    }

    useEffect(() => {
        getOrders();
    }, [AddToCart]);

    let deleteOrder = (id) => {
        confirm({
            title: 'Do you want to delete this product from order?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                cartCrud.Delete(id);
                setTimeout(getOrders, 100);
            },
            onCancel() {},
        });
    }

    let confirmOrder = () => {
        confirm({
            title: 'Do you want to confirm order?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                orders.forEach(order => {
                    cartCrud.Delete(order.id);
                })
                setOrders({});
                setTotalPrice(0);
            },
            onCancel() {},
        });
    }


    if(orders) {
        return(
            <>
            <h4 className='m-auto text-center my-3 w-25 border-bottom pb-2'> My order </h4>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                padding: "5px 0px 15px"
            }}>
                {orders.length > 0 ?
                    orders.map(order => {
                        return(
                            <Card
                                className="m-auto mt-3"
                                style={{ width: 250, color: "#595959" }}
                                actions={[
                                    <EditOutlined key="edit" onClick={() => navigate(`/cart/addToCart/${order.id}`)} />,
                                    <DeleteOutlined key="delete" onClick={() => deleteOrder(order.id)}/>
                                ]}
                                >
                                <Meta
                                    title= {<h4 className="text-center" style={{color: "#1890ff"}}> {order.productname} </h4> }
                                    description= {
                                        <>
                                            <h6> <span className="fs-5" style={{color: "#1890ff"}}>{order.quantity}</span> pieces</h6>
                                            <h6> EGP <span className="fs-5" style={{color: "#1890ff"}}>{order.price}</span> </h6>
                                        </>
                                    }
                
                                />
                            </Card>
                        )
                    }) : <div></div>}
            </div>
            <div className='text-center'>
                <Card
                    className="m-auto mt-3 mb-5"
                    style={{ width: 250, color: "#595959" }}
                    actions={[
                        <button className='btn btn-outline-success' onClick={confirmOrder}>Confirm order</button>
                    ]}
                    >
                    <Meta
                        title= {<h4 className="text-center" style={{color: "#1890ff"}}> Total Price </h4> }
                        description= {
                            <>
                                <h5>{totalPrice}</h5>
                            </>
                        }
                    />
                </Card>
            </div>
            <Routes>
                    <Route path="/addToCart/:id" element={<AddToCart getOrders={getOrders} />} />
            </Routes>
            </>
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
};

export default MyCart;
