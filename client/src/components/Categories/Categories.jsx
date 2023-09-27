import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px;
  ${mobile({ padding: "0px", display: "flex", flexDirection: "column" })}
`;
const Col = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &.col-1 {
    flex: 2;
  }
`;
const Row = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  position: relative;
  overflow: hidden;
`;

const Button = styled.button`
  position: absolute;
  min-width: 100px;
  height: 50px;
  padding: 10px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
  cursor: pointer;
  border: none;
  background-color: green;
  color: white;
  text-transform: uppercase;
  font-weight: 500;

  &:hover {
    background-color: rgb(56, 234, 56);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Categories = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Container>
      <Col>
        <Row>
          <Image
            src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669808813/kosmedik/karelys-ruiz-rYardnw9lno-unsplash_qqrkl0.jpg"
            alt=""
          />
          <Button>
            <Link onClick={scrollToTop} className="link" to="/products/1">
              Face
            </Link>
          </Button>
        </Row>
        <Row>
          <Image
            src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669809025/kosmedik/fuu-j-Fu7RNjl-pW0-unsplash_ftyozi.jpg"
            alt=""
          />
          <Button>
            <Link onClick={scrollToTop} className="link" to="/products/2">
              Body
            </Link>
          </Button>
        </Row>
      </Col>
      <Col>
        <Row>
          <Image
            src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669811384/kosmedik/BB-Glow8-819x1024_n2ngha.png"
            alt=""
          />
          <Button>
            <Link onClick={scrollToTop} className="link" to="/trainings">
              Trainings
            </Link>
          </Button>
        </Row>
      </Col>
      <Col className="col-l">
        <Row>
          <Col>
            <Row>
              <Image
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1653594092/kosmedik/meso_face_fjofzr.jpg"
                alt=""
              />
              <Button>
                <Link onClick={scrollToTop} className="link" to="/treatments">
                  Treatments
                </Link>
              </Button>
            </Row>
          </Col>
          <Col>
            <Row>
              <Image
                src="https://res.cloudinary.com/lvimeridijan/image/upload/v1653590898/kosmedik/radio_frequency_body_rb6g4r.jpg"
                alt=""
              />
              <Button>
                <Link
                  onClick={scrollToTop}
                  className="link"
                  to="/professionals"
                >
                  Devices
                </Link>
              </Button>
            </Row>
          </Col>
        </Row>
        <Row>
          <Image
            src="https://res.cloudinary.com/lvimeridijan/image/upload/v1669810104/kosmedik/med_gels_dermedics_wdaqr7.png"
            alt=""
          />
          <Button>
            <Link onClick={scrollToTop} className="link" to="/professionals">
              Professionals
            </Link>
          </Button>
        </Row>
      </Col>
    </Container>
  );
};

export default Categories;
