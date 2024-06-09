import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const CreateCard = ({ isOpen, onClose, onSubmit }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [name, setName] = useState("");
    const [isMain, setIsMain] = useState(false);

    const handleSubmit = () => {
        if (cardNumber.length === 16) {
            onSubmit(prev => [...prev, {cardID: cardNumber, holderName: name, isMain: false}])
            setCardNumber("");
            setName("");
            setIsMain(false);
        }
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 16) {
            setCardNumber(value);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-end mb-4">
                    <button onClick={onClose}>
                        <IoClose className="text-gray-500 hover:text-gray-700" />
                    </button>
                </div>
                <h2 className="text-2xl font-bold mb-6">Добавить новую карту</h2>
                <div className="mb-4">
                    <label htmlFor="cardNumber" className="block font-medium mb-2">
                        Номер карты
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-2">
                        Имя владельца
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className={`bg-primary text-white rounded-md px-4 py-2 ${cardNumber.length !== 16 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={handleSubmit}
                        disabled={cardNumber.length !== 16}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCard;