import React, { Component } from 'react';

import arrowBack from '../../icons/arrowBack.svg'
import classes from './Search.module.css';
import * as booksApi from '../../APIs/booksApi';
import Shelf from '../Shelf/Shelf';

class Search extends Component {
    state = {
        query: '',
        books: [],
        error: false,
        loaded: false
    }

    onShelfChange = (id, moveTo) => {
        const { booksInShelf } = this.props;
        const index = booksInShelf.findIndex(book => book.id === id);

        if(index === -1) {
            const book = {...this.state.books.find(book => book.id === id)};
            book.shelf = moveTo;
            const books = this.state.books.filter(book => book.id !== id);
    
            this.props.addBook(book);
            this.setState({books});
    
            booksApi.update({id}, moveTo)
                .then(() => {this.setState({ error: false })})
                .catch(() => { this.setState({ error: true })});
        }
    }

    updateQuery = e => {
        // e.preventDefault();
        this.setState({ query: e.target.value });
        booksApi.search(e.target.value)
            .then((books = []) => {
                this.setState({ books: books, error: false, loaded: true});
            })
            .catch(() => {
                this.setState({error: true, loaded: true});
            })
    }

    render() {
        const { query, books, error, loaded } = this.state;
        const { history, booksInShelf } = this.props;
        
        const inShelf = books.filter(book => {
            return booksInShelf.findIndex(el => {
                if(el.id === book.id) {
                    book.shelf = el.shelf;
                    return true;
                }
                return false;
            }) !== -1;
        });

        if(inShelf.length)
            console.log(inShelf);

        let content = null;

        if(error)
            content = <div className='ErrorMessage'>*Network Error</div>;
        else if(loaded && !books.length && query)
            content = <div className="InfoMessage">No books are found.</div>;
        else if(loaded && books.length)
            content = <Shelf books={books} onShelfChange={this.onShelfChange} />
        else if(!query)
            content = <div className="InfoMessage">*Type in input to search books</div>

        return (
            <React.Fragment>
                <div className={classes.SearchBox}>
                    <input 
                         className={classes.SearchInput}
                        type='text' 
                        placeholder="Search books ..."  
                        value={query}
                        onChange={this.updateQuery} />
                    <img 
                        src={arrowBack} 
                        alt="arrow back icon" 
                        className={classes.SearchArrowBack} 
                        onClick={() => history.goBack()}/>
                </div>

                <div className="container" style={{ marginTop: '4rem'}}>
                    {content}
                </div>
            </React.Fragment>
        );
    }
}

export default Search;