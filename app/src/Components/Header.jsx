import React from "react";
import { Link } from "react-router-dom";

let Header = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{zIndex: -2}}>
                <div className="container-fluid">
                    <i 
                        className="fab fa-react navbar-brand fs-1 mx-2"
                        style={{
                            color: "#61DBFB"
                        }}
                    />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
                            <li className="nav-item mx-2">
                                <Link className="nav-link active" aria-current="page" to="/products">Products</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/categories">Categories</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav m-start mb-2 mb-lg-0 mx-4">
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/cart">
                                    <i class="fas fa-shopping-cart mx-2"></i>
                                    Cart
                                </Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" aria-current="page" to="/signIn">
                                    <i class="fas fa-user mx-2"></i>
                                    Sign in
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header