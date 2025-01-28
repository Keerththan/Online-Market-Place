import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import "./reviewStyle.css";
import { useOutletContext } from "react-router-dom";

const Review = () => {
  const { user } = useOutletContext(); // Assuming user context contains companyOwnerID
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products by companyOwnerID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user) {
          const response = await axios.post(
            "http://localhost:8080/backend/api/Company/view_product.php",
            { companyOwnerID: user.companyOwnerID }
          );

          if (Array.isArray(response.data)) {
            const productsWithRatings = await Promise.all(
              response.data.map(async (product) => {
                const ratingResponse = await axios.post(
                  "http://localhost:8080/backend/api/Company/product_review.php",
                  { action: "load_data", productID: product.productID }
                );
                const ratingData = ratingResponse.data;
                
                // Append avgRating and totalReview to the product
                return {
                  ...product,
                  avgRating: ratingData.avgUserRatings || 0,
                  totalReview: ratingData.totalReviews || 0,
                };
              })
            );
            setProducts(productsWithRatings);
          } else {
            setError("Invalid response format");
          }
        }
      } catch (error) {
        setError("Error fetching products");
      }
    };

    fetchProducts();
  }, [user]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="maincontainer">
      <div className="table_heading">
        <h3>Review details</h3>
      </div>
      <section className="display_details">
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>S No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Rating</th>
                <th>Total Reviews</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.productID}>
                  <td>{index + 1}</td>
                  <td className="col-1">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-100"
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>
                    <div className=" text-center m-auto">
                      <h1>
                        <span id="avg_rating_list">{product.avgRating} / 5.0</span>
                      </h1>
                      <div>
                        {[...Array(5)].map((star, index1) => (
                          <i
                            key={index1}
                            className={`fa fa-star star-light starAvg main_star mr-2 ${
                              index1 < Math.ceil(product.avgRating)
                                ? "text-warning"
                                : ""
                            }`}
                          ></i>
                        ))}
                      </div>
                      
                    </div>
                  </td>
                  <td>
                  <span id="total_review">{product.totalReview}</span> Reviews
                    </td>
                  <td>
                    <Link
                      className="btn btn-primary m-2"
                      to={`/company/reviewlayout/${product.productID}`}
                    >
                      Check
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty_text">No Products Available</div>
        )}
      </section>
    </div>
  );
};

export default Review;
