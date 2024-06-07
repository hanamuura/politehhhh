import React, { useEffect, useState } from "react"
import BucketProduct from "../components/BucketProduct";
import Cookies from "js-cookie";

const Bucket = (props) => {
    const [products, setProducts] = useState()
    const [selectedProducts, setSelectedProducts] = useState()
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {
        const userID = JSON.parse(Cookies.get('user')).id
        const fetchData = async () => {
            let response = await fetch(`http://localhost:8080/api/v1/products?user_id=${userID}`)
            let jsonResponse = await response.json()
            setProducts(jsonResponse)
            setIsLoad(prev => !prev)
        }
        fetchData()
    }, [])

    if (!isLoad) {
        return <>loading</>
    }

    return (
        <div>
            <div>
                {products.map(val => <BucketProduct product={val}/>)}
            </div>
        </div>
    )
};

export default Bucket;
