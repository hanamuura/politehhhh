import React, { useEffect, useState } from 'react';
import { baseUrl } from '../constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProductModal = ({ product, onClose }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [categories, setCategories] = useState()
    const [loaded, setLoaded] = useState()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${baseUrl}/admin/categories`)
            const data = await response.json()
            setCategories(data)
            setLoaded(prev => !prev)
        }
        fetchData()
    }, [])

    const handleCategoryChange = (category) => {
        if (updatedProduct.categories.includes(category)) {
            setUpdatedProduct((prevProduct) => ({
                ...prevProduct,
                categories: prevProduct.categories.filter(c => c.id !== category.id),
            }));
        } else {
            setUpdatedProduct((prevProduct) => ({
                ...prevProduct,
                categories: [...prevProduct.categories, category],
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSaveButton = () => {
        let formData = new FormData()
        formData.append('name', updatedProduct.name);
        formData.append('description', JSON.stringify(updatedProduct.description));
        let categories = updatedProduct.categories.map(cat => cat.id)
        formData.append('categories', categories)
        formData.append('id', updatedProduct.id)
        formData.append('price', updatedProduct.price)
        formData.append('availability', updatedProduct.availability)
        fetch(`${baseUrl}/admin/products`, {
            method: "PUT",
            body: formData
        }).then(res => toast.success('Товар успешно обновлен', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })).catch(err => {
            toast.error(`${err}`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            console.log(err)
        })
    }

    return (
        <div
            className="fixed z-10 inset-0 overflow-y-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Редактировать
                            </h3>
                            <div className="mt-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Название
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={updatedProduct.name}
                                    onChange={handleInputChange}
                                    className="mt-1 outline-none block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="description" className="block text-sm outline-none font-medium text-gray-700">
                                    Описание
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={updatedProduct.description.body}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full sm:text-sm outline-none border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Цена
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={updatedProduct.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full sm:text-sm outline-none border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                                    Количетсво
                                </label>
                                <input
                                    type="number"
                                    id="availability"
                                    name="availability"
                                    value={updatedProduct.availability}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full sm:text-sm outline-none border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Категории
                                </label>
                                {categories && categories.map(val => (<div><input type='checkbox' onChange={() => handleCategoryChange(val)} /><label>{val.name}</label></div>))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => handleSaveButton()}
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditProductModal;