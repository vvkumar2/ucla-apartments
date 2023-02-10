import React from "react";

export default function FormInput({ placeholder, value, onChange, width = "", password = false }) {
    return (
        <input
            className={`${width !== "" ? `w-[${width}]` : "w-full"} h-[50px] px-5 rounded-md border border-gray-200 placeholder-gray-400`}
            type={`${password ? "password" : "text"}`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}
