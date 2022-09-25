import React from "react"
import css from '../Styles.module.css';

export class ButtonLoadMore extends React.Component {

    // state = {
    //     value: '',
    //     page: 1,
    //     images: null,
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     // console.log("prevState =>", prevState.value);
    //     // console.log("thisState =>", this.state.value);

    //     // console.log("prevState =>", prevState.page);
    //     // console.log("thisState =>", this.state.page);

    //     if (prevState.value !== this.state.value ||
    //         prevState.page !== this.state.page) {
    //         console.log("We need to fetch now!")
    //         }
    // }

    // handleLoadMore = () => {
    //     console.log('load more')
    //     this.setState({
    //         value: this.props.value,
    //         page: this.state.page + 1,
    //     })
    //     this.props.page(this.state.page)
    // }

    render() {
        return <button className={css.Button}
            type='submit'
            onClick={this.props.loadMore}
        > Load More </button>
    }
}