import React, { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import ListTreat from "../../components/ListTreat/ListTreat";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";

const ContainerTreatments = styled.div`
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

const Treatments = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [treatSort, setTreatSort] = useState("asc");

  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(`/sub-treat-categories?populate=*`);

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
    <ContainerTreatments>
      <LeftContainer>
        <FilterItem>
          <Title>Treatment's Categories</Title>
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
          <h2>Filter by price</h2>
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
          <h2>Sort by</h2>
          <InputItem>
            <input
              onClick={() => {
                scrollIntoView(listRef);
              }}
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setTreatSort("asc")}
            />
            <Label htmlFor="asc">Price (Lowest First)</Label>
          </InputItem>
          <InputItem>
            <input
              onClick={() => {
                scrollIntoView(listRef);
              }}
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setTreatSort("desc")}
            />
            <Label htmlFor="desc">Price (Highest First)</Label>
          </InputItem>
        </FilterItem>
      </LeftContainer>
      <Right ref={listRef}>
        <CatImg
          src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669809025/kosmedik/engin-akyurt-ZbzYDboN7fg-unsplash_2_h0fmb3.jpg"
          alt=""
          className="catImg"
        />
        <ListTreat
          maxPrice={maxPrice}
          subCatsTreat={selectedSubCats}
          treatSort={treatSort}
        />
      </Right>
    </ContainerTreatments>
  );
};

export default Treatments;
