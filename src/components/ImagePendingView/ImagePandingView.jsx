import css from '../Styles.module.css';
import { Dna } from 'react-loader-spinner';


export const ImagePendingView = () => {
    return <div className={css.pendingValue}><Dna/> <div>Enter search Value</div><Dna/> </div>
}