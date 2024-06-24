import React, { useState } from "react";

const AddressEditModal = ({ show, onHide, initialAddress, onSave }) => {
    const [address, setAddress] = useState(initialAddress);

    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(address);
        onHide();
    };
    
    return (
        show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Редактировать адрес</h2>
                        <button
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={onHide}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="formCity" className="block text-gray-700 font-semibold">
                                Город
                            </label>
                            <input
                                type="text"
                                id="formCity"
                                name="city"
                                value={address.city}
                                onChange={handleInputChange}
                                className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="formStreet" className="block text-gray-700 font-semibold">
                                Улица
                            </label>
                            <input
                                type="text"
                                id="formStreet"
                                name="street"
                                value={address.street}
                                onChange={handleInputChange}
                                className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="formHouse" className="block text-gray-700 font-semibold">
                                Дом
                            </label>
                            <input
                                type="text"
                                id="formHouse"
                                name="house"
                                value={address.house}
                                onChange={handleInputChange}
                                className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="formFlat" className="block text-gray-700 font-semibold">
                                Квартира/блок
                            </label>
                            <input
                                type="text"
                                id="formFlat"
                                name="flat"
                                value={address.flat}
                                onChange={handleInputChange}
                                className="border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-200 text-gray-700 rounded-[50px] px-4 py-2 mr-2 hover:bg-gray-300 focus:outline-none"
                                onClick={onHide}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-primary text-white rounded-[50px] px-4 py-2 hover:bg-[#848cd3] focus:outline-none"
                                onClick={handleSave}
                            >
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default AddressEditModal;