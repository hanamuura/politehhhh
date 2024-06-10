import styled from "styled-components";
import { ProductsList } from "./ProductsList";
import { CategoryHeader } from "./CategoryHeader";
import { useEffect, useState } from "react";


export const ProductsContainer = ({ products, categories }) => {

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        setFilteredProducts(
            selectedCategory
                ? products.filter((product) =>
                    product.categories.some((category) => category.name === selectedCategory.name)
                )
                : products
        );
    }, [selectedCategory, products]);

    useEffect(() => {
        let filtered = products;

        if (name) {
            filtered = filtered.filter((val) =>
                val.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (price) {
            filtered = filtered.filter((val) => val.price < price);
        }

        setFilteredProducts(filtered);
    }, [price, name]);

    return (
        <div className="flex flex-col justify-center items-center">
            <CategoryHeader categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}/>
            <div className="mt-5 w-full">
                <div className="flex gap-5 w-full mb-5">
                    <input value={name} onChange={(e) => setName(prev => e.target.value)} className="border-primary border-[2px] p-2 w-3/4 rounded-[25px] text-primary outline-none" placeholder="Поиск" />
                    <input type="number" onChange={(e) => setPrice(prev => e.target.value)} className="border-primary border-[2px] p-2 w-3/4 rounded-[25px] text-primary outline-none" placeholder="Цена(до)"/>
                </div>
                <ProductsList products={filteredProducts} />
            </div>
        </div>
    )
}

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 11px;
  margin-top: 30px;
`