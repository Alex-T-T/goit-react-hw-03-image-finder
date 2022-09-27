import css from '../Styles.module.css';
import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';


const modalRoot = document.querySelector('#modal-root')


export class Modal extends React.Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (event) => {
        if (event.code === 'Escape') {
                this.props.onClose();
            }
    }

    handleBackdropClick = (event) => {
        if (event.currentTarget === event.target) {
            console.log("Click on backdrop");
            this.props.onClose();
        }
    }

    render() {
    return createPortal(<div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
            {this.props.children}
        </div>
    </div>, modalRoot)
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}




