import React from 'react';

import shortenText from '../../utils/shortenText';
import classes from './Book.module.css';
import Menu from '../Menu/Menu';

const Book = ({book, onShelfChange}) => {

    function moveShelf(moveTo) {
        onShelfChange(book.id, moveTo);
    }

    return (
        <div className={classes.Book}>
            <div className={classes.CoverBox}>
                <div className={classes.BookCover} style={{backgroundImage: `url(${book.imageLinks.smallThumbnail})`}} />
                <div className={classes.MenuBox}>
                    <Menu onMoveShelf={moveShelf} shelf={book.shelf} />
                </div>
            </div>
            <div className={classes.BookDetail}>
                <h5>{shortenText(book.title, 22)}</h5>
                {book.subtitle && <p>{shortenText(book.subtitle, 30)}</p>}
                {book.authors && <p>{shortenText(book.authors.join(', '),35)}</p>}
            </div>
        </div>
    );
}

export default Book;