import css from '../Styles.module.css';

export const ImageErrorView = (wrongValue) => {
    return <h1 className={css.wrong}>{ Object.values(wrongValue)}</h1>
}