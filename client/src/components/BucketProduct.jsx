import React from "react"
import { FaRegTrashAlt } from "react-icons/fa";

const BucketProduct = ({product}) => {
  return (
    <div className="flex flex-row items-center justify-around gap-[40px] w-[400px]">
        <input type="checkbox"/>
        <img className="w-[82px] h-[128px]" src={"product.image"}/>
        <label className="font-bold w-[102px]">{product.name}</label>
        <div>
            <h1 className="font-bold text-2xl">{product.price}</h1>
            <div className="flex justify-center">
                <button><FaRegTrashAlt/></button>
            </div>
        </div>        
    </div>
  )
};

export default BucketProduct;
