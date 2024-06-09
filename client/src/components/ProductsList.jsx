import styled from "styled-components";
import { Product } from "./Product";
import { Link } from "react-router-dom";


export const ProductsList = ({ products }) => {
    if (!products) {
        return <>Loading...</>
    }

    console.log(products)

    return (
        <MainBlock>
            {products.map(product =>
                <Product key={product.id} product={product} />
            )}
        </MainBlock>
    )
}

const MainBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 100%;
  grid-auto-rows: 1fr; 
`;