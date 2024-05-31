import React, { useState, useEffect } from "react";
import { useToggle } from "../../hooks/useToggle";
import UpdateProduct from "../../modals/UpdateProduct";
import CreateProduct from "../../modals/CreateProduct";

const ProductLayout = (props) => {
    const [products, setProducts] = useState([])
    const [isLoad, setIsLoad] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [searchedProducts, setSearchedProducts] = useState(products)
    const { isOpen, toggle } = useToggle()
    const [selectedProduct, setSelectedProduct] = useState({})
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false)

    useEffect(() => {
        let abortController = new AbortController()
        let { signal } = abortController

        async function getData() {
            let response = await fetch('http://localhost:8080/products', { signal: signal })
            let jsonResponse = await response.json()
            setProducts(jsonResponse)
            setIsLoad(prev => !prev)
        }

        getData()

        return () => {
            abortController.abort()
        }
    }, [])

    useEffect(() => {
        setSearchedProducts(
            products.filter(val => val.name.toLowerCase().includes(searchValue.toLowerCase()))
        )
    }, [searchValue, products])

    if (isLoad) {
        return (
            <div class="flex items-center justify-center h-screen">
                <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="relative overflow-x-auto">
            <div className="relative mt-1 ml-5">
                <div className="absolute inset-y-0 rtl:inset-r-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    id="table-search"
                    className="block w-80 p-2 pl-10 text-sm text-gray-900 border rounded-md border-gray-300 bg-gray-50 outline-none"
                    placeholder="Search for items"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-900 mt-5">
                <thead className="text-xs text-gray-600 uppercase bg-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Название
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Категории
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Цена
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Количество
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {searchedProducts.map((item) => (
                        <tr
                            key={item.id}
                            className="bg-gray-100 border-b hover:bg-gray-200"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                                {item.name}
                            </th>
                            <td className="px-6 py-4">
                                {item.categories.map((el) => (
                                    <span
                                        key={el.id}
                                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800 mr-2"
                                    >
                                        {el.name}
                                    </span>
                                ))}
                            </td>
                            <td className="px-6 py-4">${item.price}</td>
                            <td className="px-6 py-4">{item.availability}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="font-medium text-blue-600 hover:underline"
                                    onClick={() => {
                                        toggle()
                                        setSelectedProduct(prev => item)
                                    }}
                                >
                                    Редактировать
                                </button>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="font-medium text-blue-600 hover:underline">
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="m-5">
                <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                    onClick={() => 
                        setCreateModalIsOpen(prev => !prev)
                    }
                >
                    Создать
                </button>
            </div>
            {isOpen && <UpdateProduct product={selectedProduct} onClose={toggle} />}
            {createModalIsOpen && <CreateProduct product={selectedProduct} onClose={setCreateModalIsOpen} />}
        </div>
    );
};

export default ProductLayout;