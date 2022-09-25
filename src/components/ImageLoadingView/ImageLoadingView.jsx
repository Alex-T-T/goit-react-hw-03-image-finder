import css from '../Styles.module.css';
import { Dna } from 'react-loader-spinner';

export const ImageLoadingView = () => {
    return <div className={css.loadinView}>
                <p>Loading... Please wait</p> 
                    <Dna/> 
            </div>
}