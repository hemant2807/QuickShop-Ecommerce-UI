import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#0f3460",
    color: "white",
    borderRadius: "5px",
    border: "none",
    boxShadow: "none",
    width: "200px",
    height: "40px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#0f3460" : "white",
    color: state.isSelected ? "white" : "#0f3460",
    "&:hover": {
      backgroundColor: "#0f3460",
      color: "white",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
};

const FilterSelect = ({ setFilterList, allProducts }) => {
  const categories = Array.from(
    new Set((allProducts || []).map((p) => p.category))
  ).sort();
  const options = categories.map((c) => ({ value: c, label: c }));
  const handleChange = (selectedOption) => {
    if (!selectedOption) {
      setFilterList(allProducts);
      return;
    }
    setFilterList(
      allProducts.filter((item) => item.category === selectedOption.value)
    );
  };
  return (
    <Select
      options={options}
      placeholder="Filter By Category"
      styles={customStyles}
      isClearable
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
