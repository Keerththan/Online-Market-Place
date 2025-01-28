import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useOutletContext } from 'react-router-dom';

function ProductDetail({ sidebarToggle }) {
  const location = useLocation();
  const { product } = location.state;
  const [add, setAdd] = useState(false);
  const { user } = useOutletContext();
  const userID = JSON.parse(sessionStorage.getItem('userID'));
  const navigate = useNavigate();
  useEffect(() => {
    console.log("product :", product);

    const checkIfAddedToCart = async () => {
      // try {
        
       const product_id=product.productID;
       const customer_id=userID;
        console.log("product_id:", product_id, "customer_id:", customer_id);
        const response = await axios.get('http://localhost:8080/backend/api/Customer/check_cart_item.php', {
          params: { product_id, customer_id }
      });
        if(response) {
            console.log("checkIfAddedToCart:", response.data);
              setAdd(true);
          }
      // } catch (error) {
      //   console.error("There was an error checking the cart status:", error);
      // }
    };
    checkIfAddedToCart();
  }, [navigate]);

  const addToCart = () => {
    if (!add) {
      console.log("Add to carting");
      try {
        axios.post('http://localhost:8080/backend/api/Customer/add_cart_item.php', {
          customer_id: userID,
          product_id: product.productID,
          price: product.productPrice,
          name:product.productName,
          image:product.productImage
        })
          .then((response) => {
            if (response.data) {
              setAdd(true);
              alert("Product successfully added to cart.");
              console.log("Add to cart");
            }
          });


      } catch (error) {
        console.error("There was an error adding the product to the cart:", error);
      }
    } else {
      alert("Item is already added..!");
    }
  };

  return (
    <div className='container d-flex justify-content-center'>
      <div className={`${sidebarToggle ? "ml-25" : ""} w-100 card-body d-flex flex-row mt-5`} >
        <div className="card m-5">
          <div className="row g-0 justify-content-center align-items-center d-flex p-4">
            <div className="col-md-4 col-sm-5 col-6">
              <img src={product.productImage} className="img-fluid rounded-start w-100" alt={product.productName} />
            </div>
            <div className="col-md-8">
              <div className="card-body d-flex flex-column">
                <div className="w-100 card-body d-flex flex-column justify-content-center align-items-center">
                  <h2 className="card-title">{product.productName}</h2>
                  <p className="card-text">Net weight: {product.productNetweight}</p>
                  <h6 className='card-title rounded fw-bold'>Rs. {product.productPrice}.00</h6>
                </div>

                <div className='justify-content-center align-items-center d-flex flex-column'>
                  <button
                    className={`btn btn-danger rounded-pill md-w-75 sm-w-75 xs-w-100 mb-2`}
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                  
                  <Link to="/customer/PlaceOrder" className='btn btn-danger bg-white text-danger rounded-pill md-w-75 sm-w-75 xs-w-100'>Buy Now</Link>
                   {/* Review Button */}
                <Link to={`/customer/review-layout/${product.productID}`} className='btn btn-secondary rounded-pill md-w-75 sm-w-75 xs-w-100 mt-3'>
                  View Reviews
                </Link>
                </div>
                
              </div>
              <button
                    className="btn btn-secondary rounded-pill md-w-25 sm-w-25 xs-w-50 align-items-end"
                    onClick={() => navigate(-1)} // Navigates to the previous page
                  >
                    Go Back
                  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
