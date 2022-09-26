// import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../Styles.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({images}) => {
    return <ul className={css.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) =>
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    tags={tags}
                    bigURL={largeImageURL}
                />
            )}
        </ul>
}


ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      }))
}

// export class ImageGallery extends React.Component {

//     render() {
        // return <ul className={css.ImageGallery}>
        //     {this.props.images.map(({ id, webformatURL, largeImageURL, tags }) =>
        //         <ImageGalleryItem
        //             key={id}
        //             webformatURL={webformatURL}
        //             tags={tags}
        //             bigURL={largeImageURL}
        //         />
        //     )}
        // </ul>
//     }
// }




// =================================================================================================
    // state = {
    //     images: {
    //         hits: [],
    //         totalHits: '',
    //         total: '',
    //     },
    //     error: null,
    //     status: 'idle',
    //     page: 1,
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     const searchValue = this.props.searchValue;

    //     // if (prevProps.searchValue === searchValue && 
    //     //     prevState.page !== this.state.page) {
    //     //     this.setState({images: {
    //     //     hits: [],
    //     //     totalHits: '',
    //     //     total: '',
    //     // },
    //     // page: 1,})
    //     //     }


    //     if (prevProps.searchValue !== searchValue || 
    //         prevState.page !== this.state.page
    //     ) {
    //         this.setState({
    //             status: 'pending',
    //             images: {
    //                 hits: [],
    //                 totalHits: '',
    //                 total: '',
    //             },
    //              page: 1,
    //         });

    //         console.log("prevState =>", prevState.page);
    //         console.log("thisState =>", this.state.page);

    //         fetchImages(searchValue, this.state.page)
    //             .then(({ total, totalHits, hits }) => {
    //             this.setState(prevState => ({
    //                 images: {
    //                     hits: [...prevState.images.hits, ...hits],
    //                     totalHits,
    //                     total,
    //                 },
    //                 status: 'resolved',
    //             }));
                
    //             if (total === 0) {
    //                 this.setState({ status: 'rejected' })
    //                 return Promise.reject(new Error(`It's sad, but we have a problem! We can't find a ${searchValue}! Change it please!`))
    //             }}
    //         )
    //         .catch(error => this.setState({error, status: 'rejected'}))
    //     }
    // }



    // loadMore = () => {this.setState(prevState => ({ page: prevState.page + 1 }))};
    
    // render() {
    //     const { images, error, status} = this.state;

    //     if (status === 'idle') {
    //         return <ImagePendingView/> 
    //     }

    //     if (status === 'pending') {
    //         return <ImageLoadingView/>
    //     }

    //     if (status === 'rejected') {
    //         return <ImageErrorView wrongValue={ error.message} />
    //     }

    //     if (status === 'resolved') {

    //         return (<>
            //     <ul className={css.ImageGallery}>
            //         {images.hits.map(({ id, webformatURL, largeImageURL, tags }) =>
            //                 <ImageGalleryItem
            //                 key={id}
            //                 webformatURL={webformatURL}
            //                 tags={tags}
            //                 bigURL={largeImageURL}
            //             />
            //         )}
            // </ul>
    //             <ButtonLoadMore onClick={ this.loadMore} />
    //             </>)
    //     }

    // }
// }

