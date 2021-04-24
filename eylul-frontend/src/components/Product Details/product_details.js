import React from 'react';
import {FormGroup, Input} from 'reactstrap';
import "./Product.scss";


export const Product_Detail = () => {
      
      return (<>
    
	  <div className="card">
  <div className="photo">
    <img src="https://s-media-cache-ak0.pinimg.com/236x/3b/36/ca/3b36ca3afe0fa0fd4984b9eee2e154bb.jpg" />
  </div>
  <div className="description">
    <h2 className="h2_b">Coffee</h2>
    <h3 className="h3_b">Rating: 4.2/5</h3>
    
    <h1 className="h1_b">$18</h1>
    <p className="p_b">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod enim ut justo tristique congue. Nunc et odio ut sem consequat tempus. Aenean sed sem sollicitudin, aliquet ligula eu, blandit sem. Aliquam convallis commodo molestie. Ut ornare consectetur nulla, eu aliquet metus gravida nec. Curabitur et lorem nunc. Pellentesque auctor, elit nec tristique fringilla, magna metus placerat ex, non finibus dui sapien eu ipsum. Quisque nec elementum nibh.</p>
    <h4 className="h4_b">Item in Stock: 3</h4>
    <button className="button_b">Add to Cart</button>
    <button className="button_b">Wishlist</button>
  </div>
  <div className="comments">
    <h3 className="h3_b">Comments</h3>
    <div className="single-comment">
    <h4 className="h4_b">Deniz Atalay</h4>
    <p className="p_b">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod enim ut justo tristique congue. Nunc et odio ut sem consequat tempus. Aenean sed sem sollicitudin, aliquet ligula eu, blandit sem. Aliquam convallis commodo molestie. Ut ornare consectetur nulla, eu aliquet metus gravida nec. Curabitur et lorem nunc. Pellentesque auctor, elit nec tristique fringilla, magna metus placerat ex, non finibus dui sapien eu ipsum. Quisque nec elementum nibh.</p>
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
}

export default Product_Detail;