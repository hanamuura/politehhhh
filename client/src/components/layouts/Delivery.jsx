import React, { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { baseUrl } from "../../constants";


const Delivery = (props) => {
    const [products, setProducts] = useState()
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        const userID = JSON.parse(Cookies.get('user')).id
        const fetchData = async () => {
            
            let response = await fetch(`${baseUrl}/v1/orders/?user_id=${userID}`)
            let jsonResponse = await response.json()
            setProducts(jsonResponse)
            setIsLoad(prev => !prev)
        }
        fetchData()
    }, [])

    if (!products) {
        return (
            <>
                Нету товаров
                {process.env.BASE_URL}
            </>
        )
    }

    return (
        <div>
        </div>
    )
};

export default Delivery;
