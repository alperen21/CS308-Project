import { PermDeviceInformationOutlined } from '@material-ui/icons'
import React from 'react'
import {useState} from 'react';
import { useHistory } from "react-router-dom"; 

const AddProduct = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(""); 
  const [model, setModel] = useState("");
  const [image_path, setImagePath] = useState("");
  const [expense, setExpense] = useState("");

  const ProductAdd = async() => {
    const response = await fetch ('http://localhost:5000/stock', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        body : JSON.stringify({
          category_id: category_id,
          product_name: name,
          model: model,
          price: price,
          image_path: image_path,
          stock: stock,
          add: true,
          expense: expense

        })
    })
    let json = await response.json();
    console.log(json);
    if (json.status_code === 201){
        alert("new product added!");
        history.push("/home");
    }
    else {
        alert("error");
    }
}

    return (
        <div>
            <form action="#">
                <h2>Add New Product</h2>
                <input style ={{marginTop: '3px'}} type="name" placeholder="Product Name:" value={name}
            onChange={(e) => setName(e.target.value)} />
                <input style ={{marginTop: '3px'}} type="number" placeholder="Category ID:" value={category_id}
            onChange={(e) => setCategoryId(e.target.value)} />
            <input style ={{marginTop: '3px'}} type="username" placeholder="Price:" value={price}
            onChange={(e) => setPrice(e.target.value)} />
                <input style ={{marginTop: '3px'}} type="name" placeholder="Stock:" value={stock}
            onChange={(e) => setStock(e.target.value)} />
                <input style ={{marginTop: '3px'}} type="name" placeholder="Model:" value={model}
            onChange={(e) => setModel(e.target.value)}/>
                <input style ={{marginTop: '3px'}} type="address" placeholder="Image Path:" value={image_path}
            onChange={(e) => setImagePath(e.target.value)} />
                <input style ={{marginTop: '3px'}} type="address" placeholder="Expense:" value={expense}
            onChange={(e) => setExpense(e.target.value)}/>
                
                <button style={{marginTop: '3px'}} onClick={() => ProductAdd()}>Add!</button>

            </form>
        </div>
    )
}

export default AddProduct
