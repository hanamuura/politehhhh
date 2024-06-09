import { FaTimes } from "react-icons/fa";

export const CategoryHeader = ({ categories, setSelectedCategory, selectedCategory }) => {
  return (
    <div className="flex justify-around w-[1000px] border-b border-[rgba(181,178,208,1)] h-5">
      {categories.map((el) => (
        <div
          key={el.id}
          onClick={() => setSelectedCategory(el)}
          className={`text-black cursor-pointer relative ${selectedCategory?.id === el.id ? "bg-slate-900" : ""}`}
        >
          {el.name}
          {selectedCategory?.id === el.id && (
            <div
              onClick={() => setSelectedCategory(null)}
              className={`ml-2 cursor-pointer text-[rgba(181,178,208,1)] transition-colors duration-300 ${selectedCategory?.id === el.id ? "bg-slate-900" : ""}`}
            >
              <FaTimes />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};