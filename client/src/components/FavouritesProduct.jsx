import React from "react"
import { FaHeart } from "react-icons/fa6";
import { staticImagePath } from "../constants";
import { MdOutlineImageNotSupported } from "react-icons/md";

const FavouritesProduct = ({ product }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#b5b2d01b] gap-4 rounded-[50px] pt-5 pb-5">
      <FaHeart className="text-primary w-5 h-5 self-end mr-7" />
      {product.image ? <img className="w-[230px] h-[285px]" src={`${staticImagePath}${product.image}`} alt={product.image} /> : <MdOutlineImageNotSupported className="w-[185px] h-[285px]"/>}
      <div className="flex flex-col gap-8 items-center justify-center">
        <label className="font-bold text-xl ">{product.name.length > 30? `${product.name.slice(0, 20)}...` : product.name}</label>
        <label className="font-bold text-3xl">{product.price} BYN</label>
      </div>
      <button className="bg-primary rounded-[25px] text-white w-[163px] h-[35px] text-lg font-bold">В корзину</button>
    </div>
  )
};

export default FavouritesProduct;
