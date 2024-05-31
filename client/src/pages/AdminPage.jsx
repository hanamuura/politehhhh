import React from "react"
import Tabs, { Tab } from "../components/tabs/Tabs";
import ProductLayout from "../components/layouts/ProductLayout";
import OrdersLayout from "../components/layouts/OrdersLayout";
import { useState, useEffect } from "react";

const AdminPage = () => {

    

    return (
        <div>
            <Tabs>
                <Tab title="Товары">
                    <ProductLayout/>
                </Tab>
                <Tab title="Заказы">
                    <OrdersLayout />
                </Tab>
            </Tabs>
        </div>
    )
};

export default AdminPage;
