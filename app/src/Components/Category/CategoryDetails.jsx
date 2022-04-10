import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import categoryCrud from './../../Models/CategoryModel';
import { LoadingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;


let DetailsCategory = () => {

    let {id}  = useParams();

    let [category, setCategory] = useState(null);

    useEffect(() => {
        if(id != undefined) {
            categoryCrud.GetById(id)
                .then(data => data.json())
                .then(json => setCategory(json)
            );
        }
    }, [id]);

    if(category) {
        return(
            <div className="container mt-2"
                style={{
                    paddingTop: "25vh"
                }}>
                <Card
                    className="m-auto"
                    style={{ width: 300, color: "#595959" }}
                >
                    <Meta
                        title= {<h4 className="text-center" style={{color: "#1890ff"}}> {category.name} </h4> }
                        description= {
                            <>
                                <h6> {category.description} </h6> 
                            </>
                        }
                    />
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

export default DetailsCategory;
