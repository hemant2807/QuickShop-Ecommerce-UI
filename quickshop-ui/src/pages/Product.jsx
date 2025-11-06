import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Product = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    let mounted = true;
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const mapped = data.map((p) => ({
          id: String(p.id),
          productName: p.title,
          imgUrl: p.image,
          price: p.price,
          category: p.category,
          description: p.description,
          rating: p.rating?.rate ?? null,
          ratingCount: p.rating?.count ?? 0,
        }));
        const product = mapped.find((i) => i.id === id);
        setSelectedProduct(product || null);
        if (product) {
          setRelatedProducts(
            mapped.filter(
              (item) =>
                item.category === product.category && item.id !== product.id
            )
          );
        } else {
          setRelatedProducts([]);
        }
      })
      .catch(() => {
        setSelectedProduct(null);
        setRelatedProducts([]);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={selectedProduct?.productName} />
      <ProductDetails selectedProduct={selectedProduct} />
      <ProductReviews selectedProduct={selectedProduct} />
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
