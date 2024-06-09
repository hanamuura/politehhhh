import styled from "styled-components";
import { ProductsList } from "./ProductsList";
import { CategoryHeader } from "./CategoryHeader";
import { useEffect, useState } from "react";


export const ProductsContainer = ({ products, categories }) => {

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect(() => {
        setFilteredProducts(
            selectedCategory
                ? products.filter((product) =>
                    product.categories.some((category) => category.name === selectedCategory.name)
                )
                : products
        );
    }, [selectedCategory, products]);

    return (
        <div className="flex flex-col justify-center items-center">
            <CategoryHeader categories={categories} setSelectedCategory={setSelectedCategory} />
            <MainBlock>
                <ProductsList products={filteredProducts} />
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