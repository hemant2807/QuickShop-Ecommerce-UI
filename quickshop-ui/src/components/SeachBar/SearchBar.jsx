import { useState } from "react";
import "./searchbar.css";

const SearchBar = ({ setFilterList, allProducts }) => {
  const [searchWord, setSearchWord] = useState("");
  const handelChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchWord(value);

    const filtered = allProducts.filter((item) =>
      item.productName?.toLowerCase().includes(value)
    );
    setFilterList(filtered);
  };
  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." onChange={handelChange} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
