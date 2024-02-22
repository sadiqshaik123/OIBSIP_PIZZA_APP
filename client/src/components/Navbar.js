import React from "react";
import Logo from "../images/Logo.png";
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";
import { logoutUser } from "../actions/userActions";

export default function Navbar() {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded fixed-top">
        <a href="/"><img src={Logo} width="200" height="50" className="d-inline-block align-top" alt="" /> </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav  ms-auto">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <FaUser className="iconsa" />{" "}{currentUser.name.toUpperCase()}
                  </a>
                </li>
                {currentUser.isAdmin ? (
                  <li className="nav-item">
                    <a className="nav-link" href="/admin">
                      <button className='btnlog'>Admin Dashboard</button>
                    </a>
                  </li>
                ) : (
                  // <li className="nav-item">
                  //   <a className="nav-link" href="/orders">
                  //     <button className='btnlog'>Orders</button>
                  //   </a>
                  // </li>
                  <></>

                )}
                {currentUser.isAdmin ? (
                  <></>
                ) : (
                  <li className="nav-item">
                    <a className="nav-link" href="/cart">
                      <FaShoppingCart className="icons" />{" "}{cartState.cartItems.length}
                    </a>
                  </li>

                )}


              </>
            ) : (<></>)}

            {currentUser ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <button className='btnlog' onClick={() => { dispatch(logoutUser()) }}> <FaSignOutAlt className="icon" /></button>
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <button className='btnlog'>Login</button>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
