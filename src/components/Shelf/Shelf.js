import React from 'react';
import Book from '../Book/Book';
import classes from './Shelf.module.css';

const Shelf = ({ books, title, onShelfChange }) => {
    let content;
    if(!books.length && title)
        content = <div className='InfoMessage'>*There are no books in this shelf</div>
    else {
        content = (
            <div className={classes.ShelfBooks}>
                {books.map(book => (
                    <Book book={book} key={book.id} onShelfChange={onShelfChange} />
                ))}
            </div>
        );
    }
    return (
        <div className={classes.Shelf}>
            {title && <h2 className={classes.ShelfTitle}>{title}</h2>}
            {content}
        </div>
    );
}

export default Shelf;