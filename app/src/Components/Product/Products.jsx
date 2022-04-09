import { Route, Routes } from "react-router-dom";
import ListProduct from "./ListProduct";
import Details from "./ProductDetails";
import Add from "./ProductAdd";
import Edit from "./ProductEdit";


let product = () => {

    return(
        <>
            <div className="container">
                <Routes>
                    <Route
                        index
                        element={
                            <ListProduct />
                        }
                    />
                    <Route
                        path="/add"
                        element={
                            <Add />
                        }
                    />
                    <Route
                        path="/details/:id/*"
                        element={
                            <Details   
                            />
                        }
                    />
                    <Route
                        path="/edit/:id"
                        element={
                            <Edit/>
                        }
                    />
                </Routes>
            </div>
        </>   
    )
}

export default product;
