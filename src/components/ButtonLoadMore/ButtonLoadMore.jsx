import React from "react"
import css from '../Styles.module.css';

export class ButtonLoadMore extends React.Component {


    render() {
        return <button className={css.Button}
            type='submit'
            onClick={this.props.onClick}
        > Load More </button>
    }
}