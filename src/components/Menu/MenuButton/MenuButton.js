import React from 'react';
import classes from './MenuButton.module.css';
import dropDownIcon from '../../../icons/arrowDrop.svg';

const MenuButton = ({onclick}) => (
    <div onClick={onclick} className={classes.MenuButton}>
        <img src={dropDownIcon} alt="drop down arrow icon"/>
    </div>
);

export default MenuButton;