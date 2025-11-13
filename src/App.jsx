import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react"

// react dependencies
import { BrowserRouter, Route, Routes } from "react-router-dom"

// user components
import Home from "./pages/Home"
import Component from "./pages/components"
import Animation from "./pages/Animation"
import Calculator from "./pages/Calculator"
import ForwardToHome from "./pages/ForwardToHome"
import AppLayouts from "./layouts/AppLayouts"
import Todos from "./pages/Todos"
import Products from "./pages/Products"
import Carts from "./pages/Carts"
import Login from "./pages/Login"

import { fetchProducts } from "./data/products"

// stylesheets
import "./App.css"
import { use } from "react"

function App() {
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  
  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])

  useEffect(() => setProducts(fetchProducts()), [])
  useEffect(() => console.log(products), [products])

  if (token === '') {
    return <Login setToken={setToken} setRole={setRole} />
  } else {
    return (
      <BrowserRouter basename="/csi205/">
        <Routes>
          <Route element={<AppLayouts products={products} carts={carts} setToken={setToken} />}>
            <Route path="home" element={<Home />} />
            <Route path="components" element={<Component />} />
            <Route path="animation" element={<Animation />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="todos" element={<Todos />} />
            <Route path="products" element={<Products
              products={products}
              carts={carts}
              setCarts={setCarts} />} />
            <Route path="carts" element={<Carts carts={carts} setCarts={setCarts} />} />
            <Route path="*" element={<ForwardToHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App