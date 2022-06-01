let URL = "http://localhost:3000/Cart";

let CardCrud = {
  GetAllOrders: () => {
    return fetch(URL);
  },

  GetOrderById: (id) => {
    return fetch(URL + `/${id}`).then((res) => {
      if (res.status != 404) return res;
      else return null;
    });
  },

  AddOrder: (order) => {
    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((data) => data.json())
      .then((res) => console.log("Saved"))
      .catch((err) => console.log("error"));
  },

  UpdateOrder: (order) => {
    fetch(URL + `/${order.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((data) => data.json())
      .then((res) => console.log("Updated"))
      .catch((err) => console.log("error"));
  },

  Delete: (id) => {
    fetch(URL + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => console.log("Deleted"))
      .catch((err) => console.log("error"));
  },
};

export default CardCrud;
