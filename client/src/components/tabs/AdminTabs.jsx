import React from "react"
import { useState } from "react";

const Tabs = (props) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {React.Children.map(props.children, (child, index) => {
                        if (React.isValidElement(child)) {
                            return (
                                <li key={index} className="mr-2">
                                    <button
                                        className={`inline-block p-4 border-b-2 rounded-t-lg ${index === activeTabIndex
                                            ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active'
                                            : 'border-transparent dark:hover:text-gray-300'
                                            }`}
                                        onClick={() => handleTabClick(index)}
                                    >
                                        {child.props.title}
                                    </button>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
            <div>
                {React.Children.toArray(props.children)[activeTabIndex]}
            </div>
        </div>

    )
};

export const Tab = (props) => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

export default Tabs;