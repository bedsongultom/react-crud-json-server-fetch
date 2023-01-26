 
 class Api {
    get = async ()=>{
        return  await fetch("http://localhost:3001/items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json",
                //handling response 304 on browser
                "Cache-Control":"no-cache, no-store",
                "Pragma": "no-cache",
                "Expires": 0,
            },
        });
    }
    
    getBy = async(id)=>{
        return await fetch("http://localhost:3001/items/"+ id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json",
                //handling response 304 on browser
                "Cache-Control":"no-cache, no-store",
                "Pragma": "no-cache",
                "Expires": 0,
            },
        });
    }

    create = async(state=[])=>{
        return await fetch("http://localhost:3001/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json",
            },
            body:JSON.stringify({id: state.id, item_name: state.item_name, price: state.price})
        })
    }

    update = async(id, state=[])=>{
        return await fetch("http://localhost:3001/items/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({id: state.id, item_name: state.item_name, price: state.price})
        })   
    }

    delete = async(id)=>{
        return await fetch("http://localhost:3001/items/"+ id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
        })   
    }
}  
export default Api;
