import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";

import './Error.css'

const ModalOverlay = (props) => {
    return (
        <Card className="modal" role="alertdialog" aria-modal="true" aria-labelledby="error-title">
            <header className="header">
                <h2 id="error-title">{props.title}</h2>
            </header>
            <div className="content">
                <p>{props.message}</p>
            </div>
            <footer className="actions">
                <Button onClick={props.onConfirm}>Okay</Button>
            </footer>
        </Card>
    )
}

const ErrorModal = (props) => {
    const backdropRoot = document.getElementById('backdrop-root');
    const overlayRoot = document.getElementById('overlay-root');

    if (!backdropRoot || !overlayRoot) {
        throw new globalThis.Error('Error modal portal roots are missing from the document.');
    }

    return (
        <Fragment>
            {ReactDOM.createPortal(
                <div className="backdrop" onClick={props.onConfirm} />,
                backdropRoot
            )}
            {ReactDOM.createPortal(
                <ModalOverlay 
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />,
                overlayRoot
            )}
        </Fragment>
    )
}

export default ErrorModal;