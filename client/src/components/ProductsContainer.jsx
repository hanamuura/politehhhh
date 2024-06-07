import styled from "styled-components";
import { ProductsList } from "./ProductsList";
import { CategoryHeader } from "./CategoryHeader";


export const ProductsContainer = ({ products, categories }) => {

    return (
        <div>
            <CategoryHeader categories={categories} />
            <MainBlock>
                <ProductsList products={products} />
            </MainBlock>
        </div>
    )
}

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 11px;
  margin-top: 30px;
`