import React from 'react';
import {FormGroup, Input} from 'reactstrap';
import "./product_details.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Product_Detail = (product) => {
      const location = useLocation();

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
    <h4 className="h4_b">Deniz Atalay</h4>
    <p className="p_b">Very good taste, my favourite drink!</p>
    </div>
    <div>
    <FormGroup>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <button className="button_b">Comment!</button>
    </div>
  </div>
</div>

</>

  );
};

export default Product_Detail;