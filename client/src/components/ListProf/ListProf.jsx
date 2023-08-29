import React from "react";
import "./ListProf.scss";
import CardProf from "../CardProf/CardProf";
import useFetch from "../../hooks/useFetch";

const ListProf = ({ subCatsProf, maxPrice, profSort }) => {
  const { data, loading } = useFetch(
    `/professionals?populate=*&${subCatsProf?.map(
      (item) => `&[filters][sub_prof_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${profSort}`
  );

  return (
    <div className="listProf">
      {loading
        ? "loading..."
        : data?.map((item) => <CardProf item={item} key={item.id} />)}
    </div>
  );
};

export default ListProf;
