import React from 'react';

import classes from './Main.module.css';
import makeShelfs from '../../utils/makeShelfs';
import Shelf from '../Shelf/Shelf';

const Main = ({ books, onShelfChange }) => {
    const { currentlyReading, wantToRead, read} = makeShelfs(books);
    return (
        <div className={['container', classes.Main].join(' ')}>
            <Shelf books={currentlyReading} title="Currently Reading" onShelfChange={onShelfChange} />
            <Shelf books={wantToRead} title="Want to read" onShelfChange={onShelfChange} />
            <Shelf books={read} title="Already read" onShelfChange={onShelfChange} />
        </div>
    );
}

export default Main;