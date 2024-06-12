import React, { useEffect } from "react"
import { useState } from "react";
import { baseUrl } from "../../constants";

const OrdersLayout = (props) => {
  const [orders,] = useState([])

  useEffect(() => {
    let json = fetch(`${baseUrl}/orders`)
  }, [])

  return (
    <div className="relative orverflow-x-auto">
      <div className="">
        <table className="w-full text-sm text-left rtl:text-right text-gray-900 mt-5">
          <thead className="text-xs text-gray-600 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>

              <th scope="col" className="px-6 py-3">
                Дата заказа
              </th>

              <th scope="col" className="px-6 py-3">
                Статус
              </th>

              <th scope="col" className="px-6 py-3">
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order.id}
                className="bg-gray-100 border-b hover:bg-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {order.id}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {order.order_date}
                </th>

                <th
                  scope="row"
                  className={`px-6 py-4 font-medium whitespace-nowrap ${order.status.name === 'Pending'
                      ? 'text-yellow-500'
                      : order.status.name === 'Начато'
                        ? 'text-blue-500'
                        : order.status.name === 'В процессе'
                          ? 'text-green-500'
                          : 'text-red-600'
                    }`}
                >
                  {order.status.name}
                </th>
                <td>
                  <button className="font-medium text-blue-600 hover:underline">
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default OrdersLayout;
