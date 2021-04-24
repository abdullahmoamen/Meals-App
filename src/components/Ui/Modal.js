import React from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';


const Backdrop=(props)=>{
    return(
        <div className={classes.backdrop} onClick={props.hideCart}></div>
    )
};


const ModalOverlay=(props)=>{
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalEl =document.getElementById('overlays')

const Modal = (props) => {
    return (
        <>
        {/* <Backdrop/>
        <ModalOverlay>{props.children}</ModalOverlay> */}
        {ReactDOM.createPortal(<Backdrop hideCart={props.hideCart}/>,portalEl)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalEl)}
        </>
    );
}

export default Modal;
