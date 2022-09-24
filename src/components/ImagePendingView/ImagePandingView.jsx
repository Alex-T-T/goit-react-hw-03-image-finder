import css from '../Styles.module.css';
import { ThreeCircles } from 'react-loader-spinner';


export const ImagePendingView = () => {
    return <div className={css.pendingValue}><ThreeCircles /> <div>Enter search Value</div><ThreeCircles /></div>
}