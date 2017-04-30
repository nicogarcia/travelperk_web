import React, {Component} from "react";
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import logo from "./travelperk-logo-dark.svg";
import {connect} from "react-redux";
import {signOutRequest} from "../signin/SignIn.action";
import {openCreateModalAction} from "../trips/create-modal/CreateTripModal.action";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    signOut = () => {
        this.props.dispatch(signOutRequest())
    };

    openCreateTripDialog = () => {
        this.props.dispatch(openCreateModalAction());
    };

    render() {
        return (
            <Navbar color="faded" light toggleable>
                <NavbarToggler right onClick={this.toggle}/>

                <NavbarBrand tag={Link} to="/trips">
                    <img src={logo} alt="Travelperk"/>
                </NavbarBrand>

                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {
                            this.props.signIn.token &&
                            <NavItem>
                                <Button color="primary" onClick={this.openCreateTripDialog}>
                                    New Trip
                                </Button>
                            </NavItem>
                        }

                        {
                            this.props.signIn.token &&
                            <NavItem>
                                <NavLink tag={Link} to="/trips">Trips</NavLink>
                            </NavItem>
                        }

                        {
                            this.props.signIn.token &&
                            <NavItem>
                                <NavLink onClick={this.signOut} href="#">Sign Out</NavLink>
                            </NavItem>
                        }

                        {
                            !this.props.signIn.token &&
                            <NavItem>
                                <Button color="primary" tag={Link} to="/signin">
                                    Sign In
                                </Button>
                            </NavItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => (
    {
        signIn: state.signIn
    }
);

export default connect(mapStateToProps)(Header);


