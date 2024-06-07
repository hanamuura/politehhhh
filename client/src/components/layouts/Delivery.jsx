import React, { useEffect, useState } from "react"
import Cookies from "js-cookie";

const Delivery = (props) => {
    const [products, setProducts] = useState()
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        const userID = JSON.parse(Cookies.get('user')).id
        const fetchData = async () => {
            let response = await fetch(`http://localhost:8080/api/v1/orders/?user_id=${userID}`)
            let jsonResponse = await response.json()
            console.log(jsonResponse)
            setProducts(jsonResponse)
            setIsLoad(prev => !prev)
        }
        fetchData()
    }, [])

    if (!products) {
        return (
            <>
                Нету товаров
            </>
        )
    }

    return (
        <div>

        </div>
    )
};

export default Delivery;
