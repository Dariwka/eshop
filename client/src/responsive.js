import { css } from "styled-components";

//iphone 14pro 390x844

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 430px) {
      ${props}
    }
  `;
};
