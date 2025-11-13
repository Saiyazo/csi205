import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";

const AppLayouts = ({products, carts, setToken}) => {
    
    return (
        <div className="mx-auto" style={{width: '1020px', height: '640px'}}>
            <AppHeader />
            <AppNavbar products={products} carts={carts} setToken={setToken}/>
            <Outlet />
            <AppFooter />
        </div>
    );
}

export default AppLayouts;