import React, { useState } from 'react';

const CreateProduct = ({ onClose, onSave }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: { body: '' },
        price: 0,
        availability: 0,
        categories: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'description'
                ? { ...prevProduct.description, body: value }
                : value,
        }));
    };

    const handleCategoryChange = (category) => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            categories: [...prevProduct.categories, category],
        }));
    };

    const handleSave = () => {
        onSave(newProduct);
        onClose(prev => {
            return!prev
        });
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
                                <input
                                    type="text"
                                    placeholder="Добавить категорию"
                                    className="mt-1 block w-full sm:text-sm outline-none border-gray-300 rounded-md"
                                />
                                <ul className="mt-2">
                                    {newProduct.categories.map((category, index) => (
                                        <li
                                            key={index}
                                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-200 text-blue-800 mr-2"
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
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
                            onClick={() => onClose(prev => !prev)}
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