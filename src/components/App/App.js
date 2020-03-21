import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as booksApi from '../../APIs/booksApi';

import classes from './App.module.css';
import Spinner from '../UI/SpinnerCenter/SpinnerCenter';
import Navbar from '../Navbar/Navbar';
import Main from '../Main/Main';
import Search from '../Search/Search';
import AddBookButton from '../AddBookButton/AddBookButton';
import shelfs from '../../utils/shelfs';

class App extends React.Component {
    state = {
        loading: true,
        books: [],
        error: false,
    }

    onShelfChange = (id, moveTo) => {
        if(moveTo === shelfs.none) {
            // const book = {...this.state.books.find(book => book.id === id)};
            const books = this.state.books.filter(book => book.id !== id);
            this.setState({books: books});
            booksApi.update({id}, 'none')
                .then(() => {return;})
                .catch(() => this.setState({ error: true }));
        }

        else {
            const books = [...this.state.books];
            const index = books.findIndex(book => book.id === id);

            if(books[index].shelf !== moveTo) {
            
                books[index].shelf = moveTo;
                this.setState({ books, updating: false });
                booksApi.update({id}, moveTo)
                    .then(() => {
                        return;
                    })
                    .catch(() => {
                        this.setState({error: true})
                    })
            }
        }
    }

    addBook = book => {
        const books = [...this.state.books, book];
        this.setState({books});
    }

    render() {
        let { loading , books, error } = this.state;
        let content = null;
    
        if(loading)
            content = <Spinner />;
        else if(!loading && books.length && !error)
            content = (
                <React.Fragment>
                    <Main books={books} onShelfChange={this.onShelfChange} />
                    <AddBookButton />
                </React.Fragment>
            );
        else if(!loading && !books.length && !error)
            content = <h5 className={classes.InfoMessage}>There are No Books to display</h5>;
        else if(!loading && error)
            content = <h5 className={classes.ErrorMessage}>*Network Error</h5>

        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/" render={() => (
                        <React.Fragment>
                            <Navbar />
                            {content}
                        </React.Fragment>
                    )} />

                    <Route path='/search' render={({history}) => <Search booksInShelf={books} history={history} addBook={this.addBook}/>} />
                </Switch>
            </React.Fragment>
        );
    }

    componentDidMount() {
        booksApi.getAll()
            .then(books => {
                this.setState({
                    books: books,
                    loading: false
                })
            })
            .catch(err => {
                this.setState({loading: false, error: true});
            })
    }
}

export default App;