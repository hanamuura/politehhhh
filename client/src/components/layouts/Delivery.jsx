import React, { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { baseUrl } from "../../constants";
import FavouritesProductList from "../FavouritesProductList";


const Delivery = (props) => {
    const [products, setProducts] = useState()
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        const userID = JSON.parse(Cookies.get('user')).id
        const fetchData = async () => {
            
            let response = await fetch(`${baseUrl}/v1/orders/?user_id=${userID}`)
            let jsonResponse = await response.json()
            console.log(jsonResponse);
            setProducts(jsonResponse)
            setIsLoad(prev => !prev)
        }
        fetchData()
    }, [])

    if (!isLoad) {
        return (
            <>
                Нету товаров
            </>
        )
    }

    return (
        <div>
            {/* <FavouritesProductList products={products}/> */}
        </div>
    )
};

export default Delivery;
