import React from "react"
import ProductLayout from "../components/layouts/ProductLayout";
import OrdersLayout from "../components/layouts/OrdersLayout";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Tabs, { Tab } from "../components/tabs/AdminTabs";
import { Link } from "react-router-dom";

const AdminPage = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        const cookieUser = JSON.parse(Cookies.get('user'))
        console.log(cookieUser);
        setUser(cookieUser)
    }, [])

    if (!user) {
        return <>loading</>
    }


    if (!user.is_super) {
        return <>404 not found</>
    }


    return (
        <div className="flex items-center">
            <Tabs>
                <Tab title="Товары">
                    <ProductLayout />
                </Tab>
                <Tab title="Заказы">
                    <OrdersLayout />
                </Tab>
            </Tabs>
        </div>
    )
}


export default AdminPage;
