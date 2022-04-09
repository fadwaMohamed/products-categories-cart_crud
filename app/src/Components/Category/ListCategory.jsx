import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryCrud from './../../Models/CategoryModel';
import { Table, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;


let CategoryList = () => {

    const columns = [
        {
          title: 'Category',
          dataIndex: 'name',
          sorter: {
            compare: (a, b) => {{
                if ( a.name < b.name ) return -1;
                if ( a.name > b.name )  return 1; 
                return 0;
            }}
          },
        },
        {
          title: 'Description',
          dataIndex: 'description',
          width: "45%",
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
            fixed: "right",
            width: 220,
            render: (text, item) => {
                return (
                    <div>
                        <Link
                            to={`/categories/edit/${item.id}`}
                            className="btn btn-outline-success btn-sm"
                            style={{
                                marginRight: 10
                            }}
                            >
                            Edit
                        </Link>
                        <Link
                            to={`/categories/details/${item.id}`}
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
          title: 'Do you want to delete this category?',
          icon: <ExclamationCircleOutlined />,
          onOk() {
            deleteCategory(id)
          },
          onCancel() {},
        });
      }
      
    /////////////////////////////////////////////////////////

    let GetCategories = () => {
        categoryCrud.GetAll()
            .then((res) => res.json())
            .then((json) => 
                setCategoryList(json)
            )
    }

    let deleteCategory = (id) => {
        categoryCrud.Delete(id);
        GetCategories();
    }
    
    let [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        GetCategories();
    }, []);


    return (
        <div className="container mt-2">
            <Link 
                to="add" 
                className="btn btn-outline-warning mb-2 float-end"
            >
                Add Category
            </Link>
            
            <Table columns={columns} dataSource={categoryList} scroll={{ y: 300, x: 600 }} />
        </div>
    )
}

export default CategoryList;
