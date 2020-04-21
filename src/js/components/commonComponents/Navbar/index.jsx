import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import './index.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    toggle = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }))
    }
    render() {
        const isOpen = this.state.isOpen;
        return (
            // <header className="header-section">
            //     <a href="index.html" className="site-logo">
            //         <img src="/media/logo/pokemon-unravelled.png" alt="logo" width="100px" />
            //     </a>
            //     <ul className="main-menu">
            //         <li><a href="index.html">Home</a></li>
            //         <li><Link to="/pokedex" >Pokedex</Link></li>
            //         <li><a href="game.html">Games</a></li>
            //         <li><a href="reviews.html">Reviews</a></li>
            //         <li><a href="news.html">News</a></li>
            //         <li><a href="single-post.html">Page</a></li>
            //     </ul>
            //     <div className="header-add">
            //         <img src="img/add.jpg" alt="" />
            //     </div>
            // </header>
            <Navbar dark expand="md" className="fixed-top">
                <NavbarBrand href="/">
                    <img src="/media/logo/pokemon-unravelled.png" alt="logo" width="100px" />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to="/pokedex" className={window.location.pathname == "/pokedex" ? "nav-link text-white" : "nav-link"}>Pokedex</Link>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                        </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                          </DropdownItem>
                                <DropdownItem>
                                    Option 2
                          </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                          </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>Simple Text</NavbarText>
                </Collapse>
            </Navbar >
        )
    }
}

export default NavBar;