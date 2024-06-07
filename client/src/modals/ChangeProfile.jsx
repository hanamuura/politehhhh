import React, { useEffect, useState } from "react"
import CustomButton from "../components/UI/CustomButton";
import { mergeObjects } from "../services/megreService";
import Cookies from "js-cookie";

const ChangeProfile = ({ isOpen, onClose }) => {
    const [patchedUser, setPatchedUser] = useState({ username: "", password: "", email: "" })
    const handleClose = () => {
        onClose();
    };

    const handleUpdateProfile = () => {
        const currentUser = JSON.parse(Cookies.get('user'))
        const mergedUser = mergeObjects(patchedUser, currentUser)
        console.log(mergedUser)
        // fetch("http://localhost:8080/api/login", {
        //     method: "PATCH",
        //     body: JSON.stringify(mergedUser)
        // })
    }

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"
                }`}
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={handleClose}></div>
                </div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div
                    className="inline-block align-bottom bg-white rounded-[50px] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div>
                        <div className="mt-3 text-center sm:mt-5">
                            <h3
                                className="text-lg leading-6 font-medium text-gray-900"
                                id="modal-headline"
                            >
                                Изменить данные
                            </h3>
                            <div className="mt-2 flex flex-col gap-4">
                                <input
                                    className="p-2 pl-5 rounded-[20px] border-[1px] border-primary focus:outline-none"
                                    placeholder="имя пользователя"
                                    onChange={e => setPatchedUser(prev => ({ ...prev, username: e.target.value }))}
                                />
                                <input
                                    type="password"
                                    className="p-2 pl-5 rounded-[20px] border-[1px] border-primary focus:outline-none"
                                    placeholder="пароль"
                                    onChange={e => setPatchedUser(prev => ({ ...prev, password: e.target.value }))}
                                />
                                <input
                                    type="mail"
                                    className="p-2 pl-5 rounded-[20px] border-[1px] border-primary focus:outline-none"
                                    placeholder="почта"
                                    onChange={e => setPatchedUser(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6 flex justify-center">
                        <CustomButton
                            onClick={() => handleUpdateProfile() }
                        >
                            Сохранить
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeProfile;
