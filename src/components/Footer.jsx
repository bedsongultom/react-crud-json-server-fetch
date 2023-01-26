import React, { Component, Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.css';

class Footer extends Component{
    state = {
        currentYear :'1900'
    }
    componentDidMount =()=>{
        this.getCurrentYear();
    }
    getCurrentYear =()=>{
        const date = new Date();
        const currentYear = date.getFullYear();
        return this.setState({ currentYear: currentYear});
    }

    render(){
        const { currentYear }= this.state;
        return(
           <Fragment>
                <footer className="footer">
                    <div className="bg-primary text-center p-3 fixed-bottom">
                        <label className="text-white">© 2020- { currentYear } | </label>
                        <span className="text-white"> Bedson Gultom. All rights reserved</span>
                    </div>
                </footer>
            </Fragment>
        )
    }
}
export default Footer;