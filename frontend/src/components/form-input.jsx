import React from "react";

export default function FormInput({ placeholder, value, onChange, width = "w-full", password = false }) {
    return (
        <input
            className={`${width} h-[50px] px-5 rounded-md border`}
            type={`${password ? "password" : "text"}`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
}
