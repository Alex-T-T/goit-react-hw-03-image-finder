import css from '../Styles.module.css';
import { Modal } from 'components/Modal/Modal';
import React from 'react';

export class ImageGalleryItem extends React.Component {
    state = {
        showModal: false,
    };

    togglenModal = () => {
        this.setState(prevState => ({
        showModal: !prevState.showModal,
        }));
    };

render() {
    
    const { webformatURL, tags, bigURL } = this.props

    return <>
            <li className={css.ImageGalleryItem}>
        <img className={css.ImageGalleryItem_image} src={webformatURL} alt={tags} onClick={ this.togglenModal} />
    </li>
    { this.state.showModal && <Modal onClose={ this.togglenModal}> <img src={bigURL} alt={tags} /> </Modal >}
        </>
    }
    
}


//  