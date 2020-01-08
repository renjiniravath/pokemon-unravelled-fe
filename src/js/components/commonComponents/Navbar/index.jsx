import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header className="header-section">
                <a href="index.html" className="site-logo">
                    <img src="p/media/logo/logo.png" alt="logo" />
                </a>
                <ul className="main-menu">
                    <li><a href="index.html">Home</a></li>
                    <li><Link to="/pokedex" >Pokedex</Link></li>
                    <li><a href="game.html">Games</a></li>
                    <li><a href="reviews.html">Reviews</a></li>
                    <li><a href="news.html">News</a></li>
                    <li><a href="single-post.html">Page</a></li>
                </ul>
                <div className="header-add">
                    <img src="img/add.jpg" alt="" />
                </div>
            </header>
        )
    }
}

export default Navbar;