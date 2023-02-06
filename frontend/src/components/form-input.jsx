import React from "react";

export default function FormInput({ placeholder, value, onChange, width = "w-full", type="text" }) {
    return <input className={`${width} h-[50px] px-5 rounded-md border`} type={type} placeholder={placeholder} onChange={onChange} value={value} />;
}
