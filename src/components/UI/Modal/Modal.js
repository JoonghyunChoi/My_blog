import React from 'react';
import './Modal.css';

const Modal = (props) => {
    return (
        <div className={props.show ? "Modal" : null}>
            {props.children}
        </div>
    )
}

export default Modal;