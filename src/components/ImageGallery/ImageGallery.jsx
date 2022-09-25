import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../Styles.module.css';
import { ImagePendingView } from 'components/ImagePendingView/ImagePandingView';
import { ImageLoadingView } from 'components/ImageLoadingView/ImageLoadingView';
import { ImageErrorView } from 'components/ImageErrorView/ImageErrorView';
import { fetchImages } from 'Servises/Pixabay-api';
// import { ButtonLoadMore } from 'components/ButtonLoadMore/ButtonLoadMore';
import { Modal } from 'components/Modal/Modal';




export class ImageGallery extends React.Component {
    state = {
        images: null,
        error: null,
        status: 'idle',
        showModal: false,
    }

    componentDidUpdate(prevProps, prevState) {
        const searchValue = this.props.searchValue;
        if (prevProps.searchValue !== searchValue) {
            this.setState({ status: 'pending' });

                fetchImages(searchValue)
                .then(({ total, totalHits, hits }) =>{
                    this.setState({ images: { total, totalHits, hits }, status: 'resolved' })
                
                    if (total === 0) {
                        this.setState({ status: 'rejected' })
                        return Promise.reject(new Error(`It's sad, but we have a problem! We can't find a ${searchValue}! Change it please!`))
                    }}
            )
            .catch(error => this.setState({error, status: 'rejected'}))
            
        }
    }
    
    toggleModal = () => {
        this.setState(({showModal}) => ({
            showModal: !showModal
        }))
    }

    render() {
        const { images, error, status, showModal } = this.state;

        if (status === 'idle') {
            return <ImagePendingView/> 
        }

        if (status === 'pending') {
            return <ImageLoadingView/>
        }

        if (status === 'rejected') {
            return <ImageErrorView wrongValue={ error.message} />
        }

        if (status === 'resolved') {
    const alt = "dog";
    const src = "https://pixabay.com/get/g46a56e63b041725751ac805e3239d63dc743cc7d51fc16bd7a91515b0588674e8812c03af3e49eed63d906c1499864dbdfb1eff7ddbd7634ad584a716b935079_1280.jpg"
            


            return (<>
                <ul className={css.ImageGallery}>
                    {images.hits.map(({ id, webformatURL, largeImageURL, tag }) => <ImageGalleryItem key={id} webformatURL={webformatURL} tag={tag} onClick={this.toggleModal } />)}
            </ul>
                {/* <ButtonLoadMore onClick={ } /> */}
                {showModal && <Modal onClose={ this.toggleModal}> <img src={src} alt={alt} /> </Modal >}
                
                </>)
        }

    }
}



