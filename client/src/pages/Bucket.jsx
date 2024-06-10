import React, { useEffect, useState } from "react"
import BucketProduct from "../components/BucketProduct";
import Cookies from "js-cookie";
import { baseUrl } from "../constants";
import { FaPen } from "react-icons/fa";
import { useToggle } from "../hooks/useToggle";
import AddressEditModal from "../modals/AddressEditModal";
import CardsProfile from "../components/CardsProfile";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        if (Cookies.get('user')) {
            const userID = JSON.parse(Cookies.get('user'))?.id
            const fetchData = async () => {
                let response = await fetch(`${baseUrl}/v1/products?user_id=${userID}`)
                let jsonResponse = await response.json()
                setProducts(jsonResponse)
                setIsLoad(prev => !prev)
            }
            fetchData()
        }
    }, [])

    const handleClick = (products) => {
        if (!Cookies.get('user')) {
            toast.error('Вы не вошли в систему', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            products.forEach(val => {
                const fetchData = async () => {
                    let id = JSON.parse(Cookies.get('user')).id
                    let request = { status_id: 1, product_id: val.id, user_id: id }
                    await fetch(`${baseUrl}/v1/orders`, {
                        method: "POST",
                        body: JSON.stringify(request)
                    }).then(res => toast.success('Заказ принят', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })).catch(err => toast.error('Не удалось принять заказ', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }))
                }

                fetchData()
            })

        }
    }

    if (!Cookies.get('user')) {
        return <div className="flex justify-center items-center h-full">ВЫ НЕ ЗАРЕГИСТРИРОВАНЫ</div>
    }

    if (!isLoad) {
        return (
            <>
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
            </>
        )
    }


    return (
        <div className="flex w-full flex-col">
            <div className="flex gap-20 w-full">
                <div className="flex flex-col gap-5 bg-[#b5b2d051] pr-16 pt-5 pb-5 rounded-[20px] ml-5 w-[60%]">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-2xl ml-3">Корзина ({products?.length})</h1>
                        <div className="flex items-center gap-3">
                            Выбрать все
                            <input type="checkbox" value={all} onChange={() => setAll(pre => !pre)} />
                        </div>
                    </div>
                    <div className="flex flex-col ml-3 ">
                        {products ? products.map((val) => (
                            <BucketProduct product={val} setSelected={setSelectedProducts} all={all} />
                        )) : <div className="flex justify-center items-center h-full">ТОВАРОВ В КОРЗИНЕ НЕТУ </div>}
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
                    <button
                        className="bg-primary rounded-[20px] p-5 text-white text-2xl font-bold"
                        onClick={() => handleClick(selectedProducts)}
                    >Заказать</button>
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
            <ToastContainer />
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
                className=" bg-[#b5b2d051] border border-gray-300 rounded-[20px] px-4 py-2 flex justify-between items-center cursor-pointer"
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