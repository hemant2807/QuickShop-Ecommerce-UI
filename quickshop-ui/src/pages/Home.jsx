import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [newArrivalData, setNewArrivalData] = useState([]);
  const [bestSales, setBestSales] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);

  useWindowScrollToTop();

  useEffect(() => {
    fetch("http://localhost:5000/api/products/external")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((p) => ({
          id: String(p.id),
          productName: p.productName,
          imgUrl: p.imgUrl,
          price: p.price,
          category: p.category,
        }));

        setAllProducts(mapped);

        const newArrivals = mapped.filter(
          (item) => item.category === "electronics"
        );
        setNewArrivalData(
          newArrivals.length ? newArrivals : mapped.slice(0, 6)
        );

        const best = mapped.filter((item) =>
          (item.category || "").toLowerCase().includes("clothing")
        );
        setBestSales(best.length ? best : mapped.slice(6, 12));

        setDiscountProducts(mapped.slice(0, 4));
      })
      .catch((err) => console.error("Home fetch error:", err));
  }, []);

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discountProducts}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
