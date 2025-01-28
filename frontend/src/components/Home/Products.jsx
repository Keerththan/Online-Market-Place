import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate} from 'react-router-dom';
import './Products.css'; // Import the CSS file for styles

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/backend/api/Home/getProducts.php');
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProductClick = () => {
    navigate('/login');
  }

  const filteredItems = products.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="homeHeader">
        <div className="homeHeaderLinks">
          <Link to="/" style={{ fontSize: '150%' }}>Home</Link>
          <Link to="/products" style={{ fontSize: '150%' }}>Products</Link>
          <Link to="/faqs" style={{ fontSize: '150%' }}>FAQs</Link>
          <Link to="/Login" style={{ fontSize: '150%' }}>Log in</Link>
        </div>
        <form className="d-flex" role="search">
          <input
            className="form-control"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Products...."
            aria-label="Search"
          />
        </form>
      </div>
      <div className='container mt-5'>
        <div className='row gy-4'>
          {filteredItems.length > 0 ? (
            filteredItems.map((product) => (
              <div key={product.productId} className='col-4 col-sm-3 col-md-2'>
                <div className='card product-card' onClick={handleProductClick}>
                  <img
                    src={product.productImage}
                    className='card-img-top product-image'
                    alt={product.productName}
                  />
                  <div className='card-body text-center'>
                    <h5 className='card-title product-name'>{product.productName}</h5>
                    <div>
                    <p className='card-text-size'><b>{product.productNetweight}</b></p>
                    <p className='card-text-size'>Price: Rs.{product.productPrice}</p>
                    </div>
                    
                    {/* <p className='card-text-size'>Price: Rs.{product.productPrice}</p> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <div key={product.productId} className='col-6 col-sm-6 col-md-3'>
                <div className='card product-card'>
                  <img
                    src={product.productImage}
                    className='card-img-top product-image'
                    alt={product.productName}
                  />
                  <div className='card-body text-center'>
                    <h5 className='card-title product-name'>{product.productName}</h5>
                    <p className='card-title fs-6'>{product.productNetweight}</p>
                    <p className='card-text fs-6'>{product.productCategory}</p>
                    <p className='card-text fs-5'>Price: Rs.{product.productPrice}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;