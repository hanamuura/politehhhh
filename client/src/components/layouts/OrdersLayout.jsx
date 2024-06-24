import React, { useEffect } from "react"
import { useState } from "react";
import { baseUrl } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'

const OrdersLayout = (props) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(`${baseUrl}/admin/orders`)
      let jsonResponse = await response.json()
      console.log(jsonResponse);
      setOrders(jsonResponse)
    }

    fetchData()
  }, [])

  const handleDelete = (id) => {
    const fetchDelete = async () => {
      let res = await fetch(`${baseUrl}/admin/orders/${id}`, {
        method: "DELETE"
      })
      if (res.status === 200) {
        toast.success('Успешно удалено', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setOrders(prev => prev.filter(val => val.id !== id))
      } else {
        toast.success('Ошибка', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }

    fetchDelete()
  }


  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <table className="min-w-full text-sm text-left text-gray-900 mt-5">
          <thead className="text-xs text-gray-600 uppercase bg-gray-200">
            <tr>

              <th scope="col" className="px-6 py-3">
                Дата заказа
              </th>

              <th scope="col" className="px-6 py-3">
                Статус
              </th>

              <th scope="col" className="px-6 py-3">
                Товар
              </th>

              <th scope="col" className="px-6 py-3">
                Имя пользователя
              </th>

              <th scope="col" className="px-6 py-3">
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map(order => (
              <tr
                key={order.id}
                className="bg-gray-100 border-b hover:bg-gray-200"
              >
                <td
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {order.order_date.split("T")[0]}
                </td>
                <td
                  className={`px-6 py-4 font-medium whitespace-nowrap ${order.status_name === 'Pending'
                    ? 'text-yellow-500'
                    : order.status_name === 'Начато'
                      ? 'text-blue-500'
                      : order.status_name === 'В процессе'
                        ? 'text-green-500'
                        : 'text-red-600'
                    }`}
                >
                  {order.status_name}
                </td>

                <td
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {order.product_name}
                </td>
                <td
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {order.username}
                </td>
                <td
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <button
                    className="font-medium text-blue-600 hover:underline"
                    onClick={() => handleDelete(order.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  )
};

export default OrdersLayout;
