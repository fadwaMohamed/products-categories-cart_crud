import React, { useEffect, useState } from "react";
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import productCrud from './../../Models/ProductModel';
import AddToCart from './../Cart/AddProductToCart';
import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;


let DetailsProduct = () => {

    let {id}  = useParams();
    let navigate  = useNavigate();

    let [product, setProduct] = useState(null);

    useEffect(() => {
        if(id != undefined) {
            productCrud.GetById(id)
                .then(data => data.json())
                .then(json => setProduct(json)
            );
        }
    }, [id]);

    if(product) {
        return(
            <div className="container mt-2">
                <Card
                    className="m-auto"
                    style={{ width: 300, color: "#595959" }}
                    cover={
                        <img
                            alt="example"
                            src={product.image instanceof File? URL.createObjectURL(product.image) : "../" + product.image}
                            style= {{
                                width:300,
                                height:200,
                            }}
                        />
                    }
                    actions={[
                        <button className="btn btn-warning" onClick={() => navigate(`../details/${product.id}/addToCart`)}>Add to cart</button>
                    ]}
                >
                    <Meta
                        title= {<h4 className="text-center" style={{color: "#1890ff"}}> {product.name} </h4> }
                        description= {
                            <>
                                <h6> {product.description} </h6> 
                                <h6> EGP <span className="fs-4" style={{color: "#1890ff"}}>{product.price}</span> </h6>
                                <h6> Available <span className="fs-5" style={{color: "#1890ff"}}>{product.quantity}</span> pieces</h6>
                            </>
                        }
    
                    />
                </Card>
                <Routes>
                    <Route path="/addToCart" element={<AddToCart />} />
                </Routes>
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

export default DetailsProduct;
