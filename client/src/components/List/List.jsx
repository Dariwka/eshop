import React from "react";
import "./List.scss";
import Card from "../Card/Card";

const List = () => {
  const dataProducts = [
    {
      id: 1,
      img: "https://res.cloudinary.com/lvimeridijan/image/upload/v1653638944/kosmedik/dermedics_CALM_roll-on_15ml_txf3z2.png",
      img2: "https://res.cloudinary.com/lvimeridijan/image/upload/v1653638944/kosmedik/dermedics_CALM_roll-on_15ml_box_1_dckssg.png",
      title: "CALM Instant Relief Eye Serum",
      isNew: true,
      volume: 15,
      oldPrice: 23,
      price: 16,
    },
    {
      id: 2,
      img: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669803259/kosmedik/dermedics_ACNE_roll-on_15ml_bottle_eyvc08.png",
      img2: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669803259/kosmedik/dermedics_ACNE_roll-on_15ml_box_hes7tq.png",
      title: "Anti Acne Roll-On Serum",
      isNew: true,
      volume: 15,
      oldPrice: 23,
      price: 16,
    },
    {
      id: 3,
      img: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669803439/kosmedik/dermedics_HYDRA_eye_cream_15ml_bottle_dseqr7.png",
      img2: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669803439/kosmedik/dermedics_HYDRA_eye_cream_15ml_box_purszy.png",
      title: "HYDRA Eye Cream Deluxe",
      isNew: false,
      volume: 15,
      oldPrice: 54,
      price: 48,
    },
    {
      id: 4,
      img: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669805253/kosmedik/dermedics_SHR_roll-on_15ml_bottle_ucy5gc.png",
      img2: "https://res.cloudinary.com/lvimeridijan/image/upload/v1669805253/kosmedik/dermedics_SHR_roll-on_15ml_box_kmaidw.png",
      title: "SHR Anti-Hair Serum",
      isNew: true,
      volume: 15,
      oldPrice: 23,
      price: 16,
    },
  ];
  return (
    <div className="list">
      {dataProducts?.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};

export default List;
