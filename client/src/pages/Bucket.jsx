import React, { useEffect, useState } from "react"
import BucketProduct from "../components/BucketProduct";
import Cookies from "js-cookie";
import { baseUrl } from "../constants";
import { FaPen } from "react-icons/fa";
import { useToggle } from "../hooks/useToggle";
import AddressEditModal from "../modals/AddressEditModal";
import CardsProfile from "../components/CardsProfile";

export const Bucket = (props) => {
    const [products, setProducts] = useState()
    const [selectedProducts, setSelectedProducts] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const price = 30
    const [all, setAll] = useState(false)
    const [address, setAddress] = useState({ city: "г. Минск", street: "Чурлениса", house: "д. 1", flat: "кв. 612" })
    const { isOpen, toggle } = useToggle()
    const [cards, setCards] = useState([
        { cardID: "1234 1234 1234 1234", holderName: "valera pika", isMain: true },
        { cardID: "1234 1234 1234 4321", holderName: "valera pika", isMain: false },
    ])
    const [delivery, setDelivery] = useState([
        { label: "Доставка на дом", price: 30 },
        { label: "Самолично", price: 0 },
    ])
    const [activeDelivery, setActiveDelivery] = useState(null)

    useEffect(() => {
        const userID = JSON.parse(Cookies.get('user')).id
        const fetchData = async () => {
            let response = await fetch(`${baseUrl}/v1/products?user_id=${userID}`)
            let jsonResponse = await response.json()
            setProducts(jsonResponse)
            setIsLoad(prev => !prev)
        }
        fetchData()
    }, [])

    if (!isLoad) {
        return <>loading</>
    }

    return (
        <div className="flex w-full flex-col">
            <div className="flex gap-20 w-full">
                <div className="flex flex-col gap-5 bg-[#b5b2d051] pr-16 pt-5 pb-5 rounded-[20px] ml-5 w-[60%]">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-2xl ml-3">Корзина ({products.length})</h1>
                        <div className="flex items-center gap-3">
                            Выбрать все
                            <input type="checkbox" value={all} onChange={() => setAll(pre => !pre)} />
                        </div>
                    </div>
                    <div className="flex flex-col ml-3">
                        {products.map((val) => (
                            <BucketProduct product={val} setSelected={setSelectedProducts} all={all} />
                        ))}
                    </div>
                </div>
                <div className="bg-[#b5b2d051] rounded-[20px] flex flex-col w-[40%] h-[550px] p-9 justify-between mr-5">
                    <h1 className="font-bold text-2xl">Детали заказа</h1>
                    <div className="flex gap-5 text-xl">
                        <label>Адрес: </label>
                        <p className="underline cursor-pointer  ">{address.city}, {address.street}, {address.house}, {address.flat}</p>
                    </div>
                    <div className="flex gap-5 text-xl">
                        <label>Оплата: </label>
                        <p className="underline cursor-pointer  ">{cards.filter(val => val.isMain === true)[0].cardID}</p>
                    </div>
                    <div className="flex gap-5 text-xl">
                        <label>Доставка: </label>
                        <p className="underline cursor-pointer  ">{price} BYN</p>
                    </div>
                    <div className="flex gap-5 text-xl">
                        <label>Товары: </label>
                        <p className="underline cursor-pointer  ">{selectedProducts.length}</p>
                    </div>
                    <h1 className="text-2xl font-bold">Итого: {selectedProducts.reduce((prev, curr) => prev + curr.price, price).toFixed(2)} BYN</h1>
                    <button className="bg-primary rounded-[20px] p-5 text-white text-2xl font-bold">Заказать</button>
                </div>
            </div>
            <div className="flex flex-col w-4/5 ml-5 mt-9 gap-5">
                <div className="flex justify-between w-3/5">
                    <AddressPicker address={address} toggle={toggle} />
                    <DeliveryPicker deliveryVariants={delivery} setActive={setActiveDelivery} />
                </div>
                <CardsProfile cards={cards} setCards={setCards} />
            </div>
            {isOpen && <AddressEditModal show={isOpen} onHide={toggle} initialAddress={address} onSave={setAddress} />}
        </div>
    )
};

export const AddressPicker = ({ address, toggle }) => {
    return (
        <div className="flex gap-3 bg-[#b5b2d051] p-2 rounded-[20px] items-center">
            <label>Адрес доставки: </label>
            <p
                className="underline cursor-pointer"
                onClick={toggle}
            >
                {address.city}, {address.street}, {address.house}, {address.flat}
            </p>
            <FaPen />
        </div>
    )
};

export const DeliveryPicker = ({ deliveryVariants, setActive }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setActive(option);
        setIsOpen(false);
    };

    return (
        <div className="relative select-none">
            <div
                className="delivery-picker__selected bg-[#b5b2d051] border border-gray-300 rounded-[20px] px-4 py-2 flex justify-between items-center cursor-pointer"
                onClick={toggleDropdown}
            >
                {selectedOption ? selectedOption.label : 'Способ доставки'}
                <span
                    className={` text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                >
                    ▼
                </span>
            </div>
            {isOpen && (
                <div className="delivery-picker__options absolute z-10 bg-[#b5b2d051] border border-gray-300 rounded-[20px] mt-1 w-full">
                    {deliveryVariants.map((option, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 cursor-pointer `}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};