import React from 'react';
import css from '../Styles.module.css';


export class ImageGallery extends React.Component {
    state = {
        images: {
            hits: []
        },
        loading: false,
    }

    componentDidUpdate(prevProps, prevState) {
        const KEY_API = '29186842-8a22994ff73abec3697b1eb66';
        const searchValue = this.props.searchValue;
        if (prevProps.searchValue !== searchValue) {
            this.setState({ loading: true });

            fetch(`https://pixabay.com/api/?q=${searchValue}&page=1&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(res => res.json())
            .then(images => this.setState({ images }))
            .finally(() => this.setState({loading: false}))
            
        }
    }


    render() {
        const { loading, images } = this.state;
        const { searchValue } = this.props;

        return <ul className={css.ImageGallery}>
            {loading && <p>Loading... Please wait</p>}
            {!searchValue && <p>Enter search Value</p>}
            {images.hits.map(image => <li key={image.id}>
                    <img className={css.ImageGalleryItem_image } src={image.webformatURL} alt="" />
                </li>)
            }
</ul>
    }

}



