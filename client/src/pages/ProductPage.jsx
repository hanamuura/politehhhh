import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ProductComponent from "../components/ProductComponent";
import { baseUrl } from "../constants";

const ProductPage = (props) => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController
    async function fetchData() {
      try {
        const response = await fetch(`${baseUrl}/v1/products/${id}`, {
          signal: signal
        });
        const jsonData = await response.json();
        setProduct(jsonData);
        setIsLoad(!isLoad)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

    return () => {
      abortController.abort()
    }
  }, []);

  return (
    <div className="">
      {isLoad && <ProductComponent product={product}/>}
    </div>
  )
};

export default ProductPage;
