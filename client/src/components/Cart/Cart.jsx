import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../../makeRequest";

const CartContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 110px;
  z-index: 999;
  background-color: #fff;
  padding: 20px;
  box-shadow: -12px 5px 28px -6px rgba(0, 0, 0, 0.62);
  -webkit-box-shadow: -12px 5px 28px -6px rgba(0, 0, 0, 0.62);
  -moz-box-shadow: -12px 5px 28px -6px rgba(0, 0, 0, 0.62);
`;

const CartTitle = styled.h1`
  margin-bottom: 30px;
  color: gray;
  font-weight: 400;
  font-size: 24px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const Image = styled.img`
  width: 80px;
  height: 100px;
  object-fit: cover;
`;

const Details = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

const Desc = styled.p`
  color: gray;
  margin-bottom: 10px;
  font-size: 14px;
`;

const PriceContainer = styled.div`
  color: green;
`;

const Delete = styled(DeleteIcon)`
  color: red;
  font-size: 30px;
  cursor: pointer;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 250px;
  padding: 10px;
  background-color: green;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  border: none;
  font-weight: 500;
`;

const Reset = styled.span`
  color: red;
  font-size: 12px;
  cursor: pointer;
`;

const ShippingCost = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Cart = ({ close, open }) => {
  const ref = useRef(null);
  const products = useSelector((state) => state.cart.products) || [];
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      if (total + item.quantity * item.price <= 100) {
        total += item.quantity * item.price + 10.9;
      } else {
        total += item.quantity * item.price;
      }
    });

    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_live_51OrOqrJ4503MJ2aYg5Hlfd9ZwMnoNS1zhVqczEV7YEnthFSvFHxwo3T2qVPqcp8zZdCtfHLOP0LPbm4MlgG9fK1g004TPdwKSr"
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const res = await makeRequest.post("/orders", {
        products,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !ref?.current?.contains(e.target) &&
        !open?.current?.contains(e.target)
      ) {
        close();
      }
    };

    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [close, open]);

  const shippingHandler = () => {
    let shippingCoast = 0;
    products.forEach((item) => {
      if (item.quantity * item.price <= 100) {
        shippingCoast += 10.9;
      } else {
        shippingCoast = 0;
      }
    });
    return shippingCoast.toFixed(2);
  };

  return (
    <CartContainer ref={ref}>
      <CartTitle>Products in your cart</CartTitle>
      {products?.map((item) => (
        <Item key={item.id}>
          <Image src={item.img} alt="" />
          <Details>
            <Title>{item.title}</Title>
            <Desc>{item.desc?.substring(0, 100)}</Desc>
            <PriceContainer>
              {item.quantity} x €{item.price}
            </PriceContainer>
          </Details>
          <Delete
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </Item>
      ))}
      <ShippingCost>
        <span>Shipping Cost</span>
        <span>€ {shippingHandler()}</span>
      </ShippingCost>
      <Total>
        <span>SUBTOTAL</span>
        <span>€{totalPrice()}</span>
      </Total>
      <Button onClick={handlePayment}>PROCEED TO CHECKOUT</Button>
      <Reset onClick={() => dispatch(resetCart())}>Reset Cart</Reset>
    </CartContainer>
  );
};

export default Cart;
