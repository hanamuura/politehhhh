import React from "react"
import { TiHeartOutline } from "react-icons/ti";
import { staticImagePath } from "../constants";
import { CiCirclePlus } from "react-icons/ci";
import Cookie from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from "../constants";


const ProductComponent = (props) => {

    const handleAddToFavorite = () => {
        const userID = JSON.parse(Cookie.get('user')).id;
        const request = { user_id: userID, product_id: props.product.id };
        const fetchData = () => {
            fetch(`${baseUrl}/v1/products`, {
                method: "POST",
                body: JSON.stringify(request)
            })
                .then(() => {
                    toast.success('Товар добавлен в избранное', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch(() => {
                    toast.error('Товар не добавлен в избранное', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        };
        fetchData();
    };
    return (
        <div className="flex flex-col pr-[42px] pl-[42px] gap-4 md:pr-[106px] md:pl-[42px]">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="rounded-2xl bg-primary">
                    <img src={`${staticImagePath}${props.product.image}`} className="w-full h-auto p-4 md:w-[468px] md:h-[475px]" />
                </div>
                <div className="flex flex-col mt-4 md:mt-0">
                    <div className="w-full md:w-[300px]">
                        <h1 className="text-4xl font-bold">{props.product.name}</h1>
                    </div>
                    <div className="flex flex-col md:flex-row md:h-[300px] gap-[150px]">
                        <div className="flex flex-col self-center justify-center">
                            <h1 className="text-5xl font-bold text-primary">{props.product.price} BYN</h1>
                            {props.product.availability > 0 ? (
                                <h1 className="text-3xl font-bold text-primary">В наличии</h1>
                            ) : <h1 className="text-3xl font-bold text-primary">Нет в наличии</h1>}
                        </div>
                        <div className="flex flex-row self-center items-center gap-6 cursor-pointer">
                            <CiCirclePlus
                                className="w-7 h-7"
                                onClick={handleAddToFavorite}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-5">
                    <div className="bg-primary rounded-[50px] text-white w-[163px] h-[35px] font-extrabold flex justify-center items-center">
                        Описание
                    </div>
                    <div className="bg-primary rounded-[50px] text-white w-[163px] h-[35px] font-extrabold flex justify-center items-center">
                        Состав
                    </div>
                </div>
                <div>
                    {props.product.description?.body}
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
};

export default ProductComponent;