import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productCrud from './../../Models/ProductModel';
import { Table, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;


let ProductList = () => {

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: "image",
            render: (text, item) => {
                return (
                    <div>
                        <img 
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: "50%"
                            }}
                            src={item.image instanceof File? URL.createObjectURL(item.image) : item.image}
                        />   
                    </div>
                );},
        },
        {
          title: 'Product',
          dataIndex: 'name',
          key: "name",
          sorter: {
            compare: (a, b) => {{
                if ( a.name < b.name ) return -1;
                if ( a.name > b.name )  return 1; 
                return 0;
            }}
          },
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: "price",
          sorter: {
            compare: (a, b) => a.price - b.price,
          },
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: "quantity",
          sorter: {
            compare: (a, b) => a.quantity - b.quantity,
          },
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: "description",
          sorter: {
            compare: (a, b) => {{
                if ( a.description < b.description ) return -1;
                if ( a.description > b.description ) return 1;
                return 0;
            }},
          },
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: "actions",
            fixed: "right",
            width: 220,
            render: (text, item) => {
                return (
                    <div>
                        <Link
                            to={`/products/edit/${item.id}`}
                            className="btn btn-outline-success btn-sm"
                            style={{
                                marginRight: 10
                            }}
                            >
                            Edit
                        </Link>
                        <Link
                            to={`/products/details/${item.id}`}
                            className="btn btn-outline-info btn-sm"
                            style={{
                                marginRight: 10
                            }}
                            >
                            Details
                        </Link>
                        <input type={"button"} className="btn btn-outline-danger btn-sm" value="Delete"
                            onClick={() => showPromiseConfirm(item.id)} />
                    </div>
                );},
        }
    ];

    function showPromiseConfirm(id) {
        confirm({
          title: 'Do you want to delete this product?',
          icon: <ExclamationCircleOutlined />,
          onOk() {
            deleteProduct(id)
          },
          onCancel() {},
        });
      }
      
    /////////////////////////////////////////////////////////

    let GetProducts = () => {
        productCrud.GetAll()
            .then((res) => res.json())
            .then((json) => 
                setProductList(json)
            )
    }

    let deleteProduct = (id) => {
        productCrud.Delete(id);
        GetProducts();
    }
    
    let [productList, setProductList] = useState([]);

    useEffect(() => {
        GetProducts();
    }, []);


    return (
        <div className="container mt-2">
            <Link 
                to="add" 
                className="btn btn-outline-warning mb-2 float-end"
            >
                Add Product
            </Link>
            
            <Table columns={columns} /* rowKey="id" */ dataSource={productList} scroll={{ y: 300, x: 600 }} />
        </div>
    )
}

export default ProductList;
