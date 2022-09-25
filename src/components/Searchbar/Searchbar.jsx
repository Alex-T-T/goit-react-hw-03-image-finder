// import PropTypes from 'prop-types';
import React from 'react';
import css from '../Styles.module.css';
import { BsSearch } from 'react-icons/bs';


export class Searchbar extends React.Component {
    state = {
        value: '',
    }
    // збирає інформацію з інпута
    handleSearchValue = (event) => {
        this.setState({ value: event.currentTarget.value.toLowerCase() });
    }
    // виконується при натисканні на кнопку пошуку та передає значення value до APP через props
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.value.trim() === '') {
            alert ("Enter search value !");
            return
        };

        this.props.onSubmit(this.state.value);
        this.setState({value: ''})
    }

    render() {
        return <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                <button type="submit" className={css.SearchForm_button}>
                    <span className={css.SearchForm_button_label}><BsSearch /></span>
    </button>

    <input
        className={css.SearchForm_input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={this.state.value}
        onChange={this.handleSearchValue}
    />
  </form>
</header>
    
    }
}
