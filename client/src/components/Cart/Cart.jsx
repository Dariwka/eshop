import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, resetCart } from "../../redux/cartReducer";

/* ===== texts (FI) ===== */ const TEXT = {
  titleEmpty: "Ostoskorisi",
  empty: "Ostoskorisi on tyhjä",
  titleFull: "Ostoskorissasi olevat tuotteet",
  shipping: "Toimitus",
  subtotal: "Välisummaa",
  total: "Yhteensä",
  checkout: "Siirry kassalle",
  clear: "Tyhjennä ostoskori",
  bulkyNote:
    "Ostoskorissasi on tilaa vievä tuote. Toimitusmaksu vahvistetaan erikseen – ota yhteyttä.",
  shippingPending: "Sovitaan erikseen",
};

const SHIPPING_FEE = 10.9;

const FREE_SHIPPING_FROM = 100; // jos > 100 => 0€
/* ===== styles ===== */

const Popup = styled.div`
  position: fixed;
  z-index: 9999;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);
  width: ${(p) => (p.$wide ? "900px" : "360px")};
  max-width: calc(100vw - 24px);
  padding: 18px;
`;
const Header = styled.div`
  font-family: "Urbanist", sans-serif;
  font-size: 28px;
  font-weight: 500;
  color: #171717;
  margin-bottom: 14px;
`;
const EmptyBox = styled.div`
  padding: 26px 8px;
  text-align: center;
  font-family: "Urbanist", sans-serif;
  color: #666;
`;
const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 14px;
`;
const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 52px 1fr 34px;
  gap: 12px;
  align-items: start;
`;
const Img = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 8px;
  background: #fafafa;
`;
const Info = styled.div`
  font-family: "Urbanist", sans-serif;
`;
const Name = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #171717;
  margin-bottom: 4px;
`;
const Desc = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.35;
  margin-bottom: 6px;
`;
const QtyPrice = styled.div`
  font-size: 14px;
  color: #171717;
`;
const DeleteBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #f4f4f4;
  }
  svg {
    color: #c62828;
    font-size: 22px;
  }
`;
const Divider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 12px 0;
`;
const Summary = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 8px;
  column-gap: 10px;
  font-family: "Urbanist", sans-serif;
  font-size: 15px;
`;
const Label = styled.div`
  color: #171717;
`;
const Value = styled.div`
  color: #171717;
  font-weight: 500;
`;
const Note = styled.div`
  margin-top: 10px;
  font-family: "Urbanist", sans-serif;
  font-size: 12px;
  color: #666;
  line-height: 1.35;
`;
const Actions = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const CheckoutBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 10px;
  text-decoration: none;
  background: #0a7c5f;
  color: white;
  font-family: "Urbanist", sans-serif;
  font-weight: 600;
  &:hover {
    filter: brightness(0.95);
  }
`;
const ClearBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: "Urbanist", sans-serif;
  color: #b00020;
  padding: 8px 0;
  &:hover {
    text-decoration: underline;
  }
`;
const formatEUR = (n) =>
  new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(
    n
  );
/* ===== component ===== */ export default function Cart({
  anchorRef,
  onClose,
}) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const popupRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [wide, setWide] = useState(false);
  const subtotal = useMemo(() => {
    return products.reduce(
      (sum, p) => sum + (Number(p.price) || 0) * (p.quantity || 1),
      0
    );
  }, [products]);
  const hasBulky = useMemo(() => products.some((p) => !!p.isBulky), [products]);
  const shipping = useMemo(() => {
    if (products.length === 0) return 0;
    if (hasBulky) return null; // “уточняется”
    //
    if (subtotal > FREE_SHIPPING_FROM) return 0;
    return SHIPPING_FEE;
  }, [products.length, hasBulky, subtotal]);
  const total = useMemo(() => {
    if (products.length === 0) return 0;
    if (shipping === null) return subtotal; // не считаем доставку, пока “уточняется”
    //
    return subtotal + shipping;
  }, [products.length, shipping, subtotal]); // wide layout when there are items with long lines / keep your previous “big dropdown”
  //
  useEffect(() => {
    setWide(products.length > 0); // пустая корзина = компактно, с товарами = шире
    //
  }, [products.length]); // calculate anchored position (right aligned to anchor)
  //
  const recalc = () => {
    const a = anchorRef?.current;
    const p = popupRef?.current;
    if (!a || !p) return;
    const r = a.getBoundingClientRect();
    const pw = p.offsetWidth;
    const ph = p.offsetHeight;
    const offset = 10; // right aligned: popup right edge = anchor right edge
    //
    let left = r.right - pw;
    let top = r.bottom + offset; // clamp inside viewport
    //
    const minLeft = 12;
    const maxLeft = window.innerWidth - pw - 12;
    left = Math.max(minLeft, Math.min(left, maxLeft));
    const minTop = 12;
    const maxTop = window.innerHeight - ph - 12;
    top = Math.max(minTop, Math.min(top, maxTop));
    setPos({ top, left });
  };
  useLayoutEffect(() => {
    recalc(); // eslint-disable-next-line react-hooks/exhaustive-deps
    //
  }, [wide, products.length]);
  useEffect(() => {
    recalc();
    const onScroll = () => recalc();
    const onResize = () => recalc();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    const onDocMouseDown = (e) => {
      const p = popupRef.current;
      const a = anchorRef?.current;
      if (!p) return; // click outside popup AND outside anchor => close
      //
      if (!p.contains(e.target) && a && !a.contains(e.target)) onClose?.();
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocMouseDown);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
    //
  }, [onClose]);
  return (
    <Popup ref={popupRef} style={{ top: pos.top, left: pos.left }} $wide={wide}>
      <Header>
        {products.length === 0 ? TEXT.titleEmpty : TEXT.titleFull}
      </Header>
      {products.length === 0 ? (
        <EmptyBox>{TEXT.empty}</EmptyBox>
      ) : (
        <>
          <Items>
            {products.map((p) => (
              <ItemRow key={p.id}>
                <Img src={p.img} alt={p.title} />
                <Info>
                  <Name>{p.title}</Name> {p.desc ? <Desc>{p.desc}</Desc> : null}
                  <QtyPrice>
                    {p.quantity} x {formatEUR(Number(p.price) || 0)}
                  </QtyPrice>
                </Info>
                <DeleteBtn
                  type="button"
                  aria-label="Poista tuote"
                  onClick={() => dispatch(removeItem(p.id))}
                >
                  <DeleteOutlineIcon />
                </DeleteBtn>
              </ItemRow>
            ))}
          </Items>
          <Divider />
          <Summary>
            <Label>{TEXT.shipping}</Label>
            <Value>
              {shipping === null ? TEXT.shippingPending : formatEUR(shipping)}
            </Value>
            <Label>{TEXT.subtotal}</Label> <Value>{formatEUR(subtotal)}</Value>
            <Label>{TEXT.total}</Label> <Value>{formatEUR(total)}</Value>
          </Summary>
          {hasBulky ? <Note>{TEXT.bulkyNote}</Note> : null}
          <Actions>
            <CheckoutBtn to="/cart" onClick={onClose}>
              {TEXT.checkout}
            </CheckoutBtn>
            <ClearBtn type="button" onClick={() => dispatch(resetCart())}>
              {TEXT.clear}
            </ClearBtn>
          </Actions>
        </>
      )}
    </Popup>
  );
}
