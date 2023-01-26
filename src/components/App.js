import React, { Component, Fragment } from "react";
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Header from "./Header";
import Footer  from "./Footer";
import Home from "../pages/Home";
import Add from "./items/Add";
import Edit from "./items/Edit";

class App extends Component {
    render(){
        return(
            <Fragment>                
                <BrowserRouter>
                    <Header/>
                        <Routes>                          
                            <Route index element = { <Home/>}/> 
                            <Route path="/items/add" element= {<Add/>}/>
                            <Route path="/items/:id" element={<Edit/>}/>
                        </Routes>
                    <Footer/>
                </BrowserRouter>
            </Fragment>    
        )
    }
}
export default App;




