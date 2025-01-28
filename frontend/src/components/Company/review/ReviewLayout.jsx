import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './reviewStyle.css';
import ReviewDisplay from './ReviewDisplay';

const ReviewLayout = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch product details   // Fetch product details
    axios.get(`http://localhost:8080/backend/api/Company/product_review.php?product_id=${productID}`)
      .then((response) => {
        console.log("API Response:", response.data); 
        if (response.data) {
          setProduct(response.data[0]);
          loadData(productID);
        } else {
          console.error('Product not found');
        }
      })
      .catch((error) => console.error('Error fetching product:', error));

    // Fetch reviews for the product
  }, [productID]);

  const loadData = (productID) => {
    axios.post('http://localhost:8080/backend/api/Company/product_review.php', { action: 'load_data', productID })
      .then(response => {
        console.log("Backend Response:", response.data);
        const data = response.data;
        setAvgRating(data.avgUserRatings || 0);
        setTotalReview(data.totalReviews || 0);
        setReviews(data.ratingsList  || []);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  

  return (
    <div>
      <div className="jumbotron text-center mb-3 ">
        {product && ( 
            <img src={product.productImage} alt={product.productName} height='300' width='200'/> 
        )}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 text-center m-auto">
            <h1><span id="avg_rating">{avgRating}</span> / 5.0</h1>
            <div>
              {[...Array(5)].map((star, index) => (
                <i key={index} className={`fa fa-star star-light starAvg main_star mr-2 ${index < Math.ceil(avgRating) ? 'text-warning' : ''}`}></i>
              ))}
            </div>
            <h5><span id="total_review">{totalReview}</span> Reviews</h5>
          </div>
          <div className="col-sm-6 progressSection">
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div className='holder' key={index}>
                <div>
                  <div className="progress-label-left">
                    <b>{rating}</b> <i className="fa fa-star mr-1 text-warning"></i>
                  </div>
                  <div className="progress-label-right">
                    <span id={`total_${rating}_star_review`}>{reviews.filter(review => review.rating === rating).length}</span> Reviews
                  </div>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-warning" id={`${rating}_star_progress`} style={{ width: `${(reviews.filter(review => review.rating === rating).length / totalReview) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ReviewDisplay reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewLayout;
