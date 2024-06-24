import React, { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { baseUrl } from "../../constants";
import FavouritesProductList from "../FavouritesProductList";


const Delivery = (props) => {
    const [orders, setOrders] = useState()
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        const userID = JSON.parse(Cookies.get('user')).id
        const fetchData = async () => {
            let response = await fetch(`${baseUrl}/v1/orders/?user_id=${userID}`)
            let jsonResponse = await response.json()
            console.log(jsonResponse);
            setOrders(jsonResponse)
            setIsLoad(prev => !prev)
        }
        fetchData()
    }, [])

    if (!orders?.length) {
        return <div className="ml-5">нет товаров</div>
    }

    if (!isLoad || !orders) {
        return (
            <div className="ml-5">
                <>
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>
                </>
            </div>
        )
    }


    return (
        <div className="ml-5">
            <div className="grid grid-cols-3 gap-4">
                {orders.map(val => <DeliveryProduct productName={val.product} productPrice={val.product_price} orderDate={val.order_date} />)}
            </div>
            <div>Цена заказов: {orders.reduce((prev, cur) => prev + cur.product_price, 0)} BYN</div>
            <div className="flex flex-col w-1/2 bg-secondary rounded-[25px] items-center gap-5 pt-9 pb-9">
                <h1 className="text-white font-bold text-3xl">Доставка и оплата</h1>
                <div className="flex w-[70%] items-center flex-col">
                    Мы обрабатываем заказы ежедневно, без выходных, в течении 7 дней в неделю <span className="text-white">с 9:00 до 20:00.</span> Срочная доставка действует только в рабочее время магазина. Если у вас есть вопросы, звоните нам по номеру <span className="text-white">+375 (33) 200-42-90</span>
                </div>
                <div className="flex flex-col items-center w-full p-4 mt-5 gap-9">
                    <div className="flex flex-row gap-5">
                        <h1 className="text-2xl">Сроки доставки</h1>
                        <div className="flex flex-col items-center">
                            <div className="flex justify-between w-full items-center gap-3">
                                <label>Доствка по Витебску</label>
                                <label>На следующий день</label>
                            </div>
                            <div className="w-full bg-black h-[0.5px]"/>
                            <div className="flex justify-between w-full items-center">
                                <label>Сроки доставки</label>
                                <label>На следующий день</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <h1 className="text-2xl">Условия доставки</h1>
                        <div className="flex flex-col items-center">
                            <div className="flex justify-between w-full items-center">
                                <label>Доствка по Витебску</label>
                                <label>10.00 BYN</label>
                            </div>
                            <div className="w-full bg-black h-[0.5px]"/>
                            <div className="flex justify-between w-full items-center gap-4">
                                <label>Срочная доставка по Витебску</label>
                                <label>30.00 BYN</label>
                            </div>
                            <div className="w-full bg-black h-[0.5px]"/>
                            <div className="flex w-full justify-between items-center">
                                <label>Доставка по Витебску</label>
                                <label>70.00 BYN</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <h1 className="text-2xl">Сроки доставки</h1>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-6 items-center">
                                <label>Доствка по Витебску</label>
                                <label>На следующий день</label>
                            </div>
                            <div className="w-full bg-black h-[0.5px]"/>
                            <div className="flex gap-6 items-center">
                                <label>Сроки доставки</label>
                                <label>На следующий день</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export const DeliveryProduct = ({ productName, productPrice, orderDate }) => {
    return (
        <div className=" flex flex-col gap-3 bg-primary/15 rounded-3xl p-3">
            <div className="flex  items-center  justify-between gap-7">
                <div className="flex-1">
                    <h1 className="">{productName}</h1>
                </div>
                <h1>{productPrice} BYN</h1>
            </div>
            <h1>Дата заказа: {orderDate.split("T")[0]}</h1>

        </div>
    );
}

export default Delivery;