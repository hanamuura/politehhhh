import React from "react"

const CustomButton = (props) => {
  return (
    <button className="bg-primary rounded-[50px] text-white w-[200px] font-extrabold h-fit p-1" {...props}>
        {props.children}
    </button>
  )
};

export default CustomButton;
