import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { baseUrl, staticImagePath } from "../constants";
import Cookies from "js-cookie";

const BucketProduct = ({ product, setSelected, all, setCount }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

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

  const handleDelete = (id) => {
    let userID = Cookies.get('user').id;
    let body = { user_id: userID, product_id: product.id };
    fetch(`${baseUrl}/v1/products`, {
      method: "DELETE",
      body: JSON.stringify(body),
    })
      .then(() => {
        setIsDelete(true);
        setCount(prev => prev - 1)
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div
      className={`flex flex-row items-center justify-around gap-[40px] pr-16 w-full ${isDelete ? "hidden" : ""
        }`}
    >
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
        <button onClick={() => handleDelete(product.id)}>
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default BucketProduct;