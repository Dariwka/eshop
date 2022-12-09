import React from "react";
import "./ListTreat.scss";
import CardTreat from "../../components/CardTreat/CardTreat";
import useFetch from "../../hooks/useFetch";

const ListTreat = ({ subCatsTreat, maxPrice, treatSort }) => {
  const { data, loading } = useFetch(
    `/treatments?populate=*&${subCatsTreat?.map(
      (item) => `&[filters][sub_treat_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${treatSort}`
  );

  console.log("treat", data);

  console.log("categ", subCatsTreat);

  return (
    <div className="listTreat">
      {loading
        ? "loading..."
        : data?.map((item) => <CardTreat item={item} key={item.id} />)}
    </div>
  );
};

export default ListTreat;
