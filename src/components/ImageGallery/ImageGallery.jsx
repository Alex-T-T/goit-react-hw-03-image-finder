import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../Styles.module.css';
import { ImagePendingView } from 'components/ImagePendingView/ImagePandingView';
import { ImageLoadingView } from 'components/ImageLoadingView/ImageLoadingView';
import { ImageErrorView } from 'components/ImageErrorView/ImageErrorView';
import { fetchImages } from 'Servises/Pixabay-api';
import { ButtonLoadMore } from 'components/ButtonLoadMore/ButtonLoadMore';



export class ImageGallery extends React.Component {
    state = {
        images: null,
        error: null,
        status: 'idle',
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
    
    render() {
        const { images, error, status } = this.state;

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
            return (<>
                <ul className={css.ImageGallery}>
                {images.hits.map(({id, webformatURL, tag}) => <ImageGalleryItem key={id} webformatURL={webformatURL} tag={tag} />)}
            </ul>
                <ButtonLoadMore loadMore={ } />
            </>)
        }

    }
}



