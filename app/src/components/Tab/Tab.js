import React from 'react';

export default function Tab(){
    return (
        <div className = "relative inline-flex justify-center items-center font-sans text-white border-r-[.5px] border-[#444444] px-2 py-4 leading-[0px]">
            <span className = "max-w-[150px] overflow-x-clip">
                hello.db
            </span>
            <div className = " bg-black inline-flex justify-center items-center h-full px-2">
                <span className = "inline-block font-mono hover:scale-110 leading-[0px]">
                    x
                </span>
            </div>
        </div>
    );
}