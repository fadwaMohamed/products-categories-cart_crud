let URL = "http://localhost:3000/Categories";

let CategoriesCrud = {
  GetAll: () => {
    return fetch(URL);
  },
  GetById: (id) => {
    return fetch(URL + `/${id}`);
  },
  Add: (newCategory) => {
    fetch(URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((data) => data.json())
      .then((res) => console.log("Saved"))
      .catch((err) => console.log("error"));
  },
  Update: (category) => {
    fetch(URL + `/${category.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((data) => data.json())
      .then((res) => console.log("Saved"))
      .catch((err) => console.log("error"));
  },
  Delete: (id) => {
    fetch(URL + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => console.log("Saved"))
      .catch((err) => console.log("error"));
  },
};

export default CategoriesCrud;
