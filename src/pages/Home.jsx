import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Api from "../services/Api";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
const api = new Api();


class Home extends Component {
    constructor(){
        super();
        this.state = {
            id:null,
            items:[],
            keywords: "",
        }
        this.setKeywords      = this.setKeywords.bind(this)
        this.getItems         = this.getItems.bind(this)
        this.deleteItemBy     = this.deleteItemBy.bind(this);
    }
    
    componentDidMount = ()=> {
        this.getItems()
    }

    getItems = async()=> {
        await api.get()
        .then((response) => response.json())
        .then((data) =>{
            this.setState({ items: data })
            return this
        })
        .catch((error)=>{
            console.log({ error: error.message })
        })
    }

    deleteItemBy = async (e, param)=>{
        e.preventDefault();
            await api.delete(param)
              .then(()=> {    
              alert("ID: "+ param + " Remove SuccessFully");
              })
              .catch((error)=>{
                  console.error({ error: error.message })
            })
        this.getItems()
    }

    setKeywords = (e)=> {
        e.preventDefault()
        console.log({ LOG: e.target.value })
        this.setState({ keywords : e.target.value })
    }
   

    render(){
        const { items, keywords } = this.state
        let no = 1
        console.log({ LOG: this.state.items })
        return(
            <Fragment>
                <div className="py-5">
                    <div className="container">
                        <div className="row py-5">
                        <label className="text-center"> CREATE-REACT-UPDATE-DELETE DATA WITH REACT JS</label>
                        <form> 
                            <div className="input-group"> 
                                <div className="input-group mb-3 gap-5 d-md-flex">
                                    <input type="search" className="form-control rounded-left border-secondary rounded-0" 
                                        placeholder="Please Enter Here ..." value={keywords}  
                                        name="keywords" 
                                        onChange={(e)=>this.setKeywords(e)}/>
                                    
                                    <Link to={"/items/add/"}  type="button" className=" btn btn-md btn-primary"  data-toggle="tooltip" data-placement="top" title="Add">
                                        <span className="bi bi-plus">Add Item</span>
                                    </Link>
                                </div>
                            </div>
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th className="text-center">No</th>
                                        <th className="text-center">Id</th>
                                        <th className="text-center">Item Name</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>    
                                    <tbody className="text-center align-middle"> 
                                        {  items.length ===0 ? 
                                        <tr><td colSpan={5}>Items Data Not Found</td></tr> 
                                        : 
                                        // eslint-disable-next-line array-callback-return
                                        items.filter( (data) =>{
                                            if(this.state.keywords === ""){
                                                return data;                                                
                                            }else{
                                           
                                            if(data.item_name.toLowerCase().includes(this.state.keywords.toLowerCase())
                                                || data.id.includes(this.state.keywords)){
                                                    return data;
                                                }
                                            }
                                        }).map((data,index) =>{
                                            return(
                                            <tr key={index}>    
                                                <td>{no++}</td>
                                                <td>{data.id}</td>
                                                <td>{data.item_name}</td>                                                
                                                <td>{data.price}</td>
                                                <td  className="text-center align-middle">
                                                    <div className="d-grid gap-2 d-md-flex">
                                                        <Link to={"/items/"+data.id}  type="button" className=" btn btn-sm btn-primary"  data-toggle="tooltip" data-placement="top" title="Edit"><i className="bi bi-pencil"></i></Link>
                                                        <button type="button" className=" btn  btn-sm btn-danger"  data-toggle="tooltip" onClick={ (e)=> this.deleteItemBy(e, data.id)}><i className="bi bi-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>    
                            </table>
                        </form> 
                           
                        </div>    
                    </div>    
                </div>
            </Fragment>
        )
    }
}
export default Home;