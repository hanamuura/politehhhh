import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { staticImagePath } from "../constants";

const BucketProduct = ({ product, setSelected, all }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(all);
    if (all) {
      setSelected((prev) => [...prev, product]);
    } else {
      setSelected([]);
    }
  }, [all, setSelected, product]);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
    if (!isSelected) {
      setSelected((prev) => [...prev, product]);
    } else {
      setSelected((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  return (
    <div className="flex flex-row items-center justify-around gap-[40px] pr-16 w-full">
      <input
        type="checkbox"
        className=""
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <img
        className="w-[100px] h-[150px]"
        src={`${staticImagePath}${product.image}`}
      />
      <div className="w-[152px] flex flex-col justify-center">
        <label className="font-bold">
          {product.name.length > 30
            ? `${product.name.slice(0, 20)}...`
            : product.name}
        </label>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl">{product.price} BYN</h1>
        <div className="flex justify-center">
          <button>
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BucketProduct;