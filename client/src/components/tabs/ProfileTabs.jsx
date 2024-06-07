import React from "react";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const ProfileTabs = (props) => {
    const [activeTabIndex, setActiveTabIndex] = useState(props.tab);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <div className="flex ml-10">
            <div className="bg-secondary flex w-[300px] rounded-[20px] h-[300px]">
                <ul className="self-center ml-3 text-[rgba(255,255,255,0.5)] font-bold flex flex-col gap-7">
                    {React.Children.map(props.children, (child, index) => {
                        if (React.isValidElement(child)) {
                            return (
                                <li
                                    key={index}
                                    className={`mr-2 flex items-center ${index === activeTabIndex
                                            ? "text-white after:content-[''] after:ml-2 after:text-white after:text-2xl after:font-bold"
                                            : ""
                                        }`}
                                >
                                    <button onClick={() => handleTabClick(index)}>
                                        {child.props.title}
                                    </button>
                                    {index === activeTabIndex && (
                                        <IoIosArrowForward className="ml-2" />
                                    )}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
            <div className="flex w-full">
                {React.Children.toArray(props.children)[activeTabIndex]}
            </div>
        </div>
    );
};

export const ProfileTab = (props) => {
    return <div className="w-full">{props.children}</div>;
};

export default ProfileTabs;