import React from "react";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Slider from "../../components/Slider/Slider";
import "./Home.scss";

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProducts type="featured" />
      <FeaturedProducts type="trading" />
    </div>
  );
};

export default Home;
