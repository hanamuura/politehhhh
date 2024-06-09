import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

const CardModal = ({ isOpen, toggle, onDelete, onMakeDefault, cardID }) => {
    return (
        <div
            className={`w-[250px] bg-primary shadow-lg rounded-md py-2 px-4 z-10 ${isOpen ? 'block' : 'hidden'
                }`}
        >
            <ul className="space-y-2">
                <li
                    className="flex items-center space-x-2 cursor-pointer hover:text-blue-900"
                    onClick={() => {
                        console.log(cardID)
                        onMakeDefault(cardID)
                    }}
                >
                    <IoEllipsisHorizontalSharp />
                    <span>Сделать основным</span>
                </li>
                <li
                    className="flex items-center space-x-2 cursor-pointer hover:text-red-500"
                    onClick={() => onDelete()}
                >
                    <IoEllipsisHorizontalSharp />
                    <span>Удалить</span>
                </li>
            </ul>
        </div>
    );
};

export default CardModal;