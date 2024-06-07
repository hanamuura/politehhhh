import React from "react"

const CustomButton = (props) => {
  return (
    <button className="bg-primary rounded-[50px] text-white w-[163px] h-[35px] font-extrabold" {...props}>
        {props.children}
    </button>
  )
};

export default CustomButton;
