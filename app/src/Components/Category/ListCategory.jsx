import React, { useEffect, useState } from "react";
import categoryCrud from './../../Models/CategoryModel';

let CategoryList = () => {

    let [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        console.log("c")
        categoryCrud.GetAll()
            .then((res) => res.json())
            .then((json) => 
                setCategoryList(json)
            )
    }, []);

    return (
        categoryList.map((category, index) => {
            return (
                <div key={index+1}>{category.name}</div>
            )
        })
    )
}

export default CategoryList;
