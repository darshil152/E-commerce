import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";


export default function Navbar() {
     
    const { cart } = useSelector((state) => state.allCart);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <span className="logo">REDUX STORE</span>
            <div>
                <Link className="navLink" to="/shoes">
                    Home
                </Link>
                <Link className="navLink" to="/cart">
                    Cart
                </Link>
                <span className="cartCount">Cart items: {cart.length}</span>
            </div>
        </div>
    )
}
