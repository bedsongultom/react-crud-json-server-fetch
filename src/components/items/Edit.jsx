import React, { Component, Fragment } from "react";
import { useParams } from "react-router";
import Api from "../../services/Api";
const api = new Api();

function withParams (Component){
    return props => <Component {...props} params = {useParams()}/>;
}

class Edit extends Component{
    constructor(){
        super();
        this.state = {
            id:'',
            item_name:'',
            price:'',
            items:[],
        }
        this.setId       = this.setId.bind(this);
        this.setItemName = this.setItemName.bind(this);
        this.setPrice    = this.setPrice.bind(this);
        this.getBy       = this.getBy.bind(this);
        this.getItems    = this.getItems.bind(this);
    }

    componentDidMount = ()=>{
        console.log({LOG: "Edit's Page is Mouting "})
        this.getBy();
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
    
    getItems = async()=> {
        await api.get()
        .then((response) => response.json())
        .then((data) =>{
        this.setState({ items: data })
        return this;

        })
        .catch((error)=>{
            console.log({ error: error.message })
        })
    }

    getBy = async()=>{
        const {id} = this.props.params;
        await api.getBy(id)
              .then((response)=> response.json())
              .then((data)=>{
                this.setState({ 
                    id: id, 
                    item_name: data.item_name, 
                    price: data.price }); 
                    
                return this;    
              })
              .catch((error)=>{
                console.log({ message: error.message });
            })
    }

    updateItem = async (e)=>{
        e.preventDefault();
        const newItem = {
            id: this.state.id,
            item_name: this.state.item_name,
            price: this.state.price
        };

        await api.update(newItem.id, newItem)
                .then((response)=> response.json())
                .then(()=>{
                    alert(newItem.id + " updated Successfully !");
                    this.setState({ items: newItem });
                })
                .catch((error)=>{
                    console.error({ message: error.message})
                })
           
            window.location.replace('/');
    }

    render(){
        const { id, item_name, price }= this.state;
        return(
            <Fragment>
                 <div className="py-5">
                    <div className="container">
                        <div className="row py-5">
                            <label className="text-center"> EDIT ITEM </label>

                            <form onSubmit={this.updateItem}>
                                <div className="form-group">
                                    
                                    <input type="hidden" className="form-control" name="id" placeholder="Enter Id" value={id} onChange={this.setId} />
                                </div>   
                                <div className="form-group">
                                    <label htmlFor="item_name">Item Name</label>
                                    <input type="text" className="form-control" name="item_name" placeholder="Enter  Item Name" value={item_name} onChange={this.setItemName} />
                                </div> 
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="text" className="form-control" name="price" placeholder="Enter Price" value={price} onChange={this.setPrice} />
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
 export default withParams(Edit);
