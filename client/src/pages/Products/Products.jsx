import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import styled from "styled-components";
import { mobile } from "../../responsive";
import useFetch from "../../hooks/useFetch";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const ContainerProducts = styled.div`
  padding: 30px 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "20px" })}
`;

const LeftContainer = styled.div`
  flex: 1;
  position: sticky;
  height: 100%;
  top: 50px;
  ${mobile({ position: "static" })}
`;

const FilterItem = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-weight: 400;
  margin-bottom: 20px;
`;
const InputItem = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-left: 10px;
`;

const Right = styled.div`
  flex: 4;
`;

const CatImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 50px;
  ${mobile({ display: "none" })}
`;

const Products = () => {
  const catId = parseInt(useParams().id);

  const [maxPrice, setMaxPrice] = useState(1000);
  const [prodSort, setProdSort] = useState("asc");

  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const listRef = useRef();

  const scrollIntoView = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  return (
    <ContainerProducts>
      <LeftContainer>
        <FilterItem>
          <Title>Product Categories</Title>
          {error ? (
            "Something went wrong"
          ) : loading ? (
            <LoadingButton loading={loading} />
          ) : (
            data?.map((item) => (
              <InputItem key={item.id}>
                <input
                  onClick={() => {
                    scrollIntoView(listRef);
                  }}
                  type="checkbox"
                  id={item.id}
                  value={item.id}
                  onChange={handleChange}
                />
                <Label htmlFor={item.id}>{item.attributes.title}</Label>
              </InputItem>
            ))
          )}
        </FilterItem>
        <FilterItem>
          <Title>Filter by price</Title>
          <InputItem>
            <span>0</span>
            <input
              onClick={() => {
                scrollIntoView(listRef);
              }}
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </InputItem>
        </FilterItem>
        <FilterItem>
          <Title>Sort by</Title>
          <InputItem>
            <input
              onClick={() => {
                scrollIntoView(listRef);
              }}
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setProdSort("asc")}
            />
            <Label htmlFor="asc">Price (Lowest First)</Label>
          </InputItem>
          <InputItem>
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setProdSort("desc")}
            />
            <Label htmlFor="desc">Price (Highest First)</Label>
          </InputItem>
        </FilterItem>
      </LeftContainer>
      <Right ref={listRef}>
        <CatImg
          src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669814558/kosmedik/-_dermedics_proportions_of_packages_1_bv9otn.png"
          alt=""
        />
        <List
          catId={catId}
          maxPrice={maxPrice}
          subCats={selectedSubCats}
          prodSort={prodSort}
        />
      </Right>
    </ContainerProducts>
  );
};

export default Products;
