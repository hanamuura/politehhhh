import React, { useEffect, useState } from 'react';

const CreateProduct = ({ onClose, onSave }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: { title: '', body: '' },
        price: 0,
        availability: 0,
        categories: [],
    });

    let image = null
    const [categories, setCategories] = useState()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8080/api/admin/categories")
            const data = await response.json()
            setCategories(data)
            setLoaded(prev => !prev)
        }
        fetchData()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'description'
                ? { ...prevProduct.description, body: value }
                : value,
        }));
    };


    const handleFileChange = (event) => {
        image = event.target.files[0]
        console.log(image);
    };

    const handleCategoryChange = (category) => {
        console.log(category)
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            categories: [...prevProduct.categories, category],
        }));
    };

    const handleSave = () => {
        newProduct.description.title = "newProduct"

        console.log(newProduct);

        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', JSON.stringify(newProduct.description));
        formData.append('price', newProduct.price);
        formData.append('availability', newProduct.availability);
        newProduct.categories.forEach((category) => {
            formData.append('categories[]', category);
        });
        formData.append('image', image);

        console.log(formData);

        try {
            fetch('http://localhost:8080/api/admin/products', {
                method: 'POST',
                body: formData,
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                                Создать товар
                            </h3>
                            <div className="mt-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Название
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newProduct.name}
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
                                    value={newProduct.description.body}
                                    onChange={handleInputChange}
                                    rows={3}
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
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full sm:text-sm outline-none border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mt-4">
                                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                                    Количество
                                </label>
                                <input
                                    type="number"
                                    id="availability"
                                    name="availability"
                                    value={newProduct.availability}
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
                            <input type='file' onChange={(e) => handleFileChange(e)} />
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleSave}
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {
                                onClose(prev => !prev)
                                console.log(newProduct);
                            }}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;