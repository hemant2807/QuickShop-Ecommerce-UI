import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const USE_FAKESTORE = true;

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);

  useWindowScrollToTop();

  useEffect(() => {
    const url = USE_FAKESTORE
      ? "https://fakestoreapi.com/products"
      : "http://localhost:5000/api/products";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const mapped = (USE_FAKESTORE ? data : data).map((p) => ({
          id: String(p.id),
          productName: USE_FAKESTORE ? p.title : p.productName,
          imgUrl: USE_FAKESTORE ? p.image : p.imgUrl,
          price: p.price,
          category: USE_FAKESTORE ? p.category : p.category,
        }));
        setAllProducts(mapped);
        setFilterList(mapped);
      })
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <Fragment>
      <Banner title="Products" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect
                setFilterList={(catFiltered) => setFilterList(catFiltered)}
                allProducts={allProducts}
              />
            </Col>
            <Col md={8}>
              <SearchBar
                setFilterList={(searchFiltered) =>
                  setFilterList(searchFiltered)
                }
                allProducts={allProducts}
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
