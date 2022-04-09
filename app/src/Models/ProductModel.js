let URL = "http://localhost:3000/Products";

let ProductsCrud = {
    GetAll: () => {
        return fetch(URL);
    },

    GetById: (id) => {
        return fetch(URL + `/${id}`);
    }, 

    Add: (newProduct) => {
        fetch(URL, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        .then((data) => data.json())
        .then((res) => console.log("Saved"))
        .catch((err) => console.log("error"))
    },

    Update: (product) => {
        fetch(URL + `/${product.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(product)
        })
        .then((data) => data.json())
        .then((res) => console.log("Updated"))
        .catch((err) => console.log("error"))
    },
    
    Delete: (id) => {
        fetch(URL + `/${id}`, {
            method: "DELETE"
        })
        .then((res) => {
            console.log("Deleted")
            return fetch(URL);
        })
        .catch((err) => console.log("error"))
    }
}

export default ProductsCrud;
