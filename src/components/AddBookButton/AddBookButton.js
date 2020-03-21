import React from 'react';
import classes from './AddBookButton.module.css';
import addIcon from '../../icons/add.svg';
import { Link } from 'react-router-dom';

const AddBookButton = () => (
    <Link to="/search">
        <div className={classes.AddBookButton}>
            <img src={addIcon} alt="Add Icon" />
        </div>
    </Link>
);

export default AddBookButton;