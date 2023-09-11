import React, { useState } from "react";
import "./SearchPage.scss";
//import ListSearch from "../../components/ListSearch/ListSearch";
import useFetch from "../../hooks/useFetch";
import ListSearch from "../../components/ListSearch/ListSearch";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import styled from "styled-components";
import { mobile } from "../../responsive";

const SearchPageContainer = styled.div`
  padding: 30px 50px;
  display: flex;
  flex-grow: 1;
  ${mobile({ padding: "10px" })}
`;
const LeftSearch = styled.div`
  display: grid;
  align-content: space-around;
  flex: 4;
`;
const Top = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const StyledForm = styled.form`
  width: 60%;
  text-align: center;
`;
const Title = styled.h1`
  font-weight: 400;
  ${mobile({ fontSize: "22px" })}
`;
const InputBar = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 5px;
  margin: 2rem 0;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  padding: 10px;
  background-color: green;
  color: white;
`;

const Bottom = styled.div`
  display: flex;
  margin: 2rem 0;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;

const RightSearch = styled.div`
  padding: 20px;
  padding-right: 0;
  flex: 1;
  ${mobile({ display: "none" })}
`;

const SearchPage = () => {
  const { data, loading } = useFetch(`/products?populate=*`);
  const [products, setProducts] = useState(data);
  const [searchVal, setSearchVal] = useState("");

  //search
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchVal === "") {
      setProducts(data);
      return;
    }
    const filterBySearch = data
      ?.map((item) => item?.attributes)
      .filter((item) => {
        if (
          item?.desc?.toLowerCase().includes(searchVal.toLowerCase()) ||
          item?.title?.toLowerCase().includes(searchVal.toLowerCase()) ||
          item?.categories?.data[0]?.attributes?.title
            .toLowerCase()
            .includes(searchVal.toLowerCase())
        ) {
          return item;
        }
      });
    setProducts(filterBySearch);
  };

  return (
    <SearchPageContainer>
      <LeftSearch>
        <Top>
          <StyledForm onSubmit={searchHandler}>
            <Title>Search</Title>
            <InputBar>
              <StyledInput
                required
                type="text"
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <StyledButton type="submit">Search</StyledButton>
            </InputBar>
          </StyledForm>
        </Top>
        <Bottom>
          {loading ? (
            <LoadingButton loading={loading} />
          ) : (
            products?.map((product) => {
              return <ListSearch product={product} key={product} />;
            })
          )}
        </Bottom>
      </LeftSearch>
      <RightSearch>
        <SearchFilter />
      </RightSearch>
    </SearchPageContainer>
  );
};

export default SearchPage;
