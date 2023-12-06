// import libraries
import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
// import css
import '../styles/header.scss';

// Header function
function Header () {
    const [show, setShow] = useState(true);

    return (
        <header>
            <h1>Pokédex</h1>
            <ToastContainer position='bottom-end' className='head__toast'>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Welcome on my Pokédex!</strong>
                    </Toast.Header>
                </Toast>
            </ToastContainer>
        </header>
    );
}
// Export to call it up in app.jsx
export default Header;