import { useState, useEffect, useRef } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const initPage = 'home';

const AppNavbar = ({ products, carts, setToken }) => {

    const homeRef = useRef();
    const calculatorRef = useRef();
    const animationRef = useRef();
    const componentsRef = useRef();
    const todosRef = useRef();
    const productsRef = useRef();
    const cartsRef = useRef();

    const [menu, setMenu] = useState('');

    useEffect(() => {
        setMenu(initPage);
    }, []);

    useEffect(() => {
        if (menu === 'calculator') calculatorRef.current.click();
        else if (menu === 'animation') animationRef.current.click();
        else if (menu === 'components') componentsRef.current.click();
        else if (menu === 'todos') todosRef.current.click();
        else if (menu === 'products') productsRef.current.click();
        else if (menu === 'carts') cartsRef.current.click();
        else homeRef.current.click();
    }, [menu]);

    return (
        <div className='d-flex justify-content-center align-items-center gap-2 bg-white py-3'>
            <Link to={'home'}>
                <Button variant='outline-primary' ref={homeRef} >Home</Button>
            </Link>
            <Link to={'calculator'}>
                <Button variant='outline-primary'>Calculator</Button>
            </Link>
            <Link to={'animation'}>
                <Button variant='outline-primary'>Animation</Button>
            </Link>
            <Link to={'components'}>
                <Button variant='outline-primary'>Components</Button>
            </Link>
            <Link to={'todos'}>
                <Button variant='outline-primary'>Todos</Button>
            </Link>
            <Link to={'products'}>
                <Button variant='outline-primary'>products ({products.length})</Button>
            </Link>
            <Link to={'carts'}>
                <Button variant='outline-primary'>carts ({carts.length})</Button>
            </Link>
            <Button
                variant='outline-danger'
                onClick={() => setToken('')}
                className='ms-2'
            >
                Log out
            </Button>
        </div>
    );
}

export default AppNavbar;