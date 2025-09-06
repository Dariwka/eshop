import React, { useMemo } from "react";
import CardTreat from "../../components/CardTreat/CardTreat";
import useFetch from "../../hooks/useFetch";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { isPromoActive, getActivePrice } from "../../utils/promo";

const ListTreatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
`;

const ListTreat = ({ subCatsTreat, maxPrice, treatSort, promoOnly }) => {
  const { data, loading } = useFetch(
    `/treatments?populate=*&${subCatsTreat?.map(
      (item) => `&[filters][sub_treat_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${Number(maxPrice)}&pagination[pageSize]=100`
  );
  const itemsSorted = useMemo(() => {
    let rows = Array.isArray(data) ? [...data] : [];
    if (promoOnly) {
      rows = rows.filter((it) => isPromoActive(it?.attributes || {}));
    }
    if (treatSort === "asc" || treatSort === "desc") {
      rows.sort((a, b) => {
        const A = a?.attributes || {};
        const B = b?.attributes || {};
        const priceA = Number(getActivePrice(A) ?? A.price ?? 0);
        const priceB = Number(getActivePrice(B) ?? B.price ?? 0);
        return treatSort === "asc" ? priceA - priceB : priceB - priceA;
      });
    } else {
      rows.sort((a, b) => {
        const ap = isPromoActive(a?.attributes || {});
        const bp = isPromoActive(b?.attributes || {});
        return ap === bp ? 0 : ap ? -1 : 1;
      });
    }
    return rows;
  }, [data, treatSort, promoOnly]);
  return (
    <ListTreatContainer>
      {loading ? (
        <LoadingButton loading />
      ) : (
        itemsSorted.map((item) => <CardTreat item={item} key={item.id} />)
      )}
    </ListTreatContainer>
  );
};

export default ListTreat;
