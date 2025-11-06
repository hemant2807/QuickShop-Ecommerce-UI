import { Container } from "react-bootstrap";
import "./product-review.css";

const ProductReviews = ({ selectedProduct }) => {
  const reviews = selectedProduct?.reviews ?? [];
  return (
    <section className="product-reviews">
      <Container>
        <h4>Reviews ({reviews.length})</h4>
        <div className="rates">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((rate, idx) => (
              <div className="rate-comment" key={idx}>
                <span>Jhon Doe</span>
                <span>{rate.rating} (rating)</span>
                <p>{rate.text}</p>
              </div>
            ))
          )}
        </div>
      </Container>
    </section>
  );
};

export default ProductReviews;
