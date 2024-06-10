import { FaTimes } from "react-icons/fa";

export const CategoryHeader = ({ categories, setSelectedCategory, selectedCategory }) => {
  console.log(categories)
  console.log(selectedCategory)

  return (
    <div className="flex justify-around w-[1000px] border-b border-[rgba(181,178,208,1)] h-5">
      {categories.map((el) => (
        <div
          key={el.id}
          onClick={() => setSelectedCategory(el)}
          className={`text-black flex items-center cursor-pointer relative ${selectedCategory?.id === el.id ? "bg-[#b5b2d051] rounded-[10px] p-2" : ""}`}
        >
          {el.name}
          {selectedCategory?.id === el.id && (
            <div
              onClick={() => window.location.reload()}
              className={`ml-2 cursor-pointer text-primary transition-colors duration-300 ${selectedCategory?.id === el.id ? "" : ""}`}
            >
              <FaTimes />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};