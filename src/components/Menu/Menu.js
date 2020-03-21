import React, { Component } from 'react';
import MenuButton from './MenuButton/MenuButton';
import classes from './Menu.module.css';
import shelfs from '../../utils/shelfs';

const MenuList = ({ closeMenu,onMoveShelf, shelf }) => (
    <ul className={classes.MenuList}>
        <li onClick={closeMenu}>Move book...</li>
        <li className={shelf === shelfs.currentlyReading ? classes.Disabled: null} onClick={() => onMoveShelf(shelfs.currentlyReading)}>{shelf === shelfs.currentlyReading && <span>&#10003;</span>} reading</li>
        <li className={shelf === shelfs.wantToRead ? classes.Disabled: null} onClick={() => onMoveShelf(shelfs.wantToRead)}>{shelf === shelfs.wantToRead && <span>&#10003;</span>} want to read</li>
        <li className={shelf === shelfs.read ? classes.Disabled: null} onClick={() => onMoveShelf(shelfs.read)}>{shelf === shelfs.read && <span>&#10003;</span>} read</li>
        <li onClick={() => onMoveShelf(shelfs.none)}>none</li>
    </ul>
);

class Menu extends Component {
    state = {
        open: false
    }

    toggleMenu = () => {
        this.setState(state => ({
            open: !state.open
        }))
    }

    closeMenu = e => {
        e.preventDefault();
        if(this.state.open)
            this.setState({ open: false });
    }

    onShelfChange = (moveTo) => {
        const { onMoveShelf } = this.props;
        this.setState({ open: false })
        onMoveShelf(moveTo)
    }

    render() {
        let content=null;
        if(this.state.open)
            content = <MenuList 
                closeMenu={this.closeMenu} 
                onMoveShelf={this.onShelfChange}
                shelf={this.props.shelf} />;

        return (
            <div className={classes.Menu}>
                {content}
                <MenuButton onclick={this.toggleMenu} />
            </div>
        );
    }
}

export default Menu;