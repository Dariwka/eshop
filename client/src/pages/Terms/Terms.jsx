import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 25px;
  padding-top: 25px;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 55%;
  background-color: white;
  ${mobile({ width: "80% ", padding: "10px" })}
  h3, h2 {
    text-align: center;
    padding: 10px;
  }
  p {
    text-align: justify;
  }
`;

const Terms = () => {
  return (
    <Container>
      <Wrapper>
        <h2>Terms and Conditions</h2>
        <h3>ONLINE STORE</h3>
        <p>
          Ahti Pro Oy Webshop name kosmeDiK <br />
          info(at)kosmedik.eu <br />
          www.kosmedik.eu <br />
          3281350-8. <br />
          <strong>Kosmedik</strong> is a online store based in Finland. <br />
          The store sells products to companies and adults in the EU. The
          consent of a guardian is required for purchases of minors in our
          online store. These delivery terms are suitable for ordering products
          in our online store and for similar deliveries. We may change the
          delivery terms unilaterally from time to time, so please read our
          delivery terms in advance each time you order products from our online
          store. By placing an order in our online store, you accept the order
          conditions on this page and confirm that the information you have
          provided is correct.
        </p>
        <h3>Products and product prices</h3>
        <p>
          The features and prices of the products in the e-commerce are
          presented in connection with the product presentation of each product.
          We reserve the right to change prices and delivery costs, so please
          check. prices from the cart before you accept the order. The prices of
          the products include 24% VAT, which is indicated in the shopping cart
          and in the order confirmation.
        </p>
        <h3>Shipping costs</h3>
        <p>
          The delivery costs that may be charged for the order depend on the
          product itself (eg weight, size and packaging) and the chosen delivery
          method and are automatically added to the total amount of the order.
          You will see the shipping costs that will be charged for your order
          (if shipping costs are charged) in your shopping cart before you
          accept the order. From 26.09.2023 of order more than 100€, shipping
          cost FREE, but please on payment step, change shipping cost to 0€. If
          you would like to get your parcel faster than 5-7 days, you can pay
          10.90€.
        </p>
        <h3>Ordering and contract </h3>
        <p>
          The products are ordered on the website of our online store by
          transferring them to the shopping cart and confirming the order and
          paying for the contents of the Shopping Cart in the online payment
          service. When ordering from our online store, you are required to read
          and agree to our current delivery terms. You understand that your
          order, which you accept and confirm, is binding and creates an
          agreement between us with these terms of delivery, except as set forth
          below in the Terms of Right of Cancellation. All customer information
          is treated confidentially. The contact information requested in
          connection with the order will not be used for anything other than the
          delivery of the order or to clarify any ambiguities in it, unless
          otherwise stated.
        </p>
        <h3>Payment and payment methods</h3>
        <p>
          You can pay for your order using the payment methods described in the
          online store and available in the shopping cart.
        </p>
        <h3>Payment service provider </h3>
        <p>
          Millions of companies of all sizes use Stripe online and in person to
          accept payments, send payouts, automate financial processes, and
          ultimately grow revenue.
        </p>
        <h3>Order and payment confirmation</h3>
        <p>
          Once we have received your order, we will send you an order
          confirmation email showing your order details and any pre-invoices.
          Annathan your email address every time you place an order. Always
          check the contents of the order confirmation. If you have any
          questions, please contact our customer service immediately. Save your
          order confirmation if you need to contact customer service. When
          dealing with customer service, always keep your possible order number
          available. Always check that the contents of the package match the
          products on the order confirmation. You can contact our customer
          service with the following information: <strong>Ahti Pro Oy</strong>
          (Ecommerce name kosmeDiK) info (at) kosmedik.eu +358 400979610,
          3281350-8
        </p>
        <h3>Problem situations</h3>
        <p>
          If the product is lost or damaged during transport, you must notify us
          of the defect in writing within 14 days at the latest at the address
          given in the Product Exchange and Return Policy section. If the
          package is clearly damaged in transit, you must immediately make a
          complaint to the shipping company of your choice.{" "}
          <strong>kosmeDiK</strong> is not responsible for any lost or damaged
          product during transport. Your personal information may be used to
          process your order. You can read more about the use of your personal
          information in our register description.We only use the information to
          process orders and for our own marketing.
        </p>
        <h3>Limitation of Liability</h3>
        <p>
          <strong>Ahti Pro Oy</strong>, kosmeDiK shall not be liable for any
          indirect or consequential or other damages related to the order,
          delivery or product or for any of the above, except as provided in the
          Consumer Protection Act or other mandatory law for such damages.
        </p>
        <h3>Disagreements</h3>
        <p>
          We always try to settle any disputes regarding your order primarily by
          agreement, so please contact our customer service to arrange this. If
          the dispute concerning the sales contract cannot be settled through
          negotiation between the parties, the consumer may refer the matter to
          the Consumer Disputes Board (www.kuluttajariita.fi) to be resolved.
          Before taking the matter to the Consumer Disputes Board, the consumer
          should contact the Consumer Advice Center (www.kuluttajaneuvonta.fi).
        </p>
      </Wrapper>
    </Container>
  );
};

export default Terms;
