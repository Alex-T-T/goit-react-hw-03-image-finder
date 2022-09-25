import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../Styles.module.css';
import { ImagePendingView } from 'components/ImagePendingView/ImagePandingView';
import { ImageLoadingView } from 'components/ImageLoadingView/ImageLoadingView';
import { ImageErrorView } from 'components/ImageErrorView/ImageErrorView';
import { fetchImages } from 'Servises/Pixabay-api';
import { ButtonLoadMore } from 'components/ButtonLoadMore/ButtonLoadMore';
// import { Modal } from 'components/Modal/Modal';




export class ImageGallery extends React.Component {
    state = {
        images: {
            hits: [],
            totalHits: '',
            total: '',
        },
        error: null,
        status: 'idle',
        // showModal: false,
        page: 1,
    }

    componentDidUpdate(prevProps, prevState) {
        const searchValue = this.props.searchValue;
        if (prevProps.searchValue !== searchValue || 
            prevState.page !== this.state.page ) {
            this.setState({ status: 'pending' });

            console.log("prevState =>", prevState.page);
            console.log("thisState =>", this.state.page);

            fetchImages(searchValue, this.state.page)
                .then(({ total, totalHits, hits }) => {
                this.setState(prevState => ({
                    images: {
                        hits: [...prevState.images.hits, ...hits],
                        totalHits,
                        total,
                    },
                    status: 'resolved',
                }));
                // this.setState({ images: { total, totalHits, hits }, status: 'resolved', })
                
                if (total === 0) {
                    this.setState({ status: 'rejected' })
                    return Promise.reject(new Error(`It's sad, but we have a problem! We can't find a ${searchValue}! Change it please!`))
                }}
            )
            .catch(error => this.setState({error, status: 'rejected'}))
            
        }
    }

    loadMore = () => {this.setState(prevState => ({ page: prevState.page + 1 }))};
    
    render() {
        const { images, error, status} = this.state;

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
                    {images.hits.map(({ id, webformatURL, largeImageURL, tags }) =>
                            <ImageGalleryItem
                            key={id}
                            webformatURL={webformatURL}
                            tags={tags}
                            bigURL={largeImageURL}
                        />
                    )}
            </ul>
                <ButtonLoadMore onClick={ this.loadMore} />
                </>)
        }

    }
}

//  <ButtonLoadMore value={this.props.searchValue} page={ this.handleLoadMore} />

