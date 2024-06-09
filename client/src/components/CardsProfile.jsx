import React, { useState } from "react"
import Card from "./Card";
import { IoAddOutline } from "react-icons/io5";
import { useToggle } from "../hooks/useToggle";
import CreateCard from "../modals/CreateCard";

const CardsProfile = ({ cards, setCards }) => {

    const {isOpen, toggle} = useToggle()

    const handleCardMenuClick = (cardID) => {
        setCards(prevCards => prevCards.map(card => card.cardID === cardID ? {...card, isMain: true} : {...card, isMain: false}))
    }

    return (
        <div className="flex gap-5 flex-wrap">
            {cards.length ?
                <div
                    className="flex gap-5 flex-wrap"
                >
                    {cards.map(val => <Card card={val} handleCardMenu={handleCardMenuClick} />)}
                </div> : null
            }
            <div
                className="flex cursor-pointer flex-col border-[#B5B2D0] rounded-[20px] w-[320px] h-[180px] border-[5px] text-[#B5B2D0] text-2xl justify-center items-center"
                onClick={toggle}
            >
                <IoAddOutline className="w-12 h-12" />
                Добавить карту
            </div>
            {isOpen && <CreateCard isOpen={isOpen} onClose={toggle} onSubmit={setCards}/>}
        </div>
    )
};

export default CardsProfile;
