import React, {Component} from "react";
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import logo from "./travelperk-logo-dark.svg";
import {connect} from "react-redux";
import {logoutRequest} from "../auth/action/auth.login.action";
import {openCreateModalAction} from "../trip/create-modal/action/action.types";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout() {
        this.props.dispatch(logoutRequest())
    }

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
                            this.props.login.token &&
                            <NavItem>
                                <Button color="primary" onClick={this.openCreateTripDialog}>
                                    New Trip
                                </Button>
                            </NavItem>
                        }

                        {
                            this.props.login.token &&
                            <NavItem>
                                <NavLink tag={Link} to="/trips">Trips</NavLink>
                            </NavItem>
                        }

                        {
                            this.props.login.token &&
                            <NavItem>
                                <NavLink onClick={this.logout} href="#">Logout</NavLink>
                            </NavItem>
                        }

                        {
                            !this.props.login.token &&
                            <NavItem>
                                <Button color="primary">
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
        login: state.login
    }
);

export default connect(mapStateToProps)(Header);


