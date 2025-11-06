import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        console.log("backend cart:", data);
      });
  }, []);
  const handleCheckout = async () => {
    const res = await fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: cartList,
        name,
        email,
      }),
    });

    const receipt = await res.json();

    alert(
      `Order Successful!
  Receipt ID: ${receipt.receiptId}
  Name: ${receipt.name}
  Email: ${receipt.email}
  Total: $${receipt.total}
  Time: ${receipt.timestamp}`
    );
  };
  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} className="cart-details">
                          <h3>{item.productName}</h3>
                          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div className="d-flex align-items-center justify-content-between w-100">
                              <div
                                className="unit-price"
                                style={{ fontSize: 22, fontWeight: 700 }}
                              >
                                Price: ${item.price}
                              </div>
                            </div>
                            <div>
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: 10,
                                  overflow: "hidden",
                                  background: "#f8fafc",
                                }}
                              >
                                <button
                                  className="desCart"
                                  style={{
                                    width: 36,
                                    height: 40,
                                    background: "#f3f4f6",
                                    border: "none",
                                    fontSize: 18,
                                    fontWeight: 700,
                                  }}
                                  onClick={() => dispatch(decreaseQty(item))}
                                >
                                  -
                                </button>
                                <span
                                  style={{
                                    minWidth: 44,
                                    textAlign: "center",
                                    fontSize: 18,
                                    fontWeight: 700,
                                    background: "#ffffff",
                                  }}
                                >
                                  {item.qty}
                                </span>
                                <button
                                  className="incCart"
                                  style={{
                                    width: 36,
                                    height: 40,
                                    background: "#f3f4f6",
                                    border: "none",
                                    fontSize: 18,
                                    fontWeight: 700,
                                  }}
                                  onClick={() =>
                                    dispatch(
                                      addToCart({ product: item, num: 1 })
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <button
                                className="delete btn btn-outline-danger btn-sm"
                                style={{ marginLeft: 12, position: "static" }}
                                title="Remove"
                                onClick={() => dispatch(deleteProduct(item))}
                              >
                                <ion-icon name="trash-outline"></ion-icon>
                              </button>
                            </div>
                            <div className="d-flex align-items-center justify-content-between w-100">
                              <div className="fw-semibold">
                                Item Total: ${productQty}
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className="checkout-form">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control mb-2"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-3"
                />

                <button
                  className="btn btn-primary w-100"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>${totalPrice}</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
