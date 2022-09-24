import css from '../Styles.module.css';

export const ImageGalleryItem = ({webformatURL, tag }) => {
    return <li className={css.ImageGalleryItem}>
                    <img className={css.ImageGalleryItem_image } src={webformatURL} alt={tag} />
                </li>
}


