import React from "react";
import PageviewIcon from "@mui/icons-material/Pageview";
import "./SearchBar.scss";
import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <div className="searchBar">
      <div className="wrapperSearch">
        <input type="text" />
        <Link to="/search">
          <PageviewIcon fontSize="medium" />
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
