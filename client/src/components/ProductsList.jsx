import styled from "styled-components";
import { Product } from "./Product";
import { Link } from "react-router-dom";


export const ProductsList = ({ products }) => {
    if (!products) {
        return <>Loading...</>
    }

    return (
        <MainBlock>
            {products.map(product =>
                    <Product key={product.name} product={product} />
                )}
        </MainBlock>
    )
}

const MainBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`