import React, { useState, useEffect } from "react"
import Cookies from "js-cookie";
import { useToggle } from "../../hooks/useToggle";
import ChangeProfile from "../../modals/ChangeProfile";
import img from "C:/Users/Administrator/Downloads/Telegram Desktop/photo_2024-04-08_21-53-00.jpg" 
import Card from "../Card";
import CardsProfile from "../CardsProfile";

const Profile = () => {
    const [user, setUser] = useState()
    const { isOpen, toggle } = useToggle()
    const [cards, setCards] = useState([
        {cardID: "1234 1234 1234 1234", holderName: "valera pika", isMain: true},
        {cardID: "1234 1234 1234 4321", holderName: "valera pika", isMain: false},
    ])

    useEffect(() => {
        const cookieUser = JSON.parse(Cookies.get('user'))
        console.log(cookieUser);
        setUser(cookieUser)
    }, [])

    if (!user) {
        return <>...Loading</>
    }

    return (
        <div className="flex gap-[40px] pl-[40px] pr-[40px] w-full flex-col">
            <div className="flex flex-row bg-[rgba(181,178,208,0.3)] p-[40px] w-full rounded-[150px] justify-between">
                <div className="flex flex-col gap-10 ml-[100px] items-center">
                    <h1 className="text-[48px] font-bold">{user.username}</h1>
                    <h1 className="text-[20px] font-medium">{user.email}</h1>
                    <div className="flex flex-row gap-5">
                        <button className="text-primary" onClick={toggle}>Изменить данные</button>
                    </div>
                </div>
                <div>
                    <img className="rounded-[50%] w-[200px] h-[200px]" src={img} />
                </div>
            </div>
            <CardsProfile cards={cards} setCards={setCards}/>
            {isOpen && <ChangeProfile isOpen={isOpen} onClose={toggle} />}
        </div>

    )
};

export default Profile;
