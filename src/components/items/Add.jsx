import React, { Component, Fragment } from "react";
import * as  uuid from "uuid";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import Api from "../../services/Api";
const api = new Api();

export default class Add extends Component{
    constructor(){
        super();
        this.state = {
            id:uuid.v4(),
            item_name:'',
            price:''
        }
        this.setId       = this.setId.bind(this);
        this.setItemName = this.setItemName.bind(this);
        this.setPrice    = this.setPrice.bind(this);
        this.cleanInput  = this.cleanInput.bind(this);
    }

    componentDidMount =()=>{
        console.log({LOG: "Add's Page is Mouting "})
    }

    setId = (e) =>{
        this.setState({ id: e.target.value });
    }

    setItemName = (e)=>{
        this.setState({ item_name : e.target.value });
    }

    setPrice = (e)=>{
        this.setState({ price: e.target.value });
    }

    cleanInput = ()=>{
        this.setState({id:'', item_name:'', price:''});
        return this;
    }

    createItem = async(e)=>{
        e.preventDefault();
        const newItem = {
            id: this.state.id,
            item_name: this.state.item_name,
            price: this.state.price
        };
        await api.create(newItem)
        .then((response)=>{response.json()
        })
        .then(()=>{
            console.log({ items : newItem });
            alert(this.state.id + " added successfully !");
            this.setState({ items: newItem });
        })
        .catch(( error )=>{
            console.error({ error: error.message })
        })
      this.cleanInput();
       
    }

    render(){
        const { id, item_name, price }= this.state;

        return(
            <Fragment>
                 <div className="py-5">
                    <div className="container">
                        <div className="row py-5">
                            <label className="text-center"> ADD NEW ITEM</label>

                            <form onSubmit={this.createItem}>
                                <div className="form-group">
                                    <label htmlFor="id">ID</label>
                                    <input type="text" className="form-control" name="id" placeholder="Enter Your item_barcode" value={id} onChange={(e)=>this.setId(e)} />
                                </div>   
                                <div className="form-group">
                                    <label htmlFor="item_name">Item Name</label>
                                    <input type="text" className="form-control" name="item_name" placeholder="Enter Your Item Name" value={item_name} onChange={(e)=>this.setItemName(e)} />
                                </div> 
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="text" className="form-control" name="price" placeholder="Enter Your Price" value={price} onChange={(e)=>this.setPrice(e)} />
                                </div> 
                                <div className="form-group pt-2">
                                    <button className="btn btn-primary" type="submit">Submit</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>    
                </div>        
            </Fragment>
        )
    }
}