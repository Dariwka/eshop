import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";

/* ===== texts (FI) ===== */

const TEXT = {
  titleEmpty: "Ostoskori",
  empty: "Ostoskori on tyhjä",
  titleFull: "Ostoskorissasi olevat tuotteet",
  shipping: "Toimitus",
  subtotal: "Välisummaa",
  total: "Yhteensä",
  checkout: "Siirry kassalle",
  clear: "Tyhjennä ostoskori",
  bulkyNote:
    "Ostoskorissasi on tilaa vievä tuote. Toimitusmaksu vahvistetaan erikseen – ota yhteyttä.",
  shippingPending: "Sovitaan erikseen",
  payError: "Maksuun siirtyminen epäonnistui. Yritä uudelleen.",
  payLoading: "Siirrytään kassalle...",
};

const SHIPPING_FEE = 10.9;
const FREE_SHIPPING_FROM = 100; // jos subtotal > 100 => 0€

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
const CheckoutBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: #0a7c5f;
  color: white;
  font-family: "Urbanist", sans-serif;
  font-weight: 600;
  &:hover {
    filter: brightness(0.95);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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
const ErrorText = styled.div`
  margin-top: 10px;
  font-family: "Urbanist", sans-serif;
  font-size: 12px;
  color: #b00020;
`;

const formatEUR = (n) =>
  new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(
    n
  );

/* ===== component ===== 

Поддерживает: - новый API: { anchorRef, onClose } - старый API из Navbar: { open, close }*/

export default function Cart({ anchorRef, onClose, open, close }) {
  const dispatch = useDispatch();

  const anchor = anchorRef || open; // open = cartButtonRef//
  const handleClose = onClose || close;

  const productsRaw = useSelector((state) => state.cart.products);
  const products = useMemo(() => productsRaw ?? [], [productsRaw]);

  // совместимость с Navbar//

  const popupRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [wide, setWide] = useState(false);

  const [loadingPay, setLoadingPay] = useState(false);
  const [payError, setPayError] = useState("");

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
    if (shipping === null) return subtotal;
    return subtotal + shipping;
  }, [products.length, shipping, subtotal]);

  useEffect(() => {
    setWide(products.length > 0);
  }, [products.length]);

  // позиционирование popup относительно иконки корзины//
  const recalc = useCallback(() => {
    const a = anchor?.current;
    const p = popupRef?.current;
    if (!a || !p) return;

    const r = a.getBoundingClientRect();
    const pw = p.offsetWidth;
    const ph = p.offsetHeight;

    const offset = 10;

    let left = r.right - pw;
    let top = r.bottom + offset;

    const minLeft = 12;
    const maxLeft = window.innerWidth - pw - 12;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    const minTop = 12;
    const maxTop = window.innerHeight - ph - 12;
    top = Math.max(minTop, Math.min(top, maxTop));

    setPos({ top, left });
  }, [anchor]);

  useLayoutEffect(() => {
    recalc();
  }, [recalc, wide, products.length]);

  useEffect(() => {
    recalc();

    const onScroll = () => recalc();
    const onResize = () => recalc();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);

    const onKey = (e) => {
      if (e.key === "Escape") handleClose?.();
    };
    window.addEventListener("keydown", onKey);

    const onDocMouseDown = (e) => {
      const p = popupRef.current;
      const a = anchor?.current;
      if (!p) return;
      if (!p.contains(e.target) && a && !a.contains(e.target)) handleClose?.();
    };
    document.addEventListener("mousedown", onDocMouseDown);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocMouseDown);
    };
  }, [recalc, handleClose, anchor]);

  const stripePromise = useMemo(
    () => loadStripe(process.env.REACT_APP_STRIPE_PK),
    []
  );

  const handlePayment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loadingPay) return;
    if (products.length === 0) return;
    setPayError("");
    setLoadingPay(true);
    try {
      const stripe = await stripePromise;
      // IMPORTANT: send what your backend expects.
      // Keep products as you had before, but you can also attach shipping info if needed.//
      const res = await makeRequest.post("/orders", {
        products,
        shipping, // can be number or null//
        hasBulky,
      });
      const sessionId = res?.data?.stripeSession?.id;
      if (!sessionId) {
        console.log("No stripeSession.id in response:", res?.data);
        setPayError(TEXT.payError);
        setLoadingPay(false);
        return;
      } // close dropdown before redirect (optional)
      //
      handleClose?.();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
      setPayError(TEXT.payError);
      setLoadingPay(false);
    }
  };

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
                  <Name>{p.title}</Name>
                  {p.desc ? <Desc>{p.desc}</Desc> : null}
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
            <Label>{TEXT.subtotal}</Label>
            <Value>{formatEUR(subtotal)}</Value>
            <Label>{TEXT.total}</Label>
            <Value>{formatEUR(total)}</Value>
          </Summary>
          {hasBulky ? <Note>{TEXT.bulkyNote}</Note> : null}

          {payError ? <ErrorText>{payError}</ErrorText> : null}
          <Actions>
            <CheckoutBtn onClick={handlePayment} disabled={loadingPay}>
              {loadingPay ? TEXT.payLoading : TEXT.checkout}
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
