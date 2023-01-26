import React, { Component, Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/style.css';


class Header extends Component {
    constructor(){
        super();
        this.state = {
            isExpand : false
        }
        this.toggleNavbar = this.toggleNavbar.bind(this);

    }

    toggleNavbar = ()=>{		
        console.log({Log: !this.state.isExpand ? 'Navbar is Opened': 'Navbar is Closed'});
        this.setState({isExpand: !this.state.isExpand});
    }

    render(){
        const { isExpand } = this.state;

        return(
            <Fragment>
                    <div className="container-fluid"> 
                        <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
                            <div className="container">
                                <a className="navbar-brand" href="/"><img src="assets/img/navbar-logo.svg" alt="" />CRUD DATA</a>
                                
                
                                <button className="navbar-toggler" onClick = {this.toggleNavbar }
                                    type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarResponsive"  
                                    aria-controls="navbarResponsive"
                                    aria-expanded="false" 
                                    aria-label="Toggle Navigation">
                                    <span className="navbar-toggler-icon"></span>    
                                </button>                           
                                <div className={ !isExpand ? "collapse navbar-collapse" : "navbar-collapse" } id="navbarResponsive">                                   
                                    <ul className="navbar-nav ml-auto text-primary ">       
                                        <li className="nav-item active"><Link to="/" className="nav-link text-white">Home</Link></li>
                                    </ul>
                                    <Outlet /> 
                                </div>
                            </div>
                        </nav>
                    </div>
            </Fragment>      
        )
    }
}

export default Header;