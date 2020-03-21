import React from 'react';
import Spinner from '../Spinner/Spinner';
import classes from './SpinnerCenter.module.css';

const SpinnerCenter = () => (
    <div className={classes.SpinnerCenter}>
        <Spinner />
    </div>
);

export default SpinnerCenter;