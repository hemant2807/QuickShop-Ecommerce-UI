import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const inc = () => setQuantity((q) => Math.max(1, Number(q) + 1));
  const dec = () => setQuantity((q) => Math.max(1, Number(q) - 1));
  const handleQuantityChange = (e) => {
    const val = Number(e.target.value);
    setQuantity(Number.isNaN(val) ? 1 : Math.max(1, val));
  };
  const handelAdd = (selectedProduct, quantity) => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="image-wrap">
            <img
              loading="lazy"
              src={selectedProduct?.imgUrl}
              alt={selectedProduct?.productName || "Product"}
            />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.productName}</h2>
            <h5 className="section-label">Rating</h5>
            <div className="rate">
              <span className="rating-number">
                {selectedProduct?.rating?.toFixed
                  ? selectedProduct.rating.toFixed(1)
                  : selectedProduct?.rating || 0}{" "}
                ({selectedProduct?.ratingCount || 0})
              </span>
            </div>
            <div className="category-block single-line">
              <h5 className="section-label">Category</h5>
              <span className="category">{selectedProduct?.category}</span>
            </div>
            <div className="info">
              <div className="price-block">
                <h5 className="section-label">Price</h5>
                <span className="price">${selectedProduct?.price}</span>
              </div>
            </div>
            <div className="desc-block">
              <h5 className="section-label">Description</h5>
              <p className="description-text">
                {selectedProduct?.description || "No description available."}
              </p>
            </div>
            <div className="purchase-row">
              <div className="qty-group">
                <button
                  className="qty-btn"
                  onClick={dec}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  className="qty-input"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                />
                <button
                  className="qty-btn"
                  onClick={inc}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                aria-label="Add"
                type="button"
                className="add"
                onClick={() => handelAdd(selectedProduct, quantity)}
              >
                Add To Cart
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
