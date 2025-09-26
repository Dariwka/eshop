import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import useFetch from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ModeIcon from "@mui/icons-material/Mode";
import TrainingBooking from "../../components/TrainingBooking/TrainingBooking";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

/* ===== Cloudinary helpers ===== */ function clTransform(url, t) {
  if (!url) return url;
  const i = url.indexOf("/upload/");
  if (i === -1) return url;
  const head = url.slice(0, i + 8);
  const tail = url.slice(i + 8);
  if (tail.startsWith("f_auto") || tail.startsWith("q_auto")) return url;
  return `${head}${t}/${tail}`;
}
function clUrl(url, { w = 1600, h, fit = "cover" } = {}) {
  const fitMap = fit === "contain" ? "c_pad" : "c_fill";
  const base = `f_auto,q_auto:eco,dpr_auto,${fitMap},g_auto,w_${w}${
    h ? `,h_${h}` : ""
  }`;
  return clTransform(url, base);
}
function srcSet(url, widths, opts = {}) {
  return widths.map((w) => `${clUrl(url, { ...opts, w })} ${w}w`).join(", ");
}
/* ===== styles ===== */

const Container = styled.div`
  font-family: "Urbanist", sans-serif;
  padding: 20px 50px;
  display: flex;
  gap: 50px;
  ${mobile({ flexDirection: "column", gap: "30px", padding: "15px" })};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  ${mobile({
    gap: "10px",
  })};
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Thumb = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: 10px;
`;
const MainImgWrap = styled.div`
  flex: 5;
  ${mobile({ flex: "3" })};
`;
const MainImg = styled.img`
  width: 100%;
  max-height: 800px;
  object-fit: cover;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  ${mobile({ gap: "20px" })};
`;
const Title = styled.span`
  font-size: 25px;
  font-weight: 700;
`;
const Price = styled.span`
  font-size: 30px;
  color: green;
  font-weight: 600;
`;
const Desc = styled.p`
  font-size: 18px;
  font-weight: 300;
  text-align: justify;
  ${mobile({ fontSize: "16px" })};
`;
const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;
const AddButton = styled.button`
  width: 250px;
  padding: 10px;
  background: green;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  ${mobile({ width: "auto" })};
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: gray;
  font-size: 14px;
  margin-top: 30px;
`;
const HrBorder = styled.hr`
  border: 1px solid rgb(238, 237, 237);
`;
const Hr = styled.hr`
  width: 200px;
  border: 1px solid rgb(238, 237, 237);
`;
/* ===== component ===== */
const Course = () => {
  const { slug } = useParams();
  // <== slug!
  //
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState("img");
  const [show, setShow] = useState(false); // определить, не пришёл ли числовой id (на всякий случай)
  //
  const isId = /^\d+$/.test(slug || "");
  const fields =
    `fields[0]=title&fields[1]=desc&fields[2]=price&fields[3]=date&fields[4]=time` +
    `&fields[5]=area&fields[6]=goal&fields[7]=tags&fields[8]=slug`;
  const populate = `populate[img][fields][0]=url&populate[img2][fields][0]=url&populate[brands][fields][0]=title`;
  const common = `${fields}&${populate}&publicationState=live`;
  const url = isId
    ? `/courses/${slug}?${common}`
    : `/courses?filters[slug][$eq]=${encodeURIComponent(slug || "")}&${common}`;
  const { data, loading, error } = useFetch(url);
  // нормализуем ответ
  //
  const item = useMemo(() => {
    if (Array.isArray(data)) return data[0];
    if (Array.isArray(data?.data)) return data.data[0];
    return data || null;
  }, [data]);
  const attrs = item?.attributes || item || null; // мягкий редирект с id -> /training/:slug
  //
  useEffect(() => {
    if (!isId || !attrs?.slug) return;
    navigate(`/training/${attrs.slug}`, { replace: true });
  }, [isId, attrs?.slug, navigate]);
  const trainingHandler = () => setShow((v) => !v);
  if (error) return <Container>Something went wrong</Container>;
  if (loading)
    return (
      <Container>
        <LoadingButton loading />
      </Container>
    );
  if (!item) return <Container>Not found</Container>;
  const url1 = attrs?.img?.data?.attributes?.url || "";
  const url2 = attrs?.img2?.data?.attributes?.url || "";
  const thumbWidths = [200, 320, 420];
  const bigWidths = [800, 1200, 1600];
  return (
    <Container>
      <Left>
        <ImgContainer>
          {url1 && (
            <Thumb
              src={clUrl(url1, { w: 320 })}
              srcSet={srcSet(url1, thumbWidths)}
              sizes="(max-width: 768px) 40vw, 220px"
              alt=""
              loading="lazy"
              decoding="async"
              onClick={() => setSelectedImg("img")}
            />
          )}
          {url2 && (
            <Thumb
              src={clUrl(url2, { w: 320 })}
              srcSet={srcSet(url2, thumbWidths)}
              sizes="(max-width: 768px) 40vw, 220px"
              alt=""
              loading="lazy"
              decoding="async"
              onClick={() => setSelectedImg("img2")}
            />
          )}
        </ImgContainer>
        <MainImgWrap>
          <MainImg
            src={clUrl(attrs?.[selectedImg]?.data?.attributes?.url, {
              w: 1200,
            })}
            srcSet={srcSet(
              attrs?.[selectedImg]?.data?.attributes?.url,
              bigWidths
            )}
            sizes="(max-width: 768px) 90vw, 50vw"
            alt=""
            decoding="async"
          />
        </MainImgWrap>
      </Left>
      <Right>
        <Title>{attrs?.title}</Title>
        {attrs?.price != null && (
          <Price>€{Number(attrs.price).toFixed(0)}</Price>
        )}
        {attrs?.date && (
          <TimeRow>
            <CalendarMonthIcon />
            {String(attrs.date).split("-").reverse().join("/")}
          </TimeRow>
        )}
        {attrs?.time && (
          <TimeRow>
            <AccessTimeIcon /> {String(attrs.time).split(":00.000")[0]}
          </TimeRow>
        )}
        {attrs?.desc && <Desc>{attrs.desc}</Desc>}
        <AddButton onClick={trainingHandler}>
          <ModeIcon /> BOOK
        </AddButton>
        <InfoContainer>
          <HrBorder />
          {attrs?.area && (
            <>
              <span>Area: {attrs.area}</span>
              <Hr />
            </>
          )}
          {attrs?.goal && (
            <>
              <span>Goal: {attrs.goal}</span>
              <Hr />
            </>
          )}
          {attrs?.tags && <span>Tags: {attrs.tags}</span>}
        </InfoContainer>
      </Right>
      {show && (
        <TrainingBooking
          trainingTime={String(attrs?.time || "").split(":00.000")[0]}
          trainingTitle={attrs?.title || ""}
          trainingDate={attrs?.date || ""}
          close={trainingHandler}
        />
      )}
    </Container>
  );
};
export default Course;
