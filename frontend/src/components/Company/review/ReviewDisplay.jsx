import React from "react";

const ReviewDisplay = ({ reviews }) => {
  return (
    <div id="display_review">
      {reviews.map((review, index) => (
        <div className="row mt-2" key={index}>
          <div className="col-1">
            <div className="text-center">
              <img  //  mage add
                src={review.image}
                alt="Review"
                className="img-fluid rounded-circle"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="col-11">
            <div className="card">
              <div className="card-header">{review.customerName}</div>
              <div className="card-body">
                {[...Array(5)].map((star, index) => (
                  <i
                    key={index}
                    className={`fa fa-star mr-1 ${
                      index < review.rating ? "text-warning" : "star-light"
                    }`}
                  ></i>
                ))}
                <br />
                {review.reviewText}
              </div>
              <div className="card-footer">{review.reviewDate}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewDisplay;
