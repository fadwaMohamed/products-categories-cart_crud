import Header from './Components/Header';
import Footer from './Components/Footer';
import { Route, Routes, Navigate  } from 'react-router-dom';
import Products from './Components/Product/Products';
import Categories from './Components/Category/Categories';
import Cart from './Components/Cart/MyCart';
import NoMatch from './Components/NoMatchPage';

const AppRouter = () => {
    return (
        <>
            <Header />
                <div style={{
                        paddingTop: 65,
                        paddingBottom: 85,
                    }}>
                    <Routes>
                        <Route path="/" element={ <Navigate replace to='/products/'/> } />
                        <Route path="/products/*" element={<Products />} />
                        <Route path="/categories/*" element={<Categories />} />
                        <Route path="/cart/*" element={<Cart />} />
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </div>
            <Footer />
        </>
    );
};

export default AppRouter;
