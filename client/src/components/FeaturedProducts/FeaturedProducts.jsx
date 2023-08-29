import React from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          perspiciatis quia illo ab quis rerum numquam optio, eos mollitia
          fugiat nemo totam itaque, nostrum ut aut assumenda. Atque explicabo
          veniam aliquam quia ea tempora obcaecati labore officiis impedit
          voluptas, recusandae repudiandae! Sed quo debitis mollitia?
        </p>
      </div>
      <div className="bottom">
        {error
          ? "Something went wrong"
          : loading
          ? "loading ....."
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
