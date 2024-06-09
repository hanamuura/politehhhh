import React from "react"
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import masterCard from "../images/Снимок_экрана_2024-05-07_215930-removebg-preview (1) 1.svg"
import CardModal from "../modals/CardModal";
import { useToggle } from "../hooks/useToggle";

const Card = ({ card, handleCardMenu }) => {

    const { isOpen, toggle } = useToggle(false)

    const handleCardID = () => {
        return `...${card.cardID.slice(card.cardID.length - 4, card.cardID.length)}`
    }

    return (
        <div className="flex flex-col w-[320px] h-[180px] justify-between p-[14px] bg-[#B5B2D0] rounded-[20px]">
            <div className="relative flex justify-between text-white">
                {card.isMain && (
                    <div className="bg-[#7E83AE] flex p-2 rounded-[20px] h-[40px] select-none">
                        <IoCheckmarkOutline className="w-5 h-5 mt-[2px]" />
                        Основной способ оплаты
                    </div>
                )}
                <div
                    className="bg-[#7E83AE] w-[40px] h-[40px] rounded-[50%] flex items-center justify-center select-none cursor-pointer relative"
                    onClick={() => toggle()}
                >
                    <IoEllipsisHorizontalSharp className="text-white" />
                    {isOpen && (
                        <div className="absolute top-full right-0 mt-2 z-10">
                            <CardModal cardID={card.cardID} isOpen={isOpen} onMakeDefault={handleCardMenu}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between ml-3 mr-3">
                <div className="text-white text-xl font-bold">{handleCardID()}</div>
                <img src={masterCard} />
            </div>
        </div>
    )
};

export default Card;
