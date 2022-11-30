import React from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import "./Slider.scss";

const Slider = () => {
  const sliderPhotos = [
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669795685/kosmedik/karelys-ruiz-PqyzuzFiQfY-unsplash_ituvhw.jpg",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669795676/kosmedik/raphael-lovaski-Pe9IXUuC6QU-unsplash_uwybng.jpg",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669795673/kosmedik/engin-akyurt-g-m8EDc4X6Q-unsplash_kvqbnl.jpg",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669795673/kosmedik/huha-inc-OfVESgqrbJc-unsplash_wfcrlx.jpg",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796268/kosmedik/dermedics_LIFT_kompo_02_dzmcpb.png",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796267/kosmedik/dermedics_WHITE_kompo_02_dfqvpx.png",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796266/kosmedik/dermedics_SLIM_kompo_06_huhxi2.png",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796265/kosmedik/dermedics_PEEL_kompo_02_bgca6h.png",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796264/kosmedik/dermedics_CALM_kompo_03_gazv6n.png",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796264/kosmedik/dermedics_HYDRA_kompo_03_m1vqez.png",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796264/kosmedik/dermedics_GENX_kompo_03_tbpyw7.png",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796263/kosmedik/dermedics_GENX_kompo_02_ls7fno.png",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796263/kosmedik/dermedics_ACNE_kompo_02_z1unv7.png",
    "https://res.cloudinary.com/lvimeridijan/image/upload/v1669796263/kosmedik/dermedics_ECM_kompo_02_aoz6jb.png",
  ];
  return (
    <div className="slider">
      <div className="container">
        <img src={sliderPhotos[0]} alt="" />
        <img src={sliderPhotos[1]} alt="" />
        <img src={sliderPhotos[2]} alt="" />
      </div>
      <div className="icons">
        <div className="icon">
          <ArrowBackIosNewOutlinedIcon />
        </div>
        <div className="icon">
          <ArrowForwardIosOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
