import styled from "styled-components";
import {ProductsList} from "./ProductsList";
import {CategoryHeader} from "./CategoryHeader";


export const ProductsContainer = ({products, categories}) => {
    return(
        <MainBlock>
            <CategoryHeader categories={categories}/>
            <ProductsList products={products}/>
        </MainBlock>
    )
}

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 11px;
`