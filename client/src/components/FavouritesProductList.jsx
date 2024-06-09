import React from "react"
import FavouritesProduct from "./FavouritesProduct";

const FavouritesProductList = ({ products }) => {
    console.log(products)
    if (!products || !products.length){
        return <>loading</>
    }
    return (
        <div className="grid grid-cols-3 gap-9 pl-5 pr-5">
            {products.map(val => <FavouritesProduct key={val.id} product={val} />)}
        </div>
    )
};

export default FavouritesProductList;
