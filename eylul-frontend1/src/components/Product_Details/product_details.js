import React from 'react';
import {FormGroup, Input} from 'reactstrap';
import "./product_details.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useState} from "react";

export const Product_Detail = (product) => {
      const location = useLocation();
      const [comments, setComments] = useState([]);

      const getComments= async() =>{
        const response = await fetch('http://localhost:5000/getcomment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept:"application/json",
            },
                body: JSON.stringify({
                product_name: location.state.product.name
                })
            })
            let json=await response.json();
            setComments(json.comments);
        }

    useEffect(() => {
        getComments();
    }, []) 
      useEffect(() => {
        console.log(location.state.product); // result: 'some_value'
      }, [location]);

      return (<>
	  <div className="card">
  <div className="photo">
    <img src={location.state.product.image_path} />
  </div>
  <div className="description">
    <h2 className="h2_b">{location.state.product.name}</h2>
    <h3 className="h3_b">Rating: {location.state.product.rating}</h3>
    
    <h1 className="h1_b">${location.state.product.price}</h1>
    <p className="p_b">{location.state.product.model}.</p>
    <h4 className="h4_b">Item in Stock: {location.state.product.stock}</h4>
    <button className="button_b">Add to Cart</button>
    <button className="button_b">Wishlist</button>
  </div>
  <div className="comments">
    <h3 className="h3_b">Comments</h3>
    <div className="single-comment">
    <h4 style={{marginTop: "5px"}} className="h4_b">Deniz Atalay</h4>
    <p style={{marginLeft: "3px"}} className="p_b">{location.state.comments}</p>
    </div>
    <div>
    <FormGroup>
        <Input style={{float: "center"}} type="textarea" placeholder="You can comment here..."
        style={{resize: "none", width: "90%"}} name="text" id="exampleText" />
      </FormGroup>
      <button style={{marginTop: "7px" , position: "relative"}} className="button_b">Comment!</button>
    </div>
  </div>
</div>

</>

  );
};

export default Product_Detail;