import React from 'react';
import { Label } from "@/components/ui/label"

const AppointmentCreateInputTag = ({ handleOnchange, label, name, placeholder, errorMessage, className, defaultValue }) => {
  return (
    <div className="flex flex-col">
      <Label>{label}<span className='text-red-500'>*</span></Label>
      <input
        type="text"
        className={`border border-gray-300 h-10 px-3 rounded-[7px] mt-2 text-sm focus:outline-none focus:border-blue-500 ${className}`}
        placeholder={placeholder}
        name={name}
        onChange={handleOnchange}
        defaultValue={defaultValue}
      />
      <span className="text-red-500 text-sm">{errorMessage}</span>
    </div>
  )
}

export default AppointmentCreateInputTag;
