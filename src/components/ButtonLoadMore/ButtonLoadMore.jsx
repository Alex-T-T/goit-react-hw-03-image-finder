import React from "react"
import css from '../Styles.module.css';
import PropTypes from 'prop-types';


export const ButtonLoadMore = ({onClick}) => {
    return <button className={css.Button}
            type='submit'
            onClick={onClick}
        > Load More </button>
}

ButtonLoadMore.propTypes = {
    onClick: PropTypes.func.isRequired,
}





// export class ButtonLoadMore extends React.Component {
//     render() {
//         return <button className={css.Button}
//             type='submit'
//             onClick={this.props.onClick}
//         > Load More </button>
//     }
// }

