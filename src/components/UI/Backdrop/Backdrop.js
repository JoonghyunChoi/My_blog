import React from 'react';
import './Backdrop.css';

function Backdrop(props) {
    return (
        <div onClick={props.clicked} className={props.show ? 'Backdrop' : null}>
        </div>
    )
}

export default Backdrop;