// import libraries
import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
// import css
import "../../src/assets/styles/header.scss";
// Header function
function Header() {
  const [show, setShow] = useState(true);

  return (
    <header className='header'>
      <Link to='/' className='header__title'>
        <span className='header__title__text'>Pokedex</span>
        <GoHomeFill className='header__title__icon' />
      </Link>
      <ToastContainer position='bottom-end' className='header__toast'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className='me-auto'>Welcome on my Pokédex!</strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </header>
  );
}
// Export to call it up in app.jsx
export default Header;
