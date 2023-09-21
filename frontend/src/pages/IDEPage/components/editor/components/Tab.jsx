import React from 'react';
import CloseButton from "./CloseButton";

const Tab = ({ isActive, label, onClick, onClose }) => {
  return (
    <li className="w-auto border-r border-gray-700 relative mt-1.5 mb-1.5 ml-2 ">
      <a
        onClick={onClick}
        className={`flex items-center  h-full ${isActive ? 'bg-[#2C3243] pt-0 pb-0 border-t-2 rounded-xl border-[#609AE2] text-[#609AE2]' : 'text-[#C3C8CC]'} 
                   px-10 py-0 whitespace-nowrap text-center align-middle justify-center h-full`}
      >
        <span className="tab-title text-sm font-bold overflow-hidden mr-2 truncate w-auto flex-1">{label}</span>
      </a>
      <button 
        className="absolute top-0 right-0 mt-2 mr-2  text-[#609AE2]" 
        onClick={onClose}
      >
        <CloseButton isActive={isActive} />
      </button>
    </li>
  );
};

export default Tab;
