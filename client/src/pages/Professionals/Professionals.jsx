import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ListProf from "../../components/ListProf/ListProf";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";

const ContainerProf = styled.div`
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

const Professionals = () => {
  const [maxPrice, setMaxPrice] = useState(10000);
  const [profSort, setProfSort] = useState("asc");

  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(`/sub-prof-categories?populate=*`);

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
    <ContainerProf>
      <LeftContainer>
        <FilterItem>
          <Title>Categories</Title>
          {error ? (
            "Something went wrong"
          ) : loading ? (
            <LoadingButton loading={loading} />
          ) : (
            data?.map((item) => (
              <InputItem key={item.id}>
                <input
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
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setProfSort("asc")}
            />
            <Label htmlFor="asc">Price (Lowest First)</Label>
          </InputItem>
          <InputItem>
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setProfSort("desc")}
            />
            <Label htmlFor="desc">Price (Highest First)</Label>
          </InputItem>
        </FilterItem>
      </LeftContainer>
      <Right>
        <CatImg
          src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669809025/kosmedik/engin-akyurt-ZbzYDboN7fg-unsplash_2_h0fmb3.jpg"
          alt=""
        />
        <ListProf
          maxPrice={maxPrice}
          subCatsProf={selectedSubCats}
          profSort={profSort}
        />
      </Right>
    </ContainerProf>
  );
};

export default Professionals;
